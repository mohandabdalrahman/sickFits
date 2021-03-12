import { gql } from '@apollo/client';

export default gql`
mutation DELETE_PRODUCT($id:ID!){
  deleteProduct(id:$id){
   id
   name
  }
}

`