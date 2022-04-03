import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather'


const Country = ({country}) => {
    if (country.name) {
        const capital = country.capital[0]
        
        return (
            <div>
            <h2>{country.name.common}</h2>
            <p>capital {capital}<br/>
            area {country.area}</p>
            <h3>languages:</h3>
            <Languages languages = {country.languages} />
            <Flag flagURL = {country.flags.png} />
            <h3>Weather in {capital}</h3>
            <Weather city = {capital} />
            </div>
        )
    }
    return (<></>)
}

export default Country;