const stations = require('./queries.js');

async function example() {
    //exampleDaily = await stations.getDaily("01AD002");
    //exampleMonthly = await stations.getMonthly("01AD002");
    //exampleAnnual = await stations.getAnnual("01AD002");
    exampleIds = await stations.getIds();
    console.log(exampleIds);
}

example();