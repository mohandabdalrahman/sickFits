import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import PAGINATION_QUERY from '../graphql/queries/pagination'
import { useQuery } from '@apollo/client'
import DisplayError from './ErrorMessage'
import { perPage } from '../config'
const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY)
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />
  const { count } = data._allProductsMeta
  const pageCount = Math.ceil(count / perPage)
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - page {page} of {count}</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1 ? 'true' : 'false'}> ⬅️ Prev</a>
      </Link>
      <p>Page {page} of {pageCount} </p>
      <p>{count} items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount ? 'true' : 'false'}>  ➡️ Next</a>
      </Link>
    </PaginationStyles>
  )
}

export default Pagination
