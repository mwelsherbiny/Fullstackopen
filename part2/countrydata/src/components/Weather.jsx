const Weather = ({weather}) => {
    if (weather == null) return null
    return (
        <>
            <p key={weather.id}>
                temperature {weather.main.temp} Celsius
            </p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>
                wind {weather.wind.speed} m/s
            </p>
        </>
        
    )
}

export default Weather