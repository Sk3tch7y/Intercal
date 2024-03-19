const { getAnnual } = require('./queries.js');

async function test() {
    //testDaily = await getDaily("01AD002");
    //testMonthly = await getMonthly("01AD002");
    testAnnual = await getAnnual("01AD002");
    console.log(testAnnual);
}

test();