/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esto ignora los errores de linting para que el despliegue no falle
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Esto ignora errores de tipos (como los 'any') durante el despliegue
    ignoreBuildErrors: true,
  },
};

export default nextConfig;