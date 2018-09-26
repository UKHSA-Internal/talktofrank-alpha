const ContentfulTextSearch = require('contentful-text-search')
const yaml = require('js-yaml')
const fs = require('fs')

module.exports = function (grunt) {
  grunt.registerMultiTask('contentful', 'Sync and reindex entries from contentful to Elasticsearch', function () {
    const done = this.async()

    let config = {}
    let configLoaded = false

    try {
      config = yaml.load(fs.readFileSync(process.cwd() + '/config.yaml', 'utf8'))
      grunt.log.writeln('Using config.yaml file')
      if (config.contentful && config.elasticsearch) configLoaded = true
    } catch (e) {
      grunt.log.writeln('No config.yaml file found, searching for development config')
    }

    if (!configLoaded) {
      try {
        config = yaml.load(fs.readFileSync(process.cwd() + '/config.development.yaml', 'utf8'))
        grunt.log.writeln('Using config.development.yaml file')
        if (config.contentful && config.elasticsearch) configLoaded = true
      } catch (e) {
        grunt.log.error('No development config file found')
      }
    }

    if (!configLoaded) {
      grunt.log.error('No config files found')
      done()
      return
    }

    this.search = new ContentfulTextSearch({
      space: config.contentful.contentSpace,
      token: config.contentful.contentAccessToken,
      elasticHost: config.elasticsearch.host,
      contentType: config.contentful.contentTypes.drug,
      amazonES: config.elasticsearch.amazonES
    })

    if (this.target === 'deleteAllIndices') {
      grunt.log.subhead(`Deleting all indices`)
      this.search.indexer.deleteAllIndices().then(() => {
        grunt.log.subhead(`Deleting all indices...done`)
        done()
      })
    }

    if (this.target === 'fullReindex') {
      grunt.log.subhead(`Performing full reindex of content`)
      this.search.indexer.fullReindex().then(() => {
        grunt.log.subhead(`Performing full reindex of content....done`)
        done()
      })
    }

    if (this.target === 'reindexContent') {
      grunt.log.subhead(`Reindexing content`)

      this.search.indexer.reindexContent().then(() => {
        grunt.log.subhead(`Reindexing content....done`)
        done()
      })
    }
  })
}
