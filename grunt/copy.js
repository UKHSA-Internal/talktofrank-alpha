module.exports = {
  static: {
    dot: true,
    expand: true,
    cwd: './',
    src: ['static/**/*', '!static/ui/scss/**/*'],
    dest: 'dist/'
  },
  content: {
    dot: true,
    expand: true,
    cwd: './app/server/api',
    src: ['static/**/*'],
    dest: 'dist/app'
  },
  deploy: {
    src: './ecosystem.json',
    dest: 'dist/'
  },
  config: {
    src: ['./config.yaml', './config.*.yaml'],
    dest: 'dist/'
  }
}
