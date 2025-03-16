export const formatCurrency = (amount) => Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
}).format(amount);


export function percentageFormatter(num) {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(getDecimalNumber(num));
}

export function getDecimalNumber(num){
  return num / 100
}