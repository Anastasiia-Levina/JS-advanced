function compose (...args) {
  return (mat) => {
    let result = mat;
    for(let i = 0; i < args.length; i++) {
      result = args[i](result);
    }
    return result;
  }
}
