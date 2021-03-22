import { gql } from '@apollo/client';


export default gql`
mutation CREATE_ORDER($token:String!){
  checkout(token:$token){
    id
    charge
    total
    items{
      id
      name
    }
  }
}

`