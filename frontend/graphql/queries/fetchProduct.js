import { gql } from '@apollo/client'

export default gql`
query FETCH_PRODUCT($id:ID!){
  Product(where:{
    id:$id
  }){
    id
    name
    price
    description
    photo{
      image{
        publicUrlTransformed
      }
    }
  }
}
`