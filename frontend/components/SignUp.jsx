import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import { useMutation } from '@apollo/client'
import SIGNUP_MUTATION from '../graphql/mutations/signUp'
import CURRENT_USER_QUERY from '../graphql/queries/currentUser'

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({ name: '', email: '', password: '' })
  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp({
      variables: inputs,
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }).catch(console.error)
    resetForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (<p>Sign Up with {data.createUser.email} - Please Go a Head and Sign In</p>)}
        <label htmlFor="name">
          Name
        <input
            type="text"
            id="name"
            placeholder="name"
            name="name"
            value={inputs.name}
            onChange={(e) => handleChange(e)}
          />
        </label>

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
        <button>Sign Up</button>
      </fieldset>

    </Form>
  )
}

export default SignUp
