var mapProp = (prop) => { (item) => { return item[prop]; } };
var filterProp = (prop, val) => { (item) => { return item[prop] === val; } };
var sum = (a, b) => { return a + b; };
var dividend = (a, b) => { return a / b; };
var round = (a) => { return Math.round(a); };

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

var mapScore = mapProp("score");
var mapTotalTimeSpentStudying = mapProp("totalTimeSpentStudying");

var totalScore = examResults.map(mapScore).reduce(sum, 0);
var scoreAvg = round(dividend(totalScore, examResults.length));

var filterByScore = filterProp(score, scoreAvg);
var timesOfAvg = examResults.filter(filterByScore).map(mapTotalTimeSpentStudying);

var totalTTime = timesOfAvg.reduce(sum, 0);
var result = round(dividend(totalTTime, timesOfAvg.length));
