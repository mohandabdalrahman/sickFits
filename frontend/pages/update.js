import Update from '../components/UpdateProduct'
const UpdatePage = ({ query }) => {
  return (
    <div>
      <Update id={query.id} />
    </div>
  )
}

export default UpdatePage
