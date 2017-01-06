#!/usr/bin/env node

const {execSync} = require('child_process');
const path = require('path');
const cmd = `gulp ${process.argv.slice(2).join(' ')}`;
const colors = require('colors');

console.log('Welcome to ng-cli, made for the masters, by the masters'.underline.red);
const stdout = execSync(cmd, {cwd: path.join(process.cwd()), stdio: 'inherit'});
console.log('Thank you for using ng-cli, made for the masters, by the masters'.underline.red);