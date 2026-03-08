import swaggerJsdoc from 'swagger-jsdoc';
import type { NextApiRequest, NextApiResponse } from 'next';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mestizo Cacao API 🍫',
      version: '1.0.0',
      description: 'Documentación oficial para la gestión del taller.',
    },
    servers: [
      { 
        // Esto detecta si estás en local o en Vercel automáticamente
        url: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000' 
      }
    ],
    paths: {
      '/api/movements': {
        get: {
          tags: ['Movements'],
          summary: 'Obtener movimientos',
          responses: { 200: { description: 'Éxito' } },
        },
        post: {
          tags: ['Movements'],
          summary: 'Crear movimiento',
          responses: { 201: { description: 'Creado' } },
        },
      },
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Listar usuarios',
          responses: { 200: { description: 'Éxito' } },
        },
      },
    },
  },
  apis: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const spec = swaggerJsdoc(options);
    res.status(200).json(spec);
  } catch (error) {
    res.status(500).json({ error: 'Error en generación de Docs' });
  }
}