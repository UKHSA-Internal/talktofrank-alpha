module.exports = {
  options: {
    mangle: true
  },
  client: {
    files: [{
      expand: true,
      cwd: 'dist/static/ui/js',
      src: ['**/*.js', '!**/*.min.js'],
      dest: 'dist/static/ui/js'
    }]
  }
}
