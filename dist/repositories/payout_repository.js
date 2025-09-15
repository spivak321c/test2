// Payout queries using Drizzle
import { db } from '../config/database';
import { payouts } from '../models/payout';
import { eq } from 'drizzle-orm';
// Get all payouts
export const getAllPayouts = async () => {
    return db.select().from(payouts);
};
// Get payouts by merchant
export const getPayoutsByMerchant = async (merchantId) => {
    return db.select().from(payouts).where(eq(payouts.merchantId, merchantId));
};
// Create payout
export const createPayout = async (data) => {
    return db.insert(payouts).values(data).returning();
};
//# sourceMappingURL=payout_repository.js.map