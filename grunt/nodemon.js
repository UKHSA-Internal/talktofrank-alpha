// var process = require('child_process');

module.exports = {
  dev: {
    script: './server.bundle.js',
    options: {
      cwd: './dist/app',
      delay: 3000,
      nodeArgs: ['--inspect'],
      callback: function (nodemon) {
        nodemon.on('restart', function (files) {
          // process.exec("say 'built'",  (error, stdout, stderr) => {});
        })
      }
    }
  }
}
