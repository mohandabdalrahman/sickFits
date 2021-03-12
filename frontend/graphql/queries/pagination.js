import { gql } from '@apollo/client';

export default gql`
query PAGINATION_QUERY{
_allProductsMeta {
    count
  }
}

`