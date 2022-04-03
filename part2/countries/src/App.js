import axios from 'axios';
import { useEffect, useState } from 'react';
import FindCountry from './components/FindCountry'
import ListCountries from './components/ListCountries'
import Country from './components/Country'

const App = () => {
  const COUNTRIES_URL = 'https://restcountries.com/v3.1/all'
  
  const [countries, setCountries] = useState([])
  const getCountries = () => axios.get(COUNTRIES_URL).then(response => setCountries(response.data))
  useEffect(() => {
    getCountries()
    return () => {}
  }, [])
  
  const [query, setQuery] = useState('')
  const handleCountryInput = (event) => setQuery(event.target.value)
  const handleShowCountry = (name) => setQuery(name)
  
  const filterRegEx = new RegExp(query, 'i')
  const filteredCountries = query.length > 0 ? countries.filter((c) => c.name.common.match(filterRegEx)) : countries
  
  const [country, setCountry] = useState({})
  const selectCountry = () => {
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else {
      setCountry('')
    }
  }
  useEffect(selectCountry, [filteredCountries])
  

  return (
  <div>
    <FindCountry query = {query} handleCountryInput = {handleCountryInput} />
    <ListCountries countries = {filteredCountries} handleShowCountry = {handleShowCountry} />
    <Country country = {country} />
  </div>    
  );
}

export default App;
