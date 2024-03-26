class formattedData {
    startDate = [];
    endDate = []
    frequency = "";
    data = [];
}

export function parseDailyData(data) {
    let formatted = new formattedData();
    let n = data[0].length;
    formatted.startDate = [data[0][0][0], getMonth(data[0][0][1]), data[0][0][2]];
    formatted.endDate = [data[0][n-1][0], getMonth(data[0][n-1][1]), data[0][n-1][2]];
    formatted.frequency = "daily";
    for(var i = 0; i<n; i++){
        formatted.data[i] = data[0][i][3];
    }
    return formatted;

}

export function parseMonthlyData(data) {
    let formatted = new formattedData();
}

export function parseAnnualData(data) {
    let formatted = new formattedData();
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