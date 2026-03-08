const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Maneja alias de rutas (si usas @/...)
    '^@/(.*)$': '<rootDir>/$1',
  },
  preset: 'ts-jest',
}

module.exports = createJestConfig(customJestConfig)