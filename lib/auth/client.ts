import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // Si la variable no carga, usamos la URL actual del navegador por seguridad
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
});