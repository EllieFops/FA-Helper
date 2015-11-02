var content = '// ==UserScript==\n' +
'// @name         L-E\'s FA Helper\n' +
'// @version      @@version\n' +
'// @description  Useful tools to improve your FA experience.\n' +
'// @author       Elizabeth Harper <elliefops@gmail.com>\n' +
'// @match        https://www.furaffinity.net/*\n' +
'// @match        http://www.furaffinity.net/*\n' +
'// @supportURL   https://github.com/EllieFops/FA-Helper/issues\n' +
'// @homepage     https://github.com/EllieFops/FA-Helper\n' +
'// @grant        GM_openInTab\n' +
'// @grant        GM_setValue\n' +
'// @grant        GM_getValue\n' +
'// ==/UserScript==\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var OctObject = (function() {\n' +
'    function OctObject() {\n' +
'      this.interfaces = {\n' +
'        "OctObjectInterface": true\n' +
'      };\n' +
'    }\n' +
'    OctObject.prototype.isImplementationOf = function(name) {\n' +
'      return this.interfaces[name] || false;\n' +
'    };\n' +
'    OctObject.prototype.implementationOf = function(name) {\n' +
'      this.interfaces[name] = true;\n' +
'    };\n' +
'    return OctObject;\n' +
'  })();\n' +
'  oct.OctObject = OctObject;\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var util;\n' +
'    (function(util) {\n' +
'      var Router = (function() {\n' +
'        function Router() {\n' +
'          this.routes = {};\n' +
'        }\n' +
'        Router.prototype.register = function(route, controller) {\n' +
'          this.routes[route] = controller;\n' +
'          return this;\n' +
'        };\n' +
'        Router.prototype.route = function(path) {\n' +
'          if (typeof this.routes[path] !== "undefined") {\n' +
'            this.routes[path].init();\n' +
'            this.routes[path].run();\n' +
'          }\n' +
'        };\n' +
'        return Router;\n' +
'      })();\n' +
'      util.Router = Router;\n' +
'    })(util = fah.util || (fah.util = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var wrap;\n' +
'  (function(wrap) {\n' +
'    var OctWrap = (function() {\n' +
'      function OctWrap(element) {\n' +
'        this.htmlElement = element;\n' +
'      }\n' +
'      OctWrap.prototype.dropClasses = function(c) {\n' +
'        var list, index;\n' +
'        list = this.htmlElement.classList;\n' +
'        for (index = 0; index < c.length; index++) {\n' +
'          list.remove(c[index]);\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.addClasses = function(c) {\n' +
'        var list, index;\n' +
'        list = this.htmlElement.classList;\n' +
'        for (index = 0; index < c.length; index++) {\n' +
'          list.add(c[index]);\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.addClass = function(c) {\n' +
'        this.htmlElement.classList.add(c);\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.getAfter = function() {\n' +
'        var a = this.htmlElement.nextSibling;\n' +
'        return (a) ? new OctWrap(a) : null;\n' +
'      };\n' +
'      OctWrap.prototype.setAfter = function(e) {\n' +
'        var a = this.getElement().nextSibling;\n' +
'        if (!a) {\n' +
'          if (e instanceof OctWrap) {\n' +
'            this.getElement().parentElement.appendChild(e.getElement());\n' +
'          } else if (e instanceof Node) {\n' +
'            this.getElement().parentElement.appendChild(e);\n' +
'          }\n' +
'        } else if (a instanceof Node) {\n' +
'          if (e instanceof OctWrap) {\n' +
'            this.getElement().parentElement.insertBefore(e.getElement(), a);\n' +
'          } else if (e instanceof Node) {\n' +
'            this.getElement().parentElement.insertBefore(e, a);\n' +
'          }\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.append = function(c) {\n' +
'        var i;\n' +
'        if (c instanceof Array) {\n' +
'          for (i = 0; i < c.length; i++) {\n' +
'            if (c[i] instanceof OctWrap) {\n' +
'              this.getElement().appendChild(c[i].getElement());\n' +
'            } else if (c[i] instanceof Node) {\n' +
'              this.append(c[i]);\n' +
'            }\n' +
'          }\n' +
'        } else {\n' +
'          if (c instanceof OctWrap) {\n' +
'            this.getElement().appendChild(c.getElement());\n' +
'          } else if (c instanceof Node) {\n' +
'            this.getElement().appendChild(c);\n' +
'          }\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.appendTo = function(p) {\n' +
'        var e;\n' +
'        if (typeof p === "string") {\n' +
'          e = document.querySelector(p);\n' +
'          if (e) {\n' +
'            e.appendChild(this.getElement());\n' +
'          }\n' +
'        } else if (p instanceof Node) {\n' +
'          new OctWrap(p).append(this);\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.getAttribute = function(k) {\n' +
'        return this.getElement().getAttribute(k);\n' +
'      };\n' +
'      OctWrap.prototype.setAttribute = function(k, v) {\n' +
'        var i;\n' +
'        if (typeof k === "string") {\n' +
'          this.getElement().setAttribute(k, v);\n' +
'        }\n' +
'        if (k instanceof Object) {\n' +
'          for (i in k) {\n' +
'            if (!k.hasOwnProperty(i)) {\n' +
'              continue;\n' +
'            }\n' +
'            this.getElement().setAttribute(i, k[i]);\n' +
'          }\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.getBefore = function() {\n' +
'        var a = this.getElement().previousSibling;\n' +
'        return (a) ? new OctWrap(a) : null;\n' +
'      };\n' +
'      OctWrap.prototype.setBefore = function(e) {\n' +
'        if (e instanceof OctWrap) {\n' +
'          this.getElement().parentElement.insertBefore(e.getElement(), this.getElement());\n' +
'        } else if (e instanceof Node) {\n' +
'          this.getElement().parentElement.insertBefore(e, this.getElement());\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.change = function(f) {\n' +
'        this.getElement().addEventListener("change", f);\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.children = function(s) {\n' +
'        var l;\n' +
'        if (!this.getElement().hasChildNodes()) {\n' +
'          return null;\n' +
'        }\n' +
'        if (typeof s === "string") {\n' +
'          l = this.getElement().querySelectorAll(s);\n' +
'        } else {\n' +
'          l = this.getElement().children;\n' +
'        }\n' +
'        return new OctWrapElementSet(l);\n' +
'      };\n' +
'      OctWrap.prototype.doClick = function() {\n' +
'        this.getElement().click();\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.click = function(e) {\n' +
'        this.getElement().addEventListener("click", e);\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.dropClass = function(c) {\n' +
'        var list, index;\n' +
'        list = this.getElement().classList;\n' +
'        if (c instanceof Array) {\n' +
'          for (index = 0; index < c.length; index++) {\n' +
'            if (list.contains(c[index])) {\n' +
'              list.remove(c[index]);\n' +
'            }\n' +
'          }\n' +
'        } else if (typeof c === "string") {\n' +
'          if (list.contains(c)) {\n' +
'            list.remove(c);\n' +
'          }\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.find = function(s) {\n' +
'        return new OctWrapElementSet(this.getElement().querySelectorAll(s));\n' +
'      };\n' +
'      OctWrap.prototype.getElement = function() {\n' +
'        return this.getElement();\n' +
'      };\n' +
'      OctWrap.prototype.getHTML = function() {\n' +
'        return this.getElement().innerHTML;\n' +
'      };\n' +
'      OctWrap.prototype.setHTML = function(x) {\n' +
'        this.getElement().innerHTML = x;\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.input = function(e) {\n' +
'        this.getElement().addEventListener("input", e);\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.matches = function(s, r) {\n' +
'        var mat, web, moz;\n' +
'        if (typeof r === "undefined") {\n' +
'          r = this.getElement();\n' +
'        }\n' +
'        mat = "matches";\n' +
'        if (r[mat] === "function") {\n' +
'          return r[mat](s);\n' +
'        }\n' +
'        web = "webkitMatchesSelector";\n' +
'        if (typeof r[web] === "function") {\n' +
'          return r[web](s);\n' +
'        }\n' +
'        moz = "mozMatchesSelector";\n' +
'        if (typeof r[moz] === "function") {\n' +
'          return r[moz](s);\n' +
'        }\n' +
'        if (typeof r.msMatchesSelector === "function") {\n' +
'          return r.msMatchesSelector(s);\n' +
'        }\n' +
'        return false;\n' +
'      };\n' +
'      OctWrap.prototype.getParent = function() {\n' +
'        return new OctWrap(this.getElement().parentNode);\n' +
'      };\n' +
'      OctWrap.prototype.setParent = function(q) {\n' +
'        var parent, i;\n' +
'        parent = this.getElement().parentNode;\n' +
'        for (i = 0; i < 300; i++) {\n' +
'          if (this.matches(q, parent)) {\n' +
'            return new OctWrap(parent);\n' +
'          }\n' +
'          parent = parent.parentNode;\n' +
'        }\n' +
'        return null;\n' +
'      };\n' +
'      OctWrap.prototype.style = function(s) {\n' +
'        var i, c;\n' +
'        c = this.getElement().style;\n' +
'        for (i in s) {\n' +
'          if (!s.hasOwnProperty(i)) {\n' +
'            continue;\n' +
'          }\n' +
'          if (typeof c[i] !== "undefined") {\n' +
'            c[i] = s[i];\n' +
'          }\n' +
'        }\n' +
'        return this;\n' +
'      };\n' +
'      OctWrap.prototype.getValue = function() {\n' +
'        return this.getElement().value;\n' +
'      };\n' +
'      OctWrap.prototype.setValue = function(v) {\n' +
'        this.getElement().value = v;\n' +
'        return this;\n' +
'      };\n' +
'      return OctWrap;\n' +
'    })();\n' +
'    wrap.OctWrap = OctWrap;\n' +
'    var OctWrapElementSet = (function() {\n' +
'      function OctWrapElementSet(a) {\n' +
'        var i;\n' +
'        if (a instanceof NodeList) {\n' +
'          this.collection = new Array(a.length);\n' +
'          for (i = 0; i < a.length; i++) {\n' +
'            this.collection[i] = (a.item(i));\n' +
'          }\n' +
'        }\n' +
'        this.pointer = 0;\n' +
'      }\n' +
'      OctWrapElementSet.prototype.hasNext = function() {\n' +
'        return (this.collection.length > this.pointer + 1);\n' +
'      };\n' +
'      OctWrapElementSet.prototype.next = function() {\n' +
'        return new OctWrap(this.nextRaw());\n' +
'      };\n' +
'      OctWrapElementSet.prototype.nextRaw = function() {\n' +
'        this.pointer++;\n' +
'        return this.collection[this.pointer - 1];\n' +
'      };\n' +
'      OctWrapElementSet.prototype.first = function() {\n' +
'        this.pointer = 0;\n' +
'        return this.next();\n' +
'      };\n' +
'      OctWrapElementSet.prototype.firstRaw = function() {\n' +
'        this.pointer = 0;\n' +
'        return this.nextRaw();\n' +
'      };\n' +
'      OctWrapElementSet.prototype.last = function() {\n' +
'        this.pointer = this.collection.length - 1;\n' +
'        return this.next();\n' +
'      };\n' +
'      OctWrapElementSet.prototype.lastRaw = function() {\n' +
'        this.pointer = this.collection.length - 1;\n' +
'        return this.nextRaw();\n' +
'      };\n' +
'      return OctWrapElementSet;\n' +
'    })();\n' +
'  })(wrap = oct.wrap || (oct.wrap = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var wrap;\n' +
'  (function(wrap) {\n' +
'    var OctWrapFactory = (function() {\n' +
'      function OctWrapFactory() {}\n' +
'      OctWrapFactory.prototype.wrapNode = function(element) {\n' +
'        return new wrap.OctWrap(element);\n' +
'      };\n' +
'      OctWrapFactory.prototype.wrap = function(element) {\n' +
'        if (element instanceof Node) {\n' +
'          return this.wrapNode(element);\n' +
'        }\n' +
'        if (element instanceof wrap.OctWrap) {\n' +
'          return element;\n' +
'        }\n' +
'        if (typeof element === "string") {\n' +
'          if (element.substr(0, 1) === "<" && element.slice(-1) === ">") {\n' +
'            return this.wrapNew(element);\n' +
'          }\n' +
'          return this.wrapSelector(element);\n' +
'        }\n' +
'        return null;\n' +
'      };\n' +
'      OctWrapFactory.prototype.wrapSelector = function(element) {\n' +
'        var e = document.querySelector(element);\n' +
'        if (e) {\n' +
'          return new wrap.OctWrap(e);\n' +
'        }\n' +
'        return null;\n' +
'      };\n' +
'      OctWrapFactory.prototype.wrapNew = function(element) {\n' +
'        var ret, regex, orig, filtered, charVal, index, tAttr, tVal, tEquals;\n' +
'        charVal = /^[a-zA-Z]$/;\n' +
'        regex = new RegExp("<([-\w]+)|((?:\.|#)[-\w]+)|([-\w]+\s*=\s*(\"|\')" +\n' +
'                           "(?:\\+\4|[^\4])*?\4)|([-\w]+\s*=\s*[-\w]+)|(>[^<]+<)|(\s[-\w]+\s)", "g");\n' +
'        orig = element.split(regex);\n' +
'        filtered = [];\n' +
'        for (index = 0; index < orig.length; index++) {\n' +
'          if (typeof orig[index] !== "undefined" && (orig[index].length > 1 || charVal.test(orig[index]))) {\n' +
'            filtered.push(orig[index]);\n' +
'          }\n' +
'        }\n' +
'        ret = new wrap.OctWrap(document.createElement(filtered.shift()));\n' +
'        for (index = 0; index < filtered.length; index++) {\n' +
'          if (filtered[index].indexOf(".") === 0) {\n' +
'            ret.addClass(filtered[index].substr(1));\n' +
'            continue;\n' +
'          }\n' +
'          if (filtered[index].indexOf("#") === 0) {\n' +
'            ret.setAttribute("id", filtered[index].substr(1));\n' +
'            continue;\n' +
'          }\n' +
'          if (filtered[index].indexOf("/") === 0) {\n' +
'            continue;\n' +
'          }\n' +
'          if (filtered[index].indexOf(">") === 0) {\n' +
'            ret.setHTML(filtered[index].slice(1, -1));\n' +
'            continue;\n' +
'          }\n' +
'          tEquals = filtered[index].indexOf("=");\n' +
'          if (tEquals !== -1) {\n' +
'            tAttr = filtered[index].substring(0, tEquals).trim();\n' +
'            tVal = filtered[index].substring(tEquals + 1).trim();\n' +
'            if (tVal.indexOf("\'") === 0 || tVal.indexOf("\"") === 0) {\n' +
'              tVal = tVal.slice(1, -1);\n' +
'            }\n' +
'            if (tAttr.length > 0) {\n' +
'              if (tAttr === "class") {\n' +
'                ret.addClass(tVal);\n' +
'              } else {\n' +
'                ret.setAttribute(tAttr, tVal);\n' +
'              }\n' +
'            }\n' +
'            continue;\n' +
'          }\n' +
'          filtered[index] = filtered[index].trim();\n' +
'          ret.setAttribute(filtered[index], filtered[index]);\n' +
'        }\n' +
'        return ret;\n' +
'      };\n' +
'      return OctWrapFactory;\n' +
'    })();\n' +
'    wrap.OctWrapFactory = OctWrapFactory;\n' +
'  })(wrap = oct.wrap || (oct.wrap = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var util;\n' +
'    (function(util) {\n' +
'      var help;\n' +
'      (function(help) {\n' +
'        var FormHelper = (function() {\n' +
'          function FormHelper(app) {\n' +
'            this.app = app;\n' +
'          }\n' +
'          FormHelper.prototype.wrapperLabel = function(e, t, b) {\n' +
'            var l, s;\n' +
'            l = this.app.getOctWrapFactory().wrapNew("<label>");\n' +
'            s = this.app.getOctWrapFactory().wrapNew("<span>").setHTML(t);\n' +
'            if (b === false) {\n' +
'              l.append([e, s]);\n' +
'            } else {\n' +
'              l.append([s, e]);\n' +
'            }\n' +
'            s = null;\n' +
'            if (e instanceof oct.wrap.OctWrap) {\n' +
'              return l;\n' +
'            }\n' +
'          };\n' +
'          return FormHelper;\n' +
'        })();\n' +
'        var HTML = (function() {\n' +
'          function HTML(app) {\n' +
'            this.app = app;\n' +
'            this.FORM = new FormHelper(app);\n' +
'          }\n' +
'          return HTML;\n' +
'        })();\n' +
'        help.HTML = HTML;\n' +
'      })(help = util.help || (util.help = {}));\n' +
'    })(util = fah.util || (fah.util = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var app;\n' +
'    (function(app) {\n' +
'      var StaticConfig = (function() {\n' +
'        function StaticConfig() {\n' +
'          this._basePage = "//www.furaffinity.net/";\n' +
'          this._browsePage = "//www.furaffinity.net/browse/";\n' +
'          this._viewPage = "//www.furaffinity.net/view/";\n' +
'          this._subPage = "//www.furaffinity.net/msg/submissions/";\n' +
'          this._userPage = "//www.furaffinity.net/user/";\n' +
'          this._searchPage = "//www.furaffinity.net/search/";\n' +
'          this._messagesPage = "//www.furaffinity.net/msg/others/";\n' +
'          this._previewPage = "//t.facdn.net/";\n' +
'        }\n' +
'        Object.defineProperty(StaticConfig.prototype, "basePage", {\n' +
'          get: function() {\n' +
'            return this._basePage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "browsePage", {\n' +
'          get: function() {\n' +
'            return this._browsePage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "viewPage", {\n' +
'          get: function() {\n' +
'            return this._viewPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "subPage", {\n' +
'          get: function() {\n' +
'            return this._subPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "userPage", {\n' +
'          get: function() {\n' +
'            return this._userPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "searchPage", {\n' +
'          get: function() {\n' +
'            return this._searchPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "messagesPage", {\n' +
'          get: function() {\n' +
'            return this._messagesPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        Object.defineProperty(StaticConfig.prototype, "previewPage", {\n' +
'          get: function() {\n' +
'            return this._previewPage;\n' +
'          },\n' +
'          enumerable: true,\n' +
'          configurable: true\n' +
'        });\n' +
'        return StaticConfig;\n' +
'      })();\n' +
'      app.StaticConfig = StaticConfig;\n' +
'    })(app = fah.app || (fah.app = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var app;\n' +
'    (function(app) {\n' +
'      var boot;\n' +
'      (function(boot) {\n' +
'        var CSSInjector = (function() {\n' +
'          function CSSInjector() {}\n' +
'          CSSInjector.injectCSS = function() {\n' +
'            var s = document.createElement("style");\n' +
'            s.type = "text/css";\n' +
'            s.innerHTML = this.cssText;\n' +
'            document.querySelector("head").appendChild(s);\n' +
'          };\n' +
'          CSSInjector.cssText = ".octCurtain{position:fixed;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:9999;background:#ddd;opacity:.7;display:none}.octAlignRight{text-align:right}.octShoutForm{font-size:1.1em}.octShoutForm label span:first-child{display:block}.octSubHeading{font-size:1.3em}.octModalContainer{position:fixed;display:none;z-index:10000;border:2px solid #666;border-radius:4px;background:#fafafa;width:600px;height:400px;margin-top:-202px;margin-left:-302px;top:50%;left:50%;-webkit-box-shadow:2px 2px 12px 0 rgba(0,0,0,0.5);-moz-box-shadow:2px 2px 12px 0 rgba(0,0,0,0.5);box-shadow:2px 2px 12px 0 rgba(0,0,0,0.5)}.octModalContainer.show{display:block}.octModalContainer .octContent{top:5px;left:5px;right:5px;bottom:5px;padding:5px;position:relative;border:1px solid #888}.octOverlay{position:absolute}.octOverlay.show{display:block}.octHoverPreview{z-index:10000;display:none;border:2px solid #888;border-radius:4px}.octTab .octTabRow{list-style:none;padding:0}.octTab .octTabHead{display:inline-block;padding:10px 20px;font-size:1.1em;text-transform:uppercase;border:1px solid #777;border-bottom-width:0;border-top-right-radius:3px;border-top-left-radius:3px}.octTab .octTabHead.selected{background:#feffff;background:-moz-linear-gradient(top, #feffff 0, #f4f4f4 12%, #fff 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(0, #feffff), color-stop(12%, #f4f4f4), color-stop(100%, #fff));background:-webkit-linear-gradient(top, #feffff 0, #f4f4f4 12%, #fff 100%);background:-o-linear-gradient(top, #feffff 0, #f4f4f4 12%, #fff 100%);background:-ms-linear-gradient(top, #feffff 0, #f4f4f4 12%, #fff 100%);background:linear-gradient(to bottom, #feffff 0, #f4f4f4 12%, #fff 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#feffff\', endColorstr=\'#ffffff\', GradientType=0)}.octTab .octTabHead.deselected{background:#feffff;background:-moz-linear-gradient(top, #feffff 75%, #f4f4f4 100%);background:-webkit-gradient(linear, left top, left bottom, color-stop(75%, #feffff), color-stop(100%, #f4f4f4));background:-webkit-linear-gradient(top, #feffff 75%, #f4f4f4 100%);background:-o-linear-gradient(top, #feffff 75%, #f4f4f4 100%);background:-ms-linear-gradient(top, #feffff 75%, #f4f4f4 100%);background:linear-gradient(to bottom, #feffff 75%, #f4f4f4 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#feffff\', endColorstr=\'#f4f4f4\', GradientType=0)}.octTab .octTabBody.selected{display:block}.octTab .octTabBody.deselected{display:none}";\n' +
'          return CSSInjector;\n' +
'        })();\n' +
'        boot.CSSInjector = CSSInjector;\n' +
'      })(boot = app.boot || (app.boot = {}));\n' +
'    })(app = fah.app || (fah.app = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var __extends = (this && this.__extends) || function(d, b) {\n' +
'    for (var p in b)\n' +
'      if (b.hasOwnProperty(p)) d[p] = b[p];\n' +
'    function __() {\n' +
'      this.constructor = d;\n' +
'    }\n' +
'    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n' +
'  };\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var Controller = (function(_super) {\n' +
'        __extends(Controller, _super);\n' +
'        function Controller(app) {\n' +
'          this.implementationOf("ControllerInterface");\n' +
'          this.app = app;\n' +
'          _super.call(this);\n' +
'        }\n' +
'        Controller.prototype.init = function() {};\n' +
'        Controller.prototype.run = function() {};\n' +
'        return Controller;\n' +
'      })(oct.OctObject);\n' +
'      controller.Controller = Controller;\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var Component = (function(_super) {\n' +
'        __extends(Component, _super);\n' +
'        function Component(element) {\n' +
'          _super.call(this);\n' +
'          this.htmlElement = element;\n' +
'        }\n' +
'        Component.prototype.getElement = function() {\n' +
'          return this.htmlElement;\n' +
'        };\n' +
'        return Component;\n' +
'      })(oct.OctObject);\n' +
'      component.Component = Component;\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var UIComponent = (function(_super) {\n' +
'        __extends(UIComponent, _super);\n' +
'        function UIComponent(app, element) {\n' +
'          this.implementationOf("UIComponentInterface");\n' +
'          this.app = app;\n' +
'          _super.call(this, element);\n' +
'          this.init();\n' +
'        }\n' +
'        UIComponent.prototype.show = function() {\n' +
'          this.htmlElement.style.display = "inherit";\n' +
'        };\n' +
'        UIComponent.prototype.hide = function() {\n' +
'          this.htmlElement.style.display = "none";\n' +
'        };\n' +
'        UIComponent.prototype.init = function() {};\n' +
'        return UIComponent;\n' +
'      })(component.Component);\n' +
'      component.UIComponent = UIComponent;\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var overlay;\n' +
'      (function(overlay) {\n' +
'        var OverlayComponent = (function(_super) {\n' +
'          __extends(OverlayComponent, _super);\n' +
'          function OverlayComponent(app, element) {\n' +
'            this.implementationOf("OverlayComponentInterface");\n' +
'            _super.call(this, app, element);\n' +
'          }\n' +
'          OverlayComponent.prototype.topLeft = function(x, y) {\n' +
'            this.htmlElement.style.top = y.toString() + "px";\n' +
'            this.htmlElement.style.left = x.toString() + "px";\n' +
'          };\n' +
'          OverlayComponent.prototype.topRight = function(x, y) {\n' +
'            this.htmlElement.style.top = y.toString() + "px";\n' +
'            this.htmlElement.style.right = x.toString() + "px";\n' +
'          };\n' +
'          OverlayComponent.prototype.bottomLeft = function(x, y) {\n' +
'            this.htmlElement.style.bottom = y.toString() + "px";\n' +
'            this.htmlElement.style.left = x.toString() + "px";\n' +
'          };\n' +
'          OverlayComponent.prototype.bottomRight = function(x, y) {\n' +
'            this.htmlElement.style.bottom = y.toString() + "px";\n' +
'            this.htmlElement.style.right = x.toString() + "px";\n' +
'          };\n' +
'          OverlayComponent.prototype.show = function() {\n' +
'            this.htmlElement.classList.add("show");\n' +
'          };\n' +
'          OverlayComponent.prototype.hide = function() {\n' +
'            this.htmlElement.classList.remove("show");\n' +
'          };\n' +
'          OverlayComponent.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.htmlElement.classList.add("octOverlay");\n' +
'          };\n' +
'          return OverlayComponent;\n' +
'        })(component.UIComponent);\n' +
'        overlay.OverlayComponent = OverlayComponent;\n' +
'      })(overlay = component.overlay || (component.overlay = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var overlay;\n' +
'      (function(overlay) {\n' +
'        var HoverPreview = (function(_super) {\n' +
'          __extends(HoverPreview, _super);\n' +
'          function HoverPreview(app) {\n' +
'            _super.call(this, app, document.createElement("div"));\n' +
'          }\n' +
'          HoverPreview.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.img = document.createElement("img");\n' +
'            this.app.getOctWrapFactory().wrapNode(this.htmlElement).append(this.img).addClass("octHoverPreview");\n' +
'          };\n' +
'          HoverPreview.prototype.getImage = function() {\n' +
'            return this.img;\n' +
'          };\n' +
'          return HoverPreview;\n' +
'        })(overlay.OverlayComponent);\n' +
'        overlay.HoverPreview = HoverPreview;\n' +
'      })(overlay = component.overlay || (component.overlay = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var HoverPreviewController = (function(_super) {\n' +
'          __extends(HoverPreviewController, _super);\n' +
'          function HoverPreviewController(app) {\n' +
'            this.preview = new fah.component.overlay.HoverPreview(this.app);\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          HoverPreviewController.prototype.init = function() {\n' +
'            var a, i;\n' +
'            _super.prototype.init.call(this);\n' +
'            a = document.querySelectorAll("b img");\n' +
'            for (i = 0; i < a.length; i++) {\n' +
'              a[i].addEventListener("mouseover", this.handleMouseOver());\n' +
'              a[i].addEventListener("mousemove", this.handleMouseMove());\n' +
'              a[i].addEventListener("mouseout", this.handleMouseOut());\n' +
'            }\n' +
'          };\n' +
'          HoverPreviewController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'            document.querySelector("body").appendChild(this.preview.getElement());\n' +
'          };\n' +
'          HoverPreviewController.prototype.handleMouseOver = function() {\n' +
'            var self = this;\n' +
'            return function(e) {\n' +
'              self.preview.show();\n' +
'              self.preview.getImage().setAttribute("src", e.target.getAttribute("src").replace("@200", "@400"));\n' +
'            };\n' +
'          };\n' +
'          HoverPreviewController.prototype.handleMouseMove = function() {\n' +
'            var self = this;\n' +
'            return function(e) {\n' +
'              var x, y, i;\n' +
'              i = self.preview.getImage().getBoundingClientRect();\n' +
'              x = e.clientX + window.scrollX + 30;\n' +
'              if (x + i.width > window.innerWidth) {\n' +
'                x = e.clientX + window.scrollX - i.width - 30;\n' +
'              }\n' +
'              y = (e.clientY - i.height / 2) + window.scrollY;\n' +
'              if (y < window.scrollY) {\n' +
'                y += window.scrollY - y;\n' +
'              } else if (y + i.height > window.innerHeight + window.scrollY) {\n' +
'                y -= y + i.height - (window.innerHeight + window.scrollY);\n' +
'              }\n' +
'              self.preview.topLeft(x, y);\n' +
'            };\n' +
'          };\n' +
'          HoverPreviewController.prototype.handleMouseOut = function() {\n' +
'            var self = this;\n' +
'            return function() {\n' +
'              self.preview.hide();\n' +
'            };\n' +
'          };\n' +
'          return HoverPreviewController;\n' +
'        })(controller.Controller);\n' +
'        module.HoverPreviewController = HoverPreviewController;\n' +
'      })(module = controller.module || (controller.module = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var page;\n' +
'      (function(page) {\n' +
'        var BrowseController = (function(_super) {\n' +
'          __extends(BrowseController, _super);\n' +
'          function BrowseController(app) {\n' +
'            this.hoverView = new controller.module.HoverPreviewController(this.app);\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          BrowseController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.hoverView.init();\n' +
'          };\n' +
'          BrowseController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'            this.hoverView.run();\n' +
'          };\n' +
'          return BrowseController;\n' +
'        })(controller.Controller);\n' +
'        page.BrowseController = BrowseController;\n' +
'      })(page = controller.page || (controller.page = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var page;\n' +
'      (function(page) {\n' +
'        var SearchController = (function(_super) {\n' +
'          __extends(SearchController, _super);\n' +
'          function SearchController(app) {\n' +
'            this.hoverView = new controller.module.HoverPreviewController(this.app);\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          SearchController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.hoverView.init();\n' +
'          };\n' +
'          SearchController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'            this.hoverView.run();\n' +
'          };\n' +
'          return SearchController;\n' +
'        })(controller.Controller);\n' +
'        page.SearchController = SearchController;\n' +
'      })(page = controller.page || (controller.page = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var page;\n' +
'      (function(page) {\n' +
'        var SubmissionController = (function(_super) {\n' +
'          __extends(SubmissionController, _super);\n' +
'          function SubmissionController(app) {\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          SubmissionController.prototype.init = function() {\n' +
'            return _super.prototype.init.call(this);\n' +
'          };\n' +
'          SubmissionController.prototype.run = function() {\n' +
'            return _super.prototype.run.call(this);\n' +
'          };\n' +
'          return SubmissionController;\n' +
'        })(controller.Controller);\n' +
'        page.SubmissionController = SubmissionController;\n' +
'      })(page = controller.page || (controller.page = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var clicker = false;\n' +
'        var ModalComponentController = (function(_super) {\n' +
'          __extends(ModalComponentController, _super);\n' +
'          function ModalComponentController(app) {\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          ModalComponentController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.component.getCurtain().doClick();\n' +
'          };\n' +
'          ModalComponentController.prototype.handleCurtainClick = function() {\n' +
'            var self = this;\n' +
'            return function() {\n' +
'              self.component.hide();\n' +
'            };\n' +
'          };\n' +
'          return ModalComponentController;\n' +
'        })(controller.Controller);\n' +
'        module.ModalComponentController = ModalComponentController;\n' +
'      })(module = controller.module || (controller.module = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var MessagesShoutController = (function(_super) {\n' +
'          __extends(MessagesShoutController, _super);\n' +
'          function MessagesShoutController(app, field, form) {\n' +
'            this.shoutForm = form;\n' +
'            this.fieldId = field;\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          MessagesShoutController.prototype.init = function() {\n' +
'            var o;\n' +
'            _super.prototype.init.call(this);\n' +
'            o = this.app.getOctWrapFactory();\n' +
'            this.watcherFieldSet = o.wrapSelector(this.fieldId);\n' +
'            this.watcherControls = this.watcherFieldSet.children("li.section-controls").first();\n' +
'            this.modUI();\n' +
'          };\n' +
'          MessagesShoutController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'            document.querySelector("body").appendChild(this.shoutForm.getElement());\n' +
'          };\n' +
'          MessagesShoutController.prototype.modUI = function() {\n' +
'            this.shoutButton = this.app.getOctWrapFactory()\n' +
'              .wrapNew("<input type=button getValue=\'Shout &amp; Remove\'>")\n' +
'              .addClass("button")\n' +
'              .click(this.handleShowShoutMenu());\n' +
'            this.watcherControls.children().last().setBefore(this.shoutButton);\n' +
'          };\n' +
'          MessagesShoutController.prototype.handleShowShoutMenu = function() {\n' +
'            var self = this;\n' +
'            return function() {\n' +
'              self.shoutForm.show();\n' +
'            };\n' +
'          };\n' +
'          return MessagesShoutController;\n' +
'        })(module.ModalComponentController);\n' +
'        module.MessagesShoutController = MessagesShoutController;\n' +
'      })(module = controller.module || (controller.module = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var modal;\n' +
'      (function(modal) {\n' +
'        var curtain;\n' +
'        var ModalComponent = (function(_super) {\n' +
'          __extends(ModalComponent, _super);\n' +
'          function ModalComponent(app) {\n' +
'            this.implementationOf("ModalComponentInterface");\n' +
'            _super.call(this, app, document.createElement("div"));\n' +
'          }\n' +
'          ModalComponent.prototype.init = function() {\n' +
'            var o, s;\n' +
'            _super.prototype.init.call(this);\n' +
'            o = this.app.getOctWrapFactory();\n' +
'            if (!curtain) {\n' +
'              curtain = o.wrapNew("<div>").addClass("octCurtain");\n' +
'            }\n' +
'            s = o.wrapNode(this.htmlElement).addClass("octModalContainer");\n' +
'            this.content = o.wrapNew("<div>").addClass("octContent").appendTo(s);\n' +
'          };\n' +
'          ModalComponent.prototype.getContentDiv = function() {\n' +
'            return this.content;\n' +
'          };\n' +
'          ModalComponent.prototype.getCurtain = function() {\n' +
'            return curtain;\n' +
'          };\n' +
'          return ModalComponent;\n' +
'        })(component.UIComponent);\n' +
'        modal.ModalComponent = ModalComponent;\n' +
'      })(modal = component.modal || (component.modal = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var modal;\n' +
'      (function(modal) {\n' +
'        var shout;\n' +
'        (function(shout) {\n' +
'          var ShoutForm = (function(_super) {\n' +
'            __extends(ShoutForm, _super);\n' +
'            function ShoutForm(app) {\n' +
'              this.implementationOf("ShoutFormInterface");\n' +
'              _super.call(this, app);\n' +
'            }\n' +
'            ShoutForm.prototype.init = function() {\n' +
'              var o, h;\n' +
'              _super.prototype.init.call(this);\n' +
'              o = this.app.getOctWrapFactory();\n' +
'              h = this.app.getHTMLHelper();\n' +
'              this.form = o.wrapNew("<form>").addClass("octShoutForm");\n' +
'              this.title = o.wrapNew("<span>");\n' +
'              this.warning = o.wrapNew("<p>");\n' +
'              this.shoutText = o.wrapNew("<textarea>");\n' +
'              this.selCount = o.wrapNew("<input type=number disabled=disabled>");\n' +
'              this.useDefault = o.wrapNew("<input type=checkbox>");\n' +
'              this.submit = o.wrapNew("<input type=button value=\'Send Shouts\'>");\n' +
'              this.content.append([\n' +
'                this.title,\n' +
'                this.warning,\n' +
'                this.form\n' +
'              ]);\n' +
'              this.form.append([\n' +
'                h.FORM.wrapperLabel(this.selCount, "Selected"),\n' +
'                h.FORM.wrapperLabel(this.useDefault, "Use Default Shout Text", false),\n' +
'                h.FORM.wrapperLabel(this.shoutText, "Shout Text"),\n' +
'                o.wrapNew("div").append(this.submit).addClass("octRightAlign")\n' +
'              ]);\n' +
'            };\n' +
'            ShoutForm.prototype.getShoutForm = function() {\n' +
'              return this.form;\n' +
'            };\n' +
'            ShoutForm.prototype.getTitleSpan = function() {\n' +
'              return this.title;\n' +
'            };\n' +
'            ShoutForm.prototype.getWarningText = function() {\n' +
'              return this.warning;\n' +
'            };\n' +
'            ShoutForm.prototype.getShoutTextArea = function() {\n' +
'              return this.shoutText;\n' +
'            };\n' +
'            ShoutForm.prototype.getSubmitButton = function() {\n' +
'              return this.submit;\n' +
'            };\n' +
'            ShoutForm.prototype.getDefaultCheckBox = function() {\n' +
'              return this.useDefault;\n' +
'            };\n' +
'            ShoutForm.prototype.getCountInput = function() {\n' +
'              return this.selCount;\n' +
'            };\n' +
'            return ShoutForm;\n' +
'          })(modal.ModalComponent);\n' +
'          shout.ShoutForm = ShoutForm;\n' +
'        })(shout = modal.shout || (modal.shout = {}));\n' +
'      })(modal = component.modal || (component.modal = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var modal;\n' +
'      (function(modal) {\n' +
'        var shout;\n' +
'        (function(shout) {\n' +
'          var NewWatchersShoutForm = (function(_super) {\n' +
'            __extends(NewWatchersShoutForm, _super);\n' +
'            function NewWatchersShoutForm(app) {\n' +
'              this.implementationOf("ShoutFormInterface");\n' +
'              _super.call(this, app);\n' +
'            }\n' +
'            NewWatchersShoutForm.prototype.init = function() {\n' +
'              _super.prototype.init.call(this);\n' +
'              this.title.setHTML("Shout To Selected Watchers");\n' +
'            };\n' +
'            return NewWatchersShoutForm;\n' +
'          })(shout.ShoutForm);\n' +
'          shout.NewWatchersShoutForm = NewWatchersShoutForm;\n' +
'        })(shout = modal.shout || (modal.shout = {}));\n' +
'      })(modal = component.modal || (component.modal = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var ShoutToWatchersController = (function(_super) {\n' +
'          __extends(ShoutToWatchersController, _super);\n' +
'          function ShoutToWatchersController(app) {\n' +
'            _super.call(this, app, "#messages-watches", new fah.component.modal.shout.NewWatchersShoutForm(app));\n' +
'          }\n' +
'          ShoutToWatchersController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'          };\n' +
'          ShoutToWatchersController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'          };\n' +
'          return ShoutToWatchersController;\n' +
'        })(module.MessagesShoutController);\n' +
'        module.ShoutToWatchersController = ShoutToWatchersController;\n' +
'      })(module = controller.module || (controller.module = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var modal;\n' +
'      (function(modal) {\n' +
'        var shout;\n' +
'        (function(shout) {\n' +
'          var NewFavoriteShoutForm = (function(_super) {\n' +
'            __extends(NewFavoriteShoutForm, _super);\n' +
'            function NewFavoriteShoutForm(app) {\n' +
'              this.implementationOf("ShoutFormInterface");\n' +
'              _super.call(this, app);\n' +
'            }\n' +
'            NewFavoriteShoutForm.prototype.init = function() {\n' +
'              _super.prototype.init.call(this);\n' +
'              this.title.setHTML("Shout To Selected Watchers");\n' +
'            };\n' +
'            return NewFavoriteShoutForm;\n' +
'          })(shout.ShoutForm);\n' +
'          shout.NewFavoriteShoutForm = NewFavoriteShoutForm;\n' +
'        })(shout = modal.shout || (modal.shout = {}));\n' +
'      })(modal = component.modal || (component.modal = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var ShoutToFavoritesController = (function(_super) {\n' +
'          __extends(ShoutToFavoritesController, _super);\n' +
'          function ShoutToFavoritesController(app) {\n' +
'            _super.call(this, app, "#messages-favorites", new fah.component.modal.shout.NewFavoriteShoutForm(app));\n' +
'          }\n' +
'          ShoutToFavoritesController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'          };\n' +
'          ShoutToFavoritesController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'          };\n' +
'          return ShoutToFavoritesController;\n' +
'        })(module.MessagesShoutController);\n' +
'        module.ShoutToFavoritesController = ShoutToFavoritesController;\n' +
'      })(module = controller.module || (controller.module = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var controller;\n' +
'    (function(controller) {\n' +
'      var page;\n' +
'      (function(page) {\n' +
'        var MessageController = (function(_super) {\n' +
'          __extends(MessageController, _super);\n' +
'          function MessageController(app) {\n' +
'            _super.call(this, app);\n' +
'          }\n' +
'          MessageController.prototype.init = function() {\n' +
'            _super.prototype.init.call(this);\n' +
'            this.watchShout.init();\n' +
'            this.watchFav.init();\n' +
'          };\n' +
'          MessageController.prototype.run = function() {\n' +
'            _super.prototype.run.call(this);\n' +
'            this.watchShout.run();\n' +
'            this.watchFav.run();\n' +
'          };\n' +
'          return MessageController;\n' +
'        })(controller.Controller);\n' +
'        page.MessageController = MessageController;\n' +
'      })(page = controller.page || (controller.page = {}));\n' +
'    })(controller = fah.controller || (fah.controller = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var app;\n' +
'    (function(app) {\n' +
'      var util = oct.fah.util;\n' +
'      var controller = oct.fah.controller;\n' +
'      var wrap = oct.wrap;\n' +
'      var App = (function() {\n' +
'        function App() {\n' +
'          this.boot();\n' +
'          this.init();\n' +
'          this.run();\n' +
'        }\n' +
'        App.prototype.getOctWrapFactory = function() {\n' +
'          return this.octFac;\n' +
'        };\n' +
'        App.prototype.getHTMLHelper = function() {\n' +
'          return this.htHelp;\n' +
'        };\n' +
'        App.prototype.getConfig = function() {\n' +
'          return this.config;\n' +
'        };\n' +
'        App.prototype.getStorageManager = function() {\n' +
'          return this.stoMan;\n' +
'        };\n' +
'        App.prototype.boot = function() {\n' +
'          oct.fah.app.boot.CSSInjector.injectCSS();\n' +
'          this.router = new util.Router();\n' +
'          this.octFac = new wrap.OctWrapFactory();\n' +
'          this.htHelp = new util.help.HTML(this);\n' +
'          this.config = new app.StaticConfig();\n' +
'        };\n' +
'        App.prototype.init = function() {\n' +
'          this.router.register("/browse/", new controller.page.BrowseController(this));\n' +
'          this.router.register("/search/", new controller.page.SearchController(this));\n' +
'          this.router.register("/msg/submissions/", new controller.page.SubmissionController(this));\n' +
'          this.router.register("/msg/others/", new controller.page.MessageController(this));\n' +
'        };\n' +
'        App.prototype.run = function() {\n' +
'          this.router.route(window.location.pathname);\n' +
'        };\n' +
'        return App;\n' +
'      })();\n' +
'      app.App = App;\n' +
'    })(app = fah.app || (fah.app = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var tab;\n' +
'        (function(tab_1) {\n' +
'          var Tab = (function(_super) {\n' +
'            __extends(Tab, _super);\n' +
'            function Tab(app) {\n' +
'              this.implementationOf("TabInterface");\n' +
'              _super.call(this, app, document.createElement("div"));\n' +
'            }\n' +
'            Tab.prototype.getTitle = function() {\n' +
'              return this.title;\n' +
'            };\n' +
'            Tab.prototype.hasPreviousSibling = function() {\n' +
'              return (this.previous instanceof oct.OctObject && this.previous.isImplementationOf("TabInterface"));\n' +
'            };\n' +
'            Tab.prototype.getPreviousSibling = function() {\n' +
'              return this.previous;\n' +
'            };\n' +
'            Tab.prototype.setPreviousSibling = function(tab, con) {\n' +
'              this.previous = tab;\n' +
'              tab.setNextSibling(this, con);\n' +
'              if (con !== this.parent && typeof this.parent !== "undefined") {\n' +
'                this.parent.sortTabs();\n' +
'              }\n' +
'            };\n' +
'            Tab.prototype.hasNextSibling = function() {\n' +
'              return (this.next instanceof oct.OctObject && this.next.isImplementationOf("TabInterface"));\n' +
'            };\n' +
'            Tab.prototype.getNextSibling = function() {\n' +
'              return this.next;\n' +
'            };\n' +
'            Tab.prototype.setNextSibling = function(tab, con) {\n' +
'              this.previous = tab;\n' +
'              if (con !== this.parent && typeof this.parent !== "undefined") {\n' +
'                this.parent.sortTabs();\n' +
'              }\n' +
'            };\n' +
'            Tab.prototype.getParent = function() {\n' +
'              return null;\n' +
'            };\n' +
'            Tab.prototype.setParent = function(ts) {\n' +
'              this.parent = ts;\n' +
'            };\n' +
'            return Tab;\n' +
'          })(component.UIComponent);\n' +
'          tab_1.Tab = Tab;\n' +
'        })(tab = module.tab || (module.tab = {}));\n' +
'      })(module = component.module || (component.module = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var component;\n' +
'    (function(component) {\n' +
'      var module;\n' +
'      (function(module) {\n' +
'        var tab;\n' +
'        (function(tab_2) {\n' +
'          var TabSet = (function(_super) {\n' +
'            __extends(TabSet, _super);\n' +
'            function TabSet(app, element) {\n' +
'              this.implementationOf("TabSetInterface");\n' +
'              _super.call(this, app, element);\n' +
'            }\n' +
'            TabSet.prototype.init = function() {\n' +
'              this.headerBlock = this.app.getOctWrapFactory().wrapNew("<ul>").addClass("octTabRow");\n' +
'            };\n' +
'            TabSet.prototype.getTabs = function() {\n' +
'              return undefined;\n' +
'            };\n' +
'            TabSet.prototype.getTab = function(i) {\n' +
'              return undefined;\n' +
'            };\n' +
'            TabSet.prototype.getSelectedTab = function() {\n' +
'              return undefined;\n' +
'            };\n' +
'            TabSet.prototype.getSelectedTabIndex = function() {\n' +
'              return undefined;\n' +
'            };\n' +
'            TabSet.prototype.selectTab = function(i) {\n' +
'              if (typeof i === "number") {\n' +
'                this.deSelectStyle(this.selected);\n' +
'                this.selected = this.children[i];\n' +
'                this.selectStyle(i);\n' +
'              }\n' +
'            };\n' +
'            TabSet.prototype.appendTab = function(t) {\n' +
'              this.lastChild.setNextSibling(t, this);\n' +
'              this.children.push(t);\n' +
'              this.tabHeaders.push(this.makeHeader(t.getTitle()));\n' +
'              this.lastChild = t;\n' +
'            };\n' +
'            TabSet.prototype.prependTab = function(t) {\n' +
'              this.firstChild.setPreviousSibling(t, this);\n' +
'              this.children = [t].concat(this.children);\n' +
'              this.tabHeaders = [this.makeHeader(t.getTitle())].concat(this.tabHeaders);\n' +
'              this.firstChild = t;\n' +
'            };\n' +
'            TabSet.prototype.insertTab = function(t, i) {\n' +
'              var nPrev, nNext;\n' +
'              if (i === 0) {\n' +
'                this.prependTab(t);\n' +
'                return;\n' +
'              }\n' +
'              if (i >= this.children.length) {\n' +
'                this.appendTab(t);\n' +
'                return;\n' +
'              }\n' +
'              nPrev = this.children[i - 1];\n' +
'              nNext = this.children[i];\n' +
'              t.setPreviousSibling(nPrev, this);\n' +
'              t.setNextSibling(nNext, this);\n' +
'              this.children.push(t);\n' +
'              this.tabHeaders.push(this.makeHeader(t.getTitle()));\n' +
'              this.sortTabs();\n' +
'            };\n' +
'            TabSet.prototype.deSelectStyle = function(tab) {\n' +
'              this.app.getOctWrapFactory().wrapNode(tab.getElement()).dropClass("selected");\n' +
'            };\n' +
'            TabSet.prototype.selectStyle = function(ind) {\n' +
'              var a, b;\n' +
'              a = this.children[ind].getElement();\n' +
'              b = this.headerBlock[ind];\n' +
'              this.app.getOctWrapFactory().wrapNode(a).addClass("selected");\n' +
'            };\n' +
'            TabSet.prototype.sortTabs = function() {\n' +
'              var nChil, nHead, index, curChild, tKey, tHead;\n' +
'              nChil = new Array(this.children.length);\n' +
'              nHead = new Array(this.tabHeaders.length);\n' +
'              index = 0;\n' +
'              curChild = this.firstChild;\n' +
'              tHead = this.headerBlock.getElement();\n' +
'              while (curChild.hasNextSibling()) {\n' +
'                tKey = this.children.indexOf(curChild);\n' +
'                nChil[index] = curChild;\n' +
'                nHead[index] = this.tabHeaders[tKey];\n' +
'                index++;\n' +
'                curChild = curChild.getNextSibling();\n' +
'              }\n' +
'              while (tHead.firstChild) {\n' +
'                tHead.removeChild(tHead.firstChild);\n' +
'              }\n' +
'              for (index = 0; index < nHead.length; index++) {\n' +
'                tHead.appendChild(nHead[index].getElement());\n' +
'              }\n' +
'              this.children = nChil;\n' +
'              this.tabHeaders = nHead;\n' +
'            };\n' +
'            TabSet.prototype.makeHeader = function(title) {\n' +
'              return this.app.getOctWrapFactory().wrapNew("<li>").setHTML(title).addClasses(["octTab", "deselected"]);\n' +
'            };\n' +
'            return TabSet;\n' +
'          })(component.UIComponent);\n' +
'          tab_2.TabSet = TabSet;\n' +
'        })(tab = module.tab || (module.tab = {}));\n' +
'      })(module = component.module || (component.module = {}));\n' +
'    })(component = fah.component || (fah.component = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var util;\n' +
'    (function(util) {\n' +
'      var dom;\n' +
'      (function(dom_1) {\n' +
'        var PageParser = (function() {\n' +
'          function PageParser(app) {\n' +
'            this.app = app;\n' +
'          }\n' +
'          PageParser.prototype.runParser = function(doc, input) {\n' +
'            var dom, out, temp;\n' +
'            dom = this.app.getOctWrapFactory().wrapNode(doc);\n' +
'            for (temp in input) {\n' +
'              if (!input.hasOwnProperty(temp)) {\n' +
'                continue;\n' +
'              }\n' +
'              out[temp] = input[temp](dom);\n' +
'            }\n' +
'            return out;\n' +
'          };\n' +
'          return PageParser;\n' +
'        })();\n' +
'        dom_1.PageParser = PageParser;\n' +
'      })(dom = util.dom || (util.dom = {}));\n' +
'    })(util = fah.util || (fah.util = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'var oct;\n' +
'(function(oct) {\n' +
'  var fah;\n' +
'  (function(fah) {\n' +
'    var util;\n' +
'    (function(util) {\n' +
'      var help;\n' +
'      (function(help) {\n' +
'        var StringUtils = (function() {\n' +
'          function StringUtils() {}\n' +
'          StringUtils.prototype.trim = function(s, c) {\n' +
'            return this.trimRight(this.trimLeft(s, c), c);\n' +
'          };\n' +
'          StringUtils.prototype.trimLeft = function(s, c) {\n' +
'            var r, i;\n' +
'            c = (typeof c !== "string") ? " " : c;\n' +
'            r = new RegExp("^[" + c + "]");\n' +
'            if (s instanceof Array) {\n' +
'              for (i = 0; i < s.length; i++) {\n' +
'                s[i] = s[i].replace(r, "");\n' +
'              }\n' +
'              return s;\n' +
'            }\n' +
'            return s.replace(r, "");\n' +
'          };\n' +
'          StringUtils.prototype.trimRight = function(s, c) {\n' +
'            var r, i;\n' +
'            c = (typeof c !== "string") ? " " : c;\n' +
'            r = new RegExp("[" + c + "]$");\n' +
'            if (s instanceof Array) {\n' +
'              for (i = 0; i < s.length; i++) {\n' +
'                s[i] = s[i].replace(r, "");\n' +
'              }\n' +
'              return s;\n' +
'            }\n' +
'            return s.replace(r, "");\n' +
'          };\n' +
'          return StringUtils;\n' +
'        })();\n' +
'        help.StringUtils = StringUtils;\n' +
'      })(help = util.help || (util.help = {}));\n' +
'    })(util = fah.util || (fah.util = {}));\n' +
'  })(fah = oct.fah || (oct.fah = {}));\n' +
'})(oct || (oct = {}));\n' +
'new oct.fah.app.App();';
