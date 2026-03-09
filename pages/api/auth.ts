import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth/index";
export default Object.assign(toNodeHandler(auth.handler), {
  config: { api: { bodyParser: false } }
});