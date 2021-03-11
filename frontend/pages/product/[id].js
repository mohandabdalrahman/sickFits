import SingleProduct from '../../components/SingleProduct'
const SingleProductPage = ({ query: { id } }) => {
  return (
    <SingleProduct id={id} />
  )
}

export default SingleProductPage
