const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

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
        setWeatherData(data)
    })

})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const feelsLikeElement = document.querySelector('[data-feels-like]')
// const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data) {
    locationElement.textContent = data.name
    statusElement.textContent = data.weather[0].description
    temperatureElement.textContent = data.main.temp
    feelsLikeElement.textContent = data.main.feels_like 
    windElement.textContent = data.wind.speed + "km/h"
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

}