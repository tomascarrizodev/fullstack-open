import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    setValue,
    onChange
  }
}
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    data()
  }, [])

  const create = async (resource) => {
    setResources([...resources, resource])
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}