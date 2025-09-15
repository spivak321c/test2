import { eq, desc } from 'drizzle-orm';
import { categories } from '../models/category';
import { db } from '../config/database'; // Centralized DB
export class CategoryRepository {
    async create(data) {
        const [newCat] = await db.insert(categories).values({ ...data, createdAt: new Date() }).returning();
        return newCat;
    }
    async findById(id) {
        const [cat] = await db.select().from(categories).where(eq(categories.id, id));
        return cat || null;
    }
    async findAll() {
        return db.select().from(categories).orderBy(desc(categories.createdAt));
    }
    async findChildren(parentId) {
        return db.select().from(categories).where(eq(categories.parentId, parentId));
    }
    async findParentPath(id) {
        const path = [];
        let current = id;
        while (current) {
            const [cat] = await db.select({ parentId: categories.parentId }).from(categories).where(eq(categories.id, current));
            if (!cat)
                break;
            path.push(current);
            current = cat.parentId || '';
        }
        return path;
    }
    async update(id, data) {
        const [updated] = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
        return updated || null;
    }
    async delete(id) {
        await db.delete(categories).where(eq(categories.id, id));
    }
}
//# sourceMappingURL=category_repository.js.map