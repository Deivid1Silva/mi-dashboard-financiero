import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth/index";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await toNodeHandler(auth.handler)(req, res);
};

export default handler;