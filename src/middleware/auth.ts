// Authentication middleware with MFA for admins
import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { users } from "../models/merchant"; // Assuming users in merchant schema

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
