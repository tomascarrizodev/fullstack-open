import { useEffect, useState } from "react"

export const useCountry = () => {
  const [value, setValue] = useState()
  const [allCountries, setAllCountries] = useState([])
  const [allNames, setAllNames] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selected, setSelected] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onlyNames = [...allCountries].map(country => country.name.common.toLowerCase())
    setNames(onlyNames)
    setFiltered(onlyNames)
  }, [allCountries])
  useEffect(() => setFiltered(allNames.filter(country => country.includes(value))), [value])

  const setCountries = (countries) => setAllCountries(countries)
  const setNames = (names) => setAllNames(names)
  const onShow = (name) => {
    setSelected(...allCountries.filter(country => country.name.common.toLowerCase().includes(name)))
    setShow(true)
  }
  const onGoBack = () => {
    setSelected(null)
    setShow(false)
  }

  return {
    value,
    setValue,
    allCountries,
    setCountries,
    allNames,
    setNames,
    filtered,
    setFiltered,
    selected,
    setSelected,
    show,
    setShow,
    onShow,
    onGoBack
  }
}