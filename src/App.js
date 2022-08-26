import React, {useState} from "react"
import axios from "axios"
import {
  cloudy,
  rain,
  storm,
  sunny,
  snow
} from "../src/assets/images-links"
;


function App() {

  const [data, setData] = useState("")
  const [location, setLocation] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [weatherImg, setWeatherImg] = useState()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=da00c31caf70c57f2005fc85632d2b2b`


  const searchLocation = (event) => {
    if(event.key === "Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(data)
      })
      
      setLocation("")
    }
  }

  React.useEffect(()=>{
    data.main && setWeatherData({
      temp:  Math.round(data.main.temp),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      visibility: (data.visibility) / 1000,
      cloud: data.clouds.all,
      skyDesc: data.weather[0].description,
      skyDescMain: data.weather[0].main
    })

    setWeatherImg("")
  

  },[data])

  React.useEffect(()=>{
    function weatherImgFunc(){
      if(weatherData.skyDescMain === "Clear"){
        return sunny
      } else if(weatherData.skyDescMain === "Rain"){
        return rain
      }else if(weatherData.skyDescMain === "Thunderstorm"){
        return storm
      }else if(weatherData.skyDescMain === "Clouds"){
        return cloudy
      }else if(weatherData.skyDescMain === "Snow"){
        return snow
      }
    }
    setWeatherImg(weatherImgFunc)
  },[weatherImg])
  

  console.log(weatherData)
  console.log(weatherImg)

 
  return (
    <div className="App">
      <div className="main-wrapper">
        
      <div className="input-weather">
        <input
          type="text" 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
          />
      </div>

        <h1 className="city-title">{data.name}</h1>

        <div>
          <img src={weatherImg} alt="" />
        </div>

        <h1 className="temp-title">{weatherData.temp}°</h1>

        <h3>{weatherData.skyDesc}</h3>

        <div className="min-max-temp">
          <h4>Max: {weatherData.tempMax}°</h4>
          <h4>Min: {weatherData.tempMin}°</h4>
        </div>

        <div className="weather-details">
          <h3 className="card-wrapper-title">Weather Details</h3>
          <div className="card-wrapper">
            <div className="card">
              <h4>Feels like</h4>
              <h2>{weatherData.feelsLike}°</h2>
            </div>

            <div className="card">
              <h4>Humidity</h4>
              <h2>{weatherData.humidity}%</h2>
            </div>

            <div className="card">
              <h4>Clouds</h4>
              <h2>{weatherData.cloud}%</h2>
            </div>

            <div className="card">
              <h4>Wind</h4>
              <h2>{weatherData.windSpeed}m/s</h2>
            </div>

            <div className="card">
              <h4>Visibility</h4>
              <h2>{weatherData.visibility}km</h2>
            </div>

            <div className="card">
              <h4>Pressure</h4>
              <h2>{weatherData.pressure}hPa</h2>
            </div>

          </div>

          
        </div>
      </div>
    </div>
  );
  
}

export default App;
