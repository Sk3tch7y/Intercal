const stations = require('./queries.js');

async function example() {
    exampleDaily = await stations.getDaily("01AD002"); console.log(exampleDaily);
    //exampleMonthly = await stations.getMonthly("01AD002"); console.log(exampleMonthly);
    //exampleAnnual = await stations.getAnnual("01AD002"); console.log(exampleAnnual);
    //exampleStations = await stations.getStations(); console.log(exampleStations);
}

example();