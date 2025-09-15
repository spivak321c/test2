import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { admins } from '../models/admins';
import { eq } from 'drizzle-orm';
import { config } from '../config/index';
export const adminLogin = async (email, password) => {
    // Fetch admin by email
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    if (!admin) {
        throw new Error('Invalid email ');
    }
    // Validate password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    // Generate JWT
    const payload = {
        id: admin.id,
        role: admin.role,
        email: admin.email,
        username: admin.username,
    };
    const options = { expiresIn: config.jwt.expiresIn };
    const token = jwt.sign(payload, config.jwt.secret, options);
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
//# sourceMappingURL=admin_service.js.map