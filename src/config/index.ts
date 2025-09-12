// // Placeholder config (original has none; add env vars if needed)
// export const config = {
//     env: process.env.NODE_ENV || 'development',
//     port: process.env.PORT || 5000,
//     // Add DB config if switching from in-memory
//   };


// Placeholder config (original has none; add env vars if needed)




// import dotenv from 'dotenv';

// dotenv.config();  // Load env vars early

// const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"];
// for (const env of requiredEnv) {
//   if (!process.env[env]) {
//     throw new Error(`Missing environment variable: ${env}`);
//   }
// }

// export const config = {
//   env: process.env.NODE_ENV || 'development',
//   port: process.env.PORT || 8080,
//   // Add DB config if switching from in-memory
// };

// console.log('Loaded PORT:', process.env.PORT); // Debug






import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["DATABASE_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "JWT_SECRET"]

for (const env of requiredEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`)
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "5000"),
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "24h",
  },
  // stripe: {
  //   secretKey: process.env.STRIPE_SECRET_KEY,
  //   webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  // },
  smtp: {
    host: process.env.SMTP_HOST!,
    port: Number.parseInt(process.env.SMTP_PORT!),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    from: process.env.SMTP_FROM!,
    secure: process.env.SMTP_SECURE === "true",
  },
}
