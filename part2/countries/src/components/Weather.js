import { useState, useEffect } from "react"
import axios from 'axios'

const Weather = ({city}) => {
    const [weather, setWeather] = useState({})
    const API_KEY = process.env.REACT_APP_API_KEY
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const getWeather = () => axios.get(WEATHER_API_URL).then(response => setWeather(response.data))
    useEffect(() => {
        getWeather()
        return () => {}
    }, [city])
    if (Object.keys(weather).length){
        const weather_icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return (
            <>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src = {weather_icon_url} />
            <p>wind {weather.wind.speed} m/s</p>
            </>
        )
    } else {
        
        return (<></>)
    }
}

export default Weather

