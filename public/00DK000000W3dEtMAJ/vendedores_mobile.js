
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
  "app/appManagerMobile/appManagerMobile": function(exports, require, module) {(function() {
  var AppManagerMobile, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  AppManagerMobile = (function(_super) {
    __extends(AppManagerMobile, _super);

    AppManagerMobile.prototype.className = "app-canvas";

    AppManagerMobile.prototype.elements = {
      ".profile-list": "profileList"
    };

    function AppManagerMobile() {
      this.loadData = __bind(this.loadData, this);
      AppManagerMobile.__super__.constructor.apply(this, arguments);
      this.html(require("app/appManagerMobile/layout"));
      RSpine.one("platform-app-launch-complete", function() {
        return RSpine.resizeColumns(".content-body", 106);
      });
      this.profiles = [];
      this.loadData();
      this.bind();
    }

    AppManagerMobile.prototype.loadData = function() {
      var request,
        _this = this;
      request = $.get("/r2apps");
      request.success(function(response) {
        _this.profiles = response.profiles;
        return _this.render();
      });
      return request.error(function(error) {
        _this.profiles.html("<li class='alert alert-danger'>This app only works while running on localhost</li>");
        console.error("An error occured receiving data from your FileSystem. Please make sure the /r2apps.json file is valid and all Apps referenced exist on the FileSystem and Path");
        return console.error(error);
      });
    };

    AppManagerMobile.prototype.render = function() {
      return this.profileList.html(require("app/appManagerMobile/item")(this.profiles));
    };

    AppManagerMobile.prototype.bind = function() {};

    AppManagerMobile.prototype.shutdown = function() {
      return this.release();
    };

    return AppManagerMobile;

  })(RSpine.Controller);

  module.exports = AppManagerMobile;

}).call(this);
}, "app/appManagerMobile/item": function(exports, require, module) {module.exports = function(values, data){ 
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
      var path, _i, _len, _ref;
    
      __out.push('<li>\n\n  <h2>\n    ');
    
      __out.push(__sanitize(this.name));
    
      __out.push('\n  </h2>\n\n  <ul class="apps-lists  ">\n    ');
    
      _ref = this.appPaths;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        __out.push('\n      <li class="">\n        ');
        __out.push(__sanitize(path));
        __out.push('\n      </li>\n    ');
      }
    
      __out.push('\n  </ul>\n\n\n</li>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
})(value));
    elem.data('item', value);
    $.merge(result, elem);
  }
  return result;
};}, "app/appManagerMobile/layout": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('<div class="color-column">\n  <div class="header purple" style="position: relative;">\n    <span class="triangle"></span>\n    <span class="large-title">Apps by Profile</span>\n  </div>\n  <div class="sub-header">\n    <div class="sub-title text-center">-</div>\n  </div>\n  <div class="content-body app-menu-content-body">\n\n      <ul class="profile-list flat-list">\n      </ul>\n  </div>\n</div>\n\n\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/pedidos/createApp": function(exports, require, module) {(function() {
  var CreateApp, RSpine,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  CreateApp = (function(_super) {
    __extends(CreateApp, _super);

    CreateApp.prototype.className = "sub-app-canvas";

    function CreateApp() {
      CreateApp.__super__.constructor.apply(this, arguments);
      this.html(require("app/pedidos/createApp_layout")());
    }

    return CreateApp;

  })(RSpine.Controller);

  module.exports = CreateApp;

}).call(this);
}, "app/pedidos/createApp_layout": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('<h1>\n  ok\n</h1>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/pedidos/layout": function(exports, require, module) {var content = function(__obj) {
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
      __out.push('\n<div class="row">\n  <div class="col-md-9">\n    <div class="app-header">pedidos</div>\n  </div>  \n</div>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}, "app/pedidos/pedidos": function(exports, require, module) {(function() {
  var CreateApp, Name, RSpine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RSpine = require("rspine");

  CreateApp = require("app/pedidos/createApp");

  Name = (function(_super) {
    __extends(Name, _super);

    Name.prototype.className = "app-canvas";

    Name.prototype.elements = {
      ".create-placeholder": "createPlaceholder"
    };

    Name.prototype.events = {
      "click .js-create-pedido": "onCreatePedido"
    };

    function Name() {
      this.onCreatePedido = __bind(this.onCreatePedido, this);
      Name.__super__.constructor.apply(this, arguments);
      this.html(require("app/pedidos/pedidosApp_layout")());
      this.createPlaceholder.hide();
    }

    Name.prototype.onShutdownPedido = function() {
      this.createPlaceholder.hide();
      return this.createApp = null;
    };

    Name.prototype.onCreatePedido = function(e) {
      if (this.createApp) {
        this.createPlaceholder.hide();
        return this.createApp = null;
      } else {
        this.createPlaceholder.show();
        return this.createApp = new CreateApp({
          el: this.createPlaceholder
        });
      }
    };

    return Name;

  })(RSpine.Controller);

  module.exports = Name;

}).call(this);
}, "app/pedidos/pedidosApp_layout": function(exports, require, module) {var content = function(__obj) {
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
    
      __out.push('\n\n<div class="row">\n  <div class="col-md-9">\n    <div class="app-header">Pedidos</div>\n  </div>\n  \n  <div class="col-md-3">\n    <div class="btn-square">\n      <span class="original-text">Crear Nuevo Pedido</span>\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" class="icon-large icon-create">\n          <polygon points="33.1,15.6 17.6,15.6 17.6,0.1 15.6,0.1 15.6,15.6 0.1,15.6 0.1,17.6 15.6,17.6 15.6,33.1 17.6,33.1 17.6,17.6 33.1,17.6">\n          </polygon>\n        </svg>\n      <span class="hover-text">Cancelar Pedido</span>\n    </div>\n  </div>\n</div>\n   \n  <div class="row full-height">\n    <div class="col-md-3 color-column">\n      <div class="header blue">\n        <span class="triangle"></span>\n        <span class="large-title">Proformas</span>\n      </div>\n      \n      <div class="sub-header">\n        <div class="sub-title">Cliente</div>\n      </div>\n      \n      <div class="content-body noPadding">\n        <div class="list-item">\n          <div class="text">Hogar y Ferreteria</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Taller Industrial</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Ferreteria y Materiales Orosi</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Mundillaves</div>\n        </div>\n      </div>\n    </div>\n    \n    <div class="col-md-3 color-column">\n      <div class="header red">\n        <span class="triangle"></span>\n        <span class="large-title">Guardados</span>\n      </div>\n      \n      <div class="sub-header">\n        <div class="sub-title">Cliente</div>\n      </div>\n      \n      <div class="content-body noPadding">\n        <div class="list-item">\n          <div class="text">Hogar y Ferreteria</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Taller Industrial</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Ferreteria y Materiales Orosi</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Mundillaves</div>\n        </div>\n      </div>\n    </div>\n    \n    \n    <div class="col-md-3 color-column">\n      <div class="header purple">\n        <span class="triangle"></span>\n        <span class="large-title">Pendientes</span>\n      </div>\n      <div class="sub-header">\n        <div class="sub-title">Todos los Clientes</div>\n      </div>\n      <div class="content-body noPadding scrollable">\n        <div class="list-item">\n          <div class="text">Hogar y Ferreteria</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Taller Industrial</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Ferreteria y Materiales Orosi</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Mundillaves</div>\n        </div>\n      </div>\n    </div>\n    \n    \n    \n    <div class="col-md-3 color-column">\n      <div class="header green">\n        <span class="triangle"></span>\n        <span class="large-title">Aprobados</span>\n      \n      </div><div class="sub-header">\n        <div class="sub-title">Todos los Clientes</div>\n      </div>\n      \n      <div class="content-body scrollable noPadding">\n        <div class="list-item">\n          <div class="text">Hogar y Ferreteria</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Taller Industrial</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Ferreteria y Materiales Orosi</div>\n        </div>\n        <div class="list-item">\n          <div class="text">Mundillaves</div>\n        </div>\n      </div>\n    </div>\n  </div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
module.exports = content;}
});


  var moduleList = [
    
      
       
        {"namespace":"app","path":"app/appManagerMobile/appManagerMobile","iconColor": "red","iconLabel": "mM","label": "Apps","home": false},
        
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
    
      
       
        {"namespace":"app","path":"app/pedidos/pedidos","iconColor": "red","iconLabel": "Pe","label": "Pedidos","home": false},
        
    
      
       
    
    ]

  