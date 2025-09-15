interface Category {
    id: string;
    name: string;
    parentId: string | null;
    attributes: Record<string, any> | null;
    createdAt: Date | null;
}
interface CategoryTree extends Category {
    children?: CategoryTree[];
}
export declare class CategoryService {
    private repo;
    constructor();
    createCategory(data: unknown): Promise<Category>;
    getCategoryById(id: string): Promise<Category | null>;
    getAllCategories(): Promise<Category[]>;
    getCategoryTree(): Promise<CategoryTree[]>;
    updateCategory(id: string, data: unknown): Promise<Category | null>;
    deleteCategory(id: string): Promise<void>;
    private checkCycle;
    addAttribute(id: string, key: string, value: any): Promise<Category | null>;
    private mapToCategory;
}
export {};
//# sourceMappingURL=category_service.d.ts.map