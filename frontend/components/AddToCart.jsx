import { useMutation } from '@apollo/client'
import ADD_TO_CART from '../graphql/mutations/addToCart'
import CURRENT_USER_QUERY from '../graphql/queries/currentUser'

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: { productId: id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  )
}

export default AddToCart
