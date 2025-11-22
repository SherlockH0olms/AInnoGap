// src/types/mvp.types.ts

export interface MVPGenerationRequest {
  gapId: string;
  niche: string;
  marketGap: any;
}

export interface MVPStrategy {
  id: string;
  gapId: string;
  name: string;
  description: string;
  features: MVPFeature[];
  techStack: TechStackItem[];
  timeline: Timeline;
  teamRequirements: TeamRequirements;
  budgetEstimate: BudgetEstimate;
  riskAssessment: RiskAssessment;
  successMetrics: SuccessMetric[];
  launchStrategy: string;
  marketingPlan: string[];
  firstSteps: string[];
  createdAt: string;
}

export interface MVPFeature {
  id: string;
  name: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedHours: number;
  userStories: string[];
}

export interface TechStackItem {
  id: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Mobile';
  technology: string;
  reason: string;
  estimatedCost: number;
  learningCurve: 'Easy' | 'Medium' | 'Hard';
}

export interface Timeline {
  weeks: number;
  phases: Phase[];
  milestones: Milestone[];
  criticalPath: string[];
}

export interface Phase {
  name: string;
  duration: number;
  tasks: string[];
  deliverables: string[];
}

export interface Milestone {
  name: string;
  date: string;
  description: string;
  dependencies: string[];
}

export interface TeamRequirements {
  totalMembers: number;
  roles: TeamRole[];
  skillsNeeded: string[];
  hiring: boolean;
  trainingRequired: string[];
}

export interface TeamRole {
  title: string;
  count: number;
  responsibilities: string[];
  requiredSkills: string[];
}

export interface BudgetEstimate {
  development: BudgetCategory;
  infrastructure: BudgetCategory;
  marketing: BudgetCategory;
  operations: BudgetCategory;
  contingency: BudgetCategory;
  total: number;
  currency: string;
  breakdown: string;
}

export interface BudgetCategory {
  amount: number;
  percentage: number;
  details: string[];
}

export interface RiskAssessment {
  threats: Risk[];
  opportunities: Risk[];
  overallRisk: 'Low' | 'Medium' | 'High';
  mitigationStrategies: string[];
}

export interface Risk {
  title: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigation: string;
}

export interface SuccessMetric {
  name: string;
  target: string;
  frequency: string;
  dataSource: string;
  importance: 'Critical' | 'High' | 'Medium';
}
