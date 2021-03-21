import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import CloseButton from './styles/CloseButton'
import Supreme from './styles/Supreme'
import { useUser } from './User'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useCart } from '../lib/cartState'
const Cart = () => {
  const me = useUser()
  const { cartOpen, closeCart } = useCart()
  if (!me) return null
  const carts = []
  carts.push(me.cart)
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name} s' cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {carts.length > 1 && carts.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
      </ul>
      <footer>
        <p>{carts.length > 1 && formatMoney(calcTotalPrice(carts))}</p>
      </footer>
    </CartStyles>
  )

}

export default Cart
