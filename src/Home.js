import { useState } from "react";

const Home = () => {
    const [weather, setWeather] = useState('');
    const [lat, setLat] = useState(undefined);
    const [lon, setLon] = useState(undefined);

    const findWeather = () => {
        if (lat === undefined || lon === undefined) {
            setWeather('Error: Please enter a number.');
        } else {
            const latFloat = parseFloat(lat);
            const lonFloat = parseFloat(lon);
            if (isNaN(latFloat) || isNaN(lonFloat)) {
                setWeather('Error: Invalid input. Please enter a valid number.')
            } else if (latFloat < -90 || latFloat > 90 || lonFloat < -180 || lonFloat > 180) {
                setWeather('Error: Please enter a latitude value of -90 to 90 and a longitude value of -180 to 180.')
            } else {
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latFloat}&lon=${lonFloat}&exclude=minutely,hourly,daily&appid=21bb988245e5a72a5a6b93f0e151ad80`)
                    .then(response => response.json())
                    .then(data => {
                        setWeather(data.current.weather[0].description);
                    })
                    .catch(error => console.error(error)) 
            }
        }
    };
 
    return (
        <div className="home">
            <p className="lat">Latitude:</p>    
            <input 
                type="text" 
                className="latitude_input" 
                placeholder="Enter a latitude" 
                value={ lat }
                onChange={(e) => setLat(e.target.value)}
            />
            <p className="lon">Longitude:</p>
            <input 
                type="text" 
                className="longitude_input"
                placeholder="Enter a longitude" 
                value={ lon }
                onChange={(e) => setLon(e.target.value)}
            />
            <button className="button" onClick={ findWeather }>Enter</button>
            <h1 className="currentWeather">The current weather is:</h1>
            { weather && <h2 className="weather">{ weather }</h2>}
        </div>
    );
}

export default Home;