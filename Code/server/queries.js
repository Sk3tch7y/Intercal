const fs = require('node:fs');
const localStations = require('./stations.json');

async function getStations() {
    const stations = (await fetch("https://api.weather.gc.ca/collections/hydrometric-stations/items?lang=en&limit=7963&f=json")).json();
    return stations;
}

async function getAnnual(station) {
    console.log("fetching " + station);
    const stations = localStations;
    for(let i = 0; i < localStations.length; i++) {
        if(stations[i].properties.IDENTIFIER == station) {
            var data = await getLinkedData(i, "annual", stations);
            break;
        }
    }
    return data;
}
async function getMonthly(station) {
    console.log("fetching " + station);
    const stations = localStations;
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].properties.IDENTIFIER == station) {
            var data = await getLinkedData(i, "monthly", stations);
            break;
        }
    }
    return data;
}
async function getDaily(station) {
    console.log("fetching " + station);
    const stations = localStations;
    for(let i = 0; i < stations.length; i++) {
        if(stations[i].properties.IDENTIFIER == station) {
            var data = await getLinkedData(i, "daily", stations);
            break;
        }
    }
    return data;
}
async function getLinkedData(index, freq, stations) {
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
    for(let j = 0; j < stations[index].properties.links.length; j++) {
        if(stations[index].properties.links[j].href.includes(partialLink)) {
            let selected = stations[index].properties.links[j].href;
            var data = await getData(selected, freq); // var used due to scope. Hacky ik but it works :)
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
async function makeStationList() {
    list = await getStations();
    list = JSON.stringify(list.features);
    fs.writeFile("stations.json", list, err => {
        if(err) {
            console.error(err);
            return false;
        }
        else {
            console.log("stations.json initialized");
        }
    });
    return true;
}

async function searchStations(str) {
    const stations = localStations;
    let result = '[';
    let newResult;
    let count = 0;
    if(str.length == 7) {
        for(i = 0; i < stations.length; i++) {
            if(stations[i].properties.IDENTIFIER == str) {
                if(count > 1000) {break;}
                count++;
                let id = str;
                let name = stations[i].properties.STATION_NAME;
                let content = "Province: "+stations[i].properties.PROV_TERR_STATE_LOC+"; Status: "+stations[i].properties.STATUS_EN;
                /*let waterData = await getDaily(id);
                if(waterData[0] != 0) {
                    waterLevel = waterData[0][waterData[0].length-1][3];
                }
                else {
                    waterLevel = waterData[1][waterData[1].length-1][3];
                }*/
                //newResult = '{"postId":"'+id+'", "name":"'+name+'", "content":"'+content+'", "waterLevel":"'+waterLevel+'"},';
                newResult = '{"postId":"'+id+'", "name":"'+name+'", "content":"'+content+'", "waterLevel":"Normal"},';
                result = result.concat(newResult);
            }
        }
        result=result.slice(0,-1);
        result = result.concat("]");
    }
    else {
        for(i = 0; i < stations.length; i++) {
            if(stations[i].properties.STATION_NAME.includes(str.toUpperCase())) {
                if(count > 1000) {break;}
                count++;
                identifier = stations[i].properties.IDENTIFIER;
                let id = identifier;
                let name = stations[i].properties.STATION_NAME;
                let content = "Province: "+stations[i].properties.PROV_TERR_STATE_LOC+"; Status: "+stations[i].properties.STATUS_EN;
                /*let waterData = await getDaily(id);
                console.log(waterData);
                if(typeof(waterData[0]) != 'undefined') {
                    waterLevel = waterData[0][waterData[0].length-1][3];
                }
                else {
                    waterLevel = waterData[1][waterData[1].length-1][3];
                }*/
                //newResult = '{"postId":"'+id+'", "name":"'+name+'", "content":"'+content+'", "waterLevel":"'+waterLevel+'"},';
                newResult = '{"postId":"'+id+'", "name":"'+name+'", "content":"'+content+'", "waterLevel":"Normal"},';
                result = result.concat(newResult);
            }
        }
        result = result.slice(0,-1);
        result = result.concat("]");
    }
    return(JSON.parse(result));
}

searchStations("a");
//let idk = searchStations("okanagan");
//getStationsLocal();
//getAnnual("01AD015");
//getMonthly("01AD015");
//console.log(getDaily("01AD015"));
//makeStationList();
module.exports = {
    getDaily,
    getMonthly,
    getAnnual,
    getStations,
    makeStationList,
    getLinkedData,
    getData,
    searchStations
}