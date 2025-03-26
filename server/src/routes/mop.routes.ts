import express, { Router, Request, Response } from 'express';
import mopService from '../services/mop.service';

const router = express.Router();

// Get all MOPs
router.get('/', (req: Request, res: Response) => {
  try {
    const mops = mopService.getAllMops();
    res.json(mops);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving MOPs', error });
  }
});

// Get all MOP types
router.get('/types', (req: Request, res: Response) => {
  try {
    const types = mopService.getMopTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving MOP types', error });
  }
});

// Get MOPs by type
router.get('/types/:type', (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const mops = mopService.getMopsByType(type);
    res.json(mops);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving MOPs by type', error });
  }
});

// Get MOP by id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mop = mopService.getMopById(id);
    
    if (!mop) {
      return res.status(404).json({ message: 'MOP not found' });
    }
    
    res.json(mop);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving MOP', error });
  }
});

// Create a new MOP
router.post('/', (req: Request, res: Response) => {
  try {
    const newMop = mopService.createMop(req.body);
    res.status(201).json(newMop);
  } catch (error) {
    res.status(400).json({ message: 'Error creating MOP', error });
  }
});

// Update a MOP
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMop = mopService.updateMop(id, req.body);
    
    if (!updatedMop) {
      return res.status(404).json({ message: 'MOP not found' });
    }
    
    res.json(updatedMop);
  } catch (error) {
    res.status(400).json({ message: 'Error updating MOP', error });
  }
});

// Delete a MOP
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = mopService.deleteMop(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'MOP not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting MOP', error });
  }
});

export default router;