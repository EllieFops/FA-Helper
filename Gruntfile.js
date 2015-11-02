module.exports = function (grunt) {

  var pack = grunt.file.readJSON("package.json");

  var vAppend = "-v" + pack.version.toString() + "-b" + (parseInt(pack.build) + 1).toString();

  var chrome = {
    "outFile":  "fa-helper-chrome.js",
    "distDir":  "dist/chrome/" + "v" + pack.version.toString() + "-b" + (parseInt(pack.build) + 1).toString() + "/",
    "buildDir": "build/chrome/"
  };

  var monkey = {
    "outFile":  "fa-helper-monkey" + vAppend + ".js",
    "distDir":  "dist/monkey/",
    "buildDir": "build/monkey/"
  };

  var octFAH = function () {
    var a = grunt.file.readJSON("files.json");
    return [].concat(a.app, a.component, a.controller, a.http, a.util);
  }();

  // Project configuration.
  grunt.initConfig(
    {
      "pkg": pack,

      "buildnumber": {"options": {"field": "build"}, "files": ["package.json", "manifest.json"]},

      "clean": {"build": ["build"], "doc": ["doc"]},

      "comments": {
        "monkey": {"src": [monkey.buildDir + monkey.outFile], "dest": monkey.buildDir + monkey.outFile},
        "chrome": {"src": [chrome.buildDir + chrome.outFile], "dest": chrome.buildDir + chrome.outFile}
      },

      "concat": {

        "options": {
          "footer": "new oct.fah.app.App();"
        },

        "monkey": {
          "src":  ["src/rel/monkey/tm-header.js", monkey.buildDir + monkey.outFile],
          "dest": monkey.distDir + monkey.outFile
        },

        "chrome": {
          "src":  [chrome.buildDir + chrome.outFile],
          "dest": chrome.distDir + chrome.outFile
        }
      },

      "jsbeautifier": {"options": {"js": {"indentSize": 2}}, "files": ["build/**/*.js"]},

      "jshint": {
        "options": {
          "curly":     true,
          "forin":     true,
          "eqeqeq":    true,
          "maxparams": 5,
          "nonew":     true,
          "unused":    true,
          "undef":     true,
          "browser":   true,
          "newcap":    false
        },

        "preMonkey": {
          "options": {"globals": {"GM_openInTab": true, "GM_getValue": true, "GM_setValue": true}},
          "src":     monkey.buildDir + "**/*.js"
        },

        "preChrome": {
          "options": {"globals": {"chrome": true}},
          "src":     chrome.buildDir + "**/*.js"
        },

        "monkey": {
          "options": {"globals": {"GM_openInTab": true, "GM_getValue": true, "GM_setValue": true}},
          "src":     monkey.distDir + monkey.outFile
        },
        "chrome": {
          "options": {"globals": {"chrome": true}},
          "src":     chrome.distDir + chrome.outFile
        }
      },

      "less": {
        "dev": {
          "options": {
            compress: true
          },
          "files":   {
            "build/generics.css": ["src/less/generics.less"]
          }
        }
      },

      "string-replace": {
        "options": {
          "replacements": [
            {"pattern": "@@version", "replacement": pack.version.toString()},
            {"pattern": "@@build", "replacement": (parseInt(pack.build) + 1).toString()},
            {
              "pattern":     "@@svg-gear",
              "replacement": function () {
                "use strict";
                return grunt.file.read("src/img/gear.svg", {"encoding": "utf-8"});
              }
            }
          ]
        },
        "monkey":  {
          "options": {
            "replacements": [
              {
                "pattern":     "@@cssText",
                "replacement": function () {
                  return grunt.file.read("build/generics.css", {"encoding": "utf-8"});
                }
              }
            ]
          },
          "src":     [monkey.distDir + monkey.outFile],
          "dest":    monkey.distDir + monkey.outFile
        },
        "chrome":  {
          "src": [monkey.distDir + "**/*.js"],
          dest:  monkey.distDir
        }
      },

      "ts": {
        "build": {
          "files": [
            {"src": ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"], "dest": monkey.buildDir + monkey.outFile},
            {"src": ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"], "dest": chrome.buildDir + chrome.outFile}
          ]
        }
      },

      "tslint": {
        "options": {
          "configuration": {
            "rules": {
              "align":           [true, "parameters", "arguments", "statements"],
              "class-name":      true,
              "comment-format":  [true, "check-space", "check-uppercase"],
              "curly":           true,
              "eofline":         true,
              "forin":           true,
              "indent":          [true, "spaces"],
              "jsdoc-format":    true,
              "max-line-length": [true, 120],
              "member-access":   true,
              "member-ordering": [true, "variables-before-functions", "public-before-private"],

              "no-any":                    true,
              "no-conditional-assignment": true,
              "no-constructor-vars":       true,
              "no-duplicate-key":          true,
              "no-duplicate-variable":     true,
              "no-eval":                   true,
              "no-internal-module":        true,

              "quotemark":                [true, "double"],
              "semicolon":                true,
              "sort-object-literal-keys": true,
              "switch-default":           true,
              "triple-equals":            true,
              "typedef":                  [
                true,
                "call-signature",
                "parameter",
                "property-declaration",
                "variable-declaration",
                "member-variable-declaration"
              ],
              "typedef-whitespace":       [
                true,
                {
                  "call-signature":       "nospace",
                  "parameter":            "nospace",
                  "property-declaration": "nospace",
                  "variable-declaration": "nospace"
                }
              ],
              "variable-name":            [true, "allow-leading-underscore"],
              "whitespace":               [true, "check-decl", "check-operator", "check-separator", "check-type"],
            }
          }
        },
        "monkey":  {
          "src": ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"]
        },
        "chrome":  {
          "src": ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"]
        }
      },

      "uglify": {
        "options": {"beautify": true, "quoteStyle": 2, "screwIE8": true},
        "build":   {
          "files": [
            {
              "expand": true,
              "cwd":    "build/",
              "src":    ["./**/*.js"],
              "dest":   "build/",
              "ext":    ".js",
              "extDot": "first"
            }
          ]
        }
      },

      "jasmine": {
        "unit": {
          "src":     ["src/declarations.js"].concat(octFAH),
          "options": {
            "specs": "test/jasmine/**/*.spec.js"
          }
        }
      }
    }
  );

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-ts");
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
      "clean:build",
      "buildnumber",    // Index Build Number
      "ts",     // Compile TS
      "jsbeautifier",   // Sort Out Formatting
//      "jshint:preMonkey",     // Pre-Check JS (no env specific checks)
//      "jshint:preChrome",     // Pre-Check JS (no env specific checks)
      "less",
      "comments",
      "concat",         // Piece files together, copy to dist directory
      "string-replace" // Replace Tags
//      "jshint:monkey",  // Check Monkey Env Build
//      "jshint:chrome"   // Check Chrome Env Build
    ]
  );

  grunt.registerTask(
    "git-prep",
    [
      "tslint" // Lint TS
    ]
  );
};
