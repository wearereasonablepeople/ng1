#!/usr/bin/env node

const {execSync} = require('child_process');
const path = require('path');
const pkg = require('../../package.json');
const yargs = require('yargs');
const cmd = `gulp ${process.argv.slice(2).join(' ')} --gulpEnv ${process.cwd()}`;
const chalk = require('chalk');

if(yargs.argv.v || yargs.argv.version) {
	console.log(pkg.version);
} else {
	console.log(chalk.blue.bold('Welcome to ng1, made for the masters, by the masters'));
	const stdout = execSync(cmd, {cwd: path.join(__dirname), stdio: 'inherit'});
	console.log(chalk.blue.bold('Thank you for using ng1, made for the masters, by the masters'));
}
