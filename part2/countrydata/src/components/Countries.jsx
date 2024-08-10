import Country from './Country'

const Countries = ({countries, setCountries}) => {
    if (countries.length > 10)
    {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )
    }

    if (countries.length === 1)
    {
        return <Country country={countries[0]} />
    }

    return (
        <>
            <pre>
                {countries.map(country => {
                    return (
                        <div key={country.name.common}>
                            <span>{country.name.common} </span> 
                            <button onClick={() => setCountries([country])}>show</button>
                        </div>
                    )
                })}
            </pre>
        </>
    )
}

export default Countries