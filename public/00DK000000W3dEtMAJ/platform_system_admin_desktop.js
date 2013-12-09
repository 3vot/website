
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
  "app/adminPanel/adminPanel": function(exports, require, module) {(function() {
  var AdminPanel, App, AppPermission, EditApp, Profile, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  Profile = require("app/adminPanel/profile");

  App = require("app/adminPanel/app");

  AppPermission = require("app/adminPanel/appPermission");

  EditApp = require("app/adminPanel/adminPanel_edit_app");

  AdminPanel = (function(_super) {
    __extends(AdminPanel, _super);

    AdminPanel.prototype.className = "app-canvas adminPanel";

    AdminPanel.prototype.elements = {
      ".profile-list": "profileList",
      ".app-list": "appList",
      ".app-permission-list": "appPermissionList"
    };

    AdminPanel.prototype.events = {
      "click .btn-create-app": "onCreateApp",
      "click .app-item": "onEditApp",
      "click .add-profile": "onAddProfile",
      "click .btn-remove-app-from-permission": "onRemoveAppFromPermission",
      "click .btn-save-profiles": "onSaveAppPemissions"
    };

    function AdminPanel() {
      this.shutdown = __bind(this.shutdown, this);
      this.renderPermissions = __bind(this.renderPermissions, this);
      this.renderProfiles = __bind(this.renderProfiles, this);
      this.renderApps = __bind(this.renderApps, this);
      this.registerDragDrop = __bind(this.registerDragDrop, this);
      var _this = this;
      AdminPanel.__super__.constructor.apply(this, arguments);
      this.render();
      this.bind();
      Profile.query();
      App.destroyAll();
      App.fetch();
      RSpine.one("platform:library-loaded-bootstrap", function() {
        return _this.profileList.find(".btn-add-profile").popover();
      });
      RSpine.one("platform:library-loaded-dragdrop", function() {
        return _this.registerDragDrop();
      });
    }

    AdminPanel.prototype.bind = function() {
      this.registerDragDrop();
      Profile.bind("refresh", this.renderProfiles);
      App.bind("refresh destroy", this.renderApps);
      return AppPermission.bind("refresh create update destroy", this.renderPermissions);
    };

    AdminPanel.prototype.unbind = function() {
      Profile.unbind("refresh", this.renderProfiles);
      App.unbind("refresh destroy", this.renderApps);
      return AppPermission.bind("refresh create update destroy", this.renderPermissions);
    };

    AdminPanel.prototype.registerDragDrop = function() {
      var dragableElements,
        _this = this;
      dragableElements = $(".app-item .drag-handle");
      if (dragableElements.dragdrop && !this.dragdropRegistered) {
        this.dragdropRegistered = true;
        console.log("registering drag drop");
        return $(dragableElements).dragdrop({
          makeClone: true,
          sourceHide: false,
          dragClass: "whileDragging",
          parentContainer: $("body"),
          canDrop: function(destination) {
            return destination.parents(".app-permission-item").length === 1;
          },
          didDrop: function(source, destination) {
            var app, appId, appPermission, appPermissionId;
            source = source.parents(".app-item");
            appId = source.data("app");
            app = App.find(appId);
            while (!destination.hasClass("app-permission-item")) {
              destination = destination.parent();
            }
            appPermissionId = destination.data("app-permission");
            appPermission = AppPermission.find(appPermissionId);
            return _this.onAddPathToPermission(app, appPermission);
          }
        });
      }
    };

    AdminPanel.prototype.render = function() {
      return this.html(require("app/adminPanel/layout")());
    };

    AdminPanel.prototype.renderApps = function() {
      var app, apps, list, _i, _len, _ref;
      apps = [];
      _ref = App.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        app = _ref[_i];
        if (!app.home) {
          apps.push(app);
        }
      }
      list = require("app/adminPanel/layout_item_app")(apps);
      this.appList.html(list);
      return AppPermission.fetch();
    };

    AdminPanel.prototype.renderProfiles = function() {
      var list, _base;
      list = require("app/adminPanel/layout_item_profile")(Profile.all());
      this.profileList.html(list);
      return typeof (_base = this.profileList.find(".btn-add-profile")).popover === "function" ? _base.popover() : void 0;
    };

    AdminPanel.prototype.renderPermissions = function() {
      var list;
      list = require("app/adminPanel/layout_item_app_permission")(AppPermission.all());
      return this.appPermissionList.html(list);
    };

    AdminPanel.prototype.onAddProfile = function(e) {
      var ap, device, profile, profileId, profileName, target;
      target = $(e.target);
      device = target.html().toLowerCase();
      profileId = target.data("profile");
      profile = Profile.find(profileId);
      $(".btn-add-profile").popover("hide");
      profileName = profile.Name.split(' ').join('_').toLowerCase();
      return ap = AppPermission.create({
        type: "app",
        name: profileName,
        device: device,
        appPaths: []
      });
    };

    AdminPanel.prototype.onCreateApp = function() {
      return RSpine.trigger("modal:show", EditApp, {
        data: {
          isNewApp: true
        }
      });
    };

    AdminPanel.prototype.onEditApp = function(e) {
      var app, target;
      target = $(e.target);
      while (!target.hasClass("app-item")) {
        target = target.parent();
      }
      app = App.find(target.data("app"));
      return RSpine.trigger("modal:show", EditApp, {
        data: app
      });
    };

    AdminPanel.prototype.onAddPathToPermission = function(app, appPermission) {
      appPermission.appPaths.push(app.path);
      return appPermission.save();
    };

    AdminPanel.prototype.onRemoveAppFromPermission = function(e) {
      var appPath, index, permission, target;
      target = $(e.target);
      appPath = App.findByAttribute("path", target.data("app-path"));
      permission = AppPermission.find(target.data("app-permission"));
      index = permission.appPaths.indexOf(appPath);
      permission.appPaths.splice(index, 1);
      permission.save();
      if (permission.appPaths.length === 0) {
        return permission.destroy();
      }
    };

    AdminPanel.prototype.onSaveAppPemissions = function(e) {
      return AppPermission.custom(AppPermission.toJSON(), {
        method: "POST"
      });
    };

    AdminPanel.prototype.shutdown = function(e) {
      this.release();
      return this.unbind();
    };

    return AdminPanel;

  })(RSpine.Controller);

  module.exports = AdminPanel;

}).call(this);
}, "app/adminPanel/adminPanel_edit_app": function(exports, require, module) {(function() {
  var AdminPanelEditApp, App, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  App = require("app/adminPanel/app");

  AdminPanelEditApp = (function(_super) {
    __extends(AdminPanelEditApp, _super);

    AdminPanelEditApp.prototype.className = "adminPanelEditApp";

    AdminPanelEditApp.prototype.events = {
      "submit .app-detail-form": "save",
      "click .btn-delete-app": "delete"
    };

    function AdminPanelEditApp() {
      AdminPanelEditApp.__super__.constructor.apply(this, arguments);
      this.render();
    }

    AdminPanelEditApp.prototype.bind = function() {};

    AdminPanelEditApp.prototype.unbind = function() {};

    AdminPanelEditApp.prototype.render = function() {
      return this.html(require("app/adminPanel/layout_edit_app")(this.data));
    };

    AdminPanelEditApp.prototype.save = function(e) {
      var app, target;
      e.preventDefault();
      target = $(e.target);
      app = App.exists(target.data("app"));
      if (!app) {
        return this.create(App.fromForm(target));
      }
      return this.update(app.fromForm(target));
    };

    AdminPanelEditApp.prototype.update = function(app) {
      return app.save({
        done: function(data) {
          return RSpine.trigger("modal:hide");
        }
      });
    };

    AdminPanelEditApp.prototype.create = function(app) {
      var _this = this;
      app.path = App.appPath + "/" + app.name;
      return app.save({
        done: function(data) {
          return RSpine.trigger("modal:hide");
        },
        fail: function(data) {
          return app["delete"]();
        }
      });
    };

    AdminPanelEditApp.prototype["delete"] = function(e) {
      var app, target;
      target = $(e.target);
      app = App.exists(target.parents("form").data("app"));
      app.id = app.name;
      return app.destroy({
        done: function() {
          return RSpine.trigger("modal:hide");
        }
      });
    };

    return AdminPanelEditApp;

  })(RSpine.Controller);

  module.exports = AdminPanelEditApp;

}).call(this);
}, "app/adminPanel/app": function(exports, require, module) {(function() {
  var App, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  App = (function(_super) {
    __extends(App, _super);

    App.configure("App", "namespace", "name", "path", "iconColor", "iconLabel", "label", "home", "type");

    App.extend(RSpine.Model.Ajax);

    App.extend(RSpine.Model.Ajax.Auto);

    App.appPath = "./app/apps";

    App.url = "/apps?appPath=" + App.appPath;

    function App() {
      App.__super__.constructor.apply(this, arguments);
    }

    return App;

  })(RSpine.Model);

  module.exports = App;

}).call(this);
}, "app/adminPanel/appPermission": function(exports, require, module) {(function() {
  var AppPermission, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  AppPermission = (function(_super) {
    __extends(AppPermission, _super);

    AppPermission.configure("AppPermission", "name", "device", "appPaths", "dependencyPaths", "type");

    AppPermission.extend(RSpine.Model.Ajax);

    AppPermission.url = "/appPermissions?pathToFile=./config/apps.json";

    function AppPermission() {
      AppPermission.__super__.constructor.apply(this, arguments);
    }

    AppPermission.removeAppFromProfiles = function(appPath) {
      var index, profile, _i, _len, _ref, _results;
      _ref = Profile.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profile = _ref[_i];
        index = profile.appPaths.indexOf(appPath);
        profile.appPaths.splice(index, 1);
        _results.push(profile.save());
      }
      return _results;
    };

    AppPermission.prototype.appExistsInPaths = function(appPath) {
      var has, path, profile, _i, _j, _len, _len1, _ref, _ref1;
      has = false;
      _ref = Profile.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profile = _ref[_i];
        _ref1 = profile.appPaths;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          path = _ref1[_j];
          if (path === appPath) {
            has = true;
          }
        }
      }
      return true;
    };

    AppPermission.toJSON = function() {
      var arr, item, res, _i, _len, _ref;
      arr = [];
      _ref = AppPermission.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        arr.push(item);
      }
      res = JSON.stringify(arr);
      return res;
    };

    return AppPermission;

  })(RSpine.Model);

  module.exports = AppPermission;

}).call(this);
}, "app/adminPanel/layout": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('<div class="row">\n  \n  <div class="col-md-10">\n    <div class="app-header">App Administrator Panel</div>\n  </div>  \n  \n  \n  <div class="col-md-2">\n    <a class="btn btn-primary btn-lg btn-block btn-save-profiles">Save Profiles</a>\n  </div>  \n\n</div>    \n \n<div class="row">\n\n  <div class="col-md-3">\n    <div class="panel panel-primary">\n      \n      <div class="panel-heading">\n          <span class="panel-title">Apps</span>\n          <div class="btn btn-create btn-create-app">New</div>\n      </div>\n    \n      <ul data-offset="170" class="panel-stretch app-list list-group"></ul>\n    \n    </div>\n  </div>\n\n  <div class="col-md-3">\n    <div class="panel panel-info">\n    \n       <div class="panel-heading">\n        <span class="panel-title">Profiles</span>\n      </div>\n      \n      <ul data-offset="170" class="panel-stretch profile-list list-group"></ul>\n\n    </div>\n  </div>\n  \n  <div class="col-md-6 color-column">\n    <div class="panel panel-info">\n  \n     <div class="panel-heading">\n        <span class="panel-title">Apps & Profiles</span>\n        <div class="btn btn-create btn-action-new-profile">New</div>\n    </div>\n\n    <div data-offset="170"  class="panel-body  panel-stretch">\n      <div class="row app-permission-list"></div>\n    </div>\n    \n  </div>\n\n</div>\n\n\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/adminPanel/layout_edit_app": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('<form action="" class="app-detail-form" data-app="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">\n\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h2 class="modal-title">');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</h2>\n  </div>\n  <div class="modal-body">\n \n    <input type="hidden" name="type" value="app"/>\n \n    <h4>App Folder Name</h4>    \n    <input patterdn="/^[0-9a-z_]+$/" ');
    
      __out.push(__sanitize(!this.isNewApp ? 'disabled' : void 0));
    
      __out.push('  name="name" class="form-control item-editable" data-type="name" value="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('"/>\n\n     <h4>Label</h4>\n     <input required type="text" name="label"  class="form-control item-editable" value="');
    
      __out.push(__sanitize(this.label));
    
      __out.push('"/>\n\n     <h4>Icon Color</h4>\n     <select name="iconColor"  class="form-control item-editable" data-type="iconColor" ">\n       <option ');
    
      __out.push(__sanitize(this.iconColor === "red" ? "selected" : void 0));
    
      __out.push(' >red</option>\n       <option ');
    
      __out.push(__sanitize(this.iconColor === "blue" ? "selected" : void 0));
    
      __out.push(' >blue</option>\n       <option ');
    
      __out.push(__sanitize(this.iconColor === "purple" ? "selected" : void 0));
    
      __out.push(' >purple</option>\n     </select>\n\n     <h4>Icon Label</h4>\n     <input name="iconLabel" type="text" class="form-control item-editable" data-type="iconLabel" value="');
    
      __out.push(__sanitize(this.iconLabel));
    
      __out.push('"/>\n\n  </div>\n  <div class="modal-footer">\n   <a class="btn btn-danger btn-delete-app btn-third">Delete</a>\n   <button type="button" class=" btn btn-third" data-dismiss="modal" aria-hidden="true">Close</button>\n   <input type="submit" name="submit" value="Save" class="btn btn-primary btn-action-save-app btn-third" />\n  </div>\n</form>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/adminPanel/layout_item_app": function(exports, require, module) {module.exports = function(values, data){ 
  var $  = jQuery, result = $();
  values = $.makeArray(values);
  data = data || {};
  for(var i=0; i < values.length; i++) {
    var value = $.extend({}, values[i], data, {index: i});
    var elem  = $((function(__obj) {
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
      __out.push('<li data-app="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" class="list-group-item app-item">\n  \n  <h3>');
    
      __out.push(__sanitize(this.name));
    
      __out.push('\n    \n    <span class="drag-handle badge btn btn-primary pull-right">drag</span>\n  \n  </h3>\n\n  <p class="list-group-item-text">fdsf dsfd </p>\n  \n</li>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
})(value));
    elem.data('item', value);
    $.merge(result, elem);
  }
  return result;
};}, "app/adminPanel/layout_item_app_permission": function(exports, require, module) {module.exports = function(values, data){ 
  var $  = jQuery, result = $();
  values = $.makeArray(values);
  data = data || {};
  for(var i=0; i < values.length; i++) {
    var value = $.extend({}, values[i], data, {index: i});
    var elem  = $((function(__obj) {
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
      var App, path, _i, _len, _ref, _ref1;
    
      App = require("app/adminPanel/app");
    
      __out.push('\n\n<div class="col-sm-6 col-md-4">\n\n  <div class="thumbnail  app-permission-item" data-app-permission="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">\n    <h3>');
    
      __out.push(__sanitize(this.name.split("_").join(" ")));
    
      __out.push('</h3>\n    <h5>');
    
      __out.push(__sanitize(this.device));
    
      __out.push('</h5>\n\n  \n   <ul class="list-group apps-list  ">\n      ');
    
      _ref = this.appPaths;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        __out.push('\n        <li class="list-group-item">\n          <span  class="">\n            ');
        __out.push(__sanitize((_ref1 = App.findByAttribute("path", path)) != null ? _ref1.name : void 0));
        __out.push('\n          </span>\n\n          <span data-app-permission="');
        __out.push(__sanitize(this.id));
        __out.push('" data-app-path="');
        __out.push(__sanitize(path));
        __out.push('" class="badge badge-danger btn-remove-app-from-permission">X</span>\n\n        </li>\n      ');
      }
    
      __out.push('\n    </ul>\n    \n  </div>\n  \n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
})(value));
    elem.data('item', value);
    $.merge(result, elem);
  }
  return result;
};}, "app/adminPanel/layout_item_profile": function(exports, require, module) {module.exports = function(values, data){ 
  var $  = jQuery, result = $();
  values = $.makeArray(values);
  data = data || {};
  for(var i=0; i < values.length; i++) {
    var value = $.extend({}, values[i], data, {index: i});
    var elem  = $((function(__obj) {
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
      __out.push('<li class="list-group-item">\n  \n  <h3 class="">\n    ');
    
      __out.push(__sanitize(this.Name));
    
      __out.push('\n    \n    \n    <span data-html="true" class="badge pull-right btn-info profile-popovers btn-add-profile" data-placement="left" data-toggle="popover" title="" data-content=\'<span data-profile="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" class="add-profile">Desktop</span><span data-profile="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('"  class="add-profile">Tablet</span><span   data-profile="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" class="add-profile">Mobile</span>\' role="button">+</span>\n    \n  </h3>\n  \n  \n  \n \n  \n</li>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
})(value));
    elem.data('item', value);
    $.merge(result, elem);
  }
  return result;
};}, "app/adminPanel/profile": function(exports, require, module) {(function() {
  var Profile, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require('rspine');

  Profile = (function(_super) {
    __extends(Profile, _super);

    Profile.configure("Profile", "Name");

    Profile.extend(RSpine.Model.SalesforceModel);

    Profile.extend(RSpine.Model.SalesforceAjax);

    Profile.standardObject = true;

    function Profile() {
      Profile.__super__.constructor.apply(this, arguments);
    }

    Profile.removeAppFromProfiles = function(appPath) {
      var index, profile, _i, _len, _ref, _results;
      _ref = Profile.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profile = _ref[_i];
        index = profile.appPaths.indexOf(appPath);
        profile.appPaths.splice(index, 1);
        _results.push(profile.save());
      }
      return _results;
    };

    Profile.prototype.appExistsInPaths = function(appPath) {
      var has, path, profile, _i, _j, _len, _len1, _ref, _ref1;
      has = false;
      _ref = Profile.all();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profile = _ref[_i];
        _ref1 = profile.appPaths;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          path = _ref1[_j];
          if (path === appPath) {
            has = true;
          }
        }
      }
      return true;
    };

    return Profile;

  })(RSpine.Model);

  module.exports = Profile;

}).call(this);
}, "app/adminPanel/test_spec": function(exports, require, module) {(function() {
  var exports, jQuery;

  jQuery = require("jqueryify");

  require("rspine");

  exports = this;

  describe('adminPanel', function() {
    before(function() {
      var appPermissionResponse, apps, permisions, profiles;
      profiles = '{"records":[{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000NyeuIAC"},"Name":"Chatter Free User","Id":"00eA0000000NyeuIAC"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000NyftIAC"},"Name":"Chatter Moderator User","Id":"00eA0000000NyftIAC"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000ZFvgIAG"},"Name":"Ejecutivo Credito","Id":"00eA0000000ZFvgIAG"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000ZJ9uIAG"},"Name":"Contabilidad","Id":"00eA0000000ZJ9uIAG"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000ZJAYIA4"},"Name":"Ejecutivo Ventas","Id":"00eA0000000ZJAYIA4"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000ZKKEIA4"},"Name":"Presidencia","Id":"00eA0000000ZKKEIA4"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000ZKKJIA4"},"Name":"Vendedor","Id":"00eA0000000ZKKJIA4"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000atiwIAA"},"Name":"Integracion","Id":"00eA0000000atiwIAA"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000awZ5IAI"},"Name":"Tesoreria","Id":"00eA0000000awZ5IAI"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000awkiIAA"},"Name":"SubGerencia","Id":"00eA0000000awkiIAA"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000awm0IAA"},"Name":"Ejecutivo de Logistica","Id":"00eA0000000awm0IAA"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000azmRIAQ"},"Name":"Gerencia Comercial","Id":"00eA0000000azmRIAQ"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000b0MsIAI"},"Name":"Ejecutivo de Cuentas","Id":"00eA0000000b0MsIAI"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000b0xDIAQ"},"Name":"IT","Id":"00eA0000000b0xDIAQ"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000b1R2IAI"},"Name":"Coordinador","Id":"00eA0000000b1R2IAI"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZHIA2"},"Name":"Platform System Admin","Id":"00eA0000000sYZHIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZLIA2"},"Name":"System Administrator","Id":"00eA0000000sYZLIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZMIA2"},"Name":"Standard User","Id":"00eA0000000sYZMIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZNIA2"},"Name":"Read Only","Id":"00eA0000000sYZNIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZOIA2"},"Name":"Solution Manager","Id":"00eA0000000sYZOIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZPIA2"},"Name":"Marketing User","Id":"00eA0000000sYZPIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZQIA2"},"Name":"Contract Manager","Id":"00eA0000000sYZQIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZRIA2"},"Name":"Guest License User","Id":"00eA0000000sYZRIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000sYZSIA2"},"Name":"Force.com - Free User","Id":"00eA0000000sYZSIA2"},{"attributes":{"type":"Profile","url":"/services/data/v24.0/sobjects/Profile/00eA0000000yZBuIAM"},"Name":"Chatter External User","Id":"00eA0000000yZBuIAM"}]}';
      permisions = '[{"name": "vendedores","device": "desktop","appPaths": ["./app/apps/r2apps","./app/apps/pedidos","./app/apps/logistica","./app/apps/adminPanel"],"type": "app","id": "c-0"},{"name": "vendedores","device": "mobile","appPaths": ["./app/apps/appManagerMobile","./app/apps/pedidos"],"type": "app","id": "c-1"}]';
      apps = '[\
      {\
        "namespace": "app",\
        "name": "webHome",\
        "label": "home",\
        "iconColor": "",\
        "iconLabel": "Hm",\
        "home": true,\
        "path": "./app/apps/webHome"\
      },\
      {\
        "namespace": "app",\
        "name": "r2apps",\
        "path": "./app/apps/r2apps",\
        "iconColor": "purple",\
        "iconLabel": "Pf",\
        "label": "Admin",\
        "isNewApp": false\
      },\
      {\
        "namespace": "app",\
        "name": "pedidos",\
        "path": "./app/apps/pedidos",\
        "iconColor": "red",\
        "iconLabel": "Pe",\
        "label": "Pedidos"\
      },\
      {\
        "namespace": "app",\
        "name": "mobileHome",\
        "label": "home",\
        "iconColor": "",\
        "iconLabel": "Hm",\
        "home": true,\
        "path": "./app/apps/mobileHome"\
      },\
      {\
        "namespace": "app",\
        "name": "logistica",\
        "label": "logistica app",\
        "iconColor": "blue",\
        "iconLabel": "Lg",\
        "path": "./app/apps/logistica"\
      },\
      {\
        "namespace": "app",\
        "name": "appManagerMobile",\
        "iconColor": "red",\
        "iconLabel": "mM",\
        "label": "Apps",\
        "path": "./app/apps/appManagerMobile"\
      },\
      {\
        "namespace": "app",\
        "name": "adminPanel",\
        "path": "./app/apps/adminPanel",\
        "iconColor": "purple",\
        "iconLabel": "Pf",\
        "label": "Admin",\
        "isNewApp": false\
      }\
    ]';
      appPermissionResponse = '{"test":"ok"}';
      this.server = sinon.fakeServer.create();
      this.server.respondWith("GET", /sobjects/g, [
        200, {
          "Content-Type": "application/json"
        }, profiles
      ]);
      this.server.respondWith("GET", /appPath/g, [
        200, {
          "Content-Type": "application/json"
        }, apps
      ]);
      this.server.respondWith("GET", /appPermissions/g, [
        200, {
          "Content-Type": "application/json"
        }, permisions
      ]);
      this.server.respondWith("POST", /appPermissions/g, [
        200, {
          "Content-Type": "application/json"
        }, appPermissionResponse
      ]);
      this.server.respondWith("PUT", /apps/g, [
        200, {
          "Content-Type": "application/json"
        }, appPermissionResponse
      ]);
      this.server.respondWith("POST", /apps/g, [
        200, {
          "Content-Type": "application/json"
        }, appPermissionResponse
      ]);
      RSpine.libraries = {};
      require("rspine/lib/salesforceModel");
      require("rspine/lib/salesforceAjax");
      require("rspine/lib/ajax");
      require("library/bootstrapFramework/bootstrapFramework");
      require("library/modalFramework/modalFramework");
      RSpine.Model.salesforceHost = "";
      this.AdminPanel = require("app/adminPanel/adminPanel");
      this.Profile = require("app/adminPanel/profile");
      this.App = require("app/adminPanel/app");
      this.AppPermission = require("app/adminPanel/appPermission");
      return this.adminPanel = new this.AdminPanel({
        el: $(".test")
      });
    });
    after(function() {});
    return describe("Constructor", function() {
      it("should show the layout", function() {
        return $(".test").find(".content-body").should.not.equal(null);
      });
      describe("should have retrieved profiles", function() {
        before(function(done) {
          this.server.respond();
          return setTimeout(done, 500);
        });
        it("should have profiles", function() {
          return this.Profile.count().should.be.above(0);
        });
        it("should have apps", function() {
          return this.App.count().should.be.above(0);
        });
        return it("should have permisions", function() {
          return this.AppPermission.count().should.be.above(0);
        });
      });
      describe("App", function() {
        it("should show create app module", function() {
          $(".btn-create-app").click();
          return $(".adminPanelEditApp").html().should.not.equal(null);
        });
        it("should create a new app", function(done) {
          var form;
          $("input").val("test");
          form = $(".app-detail-form");
          this.App.one("update", function() {
            return done();
          });
          return form.submit();
        });
        it("should show editing app module", function() {
          $(".app-item").filter(":first").click();
          return $(".adminPanelEditApp").html().should.not.equal(null);
        });
        it("should update app from FROM", function() {
          var app, form;
          $('input[data-type="iconLabel"]').val("TT");
          form = $(".app-detail-form");
          app = this.App.find(form.data("app"));
          app = app.fromForm(form);
          return app.iconLabel.should.equal("TT");
        });
        return it("should save app with changes", function() {
          var app, form;
          $('input[data-type="iconLabel"]').val("TT");
          form = $(".app-detail-form");
          app = this.App.find(form.data("app"));
          return form.submit();
        });
      });
      return describe("App Permission", function() {
        it("should show Create App Permision PopUp", function() {
          $(".btn-add-profile").click();
          return $(".add-profile").length.should.be.above(0);
        });
        it("should add and render App Permision", function() {
          var btn, device, permisions;
          permisions = this.AppPermission.count();
          btn = $(".add-profile");
          device = btn.html().toLowerCase();
          btn.click();
          this.AppPermission.count().should.be.above(permisions);
          return $(".app-permission-item > h5").html().should.equal(device);
        });
        it("should add App to Permision", function() {
          var app, appPermission, initCount, lastCount;
          app = this.App.first();
          appPermission = this.AppPermission.last();
          initCount = appPermission.appPaths.length;
          this.adminPanel.onAddPathToPermission(app, appPermission);
          lastCount = appPermission.appPaths.length;
          return lastCount.should.be.above(initCount);
        });
        it("should remove App to Permission", function() {
          var ap, app, appPermission, initCount, lastCount;
          app = this.App.first();
          ap = $(".app-permission-item");
          appPermission = this.AppPermission.find(ap.data("app-permission"));
          initCount = appPermission.appPaths.length;
          ap.find(".btn-remove-app-from-permission").filter(":first").click();
          lastCount = appPermission.appPaths.length;
          return lastCount.should.equal(initCount - 1);
        });
        return it("should save changes to App Permission", function(done) {
          $(".btn-save-profiles").click();
          this.AppPermission.bind("customSuccess", function(data) {
            return done();
          });
          return this.server.respond();
        });
      });
    });
  });

}).call(this);
}, "app/logistica/layout": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('\n<div class="row">\n  <div class="col-md-9">\n    <div class="app-header">logistica</div>\n  </div>  \n</div>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/logistica/logistica": function(exports, require, module) {(function() {
  var $, Name, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  if (!$) {
    $ = window.$;
  }

  Name = (function(_super) {
    __extends(Name, _super);

    Name.prototype.className = "app-canvas";

    function Name() {
      Name.__super__.constructor.apply(this, arguments);
      this.html(require("app/logistica/logisticaApp_layout")());
    }

    return Name;

  })(RSpine.Controller);

  module.exports = Name;

}).call(this);
}, "app/logistica/logisticaApp_layout": function(exports, require, module) {var content = function(__obj) {
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
    
      __out.push('\n\n  <div class="row">\n    <div class="col-md-9">\n      <div class="app-header">Entregas</div>\n    </div>\n  \n    <div class="col-md-3">\n      <div class="btn-square">\n        <span class="original-text">Crear Nueva Ruta</span>\n          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" class="icon-large icon-create">\n            <polygon points="33.1,15.6 17.6,15.6 17.6,0.1 15.6,0.1 15.6,15.6 0.1,15.6 0.1,17.6 15.6,17.6 15.6,33.1 17.6,33.1 17.6,17.6 33.1,17.6">\n            </polygon>\n          </svg>\n        <span class="hover-text">Cancelar Ruta</span>\n      </div>\n    </div>\n  </div>\n\n    <div class="row full-height">\n      <div class="col-md-3 color-column full-height">\n        <div class="header blue">\n          <span class="triangle"></span>\n          <span class="large-title">Pendientes</span>\n        </div>\n    \n        <div class="sub-header">\n          <div class="sub-title">Mostrar Todos los Transportes </div>\n        </div>\n      \n    \n        <div class="content-body noPadding">\n          <div class="list-header color-blue">\n            <span class="fill-blue icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 29\n            <span class="fill-blue icon-small right ">');
    
      __out.push(RSpine.icons["fold"]);
    
      __out.push('</span>\n          </div>\n          <div class="list-item">La Maravilla N°6472\n            <div class="nested-list">\n              <div class="nested-list-item">Transporte: RODCO</div>\n              <div class="nested-list-item">Productos\n                <div class="nested-list">\n                  <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                  <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class="list-item">La Maravilla N°6472\n              <div class="nested-list">\n                <div class="nested-list-item">Transporte: RODCO</div>\n                <div class="nested-list-item">Productos\n                  <div class="nested-list">\n                    <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                    <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="list-item">La Maravilla N°6472\n                <div class="nested-list">\n                  <div class="nested-list-item">Transporte: RODCO</div>\n                  <div class="nested-list-item">Productos\n                    <div class="nested-list">\n                      <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                      <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n    \n          <div class="list-header color-blue">\n            <span class="fill-blue icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 29\n            <span class="fill-blue icon-small right ">');
    
      __out.push(RSpine.icons["fold"]);
    
      __out.push('</span>\n          </div>\n          <div class="list-item">La Maravilla N°6472\n            <div class="nested-list">\n              <div class="nested-list-item">Transporte: RODCO</div>\n              <div class="nested-list-item">Productos\n                <div class="nested-list">\n                  <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                  <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class="list-item">La Maravilla N°6472\n              <div class="nested-list">\n                <div class="nested-list-item">Transporte: RODCO</div>\n                <div class="nested-list-item">Productos\n                  <div class="nested-list">\n                    <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                    <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="list-item">La Maravilla N°6472\n                <div class="nested-list">\n                  <div class="nested-list-item">Transporte: RODCO</div>\n                  <div class="nested-list-item">Productos\n                    <div class="nested-list">\n                      <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                      <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class="list-item">La Maravilla N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n          \n        </div>\n      </div>\n\n\n      <div class="col-md-6 color-column full-height">\n        <div class="header purple">\n          <span class="triangle"></span>\n          <span class="large-title">En Proceso</span>\n        </div>\n      \n        <div class="sub-header">\n          <div class="sub-title">Cliente</div>\n        </div>\n      \n        <div class="content-body">\n        \n      \n      \n        <div class="col-stretch">\n          <div class="col-stretch-900">\n      \n            <div class="row">\n              <div class="col-md-4">\n                <div class="list-header color-purple">\n                  <span class="fill-purple icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 28\n                </div>\n                <div class="list-item">La Maravilla N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n                \n                    <div class="nested-list-item">Dirección:\n                      <div class="nested-list">\n                        <div class="nested-list-item">San José Coronado, CostadoEste Iglesia</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n          \n                <div class="list-item">Taller Industrial N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n              \n                    <div class="nested-list-item">Dirección:\n                      <div class="nested-list">\n                        <div class="nested-list-item">San José Coronado, CostadoEste Iglesia </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              \n              \n                <div class="list-item">Taller Industrial N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n              \n                    <div class="nested-list-item">Dirección:\n                      <div class="nested-list">\n                        <div class="nested-list-item">San José Coronado, CostadoEste Iglesia </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              \n              \n                <div class="list-item">Taller Industrial N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                      </div>\n                    </div>\n              \n                    <div class="nested-list-item">Dirección:\n                      <div class="nested-list">\n                        <div class="nested-list-item">San José Coronado, CostadoEste Iglesia </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              \n              \n              </div>\n    \n              <div class="col-md-4">\n                <div class="list-header color-purple">\n                  <span class="fill-purple icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 29\n                </div>\n                <div class="list-item">Hogar y Ferretería N°6472\n                  <div class="nested-list">\n                    <div class="nested-list-item">Transporte: RODCO</div>\n                    <div class="nested-list-item">Empaque:\n                      <div class="input-item"></div>\n                    </div>\n        \n                    <div class="nested-list-item">Productos\n                      <div class="nested-list">\n                        <div class="nested-list-item">1 Llavin Dale Doble Paso</div>\n                        <div class="nested-list-item">3 Llavin Dale Doble Paso</div>\n                    </div>\n                  </div>\n    \n                <div class="nested-list-item">Dirección:\n                  <div class="nested-list">\n                    <div class="nested-list-item">San José Coronado, CostadoEste Iglesia</div>\n                    </div>\n                  </div>\n                </div>\n              </div>  \n            </div>\n    \n    \n            <div class="col-md-4">\n              <div class="list-header color-purple">\n                <span class="fill-purple icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 30\n              </div>\n              <div class="list-item">\n                <div class="text">Hogar y Ferreteria</div>\n              </div>\n      \n              <div class="list-item">\n                <div class="text">Taller Industrial</div>\n              </div>\n      \n              <div class="list-item">\n                <div class="text">Ferreteria y Materiales Orosi</div>\n              </div>\n    \n              <div class="list-item">\n                <div class="text">Mundillaves</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n      <div class="col-md-3 color-column">\n        <div class="header green">\n          <span class="triangle"></span>\n          <span class="large-title">Entregados</span>\n        </div>\n      \n        <div class="sub-header">\n          <div class="sub-title">Hoy</div>\n        </div>\n        \n          <div class="content-body noPadding">\n            <div class="list-header color-green">\n              <span class="fill-green icon-medium ">');
    
      __out.push(RSpine.icons["clock"]);
    
      __out.push('</span>Agosto 29\n            </div>\n          \n        \n            <div class="list-item">\n              <div class="text">Hogar y Ferreteria N°6472</div>\n            </div>\n          \n            <div class="list-item">\n              <div class="text">Taller Industrial N°6472</div>\n            </div>\n          \n            <div class="list-item">\n              <div class="text">Ferreteria y Materiales Orosi N°6472</div>\n            </div>\n          \n            <div class="list-item">\n              <div class="text">Mundillaves N°6472</div>\n            </div>\n          </div>\n        </div>\n      </div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}
});


  var moduleList = [
    
      
       
        {"namespace":"app","path":"app/adminPanel/adminPanel","iconColor": "purple","iconLabel": "Pf","label": "Admin","home": false},
        
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
        {"namespace":"app","path":"app/logistica/logistica","iconColor": "blue","iconLabel": "Lg","label": "logistica app","home": false},
        
    
      
       
    
    ]

  
    //CSS Styles for Modules
    var css=".adminPanel h3 {  font-size: 15px;}.adminPanel .app-list .drag-handle {  height: 12px;  background-color: #f5f5f6;  border: 1px solid #f1f2f2;  display: inline-block;  vertical-align: middle;}.adminPanel .app-list .drag-handle.whileDragging {  border: 2px solid #efdf30;}.adminPanel .profile-list .popover {  max-width: 200px;}.adminPanel .profile-list .popover span {  display: block !important;  padding: 6px;  cursor: pointer;}.adminPanel .profile-list .popover span:hover {  color: #99569b;}.adminPanel .profile-list .list-group-item span {  display: inline-block;  padding: 5px;}.adminPanel .app-permission-item {  height: 190px;}.adminPanel .app-permission-item h3 {  text-transform: capitalize;}.adminPanel .app-permission-item .apps-list {  margin-top: 15px;  height: 140px;  overflow: auto;}.adminPanel .app-permission-item .apps-list .list-group-item {  padding: 2px 7px;}";
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
  
   
  