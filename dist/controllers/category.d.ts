import { Request, Response } from 'express';
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               attributes:
 *                 type: object
 *                 example: { "color": "string", "size": "string" }
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 name:
 *                   type: string
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 attributes:
 *                   type: object
 *                   example: { "color": "string", "size": "string" }
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid category data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */
export declare const createCategory: (req: Request, res: Response) => Promise<void>;
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 */
export declare const getCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 123e4567-e89b-12d3-a456-426614174000
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   parentId:
 *                     type: string
 *                     format: uuid
 *                     nullable: true
 *                     example: null
 *                   attributes:
 *                     type: object
 *                     example: { "color": "string", "size": "string" }
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-09-13T11:00:00Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
export declare const getAllCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryTree: (req: Request, res: Response) => Promise<void>;
/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *               parentId:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: null
 *               attributes:
 *                 type: object
 *                 example: { "color": "string", "size": "string" }
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 name:
 *                   type: string
 *                   example: Updated Electronics
 *                 parentId:
 *                   type: string
 *                   format: uuid
 *                   nullable: true
 *                   example: null
 *                 attributes:
 *                   type: object
 *                   example: { "color": "string", "size": "string" }
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-13T11:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid category data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 */
export declare const updateCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCategory: (req: Request, res: Response) => Promise<void>;
export declare const addAttribute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=category.d.ts.map