var filter = (func) => { return (arr) => { return arr.filter(func); } };
var map = (func) => { return (arr) => { return arr.map(func); } };
var reduce = (func, initialVal) => { return (arr) => { return arr.reduce(func, initialVal); } };
var compose = function(f, g) { return (x) => { return f(g(x)); } };
var round = (a) => { return Math.round(a); };
var sum = reduce((prev, curr) => { return prev + curr; }, 0);
var size = (arr) => { return arr.length; };
var mapProp = (prop) => { return map((item) => { return item[prop]; }); };
var filterProp = (prop, matchVal) => { return filter((item) => { return item[prop] === matchVal; }); };
var dividend = (a, b) => { return a / b; };
var avg = (arr) => { return dividend(sum(arr), size(arr)); }
var mapAvg = (mapFunc) => { return compose(round, compose(avg, mapFunc)); };

let examResults = [
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

var mapResultToScore = mapProp("score");
var mapResultToTime = mapProp("totalTimeSpentStudying");
var getScoreAvg = mapAvg(mapResultToScore);

var scoreAvg = getScoreAvg(examResults);
var filterByScore = filterProp("score", scoreAvg);
var getTimeAvgForScoreAvg = mapAvg(compose(mapResultToTime, filterByScore));

var result = getTimeAvgForScoreAvg(examResults);
