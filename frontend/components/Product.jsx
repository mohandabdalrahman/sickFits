import ItemStyles from './styles/ItemStyles'
import TitleStyles from './styles/TitleStyles'
import PriceTag from './styles/PriceTag'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import DeleteProduct from './DeleteProduct'
import AddToCart from './AddToCart'
const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link href={{
          pathname: '/update',
          query: {
            id: product.id
          }
        }}>Edit</Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  )
}

export default Product
