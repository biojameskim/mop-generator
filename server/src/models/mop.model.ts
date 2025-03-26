export interface MopInfo {
    title: string;
    documentNumber?: string;
    workOrderNumber?: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    author?: {
      name?: string;
      email?: string;
      mobile?: string;
    };
  }
  
  export interface MopEffect {
    system: string;
    affected: boolean;
    details?: string;
  }
  
  export interface MopTool {
    name: string;
    required: boolean;
  }
  
  export interface MopSafetyRequirement {
    description: string;
  }
  
  export interface MopRisk {
    description: string;
  }
  
  export interface MopAssumption {
    description: string;
  }
  
  export interface MopStep {
    number: number;
    description: string;
    critical?: boolean;
    requiresWitness?: boolean;
    requiresTimestamp?: boolean;
  }
  
  export interface MopBackoutStep {
    number: number;
    description: string;
  }
  
  export interface MopModel {
    id: string;
    type: string;
    info: MopInfo;
    instructions: string[];
    effects: MopEffect[];
    tools: MopTool[];
    safetyRequirements: MopSafetyRequirement[];
    risks: MopRisk[];
    assumptions: MopAssumption[];
    steps: MopStep[];
    backoutSteps: MopBackoutStep[];
    createdAt: string;
    updatedAt: string;
  }