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

var totalScore = 0;

for (var i = 0; i < examResults.length; i++) {
    totalScore = totalScore + examResults[i].score;
}

var scoreAvg = Math.round(totalScore / examResults.length);

var timesOfAvg = [];

for (var i = 0; i < examResults.length; i++) {
    var result = examResults[i];
    if (result.score === scoreAvg) {
        timesOfAvg.push(result.totalTimeSpentStudying);
    }
}

var totalTimeOfAvg = 0;

for (var i = 0; i < timesOfAvg.length; i++) {
    totalTimeOfAvg = totalTimeOfAvg + timesOfAvg[i];
}

var result = Math.round(totalTimeOfAvg / timesOfAvg.length);
