const {random} = require('lodash');

const start = [
  'Ready to work.',
  'Yes, milord?',
  'More work?',
  'Right-o.',
  'Yes, milord.',
  'All right.',
  'Off I go, then!',
  'In the rear with the gear.',
  'Why not?',
  'Me busy, leave me alone.',
  'Work, work.',
  'I\'m on the job.',
  'I\'ll have it up in no time.',
  'Big job, huh?',
  'Woo hoo! Overtime!',
  'Well, butter my biscuit!',
  'Roger.',
  'Will do.',
  'This is your plan!?',
  'This is crazy!',
  'Will work for food!',
  'Ready as ever',
  'Good day commander',
  'Always on time',
  'In the blink of an eye',
  'In no time at all',
  'At once, comrade!',
];

const end = [
  'Job\'s done!',
];

const randomStart = () => start[random(start.length - 1)];
const randomEnd = () => end[random(end.length - 1)];

module.exports = {
  start,
  end,
  randomStart,
  randomEnd,
};
