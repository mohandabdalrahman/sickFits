const calcTotalPrice = (carts) => {
  return carts.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price
  }, 0)
}
export default calcTotalPrice