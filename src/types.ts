export interface AssessmentInputs {
  industry: string;
  companySize: string;
  coreSystems: string;
  dataAvailability: string;
  llmAdoption: string;
  hardwareInfrastructure: string;
  aiBudget: string;
  leadershipSupport: string;
  culturalResistance: string;
  riskTolerance: string;
  employeeSkills: string;
}

export type ReadinessLevel = "Beginner" | "Emerging" | "Developing" | "Advanced" | "AI Driven";

export interface RoadmapItem {
  quarter: string;
  focus: string;
}

export interface AssessmentResult {
  executiveSummary: string;
  readinessScore: number;
  readinessLevel: ReadinessLevel;
  keyGaps: string[];
  priorityActions: string[];
  roadmap12Month: RoadmapItem[];
  suggestedKPIs: string[];
}
