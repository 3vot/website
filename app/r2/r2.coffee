RSpine = require("rspine")     
require("lib/setup") 
Session = require("models/session")
User = require("models/user")

class App extends RSpine.Controller

  constructor: ->
    super
    RSpine.app = @
    
    RSpine.jsPath = "#{@path}"
    
    for check in $(".responsiveCheck")
      check = $(check)
      if check.css("display") != "none" then RSpine.device = check.data "device"
    
    
    
  setupWithForce: (session) ->
    session = Session.createFromQuery(session)
    User.query({id: Session.first().userId});

    RSpine.jsPath += "#{@path}/#{RSpine.session.orgId}/"

    LazyLoad.js "#{RSpine.jsPath}initApp_#{RSpine.device}.js", =>
      InitApp = require("initApp")
      initApp = new InitApp(el: ("body"))        
      RSpine.trigger "platform:initApp_loaded"
    
    
  setupWithAppStore: ->
    queryString = RSpine.getQueryParams(document.location.search);
    window.location.href = "/login.html" if queryString["session"] == null || queryString["session"] == undefined

    RSpine.Model.salesforceHost = @apiServer + "/salesforce";
    session = Session.createFromQuery(queryString)
    RSpine.jsPath = "#{@path}/#{RSpine.session.orgId}/"

    RSpine.bind "platform:login_invalid" , ->
      window.location = "/login.html"

    User.query({id: Session.first().userId});

    LazyLoad.js "#{RSpine.jsPath}initApp_#{RSpine.device}.js", =>
      InitApp = require("initApp")
      initApp = new InitApp(el: ("body"))        
      RSpine.trigger "platform:initApp_loaded"

  RSpine.getImage= (url) ->
    return RSpine.Model.salesforceHost + "/photo?url=" + url

  RSpine.getQueryParams= (qs) ->
    tokens = null
    re = /[?&]?([^=]+)=([^&]*)/g;
    params = {}
    qs = qs.split("+").join(" ");
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]) while tokens = re.exec(qs)
    return params;



module.exports = App