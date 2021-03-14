import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import { useMutation } from '@apollo/client'
import SIGNIN_MUTATION from '../graphql/mutations/signIn'
import CURRENT_USER_QUERY from '../graphql/queries/currentUser'

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '' })
  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn({
      variables: inputs,
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    })
    resetForm()
  }

  const error = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure' ? data?.authenticateUserWithPassword : undefined

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>

        <label htmlFor="email">
          Email
        <input
            type="email"
            id="email"
            placeholder="email"
            name="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label htmlFor="password">
          Password
        <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button>Sign In</button>
      </fieldset>

    </Form>
  )
}

export default SignIn
