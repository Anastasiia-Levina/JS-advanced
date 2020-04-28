function bind(fn, context, ...args) {
  return function (...params) {
    return fn.call(context, ...args.concat(params));
  }
}

Function.prototype.bind2 = function (context, ...args) {
  let fn = this;
  return function (...params) {
    return fn.apply(context, args.concat(params));
  }
}
