import { useMutation } from '@apollo/client'
import SIGNOUT_MUTATION from '../graphql/mutations/signOut';
import CURRENT_USER_QUERY from '../graphql/queries/currentUser'

const SignOut = () => {
  const [signOut] = useMutation(SIGNOUT_MUTATION)

  return (
    <button type="button" onClick={() => {
      signOut({ refetchQueries: [{ query: CURRENT_USER_QUERY }] })
    }}>
      Sign Out
    </button>
  )
}

export default SignOut
