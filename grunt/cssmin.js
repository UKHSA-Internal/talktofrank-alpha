module.exports = {
  options: {
    mergeIntoShorthands: false,
    roundingPrecision: -1
  },
  target: {
    files: [{
      expand: true,
      cwd: 'dist/static/ui/css',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/static/ui/css',
      ext: '.min.css'
    }]
  }
}
