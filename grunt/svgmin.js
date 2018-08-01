module.exports = {
  options: {
  },
  dist: {
    files: [{
      expand: true,
      cwd: 'dist/static/ui',
      src: ['**/*.svg'],
      dest: 'dist/static/ui/'
    }]
  }
}
