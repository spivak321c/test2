import { categories } from '../models/category';
export declare class CategoryRepository {
    create(data: Omit<typeof categories.$inferInsert, 'createdAt'>): Promise<typeof categories.$inferSelect>;
    findById(id: string): Promise<typeof categories.$inferSelect | null>;
    findAll(): Promise<(typeof categories.$inferSelect)[]>;
    findChildren(parentId: string): Promise<(typeof categories.$inferSelect)[]>;
    findParentPath(id: string): Promise<string[]>;
    update(id: string, data: Partial<typeof categories.$inferInsert>): Promise<typeof categories.$inferSelect | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=category_repository.d.ts.map