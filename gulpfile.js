const fs = require('fs');
const tasks = fs.readdirSync('./tasks/');

console.log(tasks);

tasks.map(task => require('./tasks/' + task));



//List of ideas/todos

// generate project
// import plugins/components (import some git repo into project by npm install and automatically add to dependencies?)

// Create service
// Create constant
// Create factory
// Create route (add to states.js file too)



// List of ideas for plugins

// Make app offline capable automatically (interceptor that handles caching?)