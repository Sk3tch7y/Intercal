class formattedData {
    //startDate = [];
    //endDate = [];
    dates = [];
    frequency = "";
    data = [];
}

function parseDailyData(id) {
    let data;
    fetch('http://localhost:8080/getData?id='+id).then(response => {
        if(!response.ok) {
            console.error("Response failed.");
        }
        return response.json();
        })
        .then(data => {
            console.log(data);
        let formatted = new formattedData();
        let n = data[1].length;
        //formatted.startDate = [data[0][0][0], getMonth(data[0][0][1]), data[0][0][2]];
        //formatted.endDate = [data[0][n-1][0], getMonth(data[0][n-1][1]), data[0][n-1][2]];
        formatted.frequency = "Daily";
        for(let i = 0; i<n; i++){
            formatted.dates[i] = "" + data[0][i][0] + "-" +  getMonth(data[0][i][1]) + "-" + data[0][i][2];
            formatted.data[i] = data[0][i][3];
        }
        return formatted;
        })
    };

function parseMonthlyData(data) {
    let formatted = new formattedData();
    let n = data[0].length;
    //formatted.startDate = [data[0][0][0], getMonth(data[0][0][1])];
    //formatted.endDate = [data[0][n-1][0], getMonth(data[0][n-1][1])];
    formatted.frequency = "Monthly";
    for(var i = 0; i<n; i++){
        formatted.dates[i] = "" + data[0][i][0] + "-" +  getMonth(data[0][i][1]);
        formatted.data[i] = data[0][i][2];
    }
    return formatted;
}

function parseAnnualMaxData(data) {
    let formatted = new formattedData();
    let n = data[1].length;
    //formatted.startDate = data[1][0][0];
    //formatted.endDate = data[1][n-1][0];
    formatted.frequency = "Annual maximum";
    for(var i = 0; i<n; i++){
        formatted.dates[i] = "" + data[1][i][0];
        formatted.data[i] = data[1][i][1];
    }
    return formatted;
}

function parseAnnualMinData(data) {
    let formatted = new formattedData();
    let n = data[1].length;
    //formatted.startDate = data[1][0][0];
    //formatted.endDate = data[1][n-1][0];
    formatted.frequency = "Annual minimum";
    for(var i = 0; i<n; i++){
        formatted.dates[i] = "" + data[1][i][0];
        formatted.data[i] = data[1][i][2];
    }
    return formatted;
}

function getMonth(n){
    let s = "";
    switch(n){
        case 1: s = "Jan"; break;
        case 2: s = "Feb"; break;
        case 3: s = "Mar"; break;
        case 4: s = "Apr"; break;
        case 5: s = "May"; break;
        case 6: s = "Jun"; break;
        case 7: s = "Jul"; break;
        case 8: s = "Aug"; break;
        case 9: s = "Sep"; break;
        case 10: s = "Oct"; break;
        case 11: s = "Nov"; break;
        case 12: s = "Dec"; break;
        default: s = "MonthNotFound"; break;
    }
    return s;
}

module.exports = {
    parseDailyData,
    parseMonthlyData,
    parseAnnualMaxData,
    parseAnnualMinData,
 }

