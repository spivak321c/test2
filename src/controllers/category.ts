// Controllers for category taxonomy management
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
