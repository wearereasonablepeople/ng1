const chalk = require('chalk');

const prefix = () => `[${chalk.grey('ng1')}]`;

const info = (...args) => {
  console.log(prefix(), ...args);
};

const error = (...args) => {
  console.log(prefix(), chalk.red.bold(...args));
};

const top = (...args) => {
  console.log(prefix(), chalk.green.bold(...args));
};

module.exports = {
  info,
  error,
  top,
};
