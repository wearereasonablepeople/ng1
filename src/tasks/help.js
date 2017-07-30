const chalk = require('chalk');
const figlet = require('figlet');

const ascii = chalk.blue.bold(
  //eslint-disable-next-line no-sync
  figlet.textSync('   ng1   ', {font: 'Doom'})
);

//eslint-disable-next-line no-console
const help = () => console.log(`
${ascii}

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
