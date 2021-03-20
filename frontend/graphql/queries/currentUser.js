import { gql } from '@apollo/client';

export default gql`
query CURRENT_USER_QUERY{
  authenticatedItem {
 ...on User{
    id
    name
    email
    cart{
      id
      quantity
      product{
        id
        price
        name
        description
        photo{
          image{
            publicUrlTransformed
          }
        }
      }
    }

  }
}
}

`