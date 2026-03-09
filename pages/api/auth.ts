import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth/index";

const handler = toNodeHandler(auth.handler);

export default handler; 

// Importante: No uses export const, debe ser export default