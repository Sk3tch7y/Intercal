async function getStations() {
    const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963")
    const stations = await response.json();
//    for(let i = 0; i < stations.features.length; i++) {
//        console.log(stations.features[i].properties.STATION_NAME);
//    }
    console.log(stations.features.length);

    for(let i = 0; i < stations.features.length; i++) {
        if(stations.features[i].properties.STATION_NAME == stations.features[450].properties.STATION_NAME) {
            selected = stations.features[i].properties.links[6].href; // 6 & 5 are the related links
        }
    }

    const response2 = await fetch(selected);
    const data = await response2.json();
    for(let i = 0; i < data.features.length; i++) {
        console.log(data.features[i].properties.MAX_VALUE);
    }
}

getStations();