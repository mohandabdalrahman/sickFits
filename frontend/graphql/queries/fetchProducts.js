import { gql } from '@apollo/client';

export default gql`
query ALL_PRODUCTS_QUERY {
  allProducts{
    id
    name
    description
    price
    photo{
      id
      image{
        publicUrlTransformed
      }
    }
  }
}
`