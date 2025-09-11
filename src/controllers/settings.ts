import { Request, Response } from 'express';
import * as settingsService from '../services/settings_service';

export const updateSettings = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updated = await settingsService.updateSettings(req.body, req.user.id);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};