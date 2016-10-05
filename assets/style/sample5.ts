let filter = <T>(func: (item: T) => boolean) => (arr: T[]) => arr.filter(func);
let map = <T1, T2>(func: (item: T1) => T2) => (arr: T1[]) => arr.map(func);
let reduce = <T>(func: (curr: T, prev: T) => T, initial: T) => (arr: T[]) => arr.reduce(func, initial);
let compose = <T1, T2, T3>(f: (x: T2) => T3, g: (x: T1) => T2) => (x: T1) => f(g(x));
let sum = reduce<number>((c, p) => c + p, 0);
let dividend = (a: number, b: number) => (a / b);
let round = (a: number) => Math.round(a);
let size = (arr: any[]) => arr.length;
let avg = (arr: number[]) => dividend(sum(arr), size(arr));
let mapProp = <T1, T2>(prop: string) => map<T1, T2>((item: T1) => item[prop] as T2);
var filterProp = <T>(prop: string) => (matchVal: any) => filter((item: T) => item[prop] === matchVal);
let mapAvg = <T>(func: (arr: T[]) => number[]) => compose(round, compose(avg, func));

interface Result { score: number; totalTimeSpentStudying: number; }

let examResults : Result[] = [
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

let getResult = <T>(x: string, y: string, collection: T[]) => {
    let mapX = mapProp<T, number>(x);
    let filterByX = filterProp<T>(x);
    let mapTotalY = mapProp<T, number>(y);
    let getXAvg = mapAvg(mapX);
    let filterByXAvg = (r: T[]) => compose(filterByX, getXAvg)(r)(r);
    let getYAvgForXAvg = mapAvg(compose(mapTotalY, filterByXAvg));
    return getYAvgForXAvg(collection);
};

let avgTimeSpentByAvgScore = getResult<Result>("score", "totalTimeSpentStudying", examResults);
