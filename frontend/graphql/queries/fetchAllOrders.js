import { gql } from '@apollo/client';

export default gql`
query FETCH_ALL_ORDERS{
  orders:allOrders{
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