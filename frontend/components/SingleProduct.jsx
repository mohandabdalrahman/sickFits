import { useQuery } from '@apollo/client'
import DisplayError from './ErrorMessage'
import FETCH_PRODUCT from '../graphql/queries/fetchProduct'
import Head from 'next/head'
import styled from 'styled-components'
const SingleProduct = ({ id }) => {
  const { loading, error, data } = useQuery(FETCH_PRODUCT, { variables: { id } })
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />
  const { Product } = data

  const ProductStyles = styled.div`
  display:grid;
  grid-auto-columns:1fr;
  grid-auto-flow:column;
  max-width: var(--maxWidth);
  justify-content:center;
  align-items: top;
  gap:2rem;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  `

  return (
    <ProductStyles>
      <Head>
        <title> Sick Fits | {Product.name}</title>
      </Head>
      <img src={Product.photo.image.publicUrlTransformed
      } alt={Product.name} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  )
}

export default SingleProduct
