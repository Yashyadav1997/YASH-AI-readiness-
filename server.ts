import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/assess", async (req, res) => {
    try {
      const data = req.body;
      const key = process.env.GEMINI_API_KEY;
      
      if (!key) {
        return res.status(500).json({ error: "Gemini API key is not configured" });
      }

      const ai = new GoogleGenAI({ 
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are a top-tier AI and Digital Transformation consultant. 
Analyze the following company profile and provide a comprehensive AI Readiness Assessment.

Company Profile Data:
- Industry: ${data.industry}
- Company Size: ${data.companySize}
- Core Business Systems: ${data.coreSystems}
- Data Availability & Quality: ${data.dataAvailability}
- Current LLM Adoption: ${data.llmAdoption}
- Compute Infrastructure: ${data.hardwareInfrastructure}
- AI Budget Allocation: ${data.aiBudget}
- Leadership Attitude: ${data.leadershipSupport}
- Cultural Resistance (Employees): ${data.culturalResistance}
- Risk & Compliance Tolerance: ${data.riskTolerance}
- Employee AI Skills: ${data.employeeSkills}

Return a structured JSON response tailored to this exact business profile. Make your assessment professional, practical, and highly actionable.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: { type: Type.STRING, description: "A high-level paragraph summarizing their readiness and top strategic imperative." },
              readinessScore: { type: Type.INTEGER, description: "Score from 0 to 100 based on the inputs." },
              readinessLevel: { type: Type.STRING, description: "Must be exactly one of: Beginner, Emerging, Developing, Advanced, AI Driven" },
              keyGaps: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 3-5 specific gaps or weaknesses preventing AI adoption."
              },
              priorityActions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 3-5 high-priority immediate actions to take."
              },
              roadmap12Month: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    quarter: { type: Type.STRING, description: "e.g., Q1, Q2" },
                    focus: { type: Type.STRING, description: "The primary quarterly focus or milestone." }
                  },
                  required: ["quarter", "focus"]
                },
                description: "A 4-quarter structured roadmap."
              },
              suggestedKPIs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 3-4 specific KPIs to measure success."
              }
            },
            required: ["executiveSummary", "readinessScore", "readinessLevel", "keyGaps", "priorityActions", "roadmap12Month", "suggestedKPIs"]
          }
        }
      });

      if (!response.text) {
        throw new Error("No response text from Gemini");
      }

      const jsonResponse = JSON.parse(response.text);
      res.json(jsonResponse);

    } catch (error: any) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ error: "Failed to generate assessment. Please try again." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
