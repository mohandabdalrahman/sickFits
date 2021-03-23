import { useQuery } from '@apollo/client'
import FETCH_ALL_ORDERS from '../graphql/queries/fetchAllOrders'
import ErrorMessage from '../components/ErrorMessage'
import styled from 'styled-components';
import Link from 'next/link'
import OrderItemStyles from '../components/styles/OrderItemStyles'
import Head from 'next/head'
import formatMoney from '../lib/formatMoney';

const OrdersPage = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_ORDERS)
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>
  const { orders } = data

  const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

  function countItemsInAnOrder(order) {
    return order.items.reduce((tally, item) => tally + item.quantity, 0);
  }

  return (
    <div>
      <Head>
        <title>Your Orders ({orders.length})</title>
      </Head>
      <h2>You have {orders.length} orders!</h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order?id=${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInAnOrder(order)} Items</p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>Total: {formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}

export default OrdersPage
