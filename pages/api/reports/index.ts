import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

/**
 * @swagger
 * /api/reports:
 * get:
 * summary: Obtener resumen de movimientos y saldo total (Solo ADMIN)
 * tags: [Reports]
 * parameters:
 * - in: header
 * name: x-user-role
 * required: true
 * schema:
 * type: string
 * description: Rol del usuario (debe ser ADMIN)
 * responses:
 * 200:
 * description: Datos del reporte generados
 * 403:
 * description: No autorizado
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userRole = req.headers["x-user-role"];
  if (!userRole || userRole !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const movements = await prisma.movement.findMany({
        include: { user: true },
        orderBy: { date: "desc" },
      });

      const balance = movements.reduce(
        (acc, m) => (m.type === "INCOME" ? acc + m.amount : acc - m.amount),
        0
      );

      return res.status(200).json({ movements, balance });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}