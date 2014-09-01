/*global module:false*/
module.exports = function(grunt) {
  var packageJson = grunt.file.readJSON('package.json');
  grunt.file.defaultEncoding = 'utf8';
  grunt.config.set('jsFiles', packageJson.jsFiles);
  grunt.config.set('cssFiles', packageJson.cssFiles);
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: packageJson,
    banner: '',
    // '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    //   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    //   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: '\n;/*separator*/\n'
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      libspre: {
        files: {
          'libs/libs.js' : grunt.config.get('jsFiles').libs,
          'libs/customlibs.js' : grunt.config.get('jsFiles').customlibs,
          'libs/libs.css' : grunt.config.get('cssFiles').libs,
          'libs/customlibs.css' : grunt.config.get('cssFiles').customlibs
        }
      },
      libs: {
        files: {
          'libs/core.js' : ['libs/libs.js', 'libs/customlibs.js'],
          'libs/core.css' : ['libs/libs.css', 'libs/customlibs.css']
        }
      },
    },
    jst: {
      compile: {
        options: {
          templateSettings: {
            // interpolate : /\{\{(.+?)\}\}/g
          },
          processName: function(filename) {
            var names = filename.split('/');
            return names[names.length - 1].replace(/\.html/,'');
          }
        },
        files: {
          "src/templates.js": ["templates/*.html"]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
        // report: 'gzip',

        // sourceMap: 'libs/core.min.js.map'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      libs: {
        src: 'libs/core.js',
        dest: 'libs/core.min.js',
        
      }
    },
    cssmin: {
      libs: {
        files: {
          'libs/core.min.css': 'libs/core.css'
        }
      }
    },

    copy: {
      libs: {
        files: [
          {expand: true,flatten: true, src: ['bower_components/**/*min.js', 'bower_components/**/*min.map'], dest: 'libs/', filter: 'isFile'},
        ]
      }
    },
    clean: {
      libs: {
        src: ["libs/**"]
      }
    },


    connect: {
      server: {
        options: {
          port: 9002,
          base: '',
          hostname: '192.168.1.32',
          keepalive:true
        }
      }
    },


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.registerTask('copyLibFiles', 'copy library files', function() {
  //   grunt.util.recurse(grunt.file.readJSON('package.json').libs, function(path){
  //     var names = path.split('/');
  //     grunt.file.copy(path, 'libs/' + names[names.length - 1]);
  //   }, null)
  // });

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('refreshLibs', ['clean:libs', 'concat:libspre', 'concat:libs', 'uglify:libs', 'cssmin:libs']);

  grunt.registerTask('redo', ['jst', 'connect']);

  grunt.registerTask('initProject', 'init project', function(){
    var projectInfo = {
      projectName : grunt.config.data.pkg.name.replace('\.', '')
    }
    var basejsTemplate = grunt.file.read('.project/base.js.tpl');
    var basejs = grunt.template.process(basejsTemplate, {data: projectInfo});
    grunt.file.write('src/base.js', basejs);
  });
};
