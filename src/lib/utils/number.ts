
export function numberToCurrency(number: number, currency: string): string {
  return number.toLocaleString('es-MX', { style: 'currency', currency })
}