import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

/**
 * @swagger
 * /api/reports/csv:
 * get:
 * summary: Descargar reporte en formato CSV (Solo ADMIN)
 * tags: [Reports]
 * responses:
 * 200:
 * description: Archivo CSV generado
 * content:
 * text/csv:
 * schema:
 * type: string
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

      const csv = [
        ["Concepto", "Monto", "Tipo", "Fecha", "Usuario"],
        ...movements.map((m) => [
          m.concept,
          m.amount,
          m.type,
          m.date,
          m.user?.name || "",
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=movimientos.csv");
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}