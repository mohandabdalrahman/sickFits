import { useQuery } from '@apollo/client'
import ALL_PRODUCTS_QUERY from '../graphql/queries/fetchProducts'
import styled from 'styled-components'
import Product from './Product.jsx'
import { perPage } from '../config'

const ProductsListStyles = styled.div`
display:grid;
grid-template-columns:1fr 1fr;
grid-gap:60px
`

const Products = ({ page }) => {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: (page * perPage) - perPage,
      first: perPage
    }
  })
  console.log('🚀 ~ file: Products.jsx ~ line 6 ~ Products ~ data', data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message} </p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map(product => <Product key={product.id} product={product} />)}
      </ProductsListStyles>
    </div>
  )
}

export default Products
