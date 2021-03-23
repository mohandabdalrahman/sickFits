import { gql } from '@apollo/client';

export default gql`
query FETCH_ORDER($id:ID!){
  order:Order(where:{id:$id}){
    id
    total
    charge
    user{
      id
    }
    items{
      id
      name
      description
      price
      quantity
      photo{
        image{
          publicUrlTransformed
        }
      }
    }
  }
}

`