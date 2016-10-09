var round = (a) => Math.round(a);
var avg = (arr) => round(R.divide(R.sum(arr), R.length(arr)));
var mapProp = (prop) => R.map(R.prop(prop));
var filterProp = (prop) => (matchVal) => R.filter(R.propEq(prop, matchVal));
var mapAvg = (mapFunc) => R.compose(avg, mapFunc);

var mapX = mapProp("score");
var filterByX = filterProp("score");
var mapTotalY = mapProp("totalTimeSpentStudying");
var getXAvg = mapAvg(mapX);
var filterByXAvg = (result) => R.compose(filterByX, getXAvg)(result)(result);
var getYAvgForXAvg = mapAvg(R.compose(mapTotalY, filterByXAvg));

var examResults = [
    { score: 10, totalTimeSpentStudying: 10 },
    { score: 9, totalTimeSpentStudying: 10 },
    { score: 8, totalTimeSpentStudying: 10 },
    { score: 7, totalTimeSpentStudying: 9 },
    { score: 7, totalTimeSpentStudying: 8 },
    { score: 7, totalTimeSpentStudying: 8 },
    { score: 6, totalTimeSpentStudying: 7 },
    { score: 6, totalTimeSpentStudying: 6 },
    { score: 4, totalTimeSpentStudying: 4 },
    { score: 3, totalTimeSpentStudying: 1 },
];

getYAvgForXAvg(examResults);
