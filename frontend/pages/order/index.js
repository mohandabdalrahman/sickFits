import { useQuery } from '@apollo/client'
import FETCH_ORDER from '../../graphql/queries/fetchOrder';
import ErrorMessage from '../../components/ErrorMessage'
import OrderStyles from '../../components/styles/OrderStyles'
import Head from 'next/head'
import formatMoney from '../../lib/formatMoney'

const OrderPage = ({ query: { id } }) => {
  const { data, loading, error } = useQuery(FETCH_ORDER, { variables: { id } })
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>
  const { order } = data
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>ItemCount:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty:{item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  )
}

export default OrderPage
