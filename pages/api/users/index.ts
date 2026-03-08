import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Obtener lista de usuarios
 * tags: [Users]
 * responses:
 * 200:
 * description: Lista de usuarios
 * post:
 * summary: Crear usuario
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * role:
 * type: string
 * responses:
 * 201:
 * description: Usuario creado
 * patch:
 * summary: Actualizar rol de usuario
 * tags: [Users]
 * responses:
 * 200:
 * description: Usuario actualizado
 * delete:
 * summary: Eliminar usuario
 * tags: [Users]
 * responses:
 * 200:
 * description: Usuario eliminado
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ... resto de tu lógica de Prisma ...
  try {
    switch (req.method) {
      case 'GET':
        const users = await prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({ data: users });
      case 'POST':
        const { name, email, role } = req.body;
        const newUser = await prisma.user.create({
          data: { name, email, role: role || 'ADMIN', updatedAt: new Date() },
        });
        return res.status(201).json({ data: newUser });
      case 'PATCH':
        const { id, role: newRole } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id },
          data: { role: newRole, updatedAt: new Date() },
        });
        return res.status(200).json({ data: updatedUser });
      case 'DELETE':
        const userId = req.query.id as string;
        await prisma.user.delete({ where: { id: userId } });
        return res.status(200).json({ message: 'Usuario eliminado' });
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        return res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Error con Prisma' });
  }
}
