import { Router, Request, Response } from 'express';
import templateService from '../services/template.service';
import generatorService from '../services/generator.service';

const router = Router();

// Get all templates
router.get('/', (req: Request, res: Response) => {
  try {
    const templates = templateService.getAllTemplates();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving templates', error });
  }
});

// Get template types
router.get('/types', (req: Request, res: Response) => {
  try {
    const types = templateService.getTemplateTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving template types', error });
  }
});

// Get templates by type
router.get('/types/:type', (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const templates = templateService.getTemplatesByType(type);
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving templates by type', error });
  }
});

// Get template by id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = templateService.getTemplateById(id);
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving template', error });
  }
});

// Generate MOP from template
router.post('/:id/generate', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    
    const generatedMop = generatorService.generateMop(id, formData);
    
    if (!generatedMop) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.status(201).json(generatedMop);
  } catch (error) {
    res.status(400).json({ message: 'Error generating MOP', error });
  }
});

export default router;