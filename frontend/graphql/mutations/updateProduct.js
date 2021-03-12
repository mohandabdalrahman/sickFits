import { gql } from '@apollo/client';

export default gql`
mutation UPDATE_PRODUCT_MUTATION($id:ID!,$name:String!,$description:String!,$price:Int!){
updateProduct(id:$id,data:{
    name: $name,
    description: $description,
    price: $price,
  }){
id
name
description
price
}
}

`