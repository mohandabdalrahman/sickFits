import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton'
import Supreme from './styles/Supreme'
import { useUser } from './User'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useCart } from '../lib/cartState'
import Checkout from './Checkout'
const Cart = () => {
  const me = useUser()
  const { cartOpen, closeCart } = useCart()
  if (!me) return null
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name} s' cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  )

}

export default Cart
