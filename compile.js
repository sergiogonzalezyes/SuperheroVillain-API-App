const ejs = require('ejs-cli');
const fs = require('fs');
const path = require('path');

// Compile the EJS templates into HTML files
ejs.compile({
  src: 'views/',
  dest: 'docs/',
  extension: '.html',
  compileDebug: false
});

// Copy the static assets (CSS, JavaScript, images) to the "public" directory
fs.readdirSync('static').forEach(file => {
  fs.copyFileSync(path.join('static', file), path.join('public', file));
});
