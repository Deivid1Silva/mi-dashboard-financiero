import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth.api.getSession({ headers: req.headers });

  // Protección: Solo administradores pueden ver la lista
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'No autorizado' });
  }

  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}