async function getAnnual(station) {
    const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
    const stations = await response.json();
    for(let i = 0; i < stations.features.length; i++) {
        if(stations.features[i].properties.IDENTIFIER == station) {
            getLinks(i, "annual", stations);
            break;
        }
    }
}
async function getMonthly(station) {
    const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
    const stations = await response.json();
    for(let i = 0; i < stations.features.length; i++) {
        if(stations.features[i].properties.IDENTIFIER == station) {
            getLinks(i, "monthly", stations);
            break;
        }
    }
}
async function getDaily(station) {
    const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
    const stations = await response.json();
    for(let i = 0; i < stations.features.length; i++) {
        if(stations.features[i].properties.IDENTIFIER == station) {
            getLinks(i, "daily", stations);
            break;
        }
    }
}
function getLinks(index, freq, stations) {
    let partialLink = "";
    switch(freq) {
        case "annual":
            partialLink = "hydrometric-annual-statistics";
            break;
        case "monthly":
            partialLink = "hydrometric-monthly-mean";
            break;
        case "daily":
            partialLink = "hydrometric-daily-mean";
            break;
    }
    console.log(partialLink);
    for(let j = 0; j < stations.features[index].properties.links.length; j++) {
        if(stations.features[index].properties.links[j].href.includes(partialLink)) {
            let selected = stations.features[index].properties.links[j].href;
            getData(selected, freq);
            break;
        }
    }
}
async function getData(url, freq) {
    let dischargeData = [];
    let levelData = [];
    console.log(url);
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData.numberMatched == 0);
    //console.log(jsonData);
    for(let i = 0; i < jsonData.features.length; i++) {
        if(freq == "annual") {
            levelData.push([Number(jsonData.features[i].properties.MAX_DATE.substring(0,4)), jsonData.features[i].properties.MAX_VALUE, jsonData.features[i].properties.MIN_VALUE])
            //console.log(jsonData.features[i].properties.MAX_DATE.substring(0,4)); // Get max value for annual water levels
            //console.log(jsonData.features[i].properties.MIN_DATE); // Get min value for annual water levels
        }
        else if(freq == "monthly") {
            if(jsonData.features[i].properties.MONTHLY_MEAN_LEVEL != null) {
                console.log(jsonData.features[i].properties.MONTHLY_MEAN_LEVEL); // If monthly level exists, get it
            }
            else if(jsonData.feature[i].properties.MONTHLY_MEAN_DISCHARGE != null) {
                console.log(jsonData.features[i].properties.MONTHLY_MEAN_DISCHARGE); // If monthly discharge exists, get it
            }
            else {
                console.log("Nothing to show.");
            }
        }
        else {
            if(jsonData.features[i].properties.LEVEL != null) {
                console.log("Level: " + jsonData.features[i].properties.LEVEL); // If water level data exists, get it
            }
            else if(jsonData.features[i].properties.DISCHARGE != null) {
                console.log("Discharge: " + jsonData.features[i].properties.DISCHARGE); // If water discharge data exists, get it
            }
            else {
                console.log("Nothing to show.");
            }
        }
    }
    console.log(levelData);
}
//getStations();
getAnnual("01AD015");
//getMonthly("01AD003");
//getDaily("01AA002");