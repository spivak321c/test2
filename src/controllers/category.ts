// Controllers for category taxonomy management
/*
import { Request, Response } from 'express';
import * as categoryService from '../services/category_service';

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  // Fetch categories from service
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  // Validate and create category
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  // Update existing category by ID
  const category = await categoryService.updateCategory(req.params.id, req.body);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  // Delete category by ID
  await categoryService.deleteCategory(req.params.id);
  res.status(204).send();
};
*/

import { Request, Response } from 'express';
import { CategoryService } from '../services/category_service';

const service = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await service.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    const tree = await service.getCategoryTree();
    res.json(tree);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await service.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addAttribute = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    const category = await service.addAttribute(req.params.id, key, value);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};