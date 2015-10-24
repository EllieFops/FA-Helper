module.exports = function (grunt)
{

  var monkeyOut = "build/monkey/monkey.js";
  var chromeOut = "build/chrome/background.js";

  // Project configuration.
  grunt.initConfig(
    {
      pkg:    grunt.file.readJSON("package.json"),
      clean:  ["build"],
      less:   {
        options: {
          compress:     true,
          optimization: 0
        },
        dev:     {
          files: {
            "dist/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>/<%= pkg.name %>-<%= pkg.version %>-<%= pkg.build %>.min.css": "src/EF.less"
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
              cwd:    "build/",
              src:    ["./**/*.js"],
              dest:   "build/",
              ext:    ".js",
              extDot: "first"
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
            separator: "\n"
          },
          src:     [
            "src/start.txt",
            "src/declarations.js",

            "src/js/app/Config.js",
            "src/js/app/Application.js",

            "src/js/component/Component.js",
            "src/js/component/ModalComponent.js",
            "src/js/component/HoverView.js",
            "src/js/component/SettingsMenu.js",
            "src/js/component/StatusBox.js",
            "src/js/component/WatchShoutForm.js",

            "src/js/controller/Controller.js",
            "src/js/controller/BrowseController.js",
            "src/js/controller/MessageController.js",
            "src/js/controller/SearchController.js",
            "src/js/controller/SubmissionController.js",

            "src/js/http/PostRequest.js",

            "src/js/util/Helpers.js",
            "src/js/util/HTML.js",
            "src/js/util/HTMLUtils.js",
            "src/js/util/Router.js",

            "rel/monkey/src/js/util/Browser.js",
            "rel/monkey/src/js/util/Storage.js",
            "src/end.txt"
          ],
          dest:    monkeyOut
        },

        chrome: {
          options: {
            separator: "\n"
          },
          src:     [
            "src/start.txt",
            "src/declarations.js",

            "src/js/app/Config.js",
            "src/js/app/Application.js",

            "src/js/component/Component.js",
            "src/js/component/ModalComponent.js",
            "src/js/component/HoverView.js",
            "src/js/component/SettingsMenu.js",
            "src/js/component/StatusBox.js",
            "src/js/component/WatchShoutForm.js",

            "src/js/controller/Controller.js",
            "src/js/controller/BrowseController.js",
            "src/js/controller/MessageController.js",
            "src/js/controller/SearchController.js",
            "src/js/controller/SubmissionController.js",

            "src/js/http/PostRequest.js",

            "src/js/util/Helpers.js",
            "src/js/util/HTML.js",
            "src/js/util/HTMLUtils.js",
            "src/js/util/Router.js",

            "rel/chrome/src/js/util/Browser.js",
            "rel/chrome/src/js/util/Storage.js",
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
          browser:   true,
          newcap:    false
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
          name:        "<%= pkg.name %>",
          description: "<%= pkg.description %>",
          version:     "<%= pkg.version %>",
          options:     {
            paths:  "src/", //"src/**/*.js",
            outdir: "doc/<%= pkg.name %>-<%= pkg.version %>/"
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

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-stripcomments");

  grunt.registerTask("default", ["clean", "jshint", "concat", "jshint", "uglify"]);

  // Tampermonkey / Greasemonkey
  grunt.registerTask("monkey", ["concat:monkey", "jshint:monkey"]);
  grunt.registerTask("chrome", ["concat:chrome", "jshint:chrome"]);

  grunt.registerTask("dev", ["jshint:pre", "clean", "monkey", "chrome", "comments", "concat:monkeyHeader"]);
};