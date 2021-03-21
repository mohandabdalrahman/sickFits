import styled from 'styled-components'
import formatMoney from '../lib/formatMoney';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser'
import DELETE_CART_ITEM from '../graphql/mutations/deleteCart'
import { useMutation } from '@apollo/client'
const CartItemStyles = styled.li`
padding:1rem 0;
border-bottom:1px solid var(--lightGrey);
display:grid;
grid-template-columns:auto 1fr auto;
img{
  margin-right:1rem;
}
h3,p{
  margin:0
}
`

const BigButtonStyles = styled.button`
font-size:3rem;
background:none;
cursor: pointer;
border:0;
&:hover{
  color:var(--red)
}
`
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCart));
}

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  const [deleteCart, { loading }] = useMutation(DELETE_CART_ITEM, { variables: { id: cartItem.id }, update })

  return (
    <CartItemStyles>
      <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} {" "}
          -
          {" "}
          <em>{cartItem.quantity} &times; {formatMoney(product.price)}</em> each
        </p>
      </div>
      <BigButtonStyles disabled={loading} onClick={deleteCart}>&times;</BigButtonStyles>
    </CartItemStyles>
  )
}

export default CartItem
