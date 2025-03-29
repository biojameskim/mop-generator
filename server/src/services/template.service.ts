import { MopTemplate } from '../models/template.model';
import * as fs from 'fs';
import * as path from 'path';

class TemplateService {
  private templates: MopTemplate[] = [];
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/templates.json');
    this.loadTemplates();
  }

  private loadTemplates(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.templates = JSON.parse(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      this.templates = [];
    }
  }

  getAllTemplates(): MopTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): MopTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getTemplatesByType(type: string): MopTemplate[] {
    return this.templates.filter(template => template.type === type);
  }

  getTemplateTypes(): string[] {
    // Extract unique types
    return [...new Set(this.templates.map(template => template.type))];
  }
}

export default new TemplateService();