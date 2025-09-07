// Category queries using Drizzle
import { db } from "../config/database";
import { categories } from "../models/category";
import { eq } from "drizzle-orm";
interface CategoryData {
  id: string;
  name: string;
  parentId?: string;
}

// Get all categories
export const getAllCategories = async () => {
  return db.select().from(categories);
};

// Create category
interface CategoryData {
  id: string;
  name: string;
  parentId?: string;
}
export const createCategory = async (data: CategoryData) => {
  return db.insert(categories).values(data).returning();
};

// Update category
export const updateCategory = async (id: string, data: any) => {
  return db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
};

// Delete category
export const deleteCategory = async (id: string) => {
  return db.delete(categories).where(eq(categories.id, id));
};
