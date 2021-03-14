import Link from 'next/link'
import NavStyles from '../components/styles/NavStyles'
import SignOut from './SignOut'
import { useUser } from './User'
const Nav = () => {
  const user = useUser()
  console.log('🚀 ~ file: Nav.jsx ~ line 6 ~ Nav ~ user', user)
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      ) : <Link href="/signin">Sign In</Link>
      }
    </NavStyles>
  )
}

export default Nav
