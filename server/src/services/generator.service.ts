import { MopModel } from '../models/mop.model';
import { MopTemplate } from '../models/template.model';
import templateService from './template.service';

class GeneratorService {
  generateMop(templateId: string, formData: Record<string, any>): MopModel | null {
    const template = templateService.getTemplateById(templateId);
    
    if (!template) {
      return null;
    }
    
    // Generate a unique ID for the MOP
    const mopId = this.generateId(template, formData);
    
    // Process template with form data
    const generatedMop: MopModel = {
      id: mopId,
      type: template.type,
      info: {
        title: this.replaceVariables(template.sections.baseInfo.titleTemplate, formData),
        documentNumber: template.sections.baseInfo.documentNumberFormat ? 
          this.replaceVariables(template.sections.baseInfo.documentNumberFormat, formData).replace('{id}', mopId) : 
          undefined,
        riskLevel: template.defaultRiskLevel,
        author: {
          name: formData.authorName || '',
          email: formData.authorEmail || '',
          mobile: formData.authorMobile || ''
        }
      },
      instructions: template.sections.instructions.map(instruction => 
        this.replaceVariables(instruction, formData)
      ),
      effects: (formData.effects || []).map((effect: any) => ({
        system: effect.system,
        affected: effect.affected,
        details: effect.details || ''
      })),
      tools: template.sections.suggestedTools.map(tool => ({
        name: this.replaceVariables(tool.name, formData),
        required: tool.required
      })),
      safetyRequirements: template.sections.safetyRequirements.map(req => ({
        description: this.replaceVariables(req.description, formData)
      })),
      risks: template.sections.risks.map(risk => ({
        description: this.replaceVariables(risk.description, formData)
      })),
      assumptions: template.sections.assumptions.map(assumption => ({
        description: this.replaceVariables(assumption.description, formData)
      })),
      steps: this.generateSteps(template, formData),
      backoutSteps: template.sections.backoutSteps.map((step, index) => ({
        number: step.number,
        description: this.replaceVariables(step.description, formData)
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return generatedMop;
  }
  
  private generateSteps(template: MopTemplate, formData: Record<string, any>): any[] {
    // Start with base steps
    let steps = template.sections.baseSteps.map(step => ({
      number: step.number,
      description: this.replaceVariables(step.description, formData),
      critical: step.critical,
      requiresWitness: step.requiresWitness,
      requiresTimestamp: step.requiresTimestamp
    }));
    
    // Add conditional steps if conditions are met
    if (template.sections.conditionalSteps) {
      template.sections.conditionalSteps.forEach(conditionalStep => {
        const condition = conditionalStep.condition;
        
        // Check if condition is met in form data
        if (formData[condition] === true) {
          const newSteps = conditionalStep.steps.map(step => ({
            number: step.number,
            description: this.replaceVariables(step.description, formData),
            critical: step.critical,
            requiresWitness: step.requiresWitness,
            requiresTimestamp: step.requiresTimestamp
          }));
          
          steps = [...steps, ...newSteps];
        }
      });
    }
    
    // Sort steps by number to ensure proper ordering
    steps.sort((a, b) => a.number - b.number);
    
    // Renumber steps to ensure sequential numbering
    return steps.map((step, index) => ({
      ...step,
      number: index + 1
    }));
  }
  
  private replaceVariables(text: string, formData: Record<string, any>): string {
    // Replace all {variable} occurrences with form data
    return text.replace(/{([^}]+)}/g, (match, variable) => {
      return formData[variable] !== undefined ? formData[variable] : match;
    });
  }
  
  private generateId(template: MopTemplate, formData: Record<string, any>): string {
    // Use prefix from template type and add timestamp
    const prefix = template.type.toLowerCase().slice(0, 4);
    const timestamp = new Date().getTime().toString().slice(-6);
    
    // Add a hash of key form fields if available
    let fieldHash = '';
    if (formData.componentType) {
      fieldHash = `-${formData.componentType.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    } else if (formData.maintenanceType) {
      fieldHash = `-${formData.maintenanceType.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }
    
    return `${prefix}${fieldHash}-${timestamp}`;
  }
}

export default new GeneratorService();