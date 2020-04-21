function bind(fn, context, ...args) {
  return function (...params) {
    return fn.call(context, ...args.concat(params));
  }
}


// Something wrong with this func
Function.prototype.bind2 = function (context, ...args) {
  fn = this;
  return function (...params) {
    return fn.apply(context, args.concat(params));
  }
}
