import { useState, useEffect } from 'react'
const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join("")

  useEffect(() => {
    setInputs(initial)
  }, [initialValues])

  const handleChange = (e) => {
    let { name, value, type } = e.target
    if (type === 'number') {
      value = +value
    }
    if (type === 'file') {
      value = e.target.files[0]
    }
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const clearForm = () => {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, _]) => [key, '']))
    setInputs(blankState)
  }

  const resetForm = () => {
    setInputs(initial)
  }

  return { inputs, handleChange, resetForm, clearForm }
}

export default useForm