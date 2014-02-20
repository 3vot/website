fs = require('fs');
path = require("path")
walk = require("walk")

class Helper
   
  @randomChars: (len) ->
    chars = '';

    while (chars.length < len) 
      chars += Math.random().toString(36).substring(2);

    return chars.substring(0, len);


  @onlyNew: (target) ->
    return (filepath) ->  
      #filepath is JSON file
      dir = path.dirname(filepath)
      changedRecently = false
      files = fs.readdirSync dir
      for file in files
        srcTime = fs.statSync(dir + "/" + file).mtime.getTime();
        now = new Date()
        changedRecently = true if now.getTime() - srcTime < 200000
      return changedRecently

module.exports = (grunt) ->

  org = grunt.file.readJSON("./config/organization.json")

  apiServer = "http://quiet-atoll-3343.herokuapp.com"

  grunt.initConfig
    
    clean:
      r2: ["public/**/*.js"]
      testUnit: ['./test/unit/*.html']

    copy:

      images:
        files:
          [ {expand: true, src: ['./images/*.*'], dest: "./public"} ]

    threevot_compiler: {
    },

    mochaTest: 
      test: 
        options: 
          reporter: 'spec'
        src: ['test/server/**/*.js']

    mocha:       
      test:
        src: ['./test/unit/*.html']
        options:
          log: true
          run: true
          reporter: "Spec"
          mocha:
            globals: ["jQuery*","RSpine","exports"]
            ignoreLeaks: false

    threevot_tester: 
      allTest: 
        options:
          testScripts: ["./node_modules/chai/chai.js", "./node_modules/mocha/mocha.js","./node_modules/sinon/pkg/sinon.js" ]
          testStyles: ["./node_modules/mocha/mocha.css"]
          init: "chai.should();"
          destination: "./test/unit"
          template: "./test/unit/template.eco"

      newTest: 
        options:
          testScripts: ["./node_modules/chai/chai.js", "./node_modules/mocha/mocha.js","./node_modules/sinon/pkg/sinon.js" ]
          testStyles: ["./node_modules/mocha/mocha.css"]
          init: "chai.should();"
          destination: "./test/unit"
          template: "./test/unit/template.eco"
        src: ['**/test.json'],
        cwd: './app/',
        expand: true,
        filter: Helper.onlyNew(['copy', 'newTest'])

    watch:

      apps:
        files: ["./app/**/*.coffee", "./app/**/*.eco", "./app/**/*.jeco", "./app/**/*.less"]
        tasks: ["clean:r2", "threevot_compiler"]
        livereload: true
        
      r2apps:
        files: ["./public/**/*.json"]
        tasks: ["clean:r2", "threevot_compiler"]
        livereload: true
        
      images:
        files: ["./images/*.*"]
        tasks: ["copy:images"]
        livereload: true

      test: 
        files:
          "./public/pricing.html": ["./views/pricing.jade"]
          "./public/home.html": ["./views/home.jade"]
          "./public/login.html": ["./views/login.jade"]
          "./public/index.html": ["./views/index.jade"]
          "./public/features.html": ["./views/features.jade"]
          "./public/gettingStarted.html": ["./views/gettingStarted.jade"]
          "./public/talkToUs.html": ["./views/talkToUs.jade"]
          "./public/talkToUs-thanks.html": ["./views/talkToUs-thanks.jade"]
          "./public/connect.html": ["./views/connect.jade"]
          "./public/connect-thanks.html": ["./views/connect-thanks.jade"]
          
        options:
          data:
            path: ""
            apiServer: apiServer
            marketingServer: "http://localhost:3001"
            app_url: "http://localhost:7770"

    express:
      all: 
        options:
          port: '7770',
          hostname: "0.0.0.0",
          bases: ['./public'],
          server: './server',
          livereload: true
    s3:
      options: 
        bucket: "3vot.com",
        access: 'public-read',
        key: 'AKIAIHNBUFKPBA2LINFQ',
        secret: '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'

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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express');

  grunt.loadNpmTasks('grunt-threevot-compiler');
  grunt.loadNpmTasks('grunt-threevot-tester');

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-s3');  

  grunt.registerTask("default" , ['clean:testUnit', 'threevot_tester:newTest', 'mocha'] )

  grunt.registerTask("auto_test" , ['watch:tests'] )

  grunt.registerTask("test" , ['clean:testUnit', 'threevot_tester:allTest', 'mocha'] )

  grunt.registerTask("server_test" , ['mochaTest'] )

  grunt.registerTask('build', ["jade:production", "copy" ,"s3"]);   

  grunt.registerTask('server', ["copy:images" , "clean:r2",'express', 'watch']);
