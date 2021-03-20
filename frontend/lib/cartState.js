import { createContext, useContext, useState } from 'react';

const LocaleStateContext = createContext()
const LocaleStateProvider = LocaleStateContext.Provider

function CartStateProvider({ children }) {

  const [cartOpen, setCartOpen] = useState(false)

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const closeCart = () => {
    setCartOpen(false)
  }
  const openCart = () => {
    setCartOpen(true)
  }

  return <LocaleStateProvider value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}>{children}</LocaleStateProvider>

}

function useCart() {
  const all = useContext(LocaleStateContext)
  return all
}

export { CartStateProvider, useCart }