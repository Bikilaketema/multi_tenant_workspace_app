// src/auth.config.ts
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { Pool } from 'pg';

// The betterAuth CLI will read process.env.DB_URL when running the 'migrate' command
const dbUrl = process.env.DB_URL; 

if (!dbUrl) {
    throw new Error("DB_URL environment variable is not set.");
}

export const auth = betterAuth({
  // 1. Configure the Database Pool using the DB_URL
  database: new Pool({
    connectionString: dbUrl,
  }),
  
  // 2. Enable Email + Password Auth
  emailAndPassword: { enabled: true },

  // 3. Integrate the Organization Plugin
  plugins: [
    organization({
      customRoles: [
        { role: 'Owner', label: 'Owner' },
        { role: 'Member', label: 'Member' },
      ],
      organizationHooks: {
        afterCreateOrganization: async ({ member }) => {
          await member.setRole('Owner'); 
        },
      }
    }),
  ],

  secret: process.env.AUTH_SECRET,
});

export type AuthInstance = typeof auth;