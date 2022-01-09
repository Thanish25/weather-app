let map;

function initMap(lat = 43.65310819012764, long = -79.38125726080246,) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 8,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });

    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click on a location!",
        position: { lat: lat, lng: long }
    });

    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            content: "Click on a location!",
            position: mapsMouseEvent.latLng,
        });

        infoWindow.open(map);
        
        // console.log(mapsMouseEvent.latLng.toJSON())
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                latitude: mapsMouseEvent.latLng.toJSON().lat,
                longitude: mapsMouseEvent.latLng.toJSON().lng
            })
        }).then(res => res.json()).then(data => {
            // console.log(data)
            weather_data[0] = data.main.temp
            weather_data[1] = data.main.feels_like
            setWeatherData(data, data.name)
        })




    });

}