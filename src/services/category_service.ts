// Category logic
import * as repo from '../repositories/category_repository';
import { createAdminLog } from '../repositories/merchant_repository';

// Get all categories
export const getAllCategories = async () => repo.getAllCategories();

// Create category
export const createCategory = async (data: any, adminId?: string) => {
  const category = await repo.createCategory(data);
  if (adminId) await createAdminLog({ adminId, action: 'CREATE_CATEGORY', targetType: 'category', targetId: category[0].id });
  return category;
};

// Update category
export const updateCategory = async (id: string, data: any, adminId?: string) => {
  const category = await repo.updateCategory(id, data);
  if (adminId) await createAdminLog({ adminId, action: 'UPDATE_CATEGORY', targetType: 'category', targetId: id });
  return category;
};

// Delete category
export const deleteCategory = async (id: string, adminId?: string) => {
  await repo.deleteCategory(id);
  if (adminId) await createAdminLog({ adminId, action: 'DELETE_CATEGORY', targetType: 'category', targetId: id });
};
