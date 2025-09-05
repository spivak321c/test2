// Controllers for global settings (fees, tax, shipping)
import { Request, Response } from 'express';
import * as settingsService from '../services/settings_service';

// Get all settings
export const getSettings = async (req: Request, res: Response) => {
  // Fetch global settings
  const settings = await settingsService.getSettings();
  res.json(settings);
};

// Update settings
export const updateSettings = async (req: Request, res: Response) => {
  // Update global settings, log action if financial
  const updated = await settingsService.updateSettings(req.body, req.user.id);
  res.json(updated);
};