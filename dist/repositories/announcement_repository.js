// Announcement queries using Drizzle
import { db } from '../config/database';
import { announcements } from '../models/announcement';
import { eq } from 'drizzle-orm';
// Get all announcements
export const getAllAnnouncements = async () => {
    return db.select().from(announcements);
};
// Create announcement
export const createAnnouncement = async (data) => {
    return db.insert(announcements).values(data).returning();
};
// Delete announcement
export const deleteAnnouncement = async (id) => {
    return db.delete(announcements).where(eq(announcements.id, id));
};
//# sourceMappingURL=announcement_repository.js.map