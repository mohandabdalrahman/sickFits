import { gql } from '@apollo/client';

export default gql`
mutation CREATE_PRODUCT_MUTATION($name:String!,$description:String!,$image:Upload,$price:Int!) {
  createProduct(data:{
    name: $name,
    description: $description,
    price: $price,
    status: "AVAILABLE",
    photo:{
      create:{
        image: $image
        altText:$name
      }
    }


  }){
    id
    price
    description
  }
}

`