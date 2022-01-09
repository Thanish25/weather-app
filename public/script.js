const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
let weather_data = [0,0]

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]

    if (place == null) return

    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        weather_data[0] = data.main.temp
        weather_data[1] = data.main.feels_like
        setWeatherData(data, place.formatted_address)
    })

})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const feelsLikeElement = document.querySelector('[data-feels-like]')
// const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    // locationElement.textContent = data.name
    locationElement.textContent = place
    statusElement.textContent = titleCase(data.weather[0].description)
    windElement.textContent = data.wind.speed + " km/h"
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    if (document.getElementById("toggle").innerText === "Switch to Fahrenheit") {
        let tempC = weather_data[0].toFixed(1)
        let feelsLikeC = weather_data[1].toFixed(1)
        temperatureElement.innerHTML = tempC+ " &deg;C"
        feelsLikeElement.innerHTML = feelsLikeC + " &deg;C"
    }
    else {
        let tempF = (((weather_data[0] * 9 / 5) + 32)).toFixed(1)
        let feelsLikeF = ((weather_data[1] * 9 / 5) + 32).toFixed(1)
        temperatureElement.innerHTML = tempF + " &deg;F"
        feelsLikeElement.innerHTML = feelsLikeF + " &deg;F"
    }

}

function switchUnits() {
    if (document.getElementById("toggle").innerText === "Switch to Fahrenheit") {
        let tempF = (((weather_data[0] * 9 / 5) + 32)).toFixed(1)
        let feelsLikeF = ((weather_data[1] * 9 / 5) + 32).toFixed(1)
        temperatureElement.innerHTML = tempF + " &deg;F"
        feelsLikeElement.innerHTML = feelsLikeF + " &deg;F"
        document.getElementById('toggle').innerText="Switch to Celsius"
    }
    else {
        let tempC = weather_data[0].toFixed(1)
        let feelsLikeC = weather_data[1].toFixed(1)
        temperatureElement.innerHTML = tempC + " &deg;C"
        feelsLikeElement.innerHTML = feelsLikeC + " &deg;C"
        document.getElementById('toggle').innerText = "Switch to Fahrenheit"
    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}