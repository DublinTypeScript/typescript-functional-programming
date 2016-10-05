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

var totalScore = examResults.map((result) => { return result.score; })
                        .reduce((prev, curr) => { return prev + curr; }, 0);

var scoreAvg = Math.round(totalScore / examResults.length);

var timesOfAvg = examResults.filter((result) => { return result.score === scoreAvg; })
                        .map((result) => { return result.totalTimeSpentStudying; });

var result = Math.round(
    timesOfAvg.reduce((prev, curr) => { return prev + curr; }, 0) / timesOfAvg.length
);
