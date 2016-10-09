var source = Rx.Observable.create(function (observer) {
    observer.onNext(42);
    observer.onCompleted();

    // Note that this is optional, you do not have to 
    // return this if you require no cleanup
    return function () {
        console.log('disposed');
    };
});

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: 42
// => Completed

subscription.dispose();

// => disposed

// ---------------------------------------------------

var array = [1,2,3];
var source = Rx.Observable.fromArray(array);

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: 1
// => Next: 2
// => Next: 3
// => Completed

// ---------------------------------------------------

var promiseFn = function () { return Promise.resolve(42); };
var source = Rx.Observable.fromPromise(promiseFn);

var subscription1 = source1.subscribe(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });

// => Next: 42
// => Completed





