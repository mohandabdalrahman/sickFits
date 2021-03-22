import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import SickButton from './styles/SickButton'
import { useState } from 'react'
import nProgress from 'nprogress'
const CheckoutFormStyles = styled.form`
box-shadow:0 1px 2px 2px rgba(0,0,0,0.04);
border:1px solid rgba(0,0,0,0.06);
border-radius:5px;
padding:1rem;
display:grid;
grid-gap:1rem
`

const stripLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const CheckoutForm = () => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true)
    // start page transition
    nProgress.start()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    console.log('🚀 ~ file: Checkout.jsx ~ line 30 ~ handleSubmit ~ paymentMethod', paymentMethod)

    if (error) {
      setError(error)
    }

    setLoading(false)
    nProgress.done()
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <CardElement />
      <SickButton>Checkout Out Now</SickButton>
    </CheckoutFormStyles>
  )
}

const Checkout = () => {
  return (
    <Elements stripe={stripLib}>
      <CheckoutForm />
    </Elements>
  )
}


export default Checkout
