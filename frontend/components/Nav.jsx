import Link from 'next/link'
import NavStyles from '../components/styles/NavStyles'
import { useCart } from '../lib/cartState'
import CartCount from './CartCount'
import SignOut from './SignOut'
import { useUser } from './User'
const Nav = () => {
  const user = useUser()
  console.log('🚀 ~ file: Nav.jsx ~ line 9 ~ Nav ~ user', user)
  const carts = []
  carts.push(user?.cart)
  const { openCart } = useCart()
  console.log('🚀 ~ file: Nav.jsx ~ line 17 ~ Nav ~ carts', carts)
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            {/* {carts.length  && <CartCount count={carts.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />} */}
          </button>
        </>
      ) : <Link href="/signin">Sign In</Link>
      }
    </NavStyles>
  )
}

export default Nav
