module.exports = {
  js: {
    options: {
      debounceDelay: 1000
    },
    files: [
      './app/**/*.{js,jsx,json,yml}'
    ],
    tasks: ['build']
  },
  jsStatic: {
    files: [
      './static/**/*.{js}'
    ],
    tasks: ['copy:static']
  },
  sass: {
    files: [
      './static/ui/scss/**/*.scss',
      './app/shared/components/**/*.scss'
    ],
    tasks: [
      'css',
      'copy:static'
    ]
  }
}
