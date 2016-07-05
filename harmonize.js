/**
 * Harmonize
 * Created by Jamie Wohletz on 7/4/2016.
 */
function H() {

  H.BASE = 'base';

  function isNothing(x){
    return x === null || typeof x === 'undefined';
  }

  function arrayify(arrayish) {
    return Array.prototype.slice.call(arrayish);
  }

  function tryToApply(funcOrValue, arguments) {
    if(typeof funcOrValue === 'function') {
      return funcOrValue.apply(this, arguments);
    }
    return funcOrValue;
  }

  function stringifyArgs(args) {
    return args.map(function(arg){
      return JSON.stringify(arg);
    }).join(';');
  }

  if(arguments.length !== 0){
    return stringifyArgs(arrayify(arguments));
  }

  return function f() {
    var args = arrayify(arguments);
    var possibleMatch = f[stringifyArgs(args)];
    var toApply = isNothing(possibleMatch) ? f[H.BASE] : possibleMatch;
    return tryToApply(toApply, args);
  };
}

var fibonacci = H();
fibonacci[H(0)] = 0;
fibonacci[H(1)] = 1;
fibonacci[H.BASE] = function(n){
  return fibonacci(n-1) + fibonacci(n-2);
};

console.log(fibonacci(3));