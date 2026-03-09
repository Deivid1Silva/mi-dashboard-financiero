import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // Asegúrate de que NEXT_PUBLIC_BETTER_AUTH_URL esté en Vercel
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
});