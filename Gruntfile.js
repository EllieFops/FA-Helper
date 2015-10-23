module.exports = function (grunt)
{

  var monkeyOut = "build/monkey/monkey.js";
  var chromeOut = "build/chrome/background.js";

  // Project configuration.
  grunt.initConfig(
    {
      pkg:    grunt.file.readJSON('package.json'),
      clean:  ['build'],
      less:   {
        options: {
          compress:     true,
          optimization: 0
        },
        dev:     {
          files: {
            'dist/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>.min.css': 'src/EF.less'
          }
        }
      },

      uglify: {
        options: {
          beautify: true,
          quoteStyle: 2,
          screwIE8:   true
        },

        build:   {
          files: [
            {
              expand: true,
              cwd:    'build/',
              src:    ['./**/*.js'],
              dest:   'build/',
              ext:    '.js',
              extDot: 'first'
            }
          ]
        }
      },

      concat: {

        monkeyHeader : {
          src: ["rel/monkey/src/js/tm-header.js", monkeyOut],
          dest: monkeyOut
        },

        monkey: {
          options: {
            separator: '\n'
          },
          src:     [
            "src/start.txt",
            "src/declarations.js",
            "src/js/**/*.js",
            "rel/monkey/src/js/util/*.js",
            "src/end.txt"
          ],
          dest:    monkeyOut
        },

        chrome: {
          options: {
            separator: '\n'
          },
          src:     [
            "src/start.txt",
            "src/declarations.js",
            "src/js/**/*.js",
            "rel/chrome/src/js/util/*.js",
            "src/end.txt"
          ],
          dest:    chromeOut
        }
      },

      jshint: {
        options: {
          curly:     true,
          forin:     true,
          eqeqeq:    true,
          maxparams: 5,
          nonew:     true,
          unused:    true,
          undef:     true,
          browser:   true
        },

        pre: {
          options: {
            globals: {
              "octFAH": true
            }
          },
          src: "src/js/**/*.js"
        },

        monkey: {
          options: {
            globals: {
              "GM_openInTab": true,
              "GM_getValue":  true,
              "GM_setValue":  true
            }
          },
          src:     monkeyOut
        },

        chrome: {
          options: {
            globals: {
              "chrome": true
            }
          },
          src: chromeOut
        }
      },

      yuidoc: {
        compile: {
          name:        '<%= pkg.name %>',
          description: '<%= pkg.description %>',
          version:     '<%= pkg.version %>',
          options:     {
            paths:  'src/', //'src/**/*.js',
            outdir: 'doc/<%= pkg.name %>-<%= pkg.version %>/'
          }
        }
      },

      comments: {
        monkey: {
          src: monkeyOut
        },
        chrome: {
          src: chromeOut
        }
      }
    }
  );

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-stripcomments");

  grunt.registerTask('default', ['clean', "jshint", 'concat', "jshint", 'uglify']);

  // Tampermonkey / Greasemonkey
  grunt.registerTask("monkey", ["concat:monkey", "jshint:monkey"]);
  grunt.registerTask("chrome", ["concat:chrome", "jshint:chrome"]);

  grunt.registerTask("dev", ["jshint:pre", "clean", "monkey", "chrome", "comments", "concat:monkeyHeader"]);
};