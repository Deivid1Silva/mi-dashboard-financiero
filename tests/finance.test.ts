import { calculateBalance } from '../lib/finance-utils';

describe('Pruebas de Lógica Financiera - Mestizo Cacao', () => {
  
  test('Calcula el balance correctamente con ingresos y egresos', () => {
    const movements = [
      { amount: 1000, type: 'INCOME' },
      { amount: 400, type: 'EXPENSE' }
    ];
    expect(calculateBalance(movements)).toBe(600);
  });

  test('Maneja balance en cero cuando no hay movimientos', () => {
    expect(calculateBalance([])).toBe(0);
  });

  test('Maneja balance negativo si los egresos superan ingresos', () => {
    const movements = [{ amount: 500, type: 'EXPENSE' }];
    expect(calculateBalance(movements)).toBe(-500);
  });

});