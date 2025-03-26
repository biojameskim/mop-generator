import { MopModel } from '../models/mop.model';
import * as fs from 'fs';
import * as path from 'path';

class MopService {
  private mops: MopModel[] = [];
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/mops.json');
    this.loadMops();
  }

  private loadMops(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.mops = JSON.parse(data);
    } catch (error) {
      console.error('Error loading MOPs:', error);
      this.mops = [];
    }
  }

  private saveMops(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.mops, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving MOPs:', error);
    }
  }

  getAllMops(): MopModel[] {
    return this.mops;
  }

  getMopById(id: string): MopModel | undefined {
    return this.mops.find(mop => mop.id === id);
  }

  getMopsByType(type: string): MopModel[] {
    return this.mops.filter(mop => mop.type === type);
  }

  getMopTypes(): string[] {
    // Get unique types
    return [...new Set(this.mops.map(mop => mop.type))];
  }

  createMop(mop: Omit<MopModel, 'id' | 'createdAt' | 'updatedAt'>): MopModel {
    const newMop: MopModel = {
      ...mop,
      id: this.generateId(mop.info.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mops.push(newMop);
    this.saveMops();
    return newMop;
  }

  updateMop(id: string, mop: Partial<MopModel>): MopModel | undefined {
    const index = this.mops.findIndex(m => m.id === id);
    if (index === -1) return undefined;

    // Update the MOP
    this.mops[index] = {
      ...this.mops[index],
      ...mop,
      updatedAt: new Date().toISOString()
    };

    this.saveMops();
    return this.mops[index];
  }

  deleteMop(id: string): boolean {
    const initialLength = this.mops.length;
    this.mops = this.mops.filter(mop => mop.id !== id);
    
    if (this.mops.length !== initialLength) {
      this.saveMops();
      return true;
    }
    
    return false;
  }

  private generateId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}

export default new MopService();