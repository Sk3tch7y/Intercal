const stations = require('./queries.js');

async function example() {
    exampleDaily = await stations.getDaily("01AD003"); console.log(exampleDaily);
    //exampleMonthly = await stations.getMonthly("01AD002"); console.log(exampleMonthly);
    //exampleAnnual = await stations.getAnnual("01AD002"); console.log(exampleAnnual);
    //exampleStations = await stations.getStations(); console.log(exampleStations);
    //linkedData = await stations.getLinkedData(1, "annual", await stations.getStations()); console.log(linkedData);
    //exampleList = await stations.getStations(); console.log(exampleList.type);
}

example();