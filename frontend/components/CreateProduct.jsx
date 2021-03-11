import useForm from '../lib/useForm'
import Form from '../components/styles/Form'
import { useMutation } from '@apollo/client'
import CREATE_PRODUCT_MUTATION from '../graphql/mutations/createProduct'
import DisplayError from './ErrorMessage'
import ALL_PRODUCTS_QUERY from '../graphql/queries/fetchProducts'
import Router from 'next/router'

const CreateProduct = () => {
  const { inputs, handleChange, clearForm } = useForm({ name: '', description: '', price: '', image: '' })
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await createProduct({ variables: inputs, refetchQueries: [{ query: ALL_PRODUCTS_QUERY }] })
    clearForm()
    Router.push(`/product/${res?.data?.createProduct?.id}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
        <input
            required
            type="file"
            id="image"
            placeholder="image"
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </label>

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
        <button>+ Add Product</button>
      </fieldset>

    </Form>
  )
}

export default CreateProduct
