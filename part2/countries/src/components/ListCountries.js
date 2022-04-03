const ListCountries = ({countries, handleShowCountry}) => {
    if (countries.length <= 1) {
        return (
            <></>
        )
    }
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    return (
        <>
            <ul>
            {countries.map((c) => {
                const name = c.name.common
                return (
                    <li key = {name}>{name} <button onClick={() => handleShowCountry(name)}>show</button></li>)}
                )
            }
                
            </ul>
        </>
    )
}
export default ListCountries;