import { gql } from '@apollo/client';

export default gql`
query ALL_PRODUCTS_QUERY($skip:Int=0,$first:Int) {
  allProducts(skip:$skip,first:$first){
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