import { auth } from "@/lib/auth";

// La forma correcta de extraer los tipos en Better Auth v1
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;