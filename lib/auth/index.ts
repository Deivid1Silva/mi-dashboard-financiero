import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // Esto permite que las URLs de previsualización de Vercel funcionen
  trustedOrigins: [
    process.env.BETTER_AUTH_URL as string,
    "https://mi-dashboard-financiero-cmw5c3tgq-deivid1silvas-projects.vercel.app" 
  ],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'ADMIN',
      },
      phone: {
        type: 'string',
        required: false,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});