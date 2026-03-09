import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth/index";

export default toNodeHandler(auth.handler);