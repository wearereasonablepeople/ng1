#!/usr/bin/env node

const {execSync} = require('child_process');
const path = require('path');
const {size} = require('lodash');
const chalk = require('chalk');
const pkg = require('../../package.json');
const yargs = require('yargs');
const log = require('../utils/log');
const {randomStart, randomEnd} = require('../utils/quotes');
const moment = require('moment');

// Remove '--silent' flag to debug/log errors (just just pass '--verbose')
const cmd = `gulp ${process.argv.slice(2).join(' ')} --gulpEnv "${process.cwd()}" ${yargs.argv.verbose ? '' : '--silent'}`;

if(yargs.argv.v || yargs.argv.version) {
  console.log(pkg.version);
} else {
  const before = moment.utc().valueOf();
  if(size(yargs.argv)) {
    log.top(randomStart());
  }
  execSync(cmd, {cwd: path.join(__dirname), stdio: 'inherit'});
  const after = moment.utc().valueOf();
  if(size(yargs.argv)) {
    log.top(randomEnd(), chalk.grey(`after ${after - before}ms`));
  }
}
