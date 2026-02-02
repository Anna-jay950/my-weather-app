import React from 'react'
import { useState } from 'react'


const Search = () => {
const [search, setSearch] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        const url =`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`
        const response = await fetch(url)


        try {
        const result = await response.json()
        const data = result.results[0]
        // console.log(data)

        const lat = data.latitude
        const long = data.longitude

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code`);
        const weatherData = await weatherRes.json();

        console.log(weatherData)
        
        }

        
        catch(err) {
           console.error(err.message)
        }   
        
        

    
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" 
            className="search-card" 
            placeholder='Enter your city...'
            // what is the value thing  
            value={search}  
            onChange={(e)=>{
                setSearch(e.target.value)
            }}  
        />
        <button type="submit" class="getlocation">GET WEATHER INFO</button>
    </form>
    </>

  )
      
    }

export default Search