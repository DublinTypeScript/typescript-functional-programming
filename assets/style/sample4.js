var filter = (func) => (arr) => arr.filter(func);
var map = (func) => (arr) => arr.map(func);
var reduce = (func, initial) => (arr) => arr.reduce(func, initial);
var compose = (f, g) => (x) => f(g(x));

var sum = reduce((c, p) => c + p, 0);
var dividend = (a, b) => (a / b);
var round = (a) => Math.round(a);
var size = (arr) => arr.length;
var avg = (arr) => dividend(sum(arr), size(arr));
var mapProp = (prop) => map((item) => item[prop]);
var filterProp = (prop) => (matchVal) => filter((item) => item[prop] === matchVal);
var mapAvg = (func) => compose(round, compose(avg, func));

var mapTotalY = mapProp("totalTimeSpentStudying");
var mapX = mapProp("score");
var filterByX = filterProp("score");
var getXAvg = mapAvg(mapX);
var filterByXAvg = (result) => compose(filterByX, getXAvg)(result)(result);
var getYAvgForXAvg = mapAvg(compose(mapTotalY, filterByXAvg));

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

var result = getYAvgForXAvg(examResults);
