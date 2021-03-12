import { useQuery, useMutation } from '@apollo/client'
import DisplayError from './ErrorMessage'
import FETCH_PRODUCT from '../graphql/queries/fetchProduct'
import UPDATE_PRODUCT_MUTATION from '../graphql/mutations/updateProduct'
import Form from './styles/Form'
import useForm from '../lib/useForm'

const UpdateProduct = ({ id }) => {
  const { loading, error, data } = useQuery(FETCH_PRODUCT, { variables: { id } })
  const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION)

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />
  const { inputs, handleChange, clearForm } = useForm(data?.Product)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct({ variables: { id, name: inputs.name, description: inputs.description, price: inputs.price } })
    clearForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
        <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label htmlFor="description">
          Description
        <textarea
            id="description"
            placeholder="description"
            name="description"
            value={inputs.description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </label>

        <label htmlFor="price">
          Price
        <input
            type="number"
            id="price"
            min="1"
            placeholder="price"
            name="price"
            value={inputs.price}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button>Update Product</button>
      </fieldset>
    </Form>
  )
}

export default UpdateProduct
