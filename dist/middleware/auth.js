// Authentication middleware with MFA for admins
// import { Request, Response, NextFunction } from "express";
// import { db } from "../config/database";
// import { users } from "../models/merchant"; // Assuming users in merchant schema
/*
export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Authentication required" });

  // Validate token (simple for demo; use JWT in production)
  const token = authHeader.substring(7);
  if (token !== "admin-token-123")
    return res.status(401).json({ message: "Invalid token" });

  // Fetch admin user
  const admin = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, "admin"),
  });
  if (!admin || admin.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });

  // MFA check (placeholder; integrate real MFA)
  // if (!verifyMFA(token)) return res.status(401).json({ message: 'MFA required' });

  req.user = admin;
  next();
};
*/
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { admins } from '../models/admins.js';
import { eq } from 'drizzle-orm';
import { config } from '../config/index.js';
export const requireAdmin = async (req, res, next) => {
    // Extract authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Admin ')) {
        return res.status(401).json({ message: 'Authentication required: Use Admin <token>' });
    }
    // Extract and validate JWT
    const token = authHeader.substring(6); // 'Admin ' is 6 chars
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        // Fetch admin from DB to verify role (prevents tampering)
        const [admin] = await db.select().from(admins).where(eq(admins.id, decoded.id));
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        // Attach decoded payload to req.user
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email,
            username: decoded.username,
        };
        next();
    }
    catch (error) {
        console.error('Invalid token:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
//# sourceMappingURL=auth.js.map