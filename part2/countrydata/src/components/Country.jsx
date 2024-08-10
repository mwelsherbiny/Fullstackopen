import axios from 'axios'
import { useEffect, useState } from 'react'
import Weather from './Weather'
const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)

    const languages = Object.values(country.languages)

    useEffect (() => {
        axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${api_key}`)
        .then(response => response.data)
        .then(data => {
            const lat = data[0].lat
            const lon = data[0].lon
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        })
        .then(response => response.data)
        .then(data => setWeather(data))
    }, [])

    return (
        <>
            <h1>{country.name.common}</h1>
            <p ket={country.capital}>
                capital {country.capital}
                <br></br>
                area {country.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width={150}></img>
            <Weather weather={weather} /> 
        </>
    )
}

export default Country