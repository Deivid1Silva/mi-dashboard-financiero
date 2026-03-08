import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

/**
 * @swagger
 * /api/movements:
 * get:
 * summary: Obtener todos los movimientos del usuario actual
 * tags: [Movements]
 * responses:
 * 200:
 * description: Lista de movimientos devuelta con éxito
 * 401:
 * description: No autorizado
 * post:
 * summary: Crear un nuevo movimiento (Ingreso/Egreso)
 * tags: [Movements]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * concept:
 * type: string
 * amount:
 * type: number
 * type:
 * type: string
 * enum: [INCOME, EXPENSE]
 * responses:
 * 201:
 * description: Movimiento creado
 * 500:
 * description: Error de servidor
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res
      .status(401)
      .json({ error: 'No autorizado: Inicia sesión de nuevo' });
  }

  if (req.method === 'GET') {
    try {
      const movements = await prisma.movement.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
      });
      return res.status(200).json({ data: movements });
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
  }

  if (req.method === 'POST') {
    const { concept, amount, type } = req.body;
    try {
      const movement = await prisma.movement.create({
        data: {
          concept,
          amount: parseFloat(amount),
          type,
          userId: session.user.id,
        },
      });
      return res.status(201).json({ data: movement });
    } catch (e) {
      return res.status(500).json({ error: 'Error al guardar movimiento' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
