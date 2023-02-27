import React, { useEffect, useState } from "react";
import axios from "axios"
import "./Weather.css";
function Weather() {
  const [city, setCity] = useState("");
  const [detail, setDetail] = useState({
    "coord": {
        "lon": 0,
        "lat": 0
    },
    "weather": [
        {
            "id": 0,
            "main": "",
            "description": "",
            "icon": ""
        }
    ],
    "base": "",
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "humidity": 0,
        "sea_level":0,
        "grnd_level":0
    },
    "visibility": 0,
    "wind": {
        "speed": 0,
        "deg": 0
    },
    "clouds": {
        "all": 0
    },
    "dt": 0,
    "sys": {
        "type": 0,
        "id": 0,
        "country": "",
        "sunrise": 0,
        "sunset": 0
    },
    "timezone": 0,
    "id": 0,
    "name": "",
    "cod": 0
});
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ee8e91674e6e3ec1c8700e98c184851`;
  //https://api.openweathermap.org/data/2.5/weather?q=coimbatore&appid=3ee8e91674e6e3ec1c8700e98c184851
  useEffect(() => {
        console.log(searchResult);
  }, [searchResult]);
function handleSubmit(){
    axios.get(url)
        .then(res=>{
            setDetail(res.data)
            setCity("")
            if(detail.name !== undefined && detail.name !== ""){
                if(!searchResult.includes(detail.name)){
                setSearchResult([...searchResult,detail.name]);
                }
            }
        })
         
        .catch(e=>setError(true))
       
        console.log(searchResult);
}
function handleClear(){
    setDetail({
        "coord": {
            "lon": 0,
            "lat": 0
        },
        "weather": [
            {
                "id": 0,
                "main": "",
                "description": "",
                "icon": ""
            }
        ],
        "base": "",
        "main": {
            "temp": 0,
            "feels_like": 0,
            "temp_min": 0,
            "temp_max": 0,
            "pressure": 0,
            "humidity": 0,
            "sea_level":0,
            "grnd_level":0
        },
        "visibility": 0,
        "wind": {
            "speed": 0,
            "deg": 0
        },
        "clouds": {
            "all": 0
        },
        "dt": 0,
        "sys": {
            "type": 0,
            "id": 0,
            "country": "",
            "sunrise": 0,
            "sunset": 0
        },
        "timezone": 0,
        "id": 0,
        "name": "",
        "cod": 0
    })
}
  return (
    <div className="container">
      <div className="weather-box">
        <h1>Weather App</h1>
        <input
          className="search-bar"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          type="text"
          placeholder="Enter the City Name"
        />
        <button className="search-btn" onClick={()=>handleSubmit()}>search</button>
       {searchResult.length > 0 && city === "" ? <>
        <ul>    {searchResult.map((data,index)=>{
                return <li>{data}</li>
            })}
            </ul>
        </> : <>
            
        {!error?<>
            {detail.name !== "" &&  <div className="citylist">
        <span>Weather details of city : {detail.name}</span>
        <span>Current Temperature : {detail.main.temp}</span>
        <span>
          Temperature Range : {detail.main.temp_min} to{" "}
          {detail.main.temp_max}
        </span>
        <span>Humidity : {detail.main.humidity}</span>
        <span>
          Sea Level :{" "}
          {detail.main.sea_level ? (
            <>{detail.main.sea_level}</>
          ) : (
            <>N/A for this city</>
          )}
        </span>
        <span>
          Ground Level :{" "}
          {detail.main.grnd_level ? (
            <>{detail.main.grnd_level}</>
          ) : (
            <>N/A for this city</>
          )}
        </span> 
        <button className="search-btn" onClick={()=>handleClear()}>clear</button>
      </div> }
        </>:
        <>
    <h1>Invalid City Name</h1>
        </>}
        </>}
      </div>
    </div>
  );
}

export default Weather;
