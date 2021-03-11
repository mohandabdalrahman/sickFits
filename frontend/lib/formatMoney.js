const formatMoney = (amount = 0) => {
  const formatter = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: (amount % 100 === 0) ? 0 : 2
  })

  return formatter.format(amount / 100)
}

export default formatMoney

