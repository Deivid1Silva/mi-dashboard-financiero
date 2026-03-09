import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // Esto detecta automáticamente si estás en localhost, en una preview o en producción
  baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});