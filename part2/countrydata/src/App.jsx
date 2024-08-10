import { useEffect, useState } from 'react'
import Form from './components/Form'
import Countries from './components/Countries'
import axios, { all } from 'axios'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [newCountry, setCountry] = useState(null)
  const [displayedCountries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => response.data)
    .then(countries => setAllCountries(countries))
  }, [])

  const changeHandler = (e) => {
    const currentCountry = e.target.value.toLowerCase()
    const matchingCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(currentCountry))
    setCountries(matchingCountries)
    setCountry(currentCountry)
  }

  return (
    <div>
      <Form country={newCountry} changeHandler={changeHandler} />
      <Countries countries={displayedCountries} setCountries={setCountries} />
    </div>
  )
}

export default App
