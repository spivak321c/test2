// Dispute queries using Drizzle
import { db } from '../config/database';
import { disputes } from '../models/dispute';
import { eq } from 'drizzle-orm';
// Get all disputes
export const getAllDisputes = async () => {
    return db.select().from(disputes);
};
// Get dispute by ID
export const getDisputeById = async (id) => {
    return db.select().from(disputes).where(eq(disputes.id, id)).limit(1);
};
// Create dispute
export const createDispute = async (data) => {
    return db.insert(disputes).values(data).returning();
};
// Update dispute
export const updateDispute = async (id, data) => {
    return db.update(disputes).set(data).where(eq(disputes.id, id)).returning();
};
//# sourceMappingURL=dispute_repository.js.map