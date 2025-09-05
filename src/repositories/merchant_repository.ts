// Merchant queries using Drizzle
import { db } from '../config/database';
import { merchantApplications, merchants, users, adminLogs } from '../models/merchant';
import { eq } from 'drizzle-orm';

// Get all applications
export const getAllApplications = async () => {
  return db.select().from(merchantApplications);
};

// Get pending applications
export const getPendingApplications = async () => {
  return db.select().from(merchantApplications).where(eq(merchantApplications.status, 'pending'));
};

// Get application by ID
export const getApplicationById = async (id: string) => {
  return db.select().from(merchantApplications).where(eq(merchantApplications.id, id)).limit(1);
};

// Update application
export const updateApplication = async (id: string, data: any) => {
  return db.update(merchantApplications).set(data).where(eq(merchantApplications.id, id)).returning();
};

// Create user
export const createUser = async (data: any) => {
  return db.insert(users).values(data).returning();
};

// Create merchant
export const createMerchant = async (data: any) => {
  return db.insert(merchants).values(data).returning();
};

// Get all merchants
export const getAllMerchants = async () => {
  return db.select().from(merchants);
};

// Update merchant
export const updateMerchant = async (id: string, data: any) => {
  return db.update(merchants).set(data).where(eq(merchants.id, id)).returning();
};

// Create admin log
export const createAdminLog = async (data: any) => {
  return db.insert(adminLogs).values(data).returning();
};
