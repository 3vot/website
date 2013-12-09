
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath]
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
    this.require.modules = modules;
    this.require.cache   = cache;
  }
  return this.require.define;
}).call(this)({
  "initApp": function(exports, require, module) {(function() {
  var DataManager, InitApp, LoadManager, RSpine, Session, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  require("lib/initSetup");

  Session = require("models/session");

  User = require("models/user");

  DataManager = require("managers/dataManager");

  LoadManager = require("managers/loadManager");

  InitApp = (function(_super) {
    __extends(InitApp, _super);

    function InitApp() {
      var LayoutManager;
      InitApp.__super__.constructor.apply(this, arguments);
      RSpine.appsMetadata = [];
      RSpine.appsByPath = {};
      RSpine.liveAppPaths = [];
      RSpine.liveAppsByPath = {};
      RSpine.liveAppPositionByPath = {};
      RSpine.libraries = {};
      LayoutManager = require("managers/" + RSpine.device + "Manager");
      RSpine.bind("platform-app-launch-complete", function(app) {
        var height, offset, panel, panelsInApp, _i, _len, _results;
        panelsInApp = app.el.find(".panel-stretch");
        height = $(window).height();
        _results = [];
        for (_i = 0, _len = panelsInApp.length; _i < _len; _i++) {
          panel = panelsInApp[_i];
          panel = $(panel);
          offset = panel.data("offset") || 0;
          _results.push($(panel).css("height", height - offset));
        }
        return _results;
      });
      RSpine.resizeColumns = function(selector, offset) {
        if (offset == null) {
          offset = 0;
        }
      };
      new LayoutManager({
        el: this.el
      });
      new LoadManager({
        el: this.el
      });
      new DataManager();
    }

    return InitApp;

  })(RSpine.Controller);

  module.exports = InitApp;

}).call(this);
}, "layout_desktop": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="menu"></div>\n<div class="platform-canvas"></div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "layout_mobile": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="mobile-menu">\n\n</div>\n\n<div class="mobile-platform-canvas">\n</div>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "lib/initSetup": function(exports, require, module) {(function() {
  var RSpine;

  RSpine = require("rspine");

  RSpine.icons = {
    "clock": '<svg class="" viewBox="0 0 22.166 22.166"><g><path d="M11.1 0h-0.018C4.971 0 0 5 0 11.083c0 6.1 5 11.1 11.1 11.082c6.111 0 11.084-4.973 11.084-11.082 C22.166 5 17.2 0 11.1 0z M11.1 21.166h-0.018C5.523 21.2 1 16.6 1 11.083C1 5.5 5.5 1 11.1 1c5.561 0 10.1 4.5 10.1 10.1 C21.166 16.6 16.6 21.2 11.1 21.166z"/><path d="M11.201 11.254V4.719c0-0.271-0.219-0.49-0.49-0.49s-0.49 0.219-0.49 0.49v6.738c0 0.1 0 0.1 0 0.2 c0.025 0.1 0.1 0.1 0.1 0.158l4.763 4.764c0.097 0.1 0.2 0.1 0.3 0.101s0.252-0.048 0.348-0.144c0.19-0.191 0.19-0.502 0-0.693 L11.201 11.254z"/></g></svg>',
    "fold": '<svg class="" viewBox="0 0 8 5.316"><g><g><path d="M4.168 5.255c-0.135 0-0.263-0.06-0.351-0.163L0.165 0.755C0.001 0.6 0 0.3 0.2 0.1 C0.413-0.056 0.703-0.03 0.9 0.164l3.287 3.902L7.15 0.179c0.154-0.202 0.442-0.237 0.643-0.083 C7.994 0.2 8 0.5 7.9 0.739L4.532 5.077C4.447 5.2 4.3 5.3 4.2 5.255C4.175 5.3 4.2 5.3 4.2 5.255z"/></g></g></svg>',
    "menu": '<svg xmlns="" viewBox="0 0 14.191 9.719"><g><rect x="-0" y="0" width="14.2" height="1"/><rect x="-0" y="4.4" width="14.2" height="1"/><rect x="-0" y="8.7" width="14.2" height="1"/></g></svg>',
    "print": '<svg xmlns="" viewBox="0 0 16 16"><g><path d="M15.645 8.675h-2.197V0.43c0-0.211-0.172-0.383-0.383-0.383H3.442c-0.211 0-0.382 0.172-0.382 0.383v8.245H0.437 c-0.211 0-0.382 0.172-0.382 0.383v6.56C0.054 15.8 0.2 16 0.4 16h15.208c0.211 0 0.383-0.172 0.383-0.383v-6.56 C16.027 8.8 15.9 8.7 15.6 8.675z M3.825 0.813h8.857v7.862H3.825V0.813z M15.262 15.234H0.819V9.44h2.624h9.622h2.197 V15.234z"/><path d="M11.391 2.299H5.103c-0.211 0-0.382 0.172-0.382 0.383s0.171 0.4 0.4 0.383h6.288c0.211 0 0.383-0.172 0.383-0.383 S11.602 2.3 11.4 2.299z"/><path d="M11.391 4.36H5.103c-0.211 0-0.382 0.172-0.382 0.383s0.171 0.4 0.4 0.383h6.288c0.211 0 0.383-0.172 0.383-0.383 S11.602 4.4 11.4 4.36z"/><path d="M11.391 6.423H5.103c-0.211 0-0.382 0.172-0.382 0.383s0.171 0.4 0.4 0.383h6.288c0.211 0 0.383-0.172 0.383-0.383 S11.602 6.4 11.4 6.423z"/></g></svg>',
    "approve": '<svg xmlns="" viewBox="0 0 21.139 16"><g><g><g><polygon points="6.5,15.9 -0,9.5 1.3,8.1 6.5,13.3 19.8,-0.1 21.1,1.3"/></g></g></g></svg>',
    "magnifier": '<svg xmlns="" viewBox="0 0 16 16"><path d="M15.539 13.316l-3.247-3.248c0.609-1.002 0.963-2.182 0.963-3.441C13.255 3 10.3 0 6.6 0 C2.968 0-0.001 2.967-0.001 6.627c0 3.7 3 6.6 6.6 6.628c1.26 0 2.438-0.353 3.441-0.962l3.247 3.2 C13.622 15.8 14 16 14.4 16s0.805-0.152 1.112-0.461C16.153 14.9 16.2 13.9 15.5 13.316z M6.626 10.7 c-2.227 0-4.031-1.805-4.031-4.031c0-2.225 1.805-4.03 4.031-4.03s4.031 1.8 4 4.03C10.657 8.9 8.9 10.7 6.6 10.658z"/></svg>',
    "r2": '<svg style="position: absolute;top: -13px;left: 15px;" version="1.1" id="Layer_1" x="-70px" y="0px" width="90.395px" height="90.395px" viewBox="0 0 116.395 116.395" enable-background="new 0 0 116.395 116.395" xml:space="preserve" xmlns:xml="http://www.w3.org/XML/1998/namespace"> <g> <path class="circle" fill="#fff" d="M58.197,0C26.107,0,0,26.107,0,58.197s26.107,58.197,58.197,58.197s58.197-26.107,58.197-58.197 S90.287,0,58.197,0z M58.197,115.395C26.659,115.395,1,89.735,1,58.197C1,26.658,26.659,1,58.197,1 c31.539,0,57.197,25.658,57.197,57.197C115.395,89.735,89.736,115.395,58.197,115.395z"/> <path class="circle" fill="#fff" d="M55.752,48.441c0-3.794-1.102-6.752-3.273-8.792c-3.336-3.135-7.942-2.882-8.078-2.874H33.752 c-0.552,0-1,0.448-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V59.166h9.336l9.774,19.065c0.177,0.346,0.527,0.544,0.891,0.544 c0.153,0,0.31-0.035,0.455-0.11c0.491-0.252,0.686-0.854,0.434-1.346l-9.329-18.195C55.637,58.425,55.752,48.545,55.752,48.441z M45.252,57.167h-10.5V38.775l9.709-0.002c0.039-0.001,3.967-0.197,6.662,2.346c1.744,1.647,2.629,4.11,2.629,7.322 C53.752,48.798,53.655,57.167,45.252,57.167z"/> <path class="circle" fill="#fff" d="M65.872,66.893l9.988-7.902c7.176-5.507,6.904-10.889,6.892-11.049c0-11.038-10.534-11.166-10.641-11.166 c-9.615,0-10.515,9.322-10.522,9.416c-0.047,0.55,0.361,1.034,0.912,1.081c0.55,0.055,1.034-0.362,1.08-0.912 c0.026-0.311,0.731-7.585,8.53-7.585c0.353,0,8.641,0.104,8.643,9.232c0.003,0.045,0.225,4.533-6.122,9.405l-9.921,7.854 c-0.161,0.104-3.959,2.62-3.959,9.174v3.334c0,0.553,0.447,1,1,1h20.003c0.553,0,1-0.447,1-1s-0.447-1-1-1H62.752v-2.334 C62.752,69.036,65.675,67.028,65.872,66.893z"/> </g> </svg>'
  };

}).call(this);
}, "managers/dataManager": function(exports, require, module) {(function() {
  var Cliente, DataManager, RSpine, Session, User;

  RSpine = require("rspine");

  Session = require("models/session");

  User = require("models/user");

  Cliente = require("models/cliente");

  DataManager = (function() {
    function DataManager() {
      var _this = this;
      RSpine.datamanager = this;
      User.bind("refresh", function() {
        var session;
        session = Session.first();
        session.user = User.first();
        session.save();
        return _this.initializeData();
      });
      $(document).bind("ajaxSend", function() {
        return DataManager.onAjax();
      });
      $(document).bind("ajaxComplete", function() {
        return DataManager.onAjax();
      });
    }

    DataManager.prototype.initializeData = function() {
      Cliente.autoQuery = true;
      return RSpine.Model.SalesforceModel.initialize();
    };

    DataManager.onAjax = function() {
      window.clearTimeout(DataManager.ajaxIdleTimer);
      return DataManager.ajaxIdleTimer = window.setTimeout(DataManager.onAjaxIdle, 5000);
    };

    DataManager.onAjaxIdle = function() {
      RSpine.trigger("platform:ajax-idle");
      return console.log("DATA-MANAGER:36: Ajax on Idle");
    };

    return DataManager;

  })();

  module.exports = DataManager;

}).call(this);
}, "managers/desktopManager": function(exports, require, module) {(function() {
  var DesktopManager, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  DesktopManager = (function(_super) {
    __extends(DesktopManager, _super);

    DesktopManager.prototype.elements = {
      ".platform-canvas": "pCanvas"
    };

    function DesktopManager() {
      this.registerKeys = __bind(this.registerKeys, this);
      this.registerTouch = __bind(this.registerTouch, this);
      this.moveDown = __bind(this.moveDown, this);
      this.moveUp = __bind(this.moveUp, this);
      this.shutdownApp = __bind(this.shutdownApp, this);
      this.launchApp = __bind(this.launchApp, this);
      DesktopManager.__super__.constructor.apply(this, arguments);
      this.html(require("layout_" + RSpine.device)());
      RSpine.liveAppPaths = [];
      RSpine.liveAppsByPath = {};
      RSpine.liveAppPositionByPath = {};
      RSpine.bind("platform:app-launch", this.launchApp);
      RSpine.bind("platform:app-shutdown", this.shutdownApp);
      RSpine.bind("platform:library-loaded-keyboard", this.registerKeys);
      RSpine.bind("platform:library-loaded-touch", this.registerTouch);
    }

    DesktopManager.prototype.launchApp = function(appPath) {
      var App, app, appMetadata, _ref;
      app = RSpine.liveAppsByPath[appPath];
      if (!app) {
        App = require(appPath);
        if (typeof App !== "function") {
          return console.log("Error launching App: " + appPath + ", there's likely a syntax or logical error on it's main file");
        }
        app = new App();
        RSpine.liveAppPaths.push(appPath);
        RSpine.liveAppsByPath[appPath] = app;
        appMetadata = RSpine.appsByPath[appPath];
        app.el.addClass(appMetadata.name);
        app.el.data("path", appPath);
      }
      if ((_ref = RSpine.currentApp) != null) {
        _ref.el.detach();
      }
      this.pCanvas.html(app.el);
      RSpine.currentApp = app;
      RSpine.currentAppPath = appPath;
      RSpine.trigger("platform:app-current-changed", app);
      return RSpine.trigger("platform-app-launch-complete", app);
    };

    DesktopManager.prototype.shutdownApp = function(appPath) {
      var app, appMetadata, index, nextAppIndex;
      index = RSpine.liveAppPaths.indexOf(appPath);
      app = RSpine.liveAppsByPath[appPath];
      appMetadata = RSpine.appsByPath[appPath];
      nextAppIndex = index < RSpine.liveAppsByPath - 1 ? index + 1 : 0;
      if (appMetadata.home) {
        return false;
      }
      RSpine.liveAppPaths.splice(1, index);
      RSpine.liveAppsByPath[appPath] = null;
      delete RSpine.liveAppsByPath[appPath];
      if (app.shutdown) {
        app.shutdown();
      } else {
        console.error(appPath + " does not have Shutdown Function - Warning Memory Leak Anti-Pattern");
      }
      this.pCanvas.find("." + appMetadata.name).remove();
      return RSpine.trigger("platform:app-shutdown-complete");
    };

    DesktopManager.prototype.moveUp = function() {
      var index;
      index = RSpine.liveAppPaths.indexOf(RSpine.currentAppPath);
      if ((index - 1) > -1) {
        return this.launchApp(RSpine.liveAppPaths[index - 1]);
      }
    };

    DesktopManager.prototype.moveDown = function() {
      var index;
      index = RSpine.liveAppPaths.indexOf(RSpine.currentAppPath);
      if ((index + 1) < RSpine.liveAppPaths.length) {
        return this.launchApp(RSpine.liveAppPaths[index + 1]);
      }
    };

    DesktopManager.prototype.registerTouch = function() {
      var _this = this;
      return Hammer(this.pCanvas).on("dragdown dragup", function(ev) {
        var timeNow;
        timeNow = new Date().getTime();
        if (timeNow - _this.lastMoveAnimation < 1000) {
          event.preventDefault();
          return;
        }
        _this.lastMoveAnimation = timeNow;
        if (ev.type === "dragup") {
          _this.moveDown();
        }
        if (ev.type === "dragdown") {
          return _this.moveUp();
        }
      });
    };

    DesktopManager.prototype.registerKeys = function() {
      var _this = this;
      Mousetrap.bind('up', this.moveUp);
      Mousetrap.bind('down', this.moveDown);
      return Mousetrap.bind('h', function() {
        return _this.launchApp(RSpine.liveAppPaths[0]);
      });
    };

    return DesktopManager;

  })(RSpine.Controller);

  module.exports = DesktopManager;

}).call(this);
}, "managers/loadManager": function(exports, require, module) {(function() {
  var LoadMananger, RSpine, User,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  RSpine = require("rspine");

  User = require("models/user");

  LoadMananger = (function() {
    LoadMananger.prototype.launchStage = {
      desktop: {
        "appMetrics": ".app-metrics",
        "menu": ".menu",
        "newsFeed": [".news-feed", ".small-news-feed"]
      }
    };

    LoadMananger.prototype.orbitStage = {
      mobile: {
        "mobileMenu": ".mobile-menu"
      }
    };

    function LoadMananger() {
      this.requireComponents = __bind(this.requireComponents, this);
      this.requireApps = __bind(this.requireApps, this);
      this.initOrbitStage = __bind(this.initOrbitStage, this);
      this.initIgnitionStage = __bind(this.initIgnitionStage, this);
      this.requireApps();
      if (User.count() > 0) {
        this.initIgnitionStage();
      } else {
        User.one("refresh", this.initIgnitionStage);
      }
      RSpine.one("platform:ajax-idle", this.initOrbitStage);
    }

    LoadMananger.prototype.initIgnitionStage = function() {
      var _this = this;
      return LazyLoad.js("" + RSpine.jsPath + (User.first().getProfile()) + "_" + RSpine.device + ".js", function() {
        _this.requireApps(moduleList);
        RSpine.trigger("platform:apps_loaded");
        return _this.initLaunchStage();
      });
    };

    LoadMananger.prototype.initLaunchStage = function() {
      var _this = this;
      return LazyLoad.js("" + RSpine.jsPath + "launchStage_" + RSpine.device + ".js", function() {
        return _this.requireComponents(_this.launchStage[RSpine.device]);
      });
    };

    LoadMananger.prototype.initOrbitStage = function() {
      var _this = this;
      return LazyLoad.js("" + RSpine.jsPath + "orbitStage_" + RSpine.device + ".js", function() {
        var lib, _i, _len;
        for (_i = 0, _len = moduleList.length; _i < _len; _i++) {
          lib = moduleList[_i];
          require(lib.path);
        }
        return _this.requireComponents(_this.orbitStage[RSpine.device]);
      });
    };

    LoadMananger.prototype.requireApps = function() {
      var app, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = moduleList.length; _i < _len; _i++) {
        app = moduleList[_i];
        if (app.namespace === "app") {
          RSpine.appsMetadata.push(app);
          RSpine.appsByPath[app.path] = app;
          if (app.home) {
            _results.push(RSpine.trigger("platform:app-launch", app.path));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    LoadMananger.prototype.requireComponents = function(stage) {
      var Component, component, element, elements, _results;
      _results = [];
      for (component in stage) {
        elements = stage[component];
        if (!RSpine.isArray(elements)) {
          elements = [elements];
        }
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = elements.length; _i < _len; _i++) {
            element = elements[_i];
            Component = require("components/" + component + "/" + component);
            if (typeof Component === "function") {
              _results1.push(new Component({
                el: $(element)
              }));
            } else {
              _results1.push(console.log("Error launching component: " + component + "/" + component + ", there's likely a syntax or logical error on it's main file"));
            }
          }
          return _results1;
        })());
      }
      return _results;
    };

    return LoadMananger;

  })();

  module.exports = LoadMananger;

}).call(this);
}, "managers/mobileManager": function(exports, require, module) {(function() {
  var DesktopManager, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  DesktopManager = (function(_super) {
    __extends(DesktopManager, _super);

    DesktopManager.prototype.elements = {
      ".mobile-platform-canvas": "pCanvas"
    };

    function DesktopManager() {
      this.registerTouch = __bind(this.registerTouch, this);
      this.moveDown = __bind(this.moveDown, this);
      this.moveUp = __bind(this.moveUp, this);
      this.shutdownApp = __bind(this.shutdownApp, this);
      this.launchApp = __bind(this.launchApp, this);
      DesktopManager.__super__.constructor.apply(this, arguments);
      this.html(require("layout_" + RSpine.device)());
      RSpine.liveAppPaths = [];
      RSpine.liveAppsByPath = {};
      RSpine.liveAppPositionByPath = {};
      RSpine.bind("platform:app-launch", this.launchApp);
      RSpine.bind("platform:app-shutdown", this.shutdownApp);
      RSpine.bind("platform:library-loaded-touch", this.registerTouch);
    }

    DesktopManager.prototype.launchApp = function(appPath) {
      var App, app, appMetadata, _ref;
      app = RSpine.liveAppsByPath[appPath];
      if (!app) {
        App = require(appPath);
        if (typeof App !== "function") {
          return console.log("Error launching App: " + appPath + ", there's likely a syntax or logical error on it's main file");
        }
        app = new App();
        RSpine.liveAppPaths.push(appPath);
        RSpine.liveAppsByPath[appPath] = app;
        appMetadata = RSpine.appsByPath[appPath];
        app.el.addClass(appMetadata.name);
        app.el.data("path", appPath);
      }
      if ((_ref = RSpine.currentApp) != null) {
        _ref.el.detach();
      }
      this.pCanvas.html(app.el);
      RSpine.currentApp = app;
      RSpine.currentAppPath = appPath;
      RSpine.trigger("platform:app-current-changed");
      return RSpine.trigger("platform-app-launch-complete");
    };

    DesktopManager.prototype.shutdownApp = function(appPath) {
      var app, appMetadata, index, nextAppIndex;
      index = RSpine.liveAppPaths.indexOf(appPath);
      app = RSpine.liveAppsByPath[appPath];
      appMetadata = RSpine.appsByPath[appPath];
      nextAppIndex = index < RSpine.liveAppsByPath - 1 ? index + 1 : 0;
      if (appMetadata.home) {
        return false;
      }
      RSpine.liveAppPaths.splice(1, index);
      RSpine.liveAppsByPath[appPath] = null;
      delete RSpine.liveAppsByPath[appPath];
      if (app.shutdown) {
        app.shutdown();
      } else {
        console.error(appPath + " does not have Shutdown Function - Warning Memory Leak Anti-Pattern");
      }
      this.pCanvas.find("." + appMetadata.name).remove();
      this.calculatePositionIndex();
      return RSpine.trigger("platform:app-shutdown-complete");
    };

    DesktopManager.prototype.moveUp = function() {
      var index;
      index = RSpine.liveAppPaths.indexOf(RSpine.currentAppPath);
      if ((index - 1) > -1) {
        return this.launchApp(RSpine.liveAppPaths[index - 1]);
      }
    };

    DesktopManager.prototype.moveDown = function() {
      var index;
      index = RSpine.liveAppPaths.indexOf(RSpine.currentAppPath);
      if ((index + 1) < RSpine.liveAppPaths.length) {
        return this.launchApp(RSpine.liveAppPaths[index + 1]);
      }
    };

    DesktopManager.prototype.registerTouch = function() {
      var _this = this;
      return Hammer(this.pCanvas).on("dragleft dragright", function(ev) {
        var timeNow;
        timeNow = new Date().getTime();
        if (timeNow - _this.lastMoveAnimation.time < 500 && _this.lastMoveAnimation.type === ev.type) {
          event.preventDefault();
          return;
        }
        _this.lastMoveAnimation = {
          time: timeNow,
          type: ev.type
        };
        if (ev.type === "dragleft") {
          _this.moveDown();
        }
        if (ev.type === "dragright") {
          return _this.moveUp();
        }
      });
    };

    return DesktopManager;

  })(RSpine.Controller);

  module.exports = DesktopManager;

}).call(this);
}, "models/account": function(exports, require, module) {(function() {
  var Account, RSpine, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  Account = (function(_super) {
    __extends(Account, _super);

    function Account() {
      _ref = Account.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Account.configure('Account', 'Name');

    Account.extend(RSpine.Model.SalesforceModel);

    Account.extend(RSpine.Model.SalesforceAjax);

    Account.standardObject = true;

    return Account;

  })(RSpine.Model);

  module.exports = Account;

}).call(this);
}, "models/cliente": function(exports, require, module) {(function() {
  var Cliente, RSpine, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  Cliente = (function(_super) {
    __extends(Cliente, _super);

    function Cliente() {
      this.filterByName = __bind(this.filterByName, this);
      _ref = Cliente.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Cliente.configure('Cliente', 'Name', 'CodigoExterno', "Activo", "Saldo", "DiasCredito", "CreditoAsignado", "Rating_Crediticio", "Negociacion", "LastModifiedDate", "Ruta", "Transporte", "Direccion", "Telefono", "RutaTransporte");

    Cliente.extend(RSpine.Model.SalesforceModel);

    Cliente.extend(RSpine.Model.SalesforceAjax);

    Cliente.avoidInsertList = ["Name", "Rating_Crediticio", "CodigoExterno", "Activo", "Saldo", "DiasCredito", "LastModifiedDate", "Meta", "Ventas", "PlazoRecompra", "PlazoPago"];

    Cliente.filters = {
      "": " Activo__c = true",
      "conSaldo": " Saldo__c != 0",
      "credito": " CreditoAsignado__c > 0 and DiasCredito__c > 0",
      "contado": " CreditoAsignado__c = 0 and DiasCredito__c = 0"
    };

    Cliente.to_name_array = function() {
      var cliente, clientes, names, _i, _len;
      clientes = Cliente.all();
      names = [];
      for (_i = 0, _len = clientes.length; _i < _len; _i++) {
        cliente = clientes[_i];
        names.push(cliente.Name);
      }
      return names;
    };

    Cliente.prototype.validate = function() {
      if (!this.Name) {
        return "El nombre del cliente es obligatorio";
      }
    };

    Cliente.prototype.willOverDraft = function(monto) {
      var od;
      od = false;
      if (monto + this.Saldo > this.CreditoAsignado) {
        od = true;
      }
      return od;
    };

    Cliente.prototype.filterByName = function(query, item) {
      var myRegExp, result;
      if (item.Activo === false) {
        return false;
      }
      if (item.DiasCredito > 0 && this.contado === true) {
        return false;
      }
      if (item.DiasCredito === 0 && this.contado === false) {
        return false;
      }
      if (!item.Name) {
        return false;
      }
      myRegExp = new RegExp(Cliente.queryToRegex(query), 'gi');
      result = item.Name.search(myRegExp) > -1 || String(item.CodigoExterno).indexOf(query) === 0;
      return result;
    };

    Cliente.typeAheadMatcher = function(item) {
      if (!item) {
        return false;
      }
      if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1) {
        return true;
      }
    };

    Cliente.typeAheadSorter = function(items) {
      return items.sort();
    };

    Cliente.typeAheadHighlighter = function(item) {
      var regex;
      regex = new RegExp('(' + this.query + ')', 'gi');
      return item.replace(regex, "<strong>$1</strong>");
    };

    Cliente.typeAheadSource = function(query, process) {
      var cliente, clientes, map, _i, _len, _ref1;
      clientes = [];
      map = {};
      _ref1 = Cliente.all();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        cliente = _ref1[_i];
        map[cliente.Name] = cliente;
        clientes.push(cliente.Name);
      }
      console.log(clientes);
      return process(clientes);
    };

    return Cliente;

  })(RSpine.Model);

  module.exports = Cliente;

}).call(this);
}, "models/pedidos": function(exports, require, module) {(function() {
  var Account, RSpine, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  Account = (function(_super) {
    __extends(Account, _super);

    function Account() {
      _ref = Account.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Account.configure('Account', 'Name');

    Account.extend(RSpine.Model.SalesforceModel);

    Account.extend(RSpine.Model.SalesforceAjax);

    Account.custumObject = true;

    return Account;

  })(RSpine.Model);

  module.exports = Account;

}).call(this);
}, "app/webHome/layout_web": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var RSpine;
    
      RSpine = require("rspine");
    
      __out.push('\n\n<div class="extra-menu">\n  \n  <div class="color-column .small-menu-app-menu onOnApp-menu extra-menu-view">\n    <div class="header red"><span class="triangle"></span><span class="large-title">The App Menu</span></div>\n    <div class="panel-sub-heading">\n      <div class="-title text-center">Home</div>\n    </div>\n    <div class="content-body  full-height  app-menu-content-body">\n      <div class="small-app-menu full-height"></div>\n    </div>\n  </div>\n\n  <div class="color-column .small-menu-news-feed onOnSocial extra-menu-view">\n     <div class="header blue"><span class="triangle"></span><span class="large-title">The Social Network</span></div>\n     <div class="sub-header">\n       <div class="sub-title">Que hay de nuevo?</div>\n     </div>\n     <div class="content-body full-height small-news-feed scrollable"></div>\n   </div>  \n\n</div>\n\n<div class="row ">\n  \n  <div class="col-md-4 home-column home-column-large">\n    <div class="panel panel-primary ">\n      <div class="panel-heading ">\n        <span class="bg">\n        </span>\n        <span class="panel-title">The Social Network</span>\n      </div>\n      <div class="panel-sub-heading">\n        <div class="panel-sub-title">Que hay de nuevo?</div>\n      </div>\n      <div data-offset="145" class="panel-body panel-stretch news-feed "></div>\n    </div>\n  </div>\n\n  \n  <div class="col-md-4 home-column">\n    <div class=" panel panel-danger">\n\n      <div class="panel-heading red">\n\n        \n      <span class="bg"></span>\n    \n      <span class="panel-title">App Menu</span></div>\n      <div class="panel-sub-heading">\n        <div class="panel-title text-center">Home</div>\n      </div>\n      \n      <div  data-offset="145"  class="panel-body panel-stretch">\n        <div class="app-menu"></div>\n      </div>\n    </div>\n  </div>\n  \n  <div class="col-md-4 home-column home-column-large">\n    <div class="panel panel-info">\n      <div class="panel-heading">\n        <span class="bg"></span>\n        <span class="panel-title">Que paso con el cliente </span>\n      </div>\n      <div class="panel-sub-heading">\n        <div class="sub-title">Todos los Clientes</div>\n      </div>\n\n      <div data-offset="145" class="panel-body panel-stretch">\n        <div class="content-body-wrapper app-metrics">\n\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/webHome/webHome": function(exports, require, module) {(function() {
  var AppMenu, HomeView, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  AppMenu = require("components/appMenu/appMenu");

  HomeView = (function(_super) {
    __extends(HomeView, _super);

    HomeView.prototype.className = "app-canvas home-view";

    HomeView.prototype.elements = {
      ".app-menu": "appMenu",
      ".small-app-menu": "smallAppMenu"
    };

    function HomeView() {
      HomeView.__super__.constructor.apply(this, arguments);
      this.html(require("app/webHome/layout_" + RSpine.app.layout)());
      new AppMenu({
        el: this.appMenu
      });
      new AppMenu({
        el: this.smallAppMenu
      });
    }

    return HomeView;

  })(RSpine.Controller);

  module.exports = HomeView;

}).call(this);
}, "components/menu/menu": function(exports, require, module) {(function() {
  var Menu, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  Menu = (function(_super) {
    __extends(Menu, _super);

    Menu.prototype.elements = {
      ".liveApps": "liveApps"
    };

    Menu.prototype.events = {
      "click .live-app-icon": "onLiveAppIconClick",
      "click .social-icon": "onSocialIconClick"
    };

    function Menu() {
      this.clickHideExtra = __bind(this.clickHideExtra, this);
      this.onSocialIconClick = __bind(this.onSocialIconClick, this);
      Menu.__super__.constructor.apply(this, arguments);
      this.append(require("components/menu/menu_layout")());
      this.extra = $(".extra-menu");
      RSpine.bind("platform:app-shutdown-complete", this.renderApps);
      RSpine.bind("platform:app-current-changed", this.renderApps);
      this.el.click(this.clickDontHideExtra);
      this.extra.click(this.clickDontHideExtra);
      $("body").click(this.clickHideExtra);
      this.renderApps();
    }

    Menu.prototype.destroyApp = function(e) {
      var appPath, target;
      target = $(e.target);
      while (!target.hasClass("live-app-icon")) {
        target = target.parent();
      }
      appPath = target.data("path");
      return RSpine.trigger("platform:app-shutdown", appPath);
    };

    Menu.prototype.onLiveAppIconClick = function(e) {
      var appPath, target;
      target = $(e.target);
      while (!target.hasClass("live-app-icon")) {
        target = target.parent();
      }
      appPath = target.data("path");
      if (target.hasClass("active")) {
        return this.destroyApp(e);
      } else {
        return RSpine.trigger("platform:app-launch", appPath);
      }
    };

    Menu.prototype.renderApps = function() {
      return $(".liveApps").html(require("components/menu/menu_liveApp")({
        liveAppsByPath: RSpine.liveAppsByPath
      }));
    };

    Menu.prototype.onSocialIconClick = function(e) {
      var extraType, target, type;
      this.el.find(".social-icon").removeClass("active");
      target = $(e.target);
      while (!target.hasClass("social-icon")) {
        target = target.parent();
      }
      type = target.data("type");
      extraType = this.extra.data("type");
      if (this.extra.hasClass("on")) {
        this.extra.removeClass("on");
      } else {
        this.extra.addClass("on");
      }
      if (type !== extraType) {
        this.extra.addClass("on");
      }
      this.extra.removeClass(extraType);
      if (this.extra.hasClass("on")) {
        target.addClass("active");
      }
      this.extra.data("type", type);
      return this.extra.addClass(type);
    };

    Menu.prototype.clickDontHideExtra = function(e) {
      e.preventDefault();
      return e.stopImmediatePropagation();
    };

    Menu.prototype.clickHideExtra = function() {
      this.extra.removeClass("on");
      return this.el.find(".social-icon").removeClass("purple");
    };

    return Menu;

  })(RSpine.Controller);

  module.exports = Menu;

}).call(this);
}, "components/menu/menu_layout": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('\n<div class="liveAppMenu">\n\n  <ul class="liveApps list-unstyled">\n  \n    \n  \n  </ul>\n\n</div>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "components/menu/menu_liveApp": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var RSpine, active, index, position, _ref;
    
      RSpine = require("rspine");
    
      __out.push('\n\n<li>\n  <span class="menu-title"> \n    Menu\n  </span>\n  \n</li>\n\n');
    
      _ref = this.liveAppsByPath;
      for (index in _ref) {
        position = _ref[index];
        __out.push('\n  \n  \n  ');
        if (RSpine.currentAppPath === RSpine.appsByPath[index].path) {
          active = "active";
        } else {
          active = "";
        }
        __out.push('\n\n  \n      <li class="app-icon live-app-icon unselectable ');
        __out.push(__sanitize(active));
        __out.push('" data-path="');
        __out.push(__sanitize(RSpine.appsByPath[index].path));
        __out.push('">\n        \n        <div class="app-icon-header ');
        __out.push(__sanitize(RSpine.appsByPath[index].iconColor || "blue"));
        __out.push('">\n          <span class="label">');
        __out.push(__sanitize(RSpine.appsByPath[index].label));
        __out.push('</span>\n        </div>\n        \n        <div class="text">\n          ');
        __out.push(__sanitize(RSpine.appsByPath[index].iconLabel));
        __out.push('\n        </div>\n      </li>\n');
      }
    
      __out.push('\n  \n<li class="">\n<span class="menu-title shortcut">\n  Shortcuts\n</span>\n\n</li>\n  \n<li data-type="app-menu" data-color="red" class="app-icon side-icon social-icon home-icon unselectable" >\n  \n       <div class="app-icon-header red">\n        </div>\n  \n\n  <div class="text">\n    <span class="text-header">App Menu</span>\n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n    \t width="12.38px" height="14.06px" viewBox="0 0 12.38 14.06" enable-background="new 0 0 12.38 14.06" xml:space="preserve">\n    <g>\n    \t<g>\n    \t\t<rect x="1.19" y="1.25" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="8.71" y="1.25" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="4.95" y="1.25" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t</g>\n    \t<g>\n    \t\t<rect x="1.19" y="5.71" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="8.71" y="5.71" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="4.95" y="5.71" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t</g>\n    \t<g>\n    \t\t<rect x="1.19" y="10.17" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="8.71" y="10.17" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t\t<rect x="4.95" y="10.17" fill="#B4B4B4" width="2.46" height="2.46"/>\n    \t</g>\n    </g>\n    </svg>\n  </div>\n</li>\n\n<li data-color="blue" class="app-icon side-icon social-icon unselectable" data-type="social">\n     \n      <div class="app-icon-header blue">\n       </div>\n  \n  <div class="text">\n  <span class="text-header">Social</span>\n     <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n     \t width="12.38px" height="14.06px" viewBox="0 0 12.38 14.06" enable-background="new 0 0 12.38 14.06" xml:space="preserve">\n     <g>\n     \t<g>\n     \t\t<path fill="#B4B4B4" d="M10.39,6.37c0-1.54-1.25-2.79-2.79-2.79c-1.54,0-2.79,1.25-2.79,2.79c0,1.54,1.25,2.79,2.79,2.79\n     \t\t\tC9.14,9.16,10.39,7.91,10.39,6.37z"/>\n     \t\t<path fill="#B4B4B4" d="M7.6,9.16c-2.27,0-4.11,1.84-4.11,4.11h8.22C11.7,11,9.87,9.16,7.6,9.16z"/>\n     \t\t<path fill="#B4B4B4" d="M4.22,6.39c0-0.01,0-0.02,0-0.02c0-1.86,1.52-3.38,3.38-3.38c0.01,0,0.02,0,0.02,0\n     \t\t\tC7.3,1.8,6.23,0.91,4.93,0.91c-1.54,0-2.79,1.25-2.79,2.79C2.14,4.99,3.02,6.08,4.22,6.39z"/>\n     \t\t<path fill="#B4B4B4" d="M5.55,9.05C4.79,8.46,4.29,7.57,4.23,6.56C2.3,6.89,0.82,8.57,0.82,10.6h2.93\n     \t\t\tC4.21,9.94,4.82,9.4,5.55,9.05z"/>\n     \t</g>\n     </g>\n     </svg>\n     \n  </div>\n  \n   \n    \n  \n\n</li>\n\n\n<li data-color="purple" class="app-icon side-icon unselectable" data-type="metric">\n       <div class="app-icon-header purple">\n        </div>\n\n  <div class="text">\n  <span class="text-header">Metrics</span>\n  \n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n    \t width="12.38px" height="14.06px" viewBox="0 0 12.38 14.06" enable-background="new 0 0 12.38 14.06" xml:space="preserve">\n    <g>\n    \t<rect x="1.31" y="5.27" fill="#B4B4B4" width="2.46" height="7.85"/>\n    \t<rect x="4.18" y="0.95" fill="#B4B4B4" width="2.46" height="12.18"/>\n    \t<rect x="7.05" y="4.83" fill="#B4B4B4" width="2.46" height="8.29"/>\n    \t<rect x="9.92" y="8.98" fill="#B4B4B4" width="2.46" height="4.15"/>\n    </g>\n    </svg>\n    \n  </div>\n</li>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "components/appMenu/appMenu": function(exports, require, module) {(function() {
  var $, AppMenu, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  if (!$) {
    $ = window.$;
  }

  AppMenu = (function(_super) {
    __extends(AppMenu, _super);

    AppMenu.className = "";

    AppMenu.prototype.events = {
      "click .js-btn-app": "onAppClick"
    };

    function AppMenu() {
      var _this = this;
      AppMenu.__super__.constructor.apply(this, arguments);
      RSpine.bind("platform:apps_loaded", function() {
        return _this.html(require("components/appMenu/appMenu_layout")({
          apps: RSpine.appsMetadata
        }));
      });
    }

    AppMenu.prototype.onAppClick = function(e) {
      var appPath, target;
      target = $(e.target);
      while (!target.hasClass("js-btn-app")) {
        target = target.parent();
      }
      appPath = target.data("path");
      return RSpine.trigger("platform:app-launch", appPath);
    };

    return AppMenu;

  })(RSpine.Controller);

  module.exports = AppMenu;

}).call(this);
}, "components/appMenu/appMenu_layout": function(exports, require, module) {var content = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var app, _i, _len, _ref;
    
      __out.push('<div class=" app-highlight">\n  <svg class="r2-logo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n  \t width="180.41px" height="92.78px" viewBox="0 0 180.41 92.78" enable-background="new 0 0 180.41 92.78" xml:space="preserve">\n  <g>\n  \t<g opacity="0.8">\n  \t\t<g>\n  \t\t\t<g>\n  \t\t\t\t<path fill="#8A8C8E" d="M87.74,77.55c0.01,0.17,0.05,0.32,0.12,0.45c0.06,0.12,0.15,0.22,0.25,0.3c0.1,0.08,0.22,0.13,0.35,0.17\n  \t\t\t\t\tc0.13,0.04,0.27,0.05,0.42,0.05c0.18,0,0.33-0.02,0.46-0.07c0.13-0.04,0.23-0.1,0.31-0.18c0.08-0.08,0.14-0.16,0.18-0.26\n  \t\t\t\t\tc0.04-0.1,0.06-0.21,0.06-0.31c0-0.15-0.03-0.28-0.1-0.38c-0.07-0.1-0.16-0.17-0.27-0.23c-0.11-0.06-0.24-0.11-0.39-0.15\n  \t\t\t\t\ts-0.29-0.07-0.45-0.11c-0.15-0.04-0.3-0.07-0.45-0.12c-0.15-0.05-0.27-0.11-0.38-0.2c-0.11-0.08-0.2-0.18-0.27-0.31\n  \t\t\t\t\ts-0.1-0.29-0.1-0.48c0-0.13,0.03-0.27,0.08-0.39c0.06-0.13,0.14-0.24,0.25-0.34s0.25-0.18,0.42-0.24\n  \t\t\t\t\tc0.17-0.06,0.36-0.09,0.59-0.09c0.22,0,0.42,0.03,0.59,0.09c0.17,0.06,0.31,0.15,0.42,0.26c0.11,0.11,0.19,0.23,0.25,0.38\n  \t\t\t\t\tc0.05,0.14,0.08,0.29,0.08,0.46h-0.36c0-0.15-0.03-0.28-0.08-0.39c-0.05-0.11-0.13-0.2-0.22-0.27c-0.09-0.07-0.2-0.12-0.31-0.15\n  \t\t\t\t\tc-0.12-0.03-0.24-0.05-0.36-0.05c-0.19,0-0.35,0.03-0.48,0.08s-0.23,0.12-0.31,0.21c-0.08,0.08-0.13,0.18-0.16,0.28\n  \t\t\t\t\tc-0.03,0.1-0.04,0.21-0.02,0.31c0.02,0.13,0.07,0.23,0.15,0.31c0.08,0.08,0.18,0.14,0.3,0.19c0.12,0.05,0.25,0.09,0.39,0.12\n  \t\t\t\t\tc0.14,0.03,0.28,0.07,0.43,0.1c0.15,0.04,0.29,0.08,0.43,0.12c0.14,0.05,0.26,0.11,0.37,0.19c0.11,0.08,0.19,0.19,0.26,0.31\n  \t\t\t\t\tc0.06,0.13,0.1,0.29,0.1,0.48c0,0.37-0.13,0.65-0.38,0.86c-0.25,0.2-0.61,0.3-1.07,0.3c-0.21,0-0.4-0.03-0.58-0.08\n  \t\t\t\t\tc-0.18-0.05-0.33-0.13-0.46-0.24c-0.13-0.11-0.23-0.24-0.3-0.4c-0.07-0.16-0.11-0.35-0.11-0.56H87.74z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M93.71,78.74v-3.97h2.64v0.32h-2.27v1.43h2.04v0.32h-2.04v1.58h2.32v0.32H93.71z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M99.48,74.77h2.89v0.32h-1.26v3.65h-0.38v-3.65h-1.26V74.77z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M105.82,77.55c0.01,0.17,0.05,0.32,0.12,0.45c0.06,0.12,0.15,0.22,0.24,0.3\n  \t\t\t\t\tc0.1,0.08,0.22,0.13,0.35,0.17c0.13,0.04,0.27,0.05,0.43,0.05c0.18,0,0.33-0.02,0.46-0.07c0.13-0.04,0.23-0.1,0.31-0.18\n  \t\t\t\t\tc0.08-0.08,0.14-0.16,0.18-0.26c0.04-0.1,0.06-0.21,0.06-0.31c0-0.15-0.03-0.28-0.1-0.38s-0.16-0.17-0.27-0.23\n  \t\t\t\t\tc-0.11-0.06-0.24-0.11-0.38-0.15c-0.15-0.04-0.29-0.07-0.45-0.11c-0.15-0.04-0.3-0.07-0.45-0.12s-0.27-0.11-0.38-0.2\n  \t\t\t\t\tc-0.11-0.08-0.21-0.18-0.27-0.31c-0.07-0.13-0.11-0.29-0.11-0.48c0-0.13,0.03-0.27,0.09-0.39c0.05-0.13,0.14-0.24,0.25-0.34\n  \t\t\t\t\tc0.11-0.1,0.25-0.18,0.42-0.24c0.17-0.06,0.37-0.09,0.59-0.09c0.22,0,0.42,0.03,0.59,0.09c0.17,0.06,0.31,0.15,0.42,0.26\n  \t\t\t\t\tc0.11,0.11,0.19,0.23,0.25,0.38c0.06,0.14,0.08,0.29,0.08,0.46h-0.36c0-0.15-0.03-0.28-0.08-0.39c-0.05-0.11-0.12-0.2-0.21-0.27\n  \t\t\t\t\tc-0.09-0.07-0.2-0.12-0.32-0.15s-0.24-0.05-0.36-0.05c-0.19,0-0.35,0.03-0.48,0.08c-0.13,0.05-0.24,0.12-0.31,0.21\n  \t\t\t\t\tc-0.08,0.08-0.13,0.18-0.16,0.28c-0.03,0.1-0.04,0.21-0.02,0.31c0.02,0.13,0.07,0.23,0.15,0.31c0.08,0.08,0.18,0.14,0.3,0.19\n  \t\t\t\t\tc0.12,0.05,0.25,0.09,0.39,0.12c0.14,0.03,0.29,0.07,0.43,0.1c0.15,0.04,0.29,0.08,0.43,0.12c0.14,0.05,0.26,0.11,0.37,0.19\n  \t\t\t\t\tc0.11,0.08,0.19,0.19,0.26,0.31c0.06,0.13,0.1,0.29,0.1,0.48c0,0.37-0.13,0.65-0.38,0.86c-0.25,0.2-0.61,0.3-1.07,0.3\n  \t\t\t\t\tc-0.21,0-0.4-0.03-0.57-0.08c-0.18-0.05-0.33-0.13-0.46-0.24c-0.13-0.11-0.23-0.24-0.3-0.4c-0.07-0.16-0.11-0.35-0.11-0.56\n  \t\t\t\t\tH105.82z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M117.29,76.68l1.2-1.91h0.44L117.49,77v1.73h-0.38v-1.7l-1.42-2.27h0.43L117.29,76.68z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M122.05,76.76c0-0.29,0.04-0.56,0.12-0.82c0.08-0.25,0.2-0.47,0.35-0.66s0.35-0.34,0.57-0.45\n  \t\t\t\t\tc0.23-0.11,0.49-0.17,0.79-0.17c0.31,0,0.58,0.05,0.81,0.16c0.23,0.11,0.43,0.26,0.59,0.45s0.27,0.41,0.35,0.67\n  \t\t\t\t\tc0.08,0.26,0.12,0.53,0.12,0.82c0,0.29-0.04,0.56-0.12,0.81c-0.08,0.25-0.2,0.47-0.35,0.66c-0.15,0.19-0.35,0.34-0.58,0.45\n  \t\t\t\t\tc-0.23,0.11-0.5,0.17-0.8,0.17s-0.57-0.05-0.8-0.17c-0.23-0.11-0.43-0.26-0.58-0.45c-0.15-0.19-0.27-0.41-0.35-0.66\n  \t\t\t\t\tC122.08,77.31,122.05,77.04,122.05,76.76z M123.9,78.52c0.26,0,0.48-0.05,0.67-0.14c0.19-0.1,0.34-0.23,0.46-0.39\n  \t\t\t\t\tc0.12-0.16,0.21-0.35,0.26-0.56c0.06-0.21,0.08-0.44,0.08-0.67c0-0.28-0.03-0.52-0.1-0.74c-0.07-0.22-0.17-0.4-0.29-0.56\n  \t\t\t\t\ts-0.29-0.27-0.47-0.35s-0.39-0.12-0.62-0.12c-0.25,0-0.47,0.05-0.66,0.15c-0.19,0.1-0.34,0.23-0.46,0.39s-0.21,0.35-0.26,0.56\n  \t\t\t\t\tc-0.06,0.21-0.09,0.44-0.09,0.67c0,0.24,0.03,0.46,0.09,0.67c0.06,0.21,0.14,0.4,0.26,0.56c0.12,0.16,0.27,0.29,0.46,0.39\n  \t\t\t\t\tC123.41,78.47,123.64,78.52,123.9,78.52z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M129.25,74.77h0.37v2.37c0,0.49,0.09,0.85,0.28,1.06c0.19,0.22,0.48,0.32,0.89,0.32\n  \t\t\t\t\tc0.21,0,0.39-0.03,0.54-0.09c0.15-0.06,0.27-0.14,0.36-0.26c0.09-0.12,0.16-0.26,0.2-0.43c0.04-0.17,0.06-0.38,0.06-0.61v-2.37\n  \t\t\t\t\th0.38v2.47c0,0.52-0.13,0.91-0.38,1.19c-0.25,0.27-0.64,0.41-1.15,0.41c-0.52,0-0.9-0.14-1.16-0.42\n  \t\t\t\t\tc-0.25-0.28-0.38-0.67-0.38-1.18V74.77z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M140.23,78.74v-3.97h2.56v0.32h-2.18v1.43h1.99v0.32h-1.99v1.9H140.23z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M146.46,76.93v1.8l-0.38-0.01v-3.96h1.55c0.44,0,0.77,0.08,1,0.25c0.23,0.16,0.35,0.43,0.35,0.8\n  \t\t\t\t\tc0,0.25-0.05,0.45-0.15,0.59c-0.1,0.15-0.27,0.27-0.49,0.38c0.12,0.04,0.21,0.1,0.28,0.18c0.07,0.08,0.12,0.16,0.15,0.26\n  \t\t\t\t\tc0.03,0.1,0.05,0.21,0.06,0.31c0.01,0.11,0.01,0.22,0.02,0.32c0.01,0.15,0.01,0.28,0.02,0.38c0.01,0.1,0.02,0.18,0.03,0.24\n  \t\t\t\t\tc0.01,0.06,0.03,0.11,0.04,0.15c0.02,0.03,0.04,0.06,0.07,0.08v0.03l-0.41,0.01c-0.04-0.06-0.07-0.16-0.09-0.28\n  \t\t\t\t\ts-0.03-0.24-0.04-0.37c-0.01-0.13-0.02-0.25-0.02-0.38c0-0.12-0.02-0.22-0.03-0.3c-0.02-0.11-0.06-0.19-0.11-0.26\n  \t\t\t\t\tc-0.05-0.07-0.11-0.11-0.18-0.15c-0.07-0.03-0.15-0.05-0.23-0.07s-0.18-0.02-0.27-0.02H146.46z M147.63,76.61\n  \t\t\t\t\tc0.14,0,0.27-0.02,0.39-0.04c0.12-0.03,0.22-0.08,0.31-0.14c0.09-0.06,0.16-0.15,0.21-0.24c0.05-0.1,0.08-0.22,0.08-0.36\n  \t\t\t\t\tc0-0.15-0.03-0.27-0.08-0.37c-0.05-0.09-0.13-0.17-0.22-0.22c-0.09-0.05-0.19-0.09-0.31-0.12c-0.12-0.02-0.23-0.03-0.36-0.03\n  \t\t\t\t\th-1.19v1.53H147.63z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M152.53,78.74v-3.97h2.64v0.32h-2.27v1.43h2.04v0.32h-2.04v1.58h2.32v0.32H152.53z"/>\n  \t\t\t\t<path fill="#8A8C8E" d="M158.65,78.74v-3.97h2.64v0.32h-2.27v1.43h2.04v0.32h-2.04v1.58h2.32v0.32H158.65z"/>\n  \t\t\t</g>\n  \t\t</g>\n  \t</g>\n  \t<g>\n  \t\t<g>\n  \t\t\t<g>\n  \t\t\t\t<g>\n  \t\t\t\t\t<path fill="#CDCCCC" d="M95.62,29.15h12.85l-19.96,38.6l-19.9-38.6h12.85l7.05,16.24L95.62,29.15z"/>\n  \t\t\t\t\t<path fill="#CDCCCC" d="M143.34,48.61c0,10.61-8.63,19.3-19.3,19.3s-19.3-8.69-19.3-19.3c0-10.67,8.63-19.3,19.3-19.3\n  \t\t\t\t\t\tS143.34,37.94,143.34,48.61z M132.36,48.61c0-4.99-3.91-8.85-8.31-8.85s-8.31,3.86-8.31,8.85c0,5.25,3.91,8.79,8.31,8.79\n  \t\t\t\t\t\tS132.36,53.86,132.36,48.61z"/>\n  \t\t\t\t\t<path fill="#CDCCCC" d="M171.04,38.39h-8.37v29.46h-11.15V38.39h-8.31v-9.24h8.31h11.15h8.37V38.39z"/>\n  \t\t\t\t</g>\n  \t\t\t\t<path fill="#CDCCCC" d="M47.82,37.3l11.06-11.06c0.76-0.59,1.41-1.29,1.93-2.1c2.43-3.36,2.14-8.07-0.88-11.09\n  \t\t\t\t\tc-1.67-1.68-3.87-2.51-6.07-2.51c-0.83,0-1.65,0.12-2.45,0.36H19.5c-4.74,0-8.58,3.84-8.58,8.58c0,4.74,3.84,8.58,8.58,8.58\n  \t\t\t\t\th13.3l-9.12,9.12c-0.3,0.3-0.56,0.62-0.81,0.95c-1.29,1.61-1.86,3.77-1.67,5.89c0,0.02,0,0.04,0,0.06\n  \t\t\t\t\tc0.11,1.1,0.41,2.18,0.93,3.18c0.39,0.74,0.89,1.4,1.46,1.97c0.03,0.03,0.05,0.06,0.08,0.09c1.68,1.68,3.87,2.51,6.07,2.51\n  \t\t\t\t\tc1.83,0,3.66-0.59,5.19-1.75c0.63,0.02,1.18,0.18,2.04,0.18c5.71,0,9.94,4.65,9.94,10.37s-4.65,10.37-10.36,10.37\n  \t\t\t\t\tc-5.35,0-9.89-4.17-10.33-9.49c-0.33-4-3.73-7.13-7.74-7.13c-0.21,0-0.43,0.01-0.65,0.03c-2.06,0.17-3.94,1.13-5.28,2.72\n  \t\t\t\t\tc-1.34,1.59-1.99,3.6-1.82,5.67c1.1,13.32,12.44,23.76,25.82,23.76c14.29,0,25.91-11.62,25.91-25.91\n  \t\t\t\t\tC62.44,50.37,56.46,41.5,47.82,37.3z M34.6,48.11c-1.3,1.3-3.03,2.01-4.86,2.01c-1.83,0-3.56-0.71-4.86-2.01\n  \t\t\t\t\tc-2.68-2.68-2.68-7.04,0-9.73L49,14.25c1.3-1.3,3.03-2.01,4.86-2.01c1.84,0,3.56,0.71,4.86,2.01c2.68,2.68,2.68,7.04,0,9.73\n  \t\t\t\t\tL34.6,48.11z M19.5,26.35c-3.79,0-6.88-3.09-6.88-6.88c0-3.79,3.08-6.88,6.88-6.88h28.8c-0.17,0.15-0.34,0.29-0.5,0.46\n  \t\t\t\t\tl-13.3,13.3H19.5z M36.54,84.82c-12.5,0-23.09-9.75-24.12-22.19c-0.13-1.62,0.37-3.19,1.42-4.43c1.05-1.23,2.51-1.99,4.13-2.12\n  \t\t\t\t\tc0.17-0.02,0.34-0.02,0.5-0.02c3.13,0,5.79,2.45,6.05,5.57c0.51,6.2,5.79,11.06,12.03,11.06c6.65,0,12.07-5.42,12.07-12.07\n  \t\t\t\t\tc0-6.77-5.11-12.07-11.64-12.07c-0.13,0-0.26-0.01-0.38-0.02l9.95-9.95c8.37,3.81,14.2,12.25,14.2,22.04\n  \t\t\t\t\tC60.74,73.96,49.88,84.82,36.54,84.82z"/>\n  \t\t\t\t<g display="none">\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M79.76,78.35l0.55-0.05c0.03,0.22,0.09,0.4,0.18,0.54c0.09,0.14,0.24,0.25,0.44,0.34\n  \t\t\t\t\t\tc0.2,0.09,0.42,0.13,0.67,0.13c0.22,0,0.42-0.03,0.58-0.1c0.17-0.07,0.29-0.16,0.38-0.27c0.08-0.11,0.12-0.24,0.12-0.38\n  \t\t\t\t\t\tc0-0.13-0.04-0.26-0.12-0.36c-0.08-0.1-0.21-0.19-0.39-0.26c-0.12-0.05-0.38-0.12-0.78-0.21c-0.4-0.1-0.68-0.19-0.85-0.28\n  \t\t\t\t\t\tc-0.21-0.11-0.36-0.24-0.46-0.41c-0.1-0.16-0.15-0.34-0.15-0.54c0-0.22,0.06-0.43,0.19-0.62c0.12-0.19,0.31-0.34,0.55-0.44\n  \t\t\t\t\t\tc0.24-0.1,0.51-0.15,0.8-0.15c0.32,0,0.61,0.05,0.86,0.16c0.25,0.1,0.44,0.26,0.57,0.46s0.21,0.43,0.21,0.69l-0.55,0.04\n  \t\t\t\t\t\tc-0.03-0.28-0.13-0.48-0.3-0.63c-0.17-0.14-0.43-0.21-0.76-0.21c-0.35,0-0.6,0.06-0.77,0.19c-0.16,0.13-0.24,0.28-0.24,0.46\n  \t\t\t\t\t\tc0,0.16,0.06,0.29,0.17,0.39c0.11,0.1,0.4,0.2,0.87,0.31c0.47,0.11,0.79,0.2,0.97,0.28c0.25,0.12,0.44,0.27,0.56,0.45\n  \t\t\t\t\t\tc0.12,0.18,0.18,0.39,0.18,0.62c0,0.23-0.07,0.45-0.2,0.66c-0.13,0.21-0.32,0.37-0.57,0.48s-0.53,0.17-0.84,0.17\n  \t\t\t\t\t\tc-0.4,0-0.73-0.06-1-0.17c-0.27-0.12-0.48-0.29-0.63-0.52C79.85,78.91,79.77,78.64,79.76,78.35z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M85.87,79.75v-4.37h3.16v0.52h-2.58v1.34h2.42v0.51h-2.42v1.49h2.68v0.52H85.87z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M92.88,79.75V75.9h-1.44v-0.52h3.46v0.52h-1.45v3.86H92.88z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M98.44,79.75V75.9H97v-0.52h3.47v0.52h-1.45v3.86H98.44z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M102.99,79.75v-4.37h0.58v4.37H102.99z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M106.41,79.75v-4.37h0.59l2.3,3.43v-3.43h0.55v4.37h-0.59l-2.3-3.44v3.44H106.41z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M114.71,78.04v-0.51l1.85,0v1.62c-0.28,0.23-0.58,0.4-0.88,0.51\n  \t\t\t\t\t\tc-0.3,0.11-0.61,0.17-0.93,0.17c-0.43,0-0.82-0.09-1.17-0.28s-0.62-0.45-0.79-0.8c-0.18-0.35-0.27-0.74-0.27-1.17\n  \t\t\t\t\t\tc0-0.43,0.09-0.82,0.27-1.19s0.43-0.64,0.77-0.82c0.34-0.18,0.72-0.27,1.16-0.27c0.31,0,0.6,0.05,0.86,0.15\n  \t\t\t\t\t\tc0.26,0.1,0.46,0.24,0.6,0.43c0.14,0.18,0.25,0.42,0.33,0.71l-0.52,0.14c-0.07-0.22-0.15-0.4-0.24-0.52\n  \t\t\t\t\t\tc-0.1-0.13-0.24-0.23-0.42-0.31c-0.18-0.08-0.38-0.12-0.6-0.12c-0.26,0-0.49,0.04-0.69,0.12c-0.19,0.08-0.35,0.19-0.47,0.32\n  \t\t\t\t\t\tc-0.12,0.13-0.21,0.28-0.28,0.43c-0.11,0.27-0.17,0.56-0.17,0.88c0,0.39,0.07,0.71,0.2,0.98s0.33,0.46,0.59,0.59\n  \t\t\t\t\t\tc0.26,0.13,0.53,0.19,0.82,0.19c0.25,0,0.5-0.05,0.73-0.14c0.24-0.1,0.42-0.2,0.54-0.31v-0.81H114.71z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M123.89,79.75v-1.85l-1.69-2.52h0.71l0.86,1.32c0.16,0.25,0.31,0.49,0.44,0.74\n  \t\t\t\t\t\tc0.13-0.23,0.29-0.48,0.48-0.77l0.85-1.29h0.67l-1.74,2.52v1.85H123.89z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M128.39,77.63c0-0.72,0.2-1.29,0.58-1.7s0.89-0.62,1.51-0.62\n  \t\t\t\t\t\tc0.4,0,0.77,0.1,1.09,0.29c0.33,0.19,0.57,0.46,0.74,0.8c0.17,0.35,0.25,0.74,0.25,1.17c0,0.44-0.09,0.84-0.27,1.19\n  \t\t\t\t\t\tc-0.18,0.35-0.43,0.62-0.76,0.79c-0.33,0.18-0.68,0.27-1.06,0.27c-0.41,0-0.78-0.1-1.1-0.3s-0.57-0.47-0.74-0.81\n  \t\t\t\t\t\tC128.48,78.37,128.39,78.01,128.39,77.63z M128.99,77.64c0,0.53,0.14,0.94,0.42,1.24c0.28,0.3,0.64,0.46,1.06,0.46\n  \t\t\t\t\t\tc0.44,0,0.79-0.15,1.08-0.46s0.42-0.74,0.42-1.3c0-0.36-0.06-0.67-0.18-0.93c-0.12-0.27-0.29-0.47-0.53-0.62\n  \t\t\t\t\t\tc-0.23-0.15-0.49-0.22-0.78-0.22c-0.41,0-0.76,0.14-1.06,0.42C129.14,76.51,128.99,76.98,128.99,77.64z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M138.02,75.38h0.58v2.53c0,0.44-0.05,0.79-0.15,1.04c-0.1,0.26-0.28,0.47-0.54,0.63\n  \t\t\t\t\t\ts-0.6,0.24-1.02,0.24c-0.41,0-0.74-0.07-1-0.21c-0.26-0.14-0.45-0.35-0.56-0.61s-0.17-0.63-0.17-1.09v-2.53h0.58v2.52\n  \t\t\t\t\t\tc0,0.38,0.04,0.66,0.11,0.84c0.07,0.18,0.19,0.32,0.36,0.42c0.17,0.1,0.38,0.14,0.63,0.14c0.43,0,0.73-0.1,0.91-0.29\n  \t\t\t\t\t\ts0.27-0.56,0.27-1.11V75.38z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M144.95,79.75v-4.37h2.95v0.52h-2.37v1.35h2.05v0.52h-2.05v1.99H144.95z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M150.49,79.75v-4.37h1.94c0.39,0,0.69,0.04,0.89,0.12c0.2,0.08,0.37,0.22,0.49,0.41\n  \t\t\t\t\t\tc0.12,0.2,0.18,0.42,0.18,0.66c0,0.31-0.1,0.57-0.3,0.78c-0.2,0.21-0.51,0.35-0.93,0.41c0.15,0.07,0.27,0.15,0.35,0.22\n  \t\t\t\t\t\tc0.17,0.15,0.33,0.35,0.48,0.58l0.76,1.19h-0.73l-0.58-0.91c-0.17-0.26-0.31-0.46-0.42-0.6c-0.11-0.14-0.21-0.24-0.29-0.29\n  \t\t\t\t\t\tc-0.09-0.06-0.17-0.1-0.26-0.12c-0.07-0.01-0.17-0.02-0.32-0.02h-0.67v1.94H150.49z M151.07,77.31h1.24\n  \t\t\t\t\t\tc0.26,0,0.47-0.03,0.62-0.08c0.15-0.05,0.26-0.14,0.34-0.26c0.08-0.12,0.12-0.25,0.12-0.39c0-0.21-0.08-0.38-0.22-0.51\n  \t\t\t\t\t\tc-0.15-0.13-0.39-0.2-0.71-0.2h-1.38V77.31z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M156.74,79.75v-4.37h3.16v0.52h-2.58v1.34h2.42v0.51h-2.42v1.49H160v0.52H156.74z"/>\n  \t\t\t\t\t<path display="inline" fill="#CDCCCC" d="M162.64,79.75v-4.37h3.16v0.52h-2.58v1.34h2.42v0.51h-2.42v1.49h2.68v0.52H162.64z"/>\n  \t\t\t\t</g>\n  \t\t\t</g>\n  \t\t\t<g>\n  \t\t\t\t<path fill="#CDCCCC" d="M88.8,78.61c0.01,0.18,0.05,0.32,0.12,0.45c0.06,0.12,0.15,0.22,0.25,0.3c0.1,0.08,0.22,0.13,0.35,0.17\n  \t\t\t\t\tc0.13,0.03,0.27,0.05,0.42,0.05c0.18,0,0.33-0.02,0.46-0.07c0.13-0.04,0.23-0.11,0.31-0.18c0.08-0.07,0.14-0.16,0.18-0.26\n  \t\t\t\t\tc0.04-0.1,0.06-0.2,0.06-0.31c0-0.16-0.04-0.28-0.11-0.38c-0.07-0.1-0.16-0.17-0.27-0.23c-0.11-0.06-0.24-0.11-0.39-0.15\n  \t\t\t\t\tc-0.15-0.04-0.29-0.07-0.45-0.11c-0.15-0.03-0.3-0.07-0.45-0.12c-0.14-0.05-0.27-0.11-0.39-0.19c-0.11-0.08-0.2-0.19-0.27-0.31\n  \t\t\t\t\tc-0.07-0.13-0.1-0.29-0.1-0.48c0-0.14,0.03-0.27,0.09-0.4c0.06-0.13,0.14-0.24,0.25-0.34c0.11-0.1,0.25-0.18,0.42-0.24\n  \t\t\t\t\tc0.17-0.06,0.36-0.09,0.59-0.09c0.22,0,0.42,0.03,0.59,0.09s0.3,0.15,0.42,0.26c0.11,0.11,0.19,0.23,0.25,0.38\n  \t\t\t\t\tc0.05,0.14,0.08,0.3,0.08,0.46h-0.36c0-0.15-0.03-0.28-0.08-0.39c-0.05-0.11-0.12-0.2-0.22-0.27c-0.09-0.07-0.2-0.12-0.31-0.15\n  \t\t\t\t\tc-0.12-0.03-0.24-0.05-0.36-0.05c-0.19,0-0.35,0.03-0.48,0.08c-0.13,0.05-0.23,0.12-0.31,0.21c-0.08,0.08-0.13,0.18-0.16,0.28\n  \t\t\t\t\tc-0.03,0.1-0.03,0.21-0.02,0.31c0.02,0.13,0.07,0.23,0.15,0.31c0.08,0.08,0.18,0.14,0.3,0.19c0.12,0.05,0.25,0.09,0.39,0.12\n  \t\t\t\t\tc0.14,0.03,0.29,0.06,0.43,0.1c0.15,0.04,0.29,0.08,0.43,0.12c0.14,0.05,0.26,0.11,0.37,0.19c0.11,0.08,0.19,0.18,0.26,0.31\n  \t\t\t\t\tc0.06,0.12,0.1,0.29,0.1,0.48c0,0.37-0.13,0.65-0.38,0.85c-0.25,0.2-0.61,0.3-1.07,0.3c-0.21,0-0.4-0.03-0.57-0.08\n  \t\t\t\t\tc-0.18-0.05-0.33-0.13-0.46-0.24c-0.13-0.11-0.23-0.24-0.3-0.4c-0.07-0.16-0.11-0.35-0.11-0.56H88.8z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M94.77,79.79v-3.97h2.64v0.32h-2.27v1.43h2.04v0.32h-2.04v1.58h2.32v0.32H94.77z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M100.54,75.83h2.89v0.32h-1.26v3.65h-0.38v-3.65h-1.26V75.83z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M106.87,78.61c0.01,0.18,0.05,0.32,0.12,0.45c0.06,0.12,0.15,0.22,0.25,0.3\n  \t\t\t\t\tc0.1,0.08,0.22,0.13,0.35,0.17c0.13,0.03,0.27,0.05,0.42,0.05c0.18,0,0.33-0.02,0.46-0.07c0.13-0.04,0.23-0.11,0.31-0.18\n  \t\t\t\t\ts0.14-0.16,0.18-0.26s0.06-0.2,0.06-0.31c0-0.16-0.03-0.28-0.1-0.38c-0.07-0.1-0.16-0.17-0.27-0.23\n  \t\t\t\t\tc-0.11-0.06-0.24-0.11-0.39-0.15c-0.15-0.04-0.29-0.07-0.45-0.11c-0.15-0.03-0.3-0.07-0.45-0.12c-0.14-0.05-0.27-0.11-0.38-0.19\n  \t\t\t\t\tc-0.11-0.08-0.2-0.19-0.27-0.31c-0.07-0.13-0.11-0.29-0.11-0.48c0-0.14,0.03-0.27,0.09-0.4c0.06-0.13,0.14-0.24,0.25-0.34\n  \t\t\t\t\tc0.11-0.1,0.25-0.18,0.42-0.24c0.17-0.06,0.36-0.09,0.58-0.09c0.22,0,0.42,0.03,0.59,0.09c0.17,0.06,0.3,0.15,0.42,0.26\n  \t\t\t\t\tc0.11,0.11,0.19,0.23,0.25,0.38c0.05,0.14,0.08,0.3,0.08,0.46h-0.36c0-0.15-0.03-0.28-0.08-0.39c-0.05-0.11-0.12-0.2-0.21-0.27\n  \t\t\t\t\tc-0.09-0.07-0.2-0.12-0.31-0.15c-0.12-0.03-0.24-0.05-0.37-0.05c-0.19,0-0.35,0.03-0.48,0.08c-0.13,0.05-0.23,0.12-0.31,0.21\n  \t\t\t\t\tc-0.08,0.08-0.13,0.18-0.16,0.28s-0.04,0.21-0.02,0.31c0.02,0.13,0.07,0.23,0.15,0.31c0.08,0.08,0.18,0.14,0.3,0.19\n  \t\t\t\t\ts0.25,0.09,0.39,0.12s0.29,0.06,0.43,0.1c0.15,0.04,0.29,0.08,0.43,0.12c0.14,0.05,0.26,0.11,0.37,0.19\n  \t\t\t\t\tc0.11,0.08,0.19,0.18,0.26,0.31c0.06,0.12,0.1,0.29,0.1,0.48c0,0.37-0.13,0.65-0.38,0.85s-0.61,0.3-1.07,0.3\n  \t\t\t\t\tc-0.21,0-0.4-0.03-0.57-0.08c-0.18-0.05-0.33-0.13-0.46-0.24c-0.13-0.11-0.23-0.24-0.3-0.4c-0.07-0.16-0.11-0.35-0.11-0.56\n  \t\t\t\t\tH106.87z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M118.35,77.74l1.2-1.91h0.44l-1.44,2.24v1.73h-0.38v-1.7l-1.42-2.27h0.43L118.35,77.74z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M123.1,77.81c0-0.29,0.04-0.56,0.12-0.82c0.08-0.25,0.2-0.47,0.35-0.66c0.15-0.19,0.35-0.34,0.57-0.45\n  \t\t\t\t\tc0.23-0.11,0.49-0.17,0.79-0.17c0.31,0,0.58,0.05,0.81,0.16c0.23,0.11,0.43,0.26,0.58,0.45c0.16,0.19,0.28,0.41,0.35,0.67\n  \t\t\t\t\tc0.08,0.26,0.12,0.53,0.12,0.82c0,0.29-0.04,0.56-0.12,0.81s-0.2,0.47-0.35,0.66c-0.15,0.19-0.35,0.34-0.58,0.45\n  \t\t\t\t\tc-0.23,0.11-0.5,0.16-0.8,0.16c-0.31,0-0.57-0.05-0.81-0.16c-0.23-0.11-0.43-0.26-0.58-0.45c-0.15-0.19-0.27-0.41-0.35-0.66\n  \t\t\t\t\tS123.1,78.1,123.1,77.81z M124.96,79.58c0.26,0,0.48-0.05,0.66-0.15s0.34-0.23,0.46-0.39c0.12-0.16,0.21-0.35,0.26-0.56\n  \t\t\t\t\tc0.06-0.21,0.09-0.44,0.09-0.67c0-0.28-0.04-0.52-0.1-0.74c-0.07-0.22-0.17-0.41-0.29-0.56c-0.13-0.16-0.28-0.27-0.47-0.36\n  \t\t\t\t\tc-0.18-0.08-0.39-0.12-0.62-0.12c-0.25,0-0.47,0.05-0.66,0.15s-0.34,0.23-0.46,0.39c-0.12,0.16-0.21,0.35-0.27,0.57\n  \t\t\t\t\tc-0.05,0.21-0.09,0.44-0.09,0.67c0,0.24,0.03,0.46,0.09,0.67c0.06,0.21,0.15,0.4,0.27,0.56c0.12,0.16,0.27,0.29,0.46,0.38\n  \t\t\t\t\tS124.69,79.58,124.96,79.58z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M130.31,75.83h0.38v2.36c0,0.49,0.09,0.85,0.28,1.07c0.18,0.21,0.48,0.32,0.89,0.32\n  \t\t\t\t\tc0.21,0,0.4-0.03,0.54-0.09s0.27-0.14,0.36-0.26c0.09-0.12,0.16-0.26,0.2-0.43c0.04-0.17,0.06-0.38,0.06-0.61v-2.36h0.38v2.47\n  \t\t\t\t\tc0,0.52-0.13,0.91-0.38,1.19c-0.25,0.28-0.64,0.41-1.15,0.41c-0.52,0-0.9-0.14-1.16-0.42c-0.25-0.28-0.38-0.67-0.38-1.18V75.83z\n  \t\t\t\t\t"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M141.29,79.79v-3.97h2.56v0.32h-2.18v1.43h1.98v0.32h-1.98v1.9H141.29z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M147.52,77.99v1.8l-0.37-0.01v-3.96h1.55c0.44,0,0.77,0.08,1.01,0.24c0.23,0.16,0.35,0.43,0.35,0.8\n  \t\t\t\t\tc0,0.25-0.05,0.45-0.15,0.6s-0.27,0.27-0.49,0.38c0.12,0.04,0.21,0.1,0.28,0.18s0.12,0.17,0.15,0.26\n  \t\t\t\t\tc0.03,0.1,0.05,0.21,0.06,0.31c0.01,0.11,0.01,0.22,0.02,0.32c0,0.15,0.01,0.27,0.02,0.37s0.02,0.18,0.03,0.24\n  \t\t\t\t\tc0.01,0.06,0.03,0.11,0.05,0.15s0.04,0.06,0.07,0.08v0.03l-0.41,0.01c-0.04-0.07-0.07-0.16-0.08-0.28\n  \t\t\t\t\tc-0.02-0.12-0.03-0.24-0.04-0.37c-0.01-0.13-0.02-0.25-0.02-0.38c0-0.12-0.01-0.22-0.03-0.3c-0.02-0.11-0.06-0.19-0.11-0.26\n  \t\t\t\t\ts-0.11-0.11-0.18-0.15s-0.15-0.05-0.23-0.07c-0.09-0.01-0.17-0.02-0.27-0.02H147.52z M148.69,77.67c0.14,0,0.27-0.01,0.39-0.04\n  \t\t\t\t\tc0.12-0.03,0.22-0.07,0.31-0.14c0.09-0.06,0.16-0.14,0.21-0.24c0.05-0.1,0.08-0.22,0.08-0.36c0-0.15-0.03-0.27-0.08-0.37\n  \t\t\t\t\ts-0.12-0.17-0.21-0.23c-0.09-0.05-0.19-0.09-0.31-0.12c-0.12-0.02-0.24-0.03-0.36-0.03h-1.19v1.53H148.69z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M153.58,79.79v-3.97h2.64v0.32h-2.27v1.43h2.05v0.32h-2.05v1.58h2.32v0.32H153.58z"/>\n  \t\t\t\t<path fill="#CDCCCC" d="M159.71,79.79v-3.97h2.64v0.32h-2.27v1.43h2.04v0.32h-2.04v1.58h2.32v0.32H159.71z"/>\n  \t\t\t</g>\n  \t\t</g>\n  \t</g>\n  </g>\n  </svg>\n\n\n  <span class="r2-slogan">Web & Mobile Platform</span>\n\n  <span class="r2-apps">Your Apps</span>\n  \n</div>\n\n<div class="row app-menu-icons">\n  ');
    
      _ref = this.apps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        app = _ref[_i];
        __out.push('\n    ');
        if (app.label !== "home") {
          __out.push('\n      <div class="col-md-4 col-xs-3" >\n        <div data-path="');
          __out.push(__sanitize(app.path));
          __out.push('" class="app-icon js-btn-app ">\n\n          <div class="app-icon-header ');
          __out.push(__sanitize(app.iconColor));
          __out.push('">\n            <span class="triangle"></span>\n            <span class="label">');
          __out.push(__sanitize(app.label || "App Name"));
          __out.push('</span>\n          </div>\n          \n          <div class="text">');
          __out.push(__sanitize(app.iconLabel));
          __out.push('</div>\n        </div>\n \n      </div>\n    ');
        }
        __out.push('\n  ');
      }
    
      __out.push('\n  \n</div>\n  \n  \n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}
});


  var moduleList = [
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
        {"namespace":"app","path":"app/webHome/webHome","iconColor": "","iconLabel": "Hm","label": "home","home": true},
        
    
      
       
        {"namespace":"components","path":"components/menu/menu","iconColor": "","iconLabel": "","label": "","home": false},
        
    
      
       
    
      
       
    
      
       
        {"namespace":"components","path":"components/appMenu/appMenu","iconColor": "","iconLabel": "","label": "","home": false},
        
    
      
       
    
    ]

  
    //CSS Styles for Modules
    var css=".menu {  background-color: #f1f2f2;  border-right: 2px solid #e6e6e6;  padding-right: 0px;}.menu-title {  display: block;  font-size: 9px;  color: #8a8c8e;  text-align: center;  margin-bottom: 5px;  background-color: #e6e6e6;  line-height: 20px;}.menu-title.shortcut {  margin-top: 50px;  margin-bottom: 10px;}.live-app-menu-divider {  margin-top: 16px;  margin-bottom: 16px;  height: 1px;  border-bottom: 1px solid #8a8c8e;  border-top: 1px solid #cccccc;}li.active {  background-color: #1cb5ea;}.menu .app-icon {  cursor: pointer;  width: 40px;  background-color: #f1f2f2;  height: 40px;  margin: 10px auto;  border: none;}.menu .app-icon.active {  border: 1px solid #8a8c8e;}.menu .app-icon .app-icon-header {  position: relative;  text-align: center;  border-bottom: none;  overflow: hidden;  padding: 0px 5px;  height: 13px;}.menu .app-icon .app-icon-header .triangle {  position: absolute;  left: 0px;  top: 0px;  width: 0px;  height: 0px;  border-style: solid;  border-width: 50px 48px 0 0;  border-color: rgba(255, 255, 255, 0.3) transparent transparent transparent;}.menu .app-icon .label {  line-height: 8px;  color: #fff;  font-size: 8px;  position: relative;  top: -3px;  text-transform: capitalize;  text-shadow: none;}.menu .app-icon .text {  margin: 0px auto;  color: #8a8c8e;  font-weight: 300;  font-size: 16px;  line-height: 25px;  text-align: center;  font-family: 'Roboto', sans-serif;  font-weight: 100;}.menu .side-icon {  border: none !important;  width: 34px !important;  margin: 5px auto;  position: relative;}.menu .side-icon.active .app-icon-header {  float: right;  position: relative;  left: 7px;}.menu .side-icon.active:hover .app-icon-header {  left: 7px;}.menu .side-icon .app-icon-header {  padding: 0px !important;  position: absolute;  left: -8px;  width: 8px !important;  height: 32px !important;  transition: all 0.2s ease-in-out;}.menu .side-icon:hover .app-icon-header {  left: 4px;}.menu .side-icon .text {  width: 26px;  font-size: 13px;  text-align: right;  float: left;}.menu .side-icon .text .text-header {  height: 10px;  overflow: hidden;  display: block;  font-size: 7px;  font-family: 'roboto';  text-align: right;  line-height: 10px;}.app-menu .app-icon,.small-app-menu .app-icon {  margin: 0px auto 24px auto;}.app-menu .app-menu-icons,.small-app-menu .app-menu-icons {  padding: 10px;}.small-app-menu .app-icon {  max-width: 79px;}.app-highlight {  padding: 10px 0px 0px 0px;  background-color: #f5f5f6;}.app-highlight .r2-logo {  margin: 10px auto 10px auto;  display: block;}.app-highlight .r2-logo .circle {  transition: all 0.2s ease-in-out;}.app-highlight .r2-slogan {  color: #cccccc;  font-weight: 100;  font-family: 'Roboto';  display: block;  text-align: center;  font-size: 23px;  padding-bottom: 20px;  margin-bottom: 1px solid #636466;}.app-highlight .r2-apps {  color: #8a8c8e;  display: block;  text-align: center;  font-size: 15px;  font-weight: 300;}.app-highlight .app-icon {  width: 90%;}.app-highlight .app-icon .text {  color: white;  font-size: 60px;  font-family: sans-serif;  line-height: 0px;  font-weight: bold;  text-align: center;}.app-highlight .labels {  margin-bottom: 6px;  line-height: 1.2;}";
    var head  = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    }
    else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  
   
  