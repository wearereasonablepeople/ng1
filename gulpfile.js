const fs = require('fs');
const tasks = fs.readdirSync('./tasks/');

console.log(tasks);

tasks.map(task => require('./tasks/' + task));
