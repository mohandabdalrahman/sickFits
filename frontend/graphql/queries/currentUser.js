import { gql } from '@apollo/client';

export default gql`
query CURRENT_USER_QUERY{
  authenticatedItem {
 ...on User{
    id
    name
    email

  }
}
}

`