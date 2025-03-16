export const formatCurrency = (amount) => Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
}).format(amount);