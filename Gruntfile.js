module.exports = function (grunt) {

  var pack = grunt.file.readJSON("package.json");

  var vAppend = "-v" + pack.version.toString() + "-b" + (parseInt(pack.build) + 1).toString();

  var chrome = {
    outFile:  "fa-helper-chrome.js",
    distDir:  "dist/chrome/" + "-v" + pack.version.toString() + "-b" + (parseInt(pack.build) + 1).toString() + "/",
    buildDir: "build/chrome/"
  };

  var monkey = {
    outFile:  "fa-helper-monkey" + vAppend + ".js",
    distDir:  "dist/monkey/",
    buildDir: "build/monkey/"
  };

  var octFAH = function () {
    var a = grunt.file.readJSON("files.json");
    return [].concat(a.app, a.component, a.controller, a.http, a.util);
  }();

  // Project configuration.
  grunt.initConfig(
    {
      pkg: pack,

      buildnumber: {options: {field: "build"}, files: ["package.json", "manifest.json"]},

      clean: {build: ["build"], doc: ["doc"]},

      concat: {

        monkey: {
          src:  [].concat("rel/monkey/tm-header.js", "src/start.txt", monkey.buildDir + "**/*.js", "src/end.txt"),
          dest: monkey.distDir + monkey.outFile
        },

        chrome: {
          src:  [].concat("src/start.txt", chrome.buildDir + "**/*.js", "src/end.txt"),
          dest: chrome.distDir + chrome.outFile
        }
      },

      less: {
        "dev": {
          options: {

          },
          files: {
            "build/generic.css": "src/less/generic.less"
          }
        }
      },

      tslint: {
        options: {
          configuration: {
            rules: {
              "align":                     [true, "parameters", "arguments", "statements"],
              "class-name":                true,
              "comment-format":            [true, "check-space", "check-uppercase"],
              "curly":                     true,
              "eofline":                   true,
              "forin":                     true,
              "indent":                    [true, "spaces"],
              "jsdoc-format":              true,
              "max-line-length":           [true, 120],
              "member-access":             true,
              "member-ordering":           [true, "variables-before-functions", "public-before-private"],
              "no-any":                    true,
              "no-conditional-assignment": true,
              "no-constructor-vars":       true,
              "no-duplicate-key":          true,
              "no-duplicate-variable":     true,
              "no-eval":                   true,
              "no-internal-module":        true,
              "quotemark":                 [true, "double"],
              "semicolon":                 true,
              "sort-object-literal-keys":  true,
              "switch-default":            true,
              "triple-equals":             true,
              "typedef":                   [
                true,
                "call-signature",
                "parameter",
                "property-declaration",
                "variable-declaration",
                "member-variable-declaration"
              ],
              "typedef-whitespace":        [
                true,
                {
                  "call-signature":       "nospace",
                  "parameter":            "nospace",
                  "property-declaration": "nospace",
                  "variable-declaration": "nospace"
                }
              ],
              "variable-name":             [true, "allow-leading-underscore"],
              "whitespace":                [true, "check-decl", "check-operator", "check-separator", "check-type"],
            }
          }
        },
        monkey:  {
          src: ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"]
        },
        chrome:  {
          src: ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"]
        }
      },

      typescript: {
        monkey: {
          src: ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"]
        },
        chrome: {
          src: ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"]
        }
      },

      uglify: {
        options: {beautify: true, quoteStyle: 2, screwIE8: true},
        build:   {
          files: [{expand: true, cwd: "build/", src: ["./**/*.js"], dest: "build/", ext: ".js", extDot: "first"}]
        }
      },

      "string-replace": {
        monkey: {
          options: {
            replacements: [
              {pattern: "@@version", replacement: pack.version.toString()},
              {pattern: "@@oct-css", replacement: function() {return grunt.file.read("build/generics.css", {encoding: "utf-8"});}}
            ]
          },
          build:   {src: [monkey.distDir + monkey.outFile], dest: monkey.distDir + monkey.outFile}
        },
        chrome: {}
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

        pre:    {options: {globals: {"oct": true}}, src: "src/ts/**/*.js"},
        monkey: {
          options: {globals: {"GM_openInTab": true, "GM_getValue": true, "GM_setValue": true}},
          src:     monkey.distDir + monkey.outFile
        },
        chrome: {
          options: {globals: {"chrome": true}},
          src:     chrome.distDir + chrome.outFile
        }
      },

      comments: {
        monkey: {src: ["src/ts/**/*.js", "src/rel/monkey/js/**/*.js"], dest: monkey.buildDir},
        chrome: {src: ["src/ts/**/*.js", "src/rel/chrome/js/**/*.js"], dest: chrome.buildDir}
      },

      jsbeautifier: {options: {js: {indentSize: 2}}, files: ["build/**/*.js"]},

      jasmine: {
        unit: {
          src:     ["src/declarations.js"].concat(octFAH),
          options: {
            specs: "test/jasmine/**/*.spec.js"
          }
        }
      }
    }
  );

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-typescript");
  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-build-number");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-stripcomments");
  grunt.loadNpmTasks("grunt-contrib-less");

  grunt.registerTask("default", "jshint");

  grunt.registerTask(
    "dev",
    [
      "buildnumber",    // Index Build Number
      "typescript",     // Compile TS
      "jshint:pre",     // Pre-Check JS (no env specific checks)
      "less",
      "comments",       // Strip comments and copy to build directory
      "jsbeautifier",   // Sort Out Formatting
      "concat",         // Piece files together, copy to dist directory
      "string-replace", // Replace Tags
      "jshint:monkey",  // Check Monkey Env Build
      "jshint:chrome"   // Check Chrome Env Build
    ]
  );

  grunt.registerTask(
    "git-prep",
    [
      "tslint" // Lint TS
    ]
  );
};