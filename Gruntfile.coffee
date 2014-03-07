fs = require('fs');
path = require("path")
walk = require("walk")

 

module.exports = (grunt) ->


  grunt.initConfig
    
    aws: grunt.file.readJSON('./aws_keys.json'),

    express:
      all: 
        options:
          port: '7770',
          hostname: "0.0.0.0",
          bases: ['./public'],
          livereload: true
    s3:
      options: 
        bucket: "3vot.com",
        access: 'public-read',
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>'

      site:
        options:
          bucket: "3vot.com",
          encodePaths: true,
          maxOperations: 20

        upload: 
          [
            { src: './public/*.js', dest: "", gzip: true, access: 'public-read', headers: "Cache-Control": "max-age=1" }
            { src: './public/*.css', dest: "", gzip: true, access: 'public-read', headers: "Cache-Control": "max-age=1" }              
            { src: './public/*.html', dest: "", gzip: true, access: 'public-read', headers: "Cache-Control": "max-age=1" }
            { src: './public/images/*.*', dest: "images", gzip: false, access: 'public-read', headers: "Cache-Control": "max-age=500" }
          ]

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.loadNpmTasks('grunt-s3');  


  grunt.registerTask('upload', ["s3"]);

  grunt.registerTask('server', ['express']);
