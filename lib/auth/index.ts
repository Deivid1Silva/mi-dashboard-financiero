import { betterAuth } from 'better-auth'; 
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // Definimos explícitamente el esquema para que el plugin de tipos lo detecte
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "ADMIN",
        input: false, // Evita que se pueda enviar desde el cliente en el registro
      },
      phone: {
        type: "string",
        required: false,
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // Esto asegura que la sesión devuelva el rol al frontend
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    }
  }
});