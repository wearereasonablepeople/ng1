/* eslint-disable no-console */
const chalk = require('chalk');

// Prefixed with every log
const prefix = () => `[${chalk.grey('ng1')}]`;

// Info logs
const info = (...args) => {
  console.log(prefix(), ...args);
};

// Error logs
const error = (...args) => {
  console.log(prefix(), chalk.red.bold(...args));
};

// Top level logs
const top = (...args) => {
  console.log(prefix(), chalk.green.bold(...args));
};

module.exports = {
  info,
  error,
  top,
};
