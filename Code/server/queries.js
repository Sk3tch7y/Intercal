
async function getAnnual(station) {
        console.log("fetching " + station);
        const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
        const stations = await response.json();
        for(let i = 0; i < stations.features.length; i++) {
            if(stations.features[i].properties.IDENTIFIER == station) {
                var data = getLinkedData(i, "annual", stations);
                break;
            }
        }
        return data;
    }
    async function getMonthly(station) {
        console.log("fetching " + station);
        const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
        const stations = await response.json();
        for(let i = 0; i < stations.features.length; i++) {
            if(stations.features[i].properties.IDENTIFIER == station) {
                var data = getLinkedData(i, "monthly", stations);
                break;
            }
        }
        return data;
    }
    async function getDaily(station) {
        console.log("fetching " + station);
        const response = await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963");
        const stations = await response.json();
        for(let i = 0; i < stations.features.length; i++) {
            if(stations.features[i].properties.IDENTIFIER == station) {
                var data = getLinkedData(i, "daily", stations);
                break;
            }
        }
        return data;
    }
    function getLinkedData(index, freq, stations) {
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
        console.log("fetching " + partialLink);
        for(let j = 0; j < stations.features[index].properties.links.length; j++) {
            if(stations.features[index].properties.links[j].href.includes(partialLink)) {
                let selected = stations.features[index].properties.links[j].href;
                var data = getData(selected, freq);
                break;
            }
        }
        return data;

    }
    async function getData(url, freq) {
        let dischargeData = [];
        let levelData = [];
        const response = await fetch(url);
        const jsonData = await response.json();
        for(let i = 0; i < jsonData.features.length; i++) {
            if(freq == "annual") {
                if(jsonData.features[i].properties.DATA_TYPE_EN == "Water Level" && jsonData.features[i].properties.MAX_DATE != null) {
                    levelData.push([Number(jsonData.features[i].properties.MAX_DATE.substring(0,4)), jsonData.features[i].properties.MAX_VALUE, jsonData.features[i].properties.MIN_VALUE]);
                    // Get max & min value for annual water levels
                }
                else if(jsonData.features[i].properties.DATA_TYPE_EN == "Discharge" && jsonData.features[i].properties.MAX_DATE != null) {
                    dischargeData.push([Number(jsonData.features[i].properties.MAX_DATE.substring(0,4)), jsonData.features[i].properties.MAX_VALUE, jsonData.features[i].properties.MIN_VALUE]);
                    // Get max & min value for annual discharge
                }
                else {
                    // Do nothing
                }
            }
            else if(freq == "monthly") {
                if(jsonData.features[i].properties.MONTHLY_MEAN_LEVEL != null) {
                    // If monthly level exists, get it
                    levelData.push([Number(jsonData.features[i].properties.DATE.substring(0,4)), Number(jsonData.features[i].properties.DATE.substring(5,7)), jsonData.features[i].properties.MONTHLY_MEAN_LEVEL]);
                }
                else if(jsonData.features[i].properties.MONTHLY_MEAN_DISCHARGE != null) {
                    // If monthly discharge exists, get it
                    levelData.push([Number(jsonData.features[i].properties.DATE.substring(0,4)), Number(jsonData.features[i].properties.DATE.substring(5,7)), jsonData.features[i].properties.MONTHLY_MEAN_DISCHARGE]);
                }
                else {
                    // Do nothing
                }
            }
            else {
                if(jsonData.features[i].properties.LEVEL != null) {
                    // If water level data exists, get it
                    levelData.push([Number(jsonData.features[i].properties.DATE.substring(0,4)), Number(jsonData.features[i].properties.DATE.substring(5,7)), Number(jsonData.features[i].properties.DATE.substring(8,10)), jsonData.features[i].properties.LEVEL]);
                }
                else if(jsonData.features[i].properties.DISCHARGE != null) {
                    // If water discharge data exists, get it
                    levelData.push([Number(jsonData.features[i].properties.DATE.substring(0,4)), Number(jsonData.features[i].properties.DATE.substring(5,7)), Number(jsonData.features[i].properties.DATE.substring(8,10)), jsonData.features[i].properties.DISCHARGE]);
                }
                else {
                    // Do nothing
                }
            }
        }
        //console.log(levelData);
        //console.log(dischargeData);
        return [levelData, dischargeData];
    }
    //getStations();
    //getAnnual("01AD015");
    //getMonthly("01AD002");
    //getDaily("01AA002");
    module.exports = {
        getDaily,
        getMonthly,
        getAnnual
    }