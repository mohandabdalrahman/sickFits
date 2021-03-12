import { useMutation } from '@apollo/client';
import DELETE_PRODUCT from '../graphql/mutations/deleteProduct'

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT)
  return (
    <button disabled={loading} type="button" onClick={() => {
      if (confirm('Are you sure you want to delete this product?')) {
        // go ahead and delete
        deleteProduct({
          variables: { id },
          update
        }).catch(err => alert(err.message))
      }
    }}>
      {children}
    </button>
  )
}

export default DeleteProduct
