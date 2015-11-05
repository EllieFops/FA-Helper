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

  // Project configuration.
  grunt.initConfig(
    {
      "pkg": pack,

      "buildnumber": {"options": {"field": "build"}, "files": ["package.json"]},

      "clean": {"build": ["build"], "doc": ["doc"]},

      "comments": {
        "monkey": {"src": [monkey.buildDir + monkey.outFile], "dest": monkey.buildDir + monkey.outFile},
        "chrome": {"src": [chrome.buildDir + chrome.outFile], "dest": chrome.buildDir + chrome.outFile}
      },

      "concat": {

        "options": {
          "banner": "(function() {",
          "footer": "new oct.fah.app.App();})();"
        },

        "monkey": {
          "src":  ["src/rel/monkey/tm-header.js", monkey.buildDir + monkey.outFile],
          "dest": monkey.buildDir + monkey.outFile
        },

        "chrome": {
          "src":  [chrome.buildDir + chrome.outFile],
          "dest": chrome.buildDir + chrome.outFile
        }
      },

      "copy": {
        "build": {
          "files": [

            // Chrome Copy
            {"src": ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"], "dest": chrome.buildDir + "ts/"},
            {"src": "src/rel/chrome/manifest.json", "dest": chrome.buildDir + "manifest.json"},

            // Monkey Copy
            {"src": ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"], "dest": monkey.buildDir + "ts/"}
          ]
        },
        "dist":  {
          "files": [
            {"src": monkey.buildDir + monkey.outFile, "dest": monkey.distDir + monkey.outFile},
            {"src": chrome.buildDir + chrome.outFile, "dest": chrome.distDir + chrome.outFile},
            {"expand": true, "flatten": true, "src": "src/rel/chrome/img/*", "dest": chrome.distDir + "img/"},
            {"src": chrome.buildDir + "manifest.json", "dest": chrome.distDir + "manifest.json"},
            {"expand": true, "flatten": true, "src": "build/*.css", "dest": chrome.distDir + "css/"}
          ]
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
            {"pattern": "@@build", "replacement": (parseInt(pack.build) + 1).toString()}
          ]
        },
        "monkey":  {
          "options": {
            "replacements": [
              {"pattern": "@@version", "replacement": pack.version.toString()},
              {"pattern": "@@build", "replacement": (parseInt(pack.build) + 1).toString()},
              {
                "pattern":     "@@cssText",
                "replacement": function () {
                  return grunt.file.read("build/generics.css", {"encoding": "utf-8"}).trim();
                }
              }
            ]
          },
          "src":     monkey.buildDir + monkey.outFile,
          "dest":    monkey.buildDir + monkey.outFile
        },
        "chrome":  {
          "options": {
            "replacements": [
              {"pattern": "@@version", "replacement": pack.version.toString()},
              {"pattern": "@@build", "replacement": (parseInt(pack.build) + 1).toString()}
            ]
          },
          "src":  monkey.buildDir + "manifest.json",
          "dest": monkey.buildDir + "manifest.json"
        }
      },

      "ts": {
        "options": {
          "failOnTypeErrors": true,
          "sourceMap": false
        },
        "build":   {
          "files": [
            {"src": [monkey.buildDir + "ts/**/*.ts"], "dest": monkey.buildDir + monkey.outFile},
            {"src": [chrome.buildDir + "ts/**/*.ts"], "dest": chrome.buildDir + chrome.outFile}
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
              "whitespace":               [true, "check-decl", "check-operator", "check-separator", "check-type"]
            }
          }
        },
        "monkey":  {
          "src": ["src/ts/**/*.ts", "src/rel/monkey/ts/**/*.ts"]
        },
        "chrome":  {
          "src": ["src/ts/**/*.ts", "src/rel/chrome/ts/**/*.ts"]
        }
      }
    }
  );

  grunt.loadNpmTasks("grunt-build-number");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-stripcomments");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask(
    "dev",
    [
      "clean:build",    // Clean build directory
      "copy:build",     // Copy files to build directory
      "buildnumber",    // Index Build Number
      "ts",             // Compile TS
      "less",           // Compile Less files
      "comments",       // Strip remaining comments
      "concat",         // Piece files together
      "string-replace", // Replace Tags
      "copy:dist"       // Copy to dist directory
    ]
  );

  grunt.registerTask(
    "git-prep",
    [
      "tslint" // Lint TS
    ]
  );
};
