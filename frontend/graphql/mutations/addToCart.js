import { gql } from '@apollo/client';


export default gql`
mutation ADD_TO_CART($productId:ID!){
  addToCart(productId:$productId){
     id
  }
}
`