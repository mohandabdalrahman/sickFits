import { gql } from '@apollo/client';

export default gql`
mutation DELETE_CART_ITEM($id:ID!){
deleteCartItem(id:$id){
  id
}
}

`