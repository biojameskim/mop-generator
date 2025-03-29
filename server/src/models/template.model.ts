export interface MopTemplateField {
    id: string;
    label: string;
    type: 'text' | 'select' | 'checkbox' | 'textarea' | 'number';
    options?: string[];
    required: boolean;
    section: string;
    helpText?: string;
  }
  
  export interface MopTemplateStep {
    number: number;
    description: string;
    critical?: boolean;
    requiresWitness?: boolean;
    requiresTimestamp?: boolean;
    variableFields?: string[];
  }
  
  export interface MopTemplateConditionalStep {
    condition: string;
    steps: MopTemplateStep[];
  }
  
  export interface MopTemplate {
    id: string;
    name: string;
    description: string;
    type: string;
    defaultRiskLevel: 'Low' | 'Medium' | 'High';
    sections: {
      baseInfo: {
        titleTemplate: string;
        documentNumberFormat?: string;
      };
      instructions: string[];
      suggestedTools: {
        name: string;
        required: boolean;
      }[];
      safetyRequirements: {
        description: string;
      }[];
      risks: {
        description: string;
      }[];
      assumptions: {
        description: string;
      }[];
      baseSteps: MopTemplateStep[];
      conditionalSteps?: MopTemplateConditionalStep[];
      backoutSteps: {
        number: number;
        description: string;
      }[];
    };
    formFields: MopTemplateField[];
  }