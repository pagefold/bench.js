/** @class Function */
/** @name bench
 *  @methodOf Function
 *  @description Add a benchmark tool to functions.
 *
 *  @example
 *  var foo = function(){ code };
 *  foo.bench();                   // Run default 10000 times.
 *  foo.bench(50000);              // Run 50000 times.
 *
 *  @example
 *  // Benchmark a block of code wrapped in an anonymous function.
 *  // Useful for native functions, or code requiring args.
 *  (function(){ document.getElementById('mydiv') }).bench();
 */

Function.prototype.bench = Function.prototype.bench || function (repetitions) {
  var durations = [],
      numTests = repetitions || 10000,
      cnt = numTests,
      arglist = [],
      i, beginTotalTime, durationTotal, endTime;
  console.log('Benchmarking Code ' + numTests + ' Times.');

  for (i = 1;  i < arguments.length;  i++) { arglist.push(arguments[i]) }
  beginTotalTime = new Date();
  while (cnt--) {
    var beginLoopTime = new Date();
    this.apply(arglist);
    durations.push((new Date()) - beginLoopTime);
  }
  durationTotal = (new Date()) - beginTotalTime;

  console.log('Average Cycle Time:', (function () {
    var sum = 0, i = 0;
    for (i = 0; i < durations.length; i++) {
      sum += parseFloat(durations[i]);
    }
    return sum / durations.length;
  })(), 'ms');
  console.log('  Total Cycle Time:', durationTotal, 'ms');

  cnt = 0;
  endTime = new Date((new Date()).getTime() + 1000);
  while ((new Date()) < endTime) {
    this.apply(arglist);
    cnt++;
  }
  console.log(' Cycles Per Second:', cnt);
};

