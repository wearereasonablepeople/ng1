const fs = require('fs');
const {each, isString, isObject, isArray} = require('lodash');
const Environments = fs.readdirSync('.');

const quote = obj => {
  each(obj, (o, i) => {
    if(isString(o)) {
      obj[i] = `'${o}'`;
    }
    if(isArray(o) || isObject(o)) {
      obj[i] = quote(o);
    }
  });
  return obj;
};

module.exports = configEnv => {
  const env = configEnv
    ? configEnv
    : process.env.NODE_ENV || (Environments.indexOf('local.js') !== -1 ? 'local' : 'development');
  const c = require(`./${env}.js`);
  return quote(c);
};

