/**
 * Calcula el saldo neto total basado en una lista de movimientos.
 * Los ingresos suman y los egresos restan.
 */
export const calculateBalance = (movements: { amount: number; type: string }[]): number => {
  return movements.reduce((acc, m) => {
    if (m.type === 'INCOME') return acc + m.amount;
    if (m.type === 'EXPENSE') return acc - m.amount;
    return acc;
  }, 0);
};