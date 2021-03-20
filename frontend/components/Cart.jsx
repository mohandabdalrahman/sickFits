import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import { useUser } from './User'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
const Cart = () => {
  const me = useUser()
  if (!me) return null
  const carts = []
  carts.push(me.cart)
  console.log('🚀 ~ file: Cart.jsx ~ line 5 ~ Cart ~ me', me)
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name} s' cart</Supreme>
      </header>
      <ul>
        {carts.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(carts))}</p>
      </footer>
    </CartStyles>
  )
}

export default Cart
