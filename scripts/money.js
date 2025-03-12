export  function formatCurrency(amount){
    return Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
  })
  .format(amount);
    
  }