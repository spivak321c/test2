// // Placeholder config (original has none; add env vars if needed)
// export const config = {
//     env: process.env.NODE_ENV || 'development',
//     port: process.env.PORT || 5000,
//     // Add DB config if switching from in-memory
//   };


// Placeholder config (original has none; add env vars if needed)
import dotenv from 'dotenv';

dotenv.config();  // Load env vars early

const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"];
for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  // Add DB config if switching from in-memory
};

console.log('Loaded PORT:', process.env.PORT); // Debug