const chalk = require('chalk');
const figlet = require('figlet');

const ascii = chalk.blue.bold(
  figlet.textSync('   ng1   ', {font: 'Doom'})
);

const help = () => console.log(`
${ascii}

Command line tool to use in combination with
[ng-webpack-seed](https://github.com/piotr-gawlowski/ng-webpack-seed)

${chalk.blue.bold('Generators:')}
  ${chalk.cyan('component')} -n yourComponent
  ${chalk.cyan('constant')} -n yourConstant
  ${chalk.cyan('factory')} -n yourFactory
  ${chalk.cyan('route')} -n yourRoute
  ${chalk.cyan('service')} -n YourService
`);

module.exports = {
  help,
  helpAgs: ['help', 'default']
};
