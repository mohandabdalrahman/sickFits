import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import { useMutation } from '@apollo/client'
import RESET_MUTATION from '../graphql/mutations/reset'

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '' })
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await reset({
      variables: { ...inputs, token },
    }).catch(console.error)
    resetForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (<p>Success! You can now sign in</p>)}
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

        <button>Request Reset</button>
      </fieldset>

    </Form>
  )
}

export default Reset
