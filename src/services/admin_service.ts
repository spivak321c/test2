import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { admins } from '../models/admins';
import { eq } from 'drizzle-orm';
import { config } from '../config/index';

interface AdminLoginPayload {
  id: string;
  role: string;
  email: string;
  username: string;
}

export const adminLogin = async (email: string, password: string) => {
  // Fetch admin by email
  const [admin] = await db.select().from(admins).where(eq(admins.email, email));
  if (!admin) {
    throw new Error('Invalid email or password');
  }

  // Validate password
  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT
  const payload: AdminLoginPayload = {
    id: admin.id,
    role: admin.role,
    email: admin.email,
    username: admin.username,
  };
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

  return {
    token,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
};