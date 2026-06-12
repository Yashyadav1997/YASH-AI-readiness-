export interface AssessmentInputs {
  industry: string;
  companySize: string;
  digitalMaturity: string;
  dataAvailability: string;
  leadershipSupport: string;
  employeeSkills: string;
  techInfrastructure: string;
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
