import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import { useMutation } from '@apollo/client'
import RESET_PASSWORD_MUTATION from '../graphql/mutations/resetPassword'

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '' })
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword({
      variables: inputs,
    }).catch(console.error)
    resetForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (<p>Success! check your email for a link</p>)}
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

        <button>Request Reset</button>
      </fieldset>

    </Form>
  )
}

export default RequestReset
