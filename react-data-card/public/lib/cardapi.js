/*! appspace-authentication-library v1.4.3-c7d1098 | (c) Appspace | https://docs.appspace.com/faq/legal/ */
!function(e){("object"!=typeof exports||"undefined"==typeof module)&&"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";function e(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})}function a(e){return e&&void 0!==e.length}function n(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],u(e,this)}function r(n,o){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e,t=1===n._state?o.onFulfilled:o.onRejected;if(null!==t){try{e=t(n._value)}catch(e){return void c(o.promise,e)}s(o.promise,e)}else(1===n._state?s:c)(o.promise,n._value)})):n._deferreds.push(o)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void p(t);if("function"==typeof n)return void u((o=n,r=e,function(){o.apply(r,arguments)}),t)}t._state=1,t._value=e,p(t)}catch(e){c(t,e)}var o,r}function c(e,t){e._state=2,e._value=t,p(e)}function p(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)r(e,e._deferreds[t]);e._deferreds=null}function u(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}var t=setTimeout;i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(o,e){var t=new this.constructor(n);return r(this,new function(e,t,n){this.onFulfilled="function"==typeof o?o:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(0,e,t)),t},i.prototype.finally=e,i.all=function(t){return new i(function(r,i){if(!a(t))return i(new TypeError("Promise.all accepts an array"));var s=Array.prototype.slice.call(t);if(0===s.length)return r([]);for(var c=s.length,e=0;s.length>e;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var o=e.then;if("function"==typeof o)return o.call(e,function(e){t(n,e)},i),0}s[n]=e,0==--c&&r(s)}catch(e){i(e)}}(e,s[e])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(n){return new i(function(e,t){t(n)})},i.race=function(r){return new i(function(e,t){if(!a(r))return t(new TypeError("Promise.race accepts an array"));for(var n=0,o=r.length;n<o;n++)i.resolve(r[n]).then(e,t)})},i._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){t(e,0)},i._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var o=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in o?o.Promise.prototype.finally||(o.Promise.prototype.finally=e):o.Promise=i}),function o(r,i,s){function c(n,e){if(!i[n]){if(!r[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(a)return a(n,!0);t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}t=i[n]={exports:{}};r[n][0].call(t.exports,function(e){var t=r[n][1][e];return c(t||e)},t,t.exports,o,r,i,s)}return i[n].exports}for(var a="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,n){function c(e){this.message=e}(c.prototype=new Error).name="InvalidCharacterError",t.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new c("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,r=0,i=0,s="";o=t.charAt(i++);~o&&(n=r%4?64*n+o:o,r++%4)&&(s+=String.fromCharCode(255&n>>(-2*r&6))))o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return s}},{}],2:[function(e,t,n){var o=e("./atob");t.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return decodeURIComponent(o(t).replace(/(.)/g,function(e,t){t=t.charCodeAt(0).toString(16).toUpperCase();return"%"+(t=t.length<2?"0"+t:t)}))}catch(e){return o(t)}}},{"./atob":1}],3:[function(e,t,n){"use strict";function o(e){this.message=e}var r=e("./base64_url_decode");(o.prototype=new Error).name="InvalidTokenError",t.exports=function(e,t){if("string"!=typeof e)throw new o("Invalid token specified");t=!0===(t=t||{}).header?0:1;try{return JSON.parse(r(e.split(".")[t]))}catch(e){throw new o("Invalid token specified: "+e.message)}},t.exports.InvalidTokenError=o},{"./base64_url_decode":2}],4:[function(n,e,t){!function(e){var t=n("./lib/index");"function"==typeof e.window.define&&e.window.define.amd?e.window.define("jwt_decode",function(){return t}):e.window&&(e.window.jwt_decode=t)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/index":3}]},{},[4]),function(){"use strict";window.appspace=window.appspace||{}}(),window.appspace.CacsTokenInfo=function(e){this.token=(e=e||{}).token,this.serviceUrls=e.serviceUrls,this.expireTimestamp=e.expireTimestamp},window.appspace.CloudTokenInfo=function(e){this.clientToken=(e=e||{}).clientToken,this.expireTimestamp=e.expireTimestamp,this.serviceUrls=e.serviceUrls,this.acsUrl=e.acsUrl,this.scope=e.scope},window.appspace.ConstellationTokens=function(e,t,n){this.accessToken=e,this.refreshToken=t,this.idToken=n},function(){"use strict";window.appspace.AuthenticationHelper={parseConstellationTokensFromQueryString:function(){var e=this.Appspace.WindowHelper.getQueryString();if(e){for(var t={},n=e.substr(1).split("&"),o=0;o<n.length;o++){var r=n[o].split("=");t[r[0].toLowerCase()]=decodeURI(r[1])}return this.parseConstellationTokens(t)}},parseConstellationTokens:function(e){if(e){for(var t=new this.Appspace.ConstellationTokens,n=Object.keys(e),o=0;o<n.length;o++){var r=n[o],i=e[r];switch(r.toLowerCase()){case"accesstoken":t.accessToken=i;break;case"refreshtoken":t.refreshToken=i;break;case"idtoken":t.idToken=i}}return t}},parseJwtToken:function(e){return e?this.Appspace.JwtHelper.decode(e):void 0}},window.appspace.AuthenticationHelper.Appspace=window.appspace}(),function(){"use strict";window.appspace.DateHelper={TO_MILLISECONDS:1e3,parseTimestamp:function(e){if(!e||e<0)throw new Error("Ticks cannot be undefined or less than or equals to zero.");return new Date(e*this.TO_MILLISECONDS).getTime()},isExpired:function(e){return!e||e<Date.now()}}}(),function(){"use strict";window.appspace.HttpHelper={trimEndUrl:function(e){return(e||"").replace(/\/$/,"")},trimStartUrl:function(e){return(e||"").replace(/^\//,"")},combineUrl:function(e,t){return this.trimEndUrl(e)+"/"+this.trimStartUrl(t)},parseConfiguration:function(e){e=e||{};return e.headers=e.headers||{},e}}}(),window.appspace.JwtHelper={decode:function(e){try{return jwt_decode(e)}catch(e){return}}},function(){"use strict";window.appspace.WindowHelper={getQueryString:function(){return window.location.search}}}(),function(){"use strict";function e(e){this.options=e||{},this.AUTHORIZATION_HEADER_KEY="Authorization",this.CLOUD_SERVICE_HEADER_KEY="x-appspace-cacs-token",this.CLOUD_CLIENT_HEADER_KEY="x-appspace-client-token",this.CREATE_CLOUD_TOKEN_ENDPOINT="/api/v3/authorization/cloud/token",this.BEARER_KEY="Bearer",this.GRANT_TYPE_REFRESH="refreshToken",this.CREATE_TOKEN_ENDPOINT="/api/v3/authorization/token",this.NON_EXISTENT_REFRESH_TOKEN=401,this.EXPIRED_REFRESH_TOKEN=403,this.EXPIRED_REFRESH_TOKEN_STATUS_CODES=[this.NON_EXISTENT_REFRESH_TOKEN,this.EXPIRED_REFRESH_TOKEN],this.constellationTokens,this.cloudTokenInfo,this.constellationBaseUrl,this.cacsTokenInfo,this.accountId,this.requestCacsTokenPromise,this.getConstellationTokensPromise,this.getCloudClientTokenPromise,this.subjectType,this.subjectId}e.prototype.setOptions=function(e){this.options=e||{}},e.prototype.setConstellationTokens=function(e){if(!(e&&e.accessToken&&e.refreshToken&&e.idToken))throw new Error("Missing accessToken or refreshToken or idToken.");this.constellationTokens=e;e=this.Appspace.AuthenticationHelper.parseJwtToken(e.idToken);if(!(e&&e.instanceUrl&&e.subjectType&&e.subjectId))throw new Error("Unable to decode instance URL and subject information from idToken.");this.constellationBaseUrl=this.Appspace.HttpHelper.trimEndUrl(e.instanceUrl),this.accountId=e.accountId,this.subjectId=e.subjectId,this.subjectType=e.subjectType},e.prototype.requestConstellationService=function(t,n){var e=this.getConfigurationError()||this.getConstellationConfigurationError(t);return e?Promise.reject(e):this.getTokens().then(function(e){return(n=this.Appspace.HttpHelper.parseConfiguration(n)).headers[this.AUTHORIZATION_HEADER_KEY]=this.BEARER_KEY+" "+e.accessToken,this.requestConstellationServiceDirect(t,n)}.bind(this),function(e){return Promise.reject(this.constellationTokens?e:new Error("Missing constellation tokens."))}.bind(this))},e.prototype.getServiceUrl=function(t,e){return this.getCloudClientToken(e).then(function(e){return e.serviceUrls=e.serviceUrls||{},Promise.resolve(e.serviceUrls[t])},function(e){return Promise.reject(e)})},e.prototype.getConstellationBaseUrl=function(){return this.getTokens().then(function(){return Promise.resolve(this.constellationBaseUrl)}.bind(this),function(e){return Promise.reject(e)})},e.prototype.getAccountId=function(){return this.getTokens().then(function(){return Promise.resolve(this.accountId)}.bind(this),function(e){return Promise.reject(e)})},e.prototype.requestCloudService=function(t,n,o,e){var r=this.getConfigurationError();return r?Promise.reject(r):t?this.getCacsToken(e).then(function(e){(o=this.Appspace.HttpHelper.parseConfiguration(o)).headers[this.CLOUD_SERVICE_HEADER_KEY]=e.token;e=e.serviceUrls[t];return e&&(o.url=this.Appspace.HttpHelper.combineUrl(e,n)),o.url?Promise.resolve(o):Promise.reject(new Error("Url is not configured."))}.bind(this),function(e){return Promise.reject(this.cacsTokenInfo?e:new Error("Missing CACS token info."))}.bind(this)).then(this.options.requestClient.bind(this)):Promise.reject(new Error("Service name cannot be undefined."))},e.prototype.getConfigurationError=function(){if(!this.options.requestClient)return new Error("Missing request client.")},e.prototype.getConstellationConfigurationError=function(e){if(!e)return new Error("Missing relative service URL.")},e.prototype.isAccessTokenValid=function(e){if(!e)throw new Error("Token cannot be undefined.");e=this.Appspace.AuthenticationHelper.parseJwtToken(e.accessToken);if(!e||!e.exp)throw new Error("Unable to decode expiry date from accessToken.");return!this.Appspace.DateHelper.isExpired(this.Appspace.DateHelper.parseTimestamp(e.exp))},e.prototype.refreshToken=function(e){this.setConstellationTokens(e);e=this.Appspace.HttpHelper.parseConfiguration({method:"POST",data:{subjectType:this.subjectType,subjectId:this.subjectId,grantType:this.GRANT_TYPE_REFRESH,refreshToken:e.refreshToken}});return this.requestConstellationServiceDirect(this.CREATE_TOKEN_ENDPOINT,e).then(function(e){try{return Promise.resolve(this.onTokenResponse(e))}catch(e){return Promise.reject(e)}}.bind(this),function(e){return-1!==this.EXPIRED_REFRESH_TOKEN_STATUS_CODES.indexOf((e||{}).status)&&this.options.requestConstellationTokens?this.requestTokens():Promise.reject(e)}.bind(this))},e.prototype.requestTokens=function(){return this.options.requestConstellationTokens?this.options.requestConstellationTokens().then(function(e){try{var t=this.onTokenResponse(e);return this.setConstellationTokens(t),Promise.resolve(t)}catch(e){return Promise.reject(e)}}.bind(this)):Promise.reject(new Error("Unable to request tokens."))},e.prototype.onTokenResponse=function(e){if(!e||0==Object.keys(e).length)throw new Error("Received empty response upon tokens refresh.");e=this.Appspace.AuthenticationHelper.parseConstellationTokens(e);if(!e)throw new Error("Unable to parse tokens after refresh.");if(!this.isAccessTokenValid(e))throw new Error("Retrieved token is invalid.");return this.constellationTokens=e,this.options.onConstellationTokensRefreshed&&this.options.onConstellationTokensRefreshed(this.constellationTokens),e},e.prototype.getTokens=function(){return this.getConstellationTokensPromise||(this.getConstellationTokensPromise=this.processGetConstellationTokens().finally(function(){this.getConstellationTokensPromise=void 0}.bind(this)),this.getConstellationTokensPromise)},e.prototype.processGetConstellationTokens=function(){if(!this.constellationTokens)return this.requestTokens();try{return this.isAccessTokenValid(this.constellationTokens)?Promise.resolve(this.constellationTokens):this.refreshToken(this.constellationTokens)}catch(e){return Promise.reject(e)}},e.prototype.getCacsToken=function(e){return this.requestCacsTokenPromise||(this.cacsTokenInfo&&!this.Appspace.DateHelper.isExpired(this.cacsTokenInfo.expireTimestamp)?Promise.resolve(this.cacsTokenInfo):(this.requestCacsTokenPromise=this.getCloudClientToken(e).then(function(e){var t=this.Appspace.HttpHelper.parseConfiguration({method:"POST",url:e.acsUrl,data:{scope:e.scope}});return n=e,t.headers[this.CLOUD_CLIENT_HEADER_KEY]=e.clientToken,Promise.resolve(t)}.bind(this),function(e){return Promise.reject(this.cloudTokenInfo?e:new Error("Missing client token."))}.bind(this)).then(this.options.requestClient.bind(this)).then(function(e){var t=new window.appspace.CacsTokenInfo(e);if(!e||0==Object.keys(e).length)return Promise.reject(new Error("Received empty response for CACS tokens."));if(!t.token)return Promise.reject(new Error("CACS token cannot be undefined."));e=this.Appspace.AuthenticationHelper.parseJwtToken(t.token);return e?(t.expireTimestamp=this.Appspace.DateHelper.parseTimestamp(e.exp),this.Appspace.DateHelper.isExpired(t.expireTimestamp)?Promise.reject(new Error("CACS token has already expired.")):(t.serviceUrls=n.serviceUrls,this.cacsTokenInfo=t,Promise.resolve(this.cacsTokenInfo))):Promise.reject(new Error("Unable to parse CACS tokens."))}.bind(this)).finally(function(){this.requestCacsTokenPromise=void 0}.bind(this)),this.requestCacsTokenPromise));var n},e.prototype.getCloudClientToken=function(e){return this.getCloudClientTokenPromise||(this.cloudTokenInfo&&!this.Appspace.DateHelper.isExpired(this.cloudTokenInfo.expireTimestamp)?Promise.resolve(this.cloudTokenInfo):e?(this.getCloudClientTokenPromise=this.requestConstellationService(this.CREATE_CLOUD_TOKEN_ENDPOINT,{method:"POST",data:{context:e}}).then(function(e){var t=new window.appspace.CloudTokenInfo(e);if(!e||0==Object.keys(e).length)return Promise.reject(new Error("Received empty response for cloud tokens."));if(!t.clientToken)return Promise.reject(new Error("Client token cannot be undefined."));if(!t.acsUrl)return Promise.reject(new Error("ACS url cannot be undefined."));e=this.Appspace.AuthenticationHelper.parseJwtToken(t.clientToken);return e?e.cloud_acs_scope?(t.scope=e.cloud_acs_scope,t.expireTimestamp=this.Appspace.DateHelper.parseTimestamp(e.exp),this.Appspace.DateHelper.isExpired(t.expireTimestamp)?Promise.reject(new Error("Cloud token has already expired.")):(t.serviceUrls=t.serviceUrls||{},this.cloudTokenInfo=t,Promise.resolve(this.cloudTokenInfo))):Promise.reject(new Error("The scope for the token cannot be undefined.")):Promise.reject(new Error("Unable to parse cloud tokens."))}.bind(this)).finally(function(){this.getCloudClientTokenPromise=void 0}.bind(this)),this.getCloudClientTokenPromise):Promise.reject(new Error("Context is required to get cloud client token.")))},e.prototype.requestConstellationServiceDirect=function(e,t){return t.url=this.Appspace.HttpHelper.combineUrl(this.constellationBaseUrl,e),this.options.requestClient(t)},window.appspace.AuthenticationClient=e,window.appspace.AuthenticationClient.prototype.Appspace=window.appspace}();
function CardApiAuthenticationLibrary(t,e,i){this.isAuthenticationClientExists()&&(this.constellationTokens,this.requestClient=t,this.onConstellationTokensRefreshed=e,this.requestConstellationTokens=i,this.authenticationClient=new this.Appspace.AuthenticationClient({requestClient:this.requestClient,onConstellationTokensRefreshed:function(t){this.constellationTokens=t,this.onConstellationTokensRefreshed&&this.onConstellationTokensRefreshed(this.constellationTokens)}.bind(this),requestConstellationTokens:this.requestConstellationTokens}))}!function(){"use strict";window.appspace=window.appspace||{}}(),CardApiAuthenticationLibrary.prototype.getConstellationTokensFromQueryString=function(){return this.isAuthenticationHelperExists()?this.Appspace.AuthenticationHelper.parseConstellationTokensFromQueryString():void 0},CardApiAuthenticationLibrary.prototype.isAuthenticationHelperExists=function(){return Boolean(this.Appspace&&this.Appspace.AuthenticationHelper)},CardApiAuthenticationLibrary.prototype.isAuthenticationClientExists=function(){return Boolean(this.Appspace&&this.Appspace.AuthenticationClient)},CardApiAuthenticationLibrary.prototype.setConstellationTokens=function(t){this.constellationTokens=this.parseConstellationTokens(t)},CardApiAuthenticationLibrary.prototype.parseConstellationTokens=function(t){return this.isAuthenticationHelperExists()?this.Appspace.AuthenticationHelper.parseConstellationTokens(t):void 0},CardApiAuthenticationLibrary.prototype.requestConstellationService=function(t,e){var i=this.validateClient();return i?$.Deferred().reject(i):this.authenticationClient.requestConstellationService(t,e)},CardApiAuthenticationLibrary.prototype.getServiceUrl=function(t,e){var i=this.validateClient();return i?$.Deferred().reject(i):this.authenticationClient.getServiceUrl(t,e)},CardApiAuthenticationLibrary.prototype.getConstellationBaseUrl=function(){var t=this.validateClient();return t?$.Deferred().reject(t):this.authenticationClient.getConstellationBaseUrl()},CardApiAuthenticationLibrary.prototype.getAccountId=function(){var t=this.validateClient();return t?$.Deferred().reject(t):this.authenticationClient.getAccountId()},CardApiAuthenticationLibrary.prototype.requestCloudService=function(t,e,i,n){var o=this.validateClient();return o?$.Deferred().reject(o):this.authenticationClient.requestCloudService(t,e,i,n)},CardApiAuthenticationLibrary.prototype.hasConstellationTokens=function(){return Boolean(this.constellationTokens)},CardApiAuthenticationLibrary.prototype.getSubjectId=function(){if(this.hasConstellationTokens()&&this.isAuthenticationHelperExists())return(this.Appspace.AuthenticationHelper.parseJwtToken(this.constellationTokens.accessToken)||{}).subjectId},CardApiAuthenticationLibrary.prototype.validateClient=function(){return this.isAuthenticationClientExists()?this.hasConstellationTokens()?void this.authenticationClient.setConstellationTokens(this.constellationTokens):new Error("Constellation tokens are empty"):new Error("Authentication Client doesn't exist")},CardApiAuthenticationLibrary.prototype.getCacsToken=function(t){var e=this.validateClient();return e?$.Deferred().reject(e):this.authenticationClient.getCacsToken(t)},CardApiAuthenticationLibrary.prototype.getConstellationTokens=function(t){var e=this.validateClient();return e?$.Deferred().reject(e):this.authenticationClient.getTokens()},CardApiAuthenticationLibrary.prototype.Appspace=window.appspace,function(){var t={CONTENT_PREPEND_KEY:"*content$",JOIN_KEY:">>",SPLIT_KEY_INDEX:1,SPLIT_COLLECTION_INDEX:0,SPLIT_KEY_COLLECTION_LENGTH:2,getCollectionName:function(){var t=this.getCurrentHref(),e=t.lastIndexOf("/index.html");return 0<e?t.substring(0,e):t},getLocalStorageId:function(t,e){return this.CONTENT_PREPEND_KEY+t+this.JOIN_KEY+e},getInfoFromLocalStorageId:function(t){if(t){var e=t.indexOf(this.CONTENT_PREPEND_KEY);if(-1!==e){var i=t.substring(e+this.CONTENT_PREPEND_KEY.length).split(this.JOIN_KEY);if(i.length===this.SPLIT_KEY_COLLECTION_LENGTH)return{key:i[this.SPLIT_KEY_INDEX],collection:i[this.SPLIT_COLLECTION_INDEX]}}}},getCurrentHref:function(){return window.location.href}};window.appspace.StorageHelper=t}();
/* ! CardAPI v1.9.0- | (c) Appspace | https://docs.appspace.com/faq/legal/ */
function CardApi(type) {
    var schemaUpdateCallback = null;
    var modelUpdateCallback = null;
    var languagesUpdateCallback = null;
    var modeChangeCallback = null;
    var messagesCallback = null;
    var postMessageCallback;
    var seekEventCallback;
    var deviceCapabilitiesCallback = null;
    var occupancyStatusSubscribers = [];
    var schema = {inputs: []};
    var model = {inputs: []};
    var languages = {};
    var currentLanguageKey = '';
    var mode = 'tv';
    var cardId;
    var themeProperty = {};
    var me = this;
    var hasNotifiedLoaded = false;
    var hasNotifiedComplete = false;
    var hasNotifiedError = false;
    var fontLookupCache = {};
    var self = this;
    var config = {};
    var apiSupported = [];
    var apiInitDefer = $.Deferred();
    var constellationTokensReadyDefer = $.Deferred();
    var deferCache = {};
    var timeoutCache = {};
    var deferRunningId = 0;
    var appWindow; var appOrigin;
    var mouseMoveEvent = 'mousemove';
    var hideMouseTimer;
    var authenticationLibrary = new CardApiAuthenticationLibrary(requestClient, onConstellationTokensRefreshed, requestConstellationTokens);
    var cachedUrlParameters = {};
    var DEFAULT_REQUEST_TIMEOUT = 10000;
    var CONSTELLATION_TOKENS_READY_TIMEOUT = 10000;
    var KEY_VALUE_PAIR_SPLIT_LENGTH = 2;
    var KEY_VALUE_PAIR_SEPARATOR = '=';
    var QUERY_STRING_URL_SEPARATOR = '?';
    var QUERY_STRING_OBJECT_SEPARATOR = '&';
    var QUERY_STRING_SEPARTOR_EXCLUDE_LENGTH = 1;
    var SETUP_PASSPORT_API = 'api.setuppassport';
    var GET_PASSPORT_API = 'api.getpassports';
    var CACHE_CONTENT_API = 'api.cachecontent';
    var RESOLVE_CONTENT_PATH_API = 'api.resolvecontentpath';
    var OCCUPANCY_EVENT = 'occupancy';
    var SUBSCRIBE_MESSAGE = 'subscribe';
    var UNSUBSCRIBE_MESSAGE = 'unsubscribe';
    var supportedApiResponse = [SETUP_PASSPORT_API, GET_PASSPORT_API, RESOLVE_CONTENT_PATH_API];
    var CURSOR = {
        SHOW: 'auto',
        HIDE: 'none',
    };
    var REGEX_REPLACEMENT_FLAG = 'ig';
    var RESOLVED_PROMISE_STATE = 'resolved';
    var initPromise = $.Deferred();
    var SERVICE_WORKER_FILE = 'service-worker.js';
    var isServiceWorkerRegistered = false;
    var serviceWorkerMessagingChannel;
    var CHECK_HEARTBEAT_TIMEOUT_DURATION = 300000; // 5 minutes
    var ACK_HEARTBEAT_TIMEOUT_DURATION = 5000;
    var CACHE_COMMAND = {
        ASSIGN_MESSAGE_PORT: 'ASSIGN_MESSAGE_PORT',
        KEEP_ALIVE: 'KEEP_ALIVE',
        ACK_ALIVE: 'ACK_ALIVE',
        SET_MANIFEST: 'SET_MANIFEST',
    };
    var MAX_CACHEABLE_FILE_SIZE = 300000000; // 300MB

    this.PLAYBACKCONTEXT = {
        EDIT: 'editing',
        THEME: 'themeediting',
        SCREENSHOT: 'screenshot',
        THEMESCREENSHOT: 'themescreenshot',
        DEVICE: 'device',
        NONE: 'none',
        PREVIEW: 'preview',
    };
    this.PLAYBACK_CONTEXT_MAPPING = {
        'theme': this.PLAYBACKCONTEXT.THEME,
        'edit': this.PLAYBACKCONTEXT.EDIT,
        'screenshot': this.PLAYBACKCONTEXT.SCREENSHOT,
        'themescreenshot': this.PLAYBACKCONTEXT.THEMESCREENSHOT,
        'device': this.PLAYBACKCONTEXT.DEVICE,
        'preview': this.PLAYBACKCONTEXT.PREVIEW,
    };

    this.VALID_CONTEXTS_FOR_API_INIT = [this.PLAYBACKCONTEXT.DEVICE, this.PLAYBACKCONTEXT.EDIT, this.PLAYBACKCONTEXT.PREVIEW];

    function requestClient(configuration) {
        return new Promise(function(resolve, reject) {
            httpRequest(configuration.url, configuration).then(function(response) {
                if (!response) {
                    reject(new Error('Empty response'));
                    return;
                }

                resolve(configuration && configuration.sendFullResponse ? response : response.data);
            }, function(error) {
                if (!error || error.status < 200 || error.status >= 300) {
                    reject(error);
                    return;
                }

                // backwards compatibility with app that throws error if reponse body is empty but status success
                var response = error;
                response.data = {};
                resolve(response);
            });
        });
    }

    function onConstellationTokensRefreshed(tokens) {
        raiseMessage({
            message: 'onconstellationtokensrefresh',
            tokens: tokens,
            cardId: cardId,
        });
    }

    // Gets a parameter from the current url query string
    function getLocationParameterByName(name) {
        return cachedUrlParameters[name.toLowerCase()] || '';
    }

    function setHideMouseTimeout() {
        clearTimeout(hideMouseTimer);
        hideMouseTimer = null;
        setCursorVisibility(CURSOR.SHOW);
        // Set the mouse to hide within 1 sec if it's activated
        hideMouseTimer = setTimeout(hideMouse, 1000);
    }

    function hideMouse() {
        setCursorVisibility(CURSOR.HIDE);
    }

    function setCursorVisibility(visible) {
        document.body.style.cursor = visible;
    }

    this.cacheUrlParameters = function() {
        var href = window.location.href;
        // plus 1 to exclude separator
        var queryString = href.substring(href.indexOf(QUERY_STRING_URL_SEPARATOR) + QUERY_STRING_SEPARTOR_EXCLUDE_LENGTH);
        if (!queryString) {
            return;
        }

        // e.g. ?hello=world&hello2=world2
        var keyValuePairs = queryString.split(QUERY_STRING_OBJECT_SEPARATOR);
        for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValuePairRaw = keyValuePairs[i];
            if (!keyValuePairRaw) {
                continue;
            }

            // e.g. hello=world or hello2=world2
            var keyValuePair = keyValuePairRaw.split(KEY_VALUE_PAIR_SEPARATOR);
            if (keyValuePair.length !== KEY_VALUE_PAIR_SPLIT_LENGTH) {
                continue;
            }

            cachedUrlParameters[keyValuePair[0].toLowerCase()] = decodeURIComponent(keyValuePair[1]);
        }
    };

    function setConstellationTokens(tokens) {
        if (!tokens || !tokens.accessToken || !tokens.idToken || !tokens.refreshToken) {
            return;
        }

        authenticationLibrary.setConstellationTokens(tokens);
        resolveDefer(constellationTokensReadyDefer);
    }

    function requestConstellationService(serviceRelativeUrl, requestConfiguration) {
        // eslint-disable-next-line new-cap
        var promise = $.Deferred();
        var requestTimeout = setTimeout(function() {
            promise.reject('Timeout on waiting for constellation tokens to be ready');
        }, CONSTELLATION_TOKENS_READY_TIMEOUT);
        constellationTokensReadyDefer.promise().then(function() {
            clearTimeout(requestTimeout);
            requestTimeout = undefined;
            try {
                authenticationLibrary.requestConstellationService(serviceRelativeUrl, requestConfiguration)
                    .then(promise.resolve, promise.reject);
            } catch (error) {
                promise.reject(error.message);
            }
        });
        return promise.promise();
    }

    // Initializes the Card API and registers with the host
    this.init = function() {
        setConstellationTokens(authenticationLibrary.getConstellationTokensFromQueryString());
        // Get the card id
        cardId = getLocationParameterByName('cardId');

        // Attempt to get the current mode from url query string
        mode = getLocationParameterByName('mode');

        var modelJsonResponse;
        // Attempt to load the default model
        $.getJSON('model.json', function(data) {
            modelJsonResponse = data;
            // Check has it already been updated, if not use the default
            if (model.inputs.length == 0) {
                self.onModelUpdate(data);
            }
        }).always(function() {
            $.getJSON('lang.json', function(data) {
                if (!data) {
                    return;
                }

                var languageKey = '';
                for (var key in data) {
                    if (!data[key].isDefault) {
                        continue;
                    }

                    languageKey = key;
                    break;
                }

                self.onLanguagesUpdate(data, languageKey);
            }).always(function() {
                // Let parent know we have initiaized the api
                raiseMessage({
                    message: 'onapiready',
                    cardId: cardId,
                    runtimeConfiguration: (modelJsonResponse || {}).runtimeConfiguration,
                });
            });
        });

        $.getJSON('schema.json', function(data) {
            // Check has it already been updated, if not use the default
            if (schema.inputs.length) {
                return;
            }

            self.onSchemaUpdate(data);
        });

        // Create IE + others compatible event handler
        var addEventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        var addEventName = window[addEventMethod];
        var removeEventMethod = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
        var removeEventName = window[removeEventMethod];
        var messageEvent = addEventMethod === 'attachEvent' ? 'onmessage' : 'message';
        // Set up parent window event listener for commands
        removeEventName(messageEvent, this.onParentMessage, false);
        addEventName(messageEvent, this.onParentMessage, false);
        initPromise.resolve();

        if (this.isEditing()) {
            return;
        }

        // Hide mouse by default if it's not editing
        removeEventName(mouseMoveEvent, setHideMouseTimeout, false);
        addEventName(mouseMoveEvent, setHideMouseTimeout, false);
        hideMouse();
    };

    this.isReady = function() {
        var promises = [initPromise];
        if (this.VALID_CONTEXTS_FOR_API_INIT.indexOf(this.getPlaybackContext()) >= 0) {
            promises.push(apiInitDefer);
        }

        // .apply is used to convert array to separate arguments
        return $.when.apply($, promises);
    };

    function resolveDefer(defer) {
        if (!defer || apiInitDefer.state() === RESOLVED_PROMISE_STATE) {
            return;
        }

        defer.resolve();
    }

    /** *************** Parent Window Handlers *****************/
    this.onParentMessage = function(event) {
        if (!event || !event.data) {
            return;
        }

        if (postMessageCallback) {
            postMessageCallback(event.data);
        }

        if (!event.data.message) {
            return;
        }

        // If somone has subscribed, we forward them the message
        if (messagesCallback) {
            messagesCallback(event.data);
        }

        var parameters = event.data.parameters;
        var eventType = event.data.message.toLowerCase();
        switch (eventType) {
            case 'api.init':
                config = event.data.config;
                if (model.inputs && model.inputs.length > 0) {
                    self.onModelUpdate(model);
                }

                if (schema.inputs && schema.inputs.length > 0) {
                    self.onSchemaUpdate(schema);
                }

                if (config.constellationTokens) {
                    self.onInjectConstellationTokens(config.constellationTokens);
                }

                self.onDeviceCapabilitiesUpdate(config.deviceCapabilities);

                apiSupported = config.apiSupported || [];

                resolveDefer(apiInitDefer);
                break;
            case 'onmodechange':
                me.onModeChange(event.data.mode);
                break;
            case 'onschemaupdate':
                me.onSchemaUpdate(event.data.schema);
                break;
            case 'onmodelupdate':
                me.onModelUpdate(event.data.model);
                break;
            case 'onlanguagesupdate':
                me.onLanguagesUpdate(event.data.languages, event.data.currentLanguageKey);
                break;
            case 'setcurrentlanguage':
                me.setCurrentLanguage(event.data.languageKey);
                break;
            case 'onexecutescript':
                me.onExecuteScript(event.data.script);
                break;
            case 'oninjectcssclass':
                me.onInjectCssClass(event.data.className, event.data.css);
                break;
            case 'oninjectthemeproperty':
                me.onInjectThemeProperty(event.data.name, event.data.value);
                break;
            case 'api.response':
                me.processApiResponse(event.data);
                break;
            case 'appspaceapp.webview.postmessage.init':
                appWindow = event.source;
                appOrigin = event.origin;
                // send on api ready
                raiseMessage({message: 'onapiready', cardId: cardId});
                break;
            case 'appspaceapp.mswebview.postmessage.init':
                msMessaging = [];
                raiseMessage({message: 'onapiready', cardId: cardId});
                break;

            case 'oninjectconstellationtokens':
                me.onInjectConstellationTokens(event.data.tokens);
                break;

            case 'api.requestconstellationtokens.response':
                me.processConstellationTokensResponse(event.data);
                break;
            case 'seek':
                if (seekEventCallback) {
                    seekEventCallback(event.data);
                }

                break;
            case 'notify':
                if (event.data.event === OCCUPANCY_EVENT) {
                    me.processOccupancyStatus(event.data.data);
                }

                break;
            case 'updateresourcemanifest':
                var manifest = parameters.manifest || {};
                config.resourceManifest = manifest;
                updateServiceWorkerManifest();
                break;
            default:
                me.processPostMessageResponse(event.data);
                break;
        }
    };

    this.getDeviceType = function() {
        return (((config || {}).deviceIdentity || {}).appspace || {}).deviceType;
    };

    this.processApiResponse = function(response) {
        var defer = deferCache[response.requestId];
        if (defer) {
            switch (response.event) {
                case 'done':
                    defer.resolve(response.result, response);
                    break;
                case 'fail':
                    defer.reject(response.result, response);
                    break;
            }

            deferCache[response.requestId] = undefined;
        }
    };

    this.processOccupancyStatus = function(status) {
        for (var i = 0; i < occupancyStatusSubscribers.length; i++) {
            occupancyStatusSubscribers[i](status);
        }
    };

    this.processPostMessageResponse = function(eventData) {
        if (!eventData || !eventData.message) {
            return;
        }

        var eventBlock = eventData.message.toLowerCase().split('.');
        var apiName = eventBlock.slice(0, eventBlock.length - 1).join('.');
        if (supportedApiResponse.indexOf(apiName) < 0) {
            return;
        }

        var response = eventData.callback;
        var id = response.$requestId;
        var defer = deferCache[id];
        if (!defer) {
            return;
        }

        if (response.errorMessage) {
            defer.reject(response.errorMessage);
            return;
        }

        delete deferCache[id];
        defer.resolve(response.result);
    };

    function requestPostMessage(requestName, configuration) {
        var defer = $.Deferred();
        apiInitDefer.promise().then(function() {
            if (!isApiSupported(requestName)) {
                return defer.reject('Api [' + requestName + '] is not supported in the current environment.');
            }

            configuration = configuration || {};
            configuration.message = requestName;
            configuration.callback = configuration.callback || {};
            deferRunningId++;
            deferCache[deferRunningId] = defer;
            configuration.callback.$requestId = deferRunningId;
            raiseMessage(configuration);
        });

        return defer.promise();
    }

    function isApiSupported(apiName) {
        return apiName && apiSupported && apiSupported.indexOf(apiName) >= 0;
    }

    function postMessageXhr(url, settings) {
        return postMessageUrlRequest(url, settings, 'api.xhr');
    }

    function postMessageHttpRequest(url, settings) {
        var checkConfig = config || {};
        checkConfig.api = checkConfig.api || {};
        // if App doesn't support httprequest, use api.xhr
        return checkConfig.api.httprequest ? postMessageUrlRequest(url, settings, 'api.httprequest') :
            postMessageXhr(url, settings);
    }

    function sendAndCacheRequest(message, timeout, callback) {
        // Create promise for tracking the api request
        var defer = $.Deferred();
        // Increment the defer id
        deferRunningId++;
        // Add to the cache
        deferCache[deferRunningId] = defer;
        // Add to the timeout cache
        if (timeout) {
            timeoutCache[deferRunningId] = setTimeout(function() {
                defer.reject(timeout.message);
            }, timeout.duration);
        }

        message.$requestId = deferRunningId;
        message.callback = callback || {};
        message.callback.$requestId = message.$requestId;

        // Pass the request to our api
        raiseMessage(message);
        return defer.promise();
    }

    function postMessageUrlRequest(url, settings, method) {
        return sendAndCacheRequest({
            message: method,
            url: url,
            settings: settings,
        });
    }

    function requestConstellationTokens() {
        return new Promise(function(resolve, reject) {
            sendAndCacheRequest({
                message: 'api.requestconstellationtokens',
                context: me.getPlaybackContext(),
            }, {
                error: 'Request timeout reached before receiving a response',
                duration: DEFAULT_REQUEST_TIMEOUT,
            }).then(resolve, reject);
        });
    }

    function httpRequest(url, settings) {
        var promise = $.Deferred();
        var getResolveObject = function(data, status, headers) {
            var headersData = {};
            var allHeaders = (headers || '').trim().split(/\r\n|\r|\n/);
            for (var i = 0; i < allHeaders.length; i++) {
                if (!allHeaders[i]) {
                    continue;
                }

                var headerData = allHeaders[i].split(':');
                if (headerData.length !== 2) {
                    continue;
                }

                headersData[headerData[0].toLowerCase()] = headerData[1].trim();
            }

            return {
                url: url,
                data: data,
                status: status,
                headers: headersData,
            };
        };

        if (!config || !config.api || !config.api.xhr) {
            $.ajax(url, settings).then(function(data, status, xhr) {
                promise.resolve(getResolveObject(
                    data, xhr.status, xhr.getAllResponseHeaders()));
            }, function(xhr) {
                promise.reject(getResolveObject(
                    xhr.responseText, xhr.status, xhr.getAllResponseHeaders()));
            });
        } else {
            postMessageHttpRequest(url, settings).then(function(data, response) {
                promise.resolve(getResolveObject(
                    data, response.xhr.status, response.responseHeaders));
            }, function(data, response) {
                promise.reject(getResolveObject(
                    data, response.xhr.status, response.responseHeaders));
            });
        }

        return promise.promise();
    }

    this.api = {
        xhr: function(url, settings) {
            // If api is not implemented, use ajax
            if (!config || !config.api || !config.api.xhr) {
                var jqxhr = $.ajax(url, settings);
                return jqxhr;
            }

            return postMessageXhr(url, settings);
        },
        // Existing xhr method gives inconsistent result between ajax call & post messaging api.xhr call
        // This method is to standardize both results
        httpRequest: httpRequest,

        // Update a specific model input
        updateModelInput: function(input) {
            raiseMessage({message: 'api.updatemodelinput', input: input});
        },

        // Update custom data in the model
        updateModelCustomData: function(customData) {
            raiseMessage({message: 'api.updatemodelcustomdata', customData: customData});
        },

        // Update runtime configurations in the model
        updateModelRuntimeConfiguration: function(runtimeConfiguration) {
            raiseMessage({message: 'api.updateruntimeconfiguration', runtimeConfiguration: runtimeConfiguration});
        },

        // get passports
        getPassports: function(criteria) {
            return requestPostMessage(GET_PASSPORT_API, {criteria: criteria});
        },

        // Request constellation service (e.g. maps) helper
        requestConstellationService: requestConstellationService,
        // Get the service url.
        getServiceUrl: function(serviceName) {
            try {
                return authenticationLibrary.getServiceUrl(serviceName, this.getPlaybackContext());
            } catch (error) {
                // eslint-disable-next-line new-cap
                return $.Deferred().reject(error);
            }
        }.bind(this),
        // Get the cloud token.
        getCacsToken: function(serviceName) {
            try {
                return authenticationLibrary.getCacsToken(serviceName);
            } catch (error) {
                // eslint-disable-next-line new-cap
                return $.Deferred().reject(error);
            }
        },
        getConstellationTokens: function() {
            return authenticationLibrary.getConstellationTokens();
        },
        // Get the constellation base URL
        getConstellationBaseUrl: function() {
            try {
                return authenticationLibrary.getConstellationBaseUrl();
            } catch (error) {
                // eslint-disable-next-line new-cap
                return $.Deferred().reject(error);
            }
        },
        // Check if constellation tokens exist
        hasConstellationTokens: function() {
            return authenticationLibrary.hasConstellationTokens();
        },
        // Get a live screenshot
        getLiveScreenshot: function(resolution) {
            // eslint-disable-next-line new-cap
            var promise = $.Deferred();
            var readyTimeout = setTimeout(function() {
                promise.reject('Timeout on waiting for constellation tokens to be ready');
            }, CONSTELLATION_TOKENS_READY_TIMEOUT);
            constellationTokensReadyDefer.promise().then(function() {
                clearTimeout(readyTimeout);
                readyTimeout = undefined;
                var contentId = authenticationLibrary.getSubjectId();
                if (!contentId) {
                    // eslint-disable-next-line new-cap
                    return $.Deferred().reject('Content ID not found');
                }

                var relativeUrl = '/api/v3/libraries/contents/' + contentId + '/generateScreenshot';
                var requestConfig = {
                    sendFullResponse: true, // to let requestClient know that it need to resolve the full response instead of just response.data
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        name: resolution,
                    }),
                };
                requestConstellationService(relativeUrl, requestConfig).then(promise.resolve, promise.reject);
            });
            return promise.promise();
        },
        // Get the account ID
        getAccountId: function() {
            try {
                return authenticationLibrary.getAccountId();
            } catch (error) {
                // eslint-disable-next-line new-cap
                return $.Deferred().reject(error);
            }
        },
        getAuthenticationLibrary: function() {
            return authenticationLibrary;
        },
        // Post message to process cache content
        cacheContent: function(manifest) {
            if (!manifest) {
                return $.Deferred().reject('Invalid manifest.');
            }

            var resolvedPromise = $.Deferred().resolve();
            if (!isContentCacheSupported()) {
                return resolvedPromise;
            }

            raiseMessage({
                message: CACHE_CONTENT_API,
                data: {
                    manifest: manifest,
                },
            });

            return resolvedPromise;
        },
        // Resolve cache contentUrl
        resolveCacheContent: function(request) {
            // if App/Card editor/Card preview doesn't support content cache, return back the request URL
            if (!isContentCacheSupported()) {
                return $.Deferred().resolve({
                    contentUrl: request,
                    remoteUrl: request,
                });
            }

            return sendAndCacheRequest({
                message: RESOLVE_CONTENT_PATH_API,
                request: request,
            });
        },
        // Enable "Save" button in Card Editor
        enableEditorSaveButton: function(enable) {
            var playbackContext = me.getPlaybackContext();
            if (playbackContext != me.PLAYBACKCONTEXT.EDIT &&
                playbackContext != me.PLAYBACKCONTEXT.THEME) {
                // Skip if it's not in editing mode
                return;
            }

            model.customData = model.customData || {};
            model.customData.isValid = enable;
            this.updateModelCustomData(model.customData);
        },
        // Request cloud service i.e. webex service.
        requestCloudService: function(serviceName, serviceRelativeUrl, requestConfiguration) {
            try {
                return authenticationLibrary.requestCloudService(serviceName,
                    serviceRelativeUrl,
                    requestConfiguration,
                    this.getPlaybackContext());
            } catch (error) {
                return $.Deferred().reject(error);
            }
        }.bind(this),

        navigate: function(state, parameters, closeAllModals) {
            return raiseMessage({
                message: 'console.command',
                command: 'goto.state',
                data: {
                    state: state,
                    stateParams: parameters,
                    closeAllModals: closeAllModals,
                },
            });
        },
        // Setup Passport from console.
        setupPassport: function(criteria) {
            // backward compatible
            if (!isApiSupported(SETUP_PASSPORT_API)) {
                this.api.navigate('passport.home', undefined, true);
                return $.Deferred().resolve();
            }

            return requestPostMessage(SETUP_PASSPORT_API, {criteria: criteria});
        }.bind(this),
        updateTextTranslation: function(textTranslations) {
            raiseMessage({message: 'api.updatetexttranslation', textTranslations: textTranslations});
        },
        clearLanguage: function() {
            currentLanguageKey = '';
            languages = {};
            raiseMessage({message: 'api.clearlanguage'});
        },
    };

    function isContentCacheSupported() {
        return config && config.api && config.api.cachecontent;
    }

    // Gets the input model for a specific property
    function getModelProperty(propertyName) {
        if (!propertyName || !model || !model.inputs) {
            return null;
        }

        propertyName = propertyName.toLowerCase();
        for (var i = 0; i < model.inputs.length; i++) {
            var input = model.inputs[i];
            if (input.name.toLowerCase() == propertyName) {
                return input;
            }
        }

        return null;
    }

    // Gets the input model for a specific property (e.g. headline.value.html)
    function resolveModelProperty(propertyName) {
        if (!model || !model.inputs) {
            return null;
        }

        // Split the property name into segments
        var segments = propertyName.split('.');
        // Get the model property, which should be the first segment
        var property = getModelProperty(segments.shift());
        if (!property) {
            return null;
        }

        var valueObject = getObjectPath(property, segments);
        if (valueObject === undefined) {
            return '';
        }

        // Segments = prefixText, value, html
        var lastSegment = segments[segments.length - 1];
        if (lastSegment !== 'html' && lastSegment !== 'text') {
            return valueObject;
        }

        // Segments = prefixText, value, css
        var cssSegments = [].concat(segments);
        cssSegments.pop();
        cssSegments.push('css');

        var cssObject = getObjectPath(property, cssSegments);
        if (cssObject === undefined || cssObject['text-transform'] !== 'uppercase') {
            return valueObject;
        }

        return lastSegment === 'text' ? valueObject.toUpperCase() :
            '<div style="text-transform: uppercase;">' + valueObject + '</div>';
    }

    function getObjectPath(initialObject, path) {
        return path.reduce(
            function(currentObject, currentPath) {
                return (currentObject || {})[currentPath];
            }, initialObject);
    }

    function substituteModelValue(objectValue) {
        if (!objectValue) {
            return objectValue;
        }

        // Model properties are $ {model.propertyname.subprop} in the value
        var modelRegex = new RegExp('\\$' + '{model\.([^}]*)}', 'g');
        var regexResult;
        var result = {};
        // find all words that matches $ {model.xxx} pattern and save the model result
        while (regexResult = modelRegex.exec(objectValue)) {
            // if we already have a result of this match, continue to the next 1
            if (result[regexResult[0]]) {
                continue;
            }

            var prop = resolveModelProperty(regexResult[1]);
            result[regexResult[0]] = prop;
        }

        // replace the matching results to the final value
        for (var key in result) {
            if (result[key] == null) {
                continue;
            }

            objectValue = objectValue.split(key).join(result[key]);
        }

        return objectValue;
    }

    function substitutePropertyValue(objectValue) {
        if (!objectValue) {
            return objectValue;
        }

        // replace all $ {property.xxx} in the value regardless of casing
        for (var propertyName in config.properties) {
            objectValue = objectValue.replace(
                getPropertyReplacementRegex(propertyName),
                config.properties[propertyName]);
        }

        return objectValue;
    }

    function getPropertyReplacementRegex(propertyName) {
        // need to separate $ and { because of gulp
        return new RegExp('\\$' + '{property\\.' + propertyName + '}', REGEX_REPLACEMENT_FLAG);
    }

    function enumerateObjectProperties(obj, substituteCallback) {
        switch (typeof obj) {
            case 'number':
            case 'boolean':
                return obj;
            case 'string':
                return substituteCallback(obj);
            case 'object':
                // Scan through child
                for (var p in obj) {
                    obj[p] = enumerateObjectProperties(obj[p], substituteCallback);
                }

                return obj;
        }
    }

    // Provides an  updated schema
    this.onSchemaUpdate = function(newSchema) {
        if (!newSchema || !newSchema.inputs) {
            return;
        }

        schema = newSchema;
        if (!schemaUpdateCallback) {
            return;
        }

        schemaUpdateCallback(schema);
    };

    this.setCurrentLanguage = function(languageKey) {
        if (!languageKey || !languages[languageKey]) {
            return;
        }

        currentLanguageKey = languageKey;
        // Re-apply the model with new language
        if (!model || !model.inputs) {
            return;
        }

        model = applyLanguageOverrides(model);
        if (!modelUpdateCallback) {
            return;
        }

        modelUpdateCallback(model);
        return;
    };

    // Provides updated languages
    this.onLanguagesUpdate = function(newLanguages, newLanguageKey) {
        if (!newLanguages || typeof newLanguages !== 'object' || JSON.stringify(newLanguages) === JSON.stringify(languages)) {
            // check langauge difference too
            return;
        }

        languages = newLanguages;
        if (languagesUpdateCallback) {
            languagesUpdateCallback(newLanguages);
        }

        if (!newLanguageKey || newLanguageKey === currentLanguageKey) {
            return;
        }

        this.setCurrentLanguage(newLanguageKey);
    };

    // Apply language overrides to model inputs
    function applyLanguageOverrides(modelToUpdate) {
        if (!currentLanguageKey || !languages[currentLanguageKey] || !languages[currentLanguageKey].data) {
            return modelToUpdate;
        }

        var languageData = languages[currentLanguageKey].data;
        injectModelInputs(modelToUpdate, languageData);
        return modelToUpdate;
    }

    function injectInputValue(input, inputs) {
        if (!input || !input.type || (input.type !== 'text' && input.type !== 'richtext') || isNullOrUndefined(inputs[input.name])) {
            return input;
        }

        if (input.value && typeof input.value === 'string') {
            input.value = inputs[input.name];
            return input;
        }

        if (!input.value || !input.value.text) {
            return input;
        }

        input.value.text = inputs[input.name];
    }

    function injectModelInputs(model, inputs) {
        if (!model || !inputs) {
            return;
        }

        // Inject into main inputs array
        for (var i = 0; i < model.inputs.length; i++) {
            var input = model.inputs[i];
            injectInputValue(input, inputs);
        }

        // Inject into customData inputs
        if (!model.customData || !model.customData.inputs) {
            return;
        }

        for (var j = 0; j < model.customData.inputs.length; j++) {
            var customDataInput = model.customData.inputs[j];
            if (!customDataInput || !customDataInput.value) {
                continue;
            }

            injectInputValue(customDataInput, inputs);
        }
    }

    // Provides an updated model
    this.onModelUpdate = function(newModel) {
        if (!newModel || !newModel.inputs) {
            return;
        }

        model = newModel;
        if (config && config.properties) {
            // Process device properties for substituion
            enumerateObjectProperties(model, substitutePropertyValue);
        }

        // Process model properties for substituion
        enumerateObjectProperties(model, substituteModelValue);
        // scan through model for fonts to install
        installFontsFromModel().always(function() {
            if (modelUpdateCallback) {
                modelUpdateCallback(model);
            }
        });
    };

    // Updated the mode
    this.onModeChange = function(m) {
        mode = m;
        if (modeChangeCallback) {
            modeChangeCallback(m);
        }
    };

    // Execute Script
    this.onExecuteScript = function(script) {
        // Executes a script
        return eval(script);
    };

    // Injects a custom class and adds to the head
    this.onInjectCssClass = function(className, css) {
        className = className.toLowerCase();
        var found = false;
        // Iterate through the existing classes and update if already exists
        for (var k = 0; k < document.styleSheets.length; k++) {
            var sheet = document.styleSheets[k];
            var rules = sheet.cssRules || sheet.rules;
            for (var i = 0; i < rules.length; i++) {
                var rule = document.styleSheets[k].cssRules[i];
                var selector = rule.selectorText.toLowerCase();
                if (selector == className || selector == + className) {
                    rule.style.cssText = css;
                    // Found and updated
                    found = true;
                }
            }
        }

        // Check did we find the class and update?
        if (found) {
            // Exit as there is no need to add a new stle
            return;
        }

        // Create style class and inject into the head
        $('<style type=\'text/css\'> ' + className + ' {' + css + '} </style>').appendTo('head');
    };

    // Injects a custom property for the theme
    this.onInjectThemeProperty = function(propertyName, value) {
        themeProperty[propertyName] = value;
    };

    this.onInjectConstellationTokens = function(tokens) {
        setConstellationTokens(tokens);
    };

    this.onDeviceCapabilitiesUpdate = function(capabilities) {
        if (!deviceCapabilitiesCallback) {
            return;
        }

        deviceCapabilitiesCallback(capabilities);
    };

    this.processConstellationTokensResponse = function(response) {
        if (!response || !response.callback) {
            return;
        }

        response = response.callback;
        var id = response.$requestId;
        var timeout = timeoutCache[id];
        if (timeout) {
            clearTimeout(timeout);
            delete timeoutCache[id];
        }

        var defer = deferCache[id];
        if (!defer) {
            return;
        }

        if (response.errorMessage) {
            defer.reject(response.errorMessage);
            return;
        }

        defer.resolve(response.result);
        delete deferCache[id];
    };

    function installFontsFromModel() {
        var defered = $.Deferred();
        var promises = [];
        // Find all input type for font upload
        for (var i = 0; i < model.inputs.length; i++) {
            var input = model.inputs[i];
            if (input.type !== 'fontupload' || !input.value) {
                continue;
            }

            // Scan each file uploaded and load the referenced font
            for (var k = 0; k < input.value.length; k++) {
                var fontInputValue = input.value[k];
                if (!fontInputValue.originalName) {
                    continue;
                }

                var extensionDotIndex = fontInputValue.originalName.lastIndexOf('.');
                if (extensionDotIndex === -1) {
                    continue;
                }

                var family = fontInputValue.originalName.substring(0, extensionDotIndex);
                var font = {
                    family: family,
                    url: fontInputValue.path,
                };
                var loadFontPromise = loadFont(font);
                promises.push(loadFontPromise);
            }
        }

        // Wait for all fonts to load
        $.when.apply($, promises).done(function() {
            // Wait for all promises to complete
            defered.resolve();
        });

        return defered.promise();
    }

    function loadFont(font) {
        var defered = $.Deferred();
        if (isFontAvailable(font)) {
            defered.resolve();
            return defered.promise();
        }

        // Create a sheet dynamicaly to load font
        var sheet = createSheet();
        var rule = '@font-face {font-family:\'' + font.family + '\'; src:url(\'' + font.url + '\')}';
        sheet.insertRule(rule, 0);

        // Wait until font loads
        var loadTime = Date.now();
        var resolve = function(timer) {
            clearInterval(timer);
            defered.resolve();
        };

        var FONT_LOAD_MAXIMUM_TIMEOUT = 3000;
        var intervalTimer = setInterval(function() {
            if (isFontAvailable(font)) {
                // Font loaded
                resolve(intervalTimer);
                return;
            }

            // Ignore if we haven't reach the load timeout yet
            if (Date.now() - loadTime <= FONT_LOAD_MAXIMUM_TIMEOUT) {
                return;
            }

            // timeout, flag the font as processed to avoid processing it again
            cacheFontLookupResult(font);
            resolve(intervalTimer);
        }, 10);

        return defered.promise();
    }

    function cacheFontLookupResult(font) {
        fontLookupCache[getFontLookupKey(font)] = true;
    }

    function getFontLookupKey(font) {
        return font.family + '_' + font.url;
    }

    // Create a style sheet
    function createSheet() {
        var style = document.createElement('style');
        // style.setAttribute("", "")
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        return style.sheet;
    }

    // Check font exist by looking for size differences
    function isFontAvailable(font) {
        var fontName = font.family;
        if (fontLookupCache[getFontLookupKey(font)]) {
            return true;
        }

        var sampleText = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        // Set default font to monospace so we can determine base size
        context.font = '72px monospace';
        var baseSize = context.measureText(sampleText).width;
        // Now check for our font, and fallback to monospace if it doesnt exist
        context.font = '72px \'' + fontName + '\', monospace';
        var fontSize = context.measureText(sampleText).width;
        // If they are the same then the font doesnt exist
        if (fontSize != baseSize) {
            cacheFontLookupResult(font);
            return true;
        }

        return false;
    }

    /** *************** Raise Notifications *****************/
    this.postMessage = raiseMessage;
    function raiseMessage(message) {
        if (appOrigin && appWindow) {
            appWindow.postMessage(message, appOrigin);
        } else if (msMessaging) {
            msMessaging.push(message);
        } else if (window && window.opener && window.opener.postMessage) {
            window.opener.postMessage(message, '*');
        } else if (window && window.parent && window.parent.postMessage) {
            window.parent.postMessage(message, '*');
        }
    }

    // Let the host know that your card has loaded
    this.notifyOnLoad = function(p) {
        // Have we already sent this notification
        if (hasNotifiedLoaded) {
            return;
        }

        hasNotifiedLoaded = true;
        raiseMessage({message: 'loaded', cardId: cardId});
    };

    this.notifyPendingNativeLoad = function(p) {
        if (hasNotifiedLoaded) {
            return;
        }

        hasNotifiedLoaded = true;
        raiseMessage({message: 'pendingnativeload', cardId: cardId});
    };

    // Let the host know your card has completed playbacl
    this.notifyOnComplete = function(p) {
        // Have we already sent this notification
        if (hasNotifiedComplete) {
            return;
        }

        hasNotifiedComplete = true;
        raiseMessage({message: 'complete', cardId: cardId});
    };

    // Let the host know your card has had an error during load or playback
    this.notifyOnError = function(p) {
        // Have we already sent this notification
        if (hasNotifiedError) {
            return;
        }

        hasNotifiedError = true;
        raiseMessage({message: 'error', cardId: cardId});
    };

    /** *************** Subscribe to Events *****************/

    // Subscribe to schema changes
    this.subscribeSchemaUpdate = function(callback) {
        schemaUpdateCallback = callback;
    };

    // Subscribes to model changes
    this.subscribeModelUpdate = function(callback) {
        modelUpdateCallback = callback;
    };

    this.subscribeLanguagesUpdate = function(callback) {
        languagesUpdateCallback = callback;
    };

    // Subscribes to mode changes
    this.subscribeModeChange = function(callback) {
        modeChangeCallback = callback;
    };

    // Subscribes to messages
    this.subscribeToMessages = function(callback) {
        messagesCallback = callback;
    };

    // Subscribes to post messages
    this.subscribeToPostMessages = function(callback) {
        postMessageCallback = callback;
    };

    this.subscribeToSeekEvent = function(callback) {
        seekEventCallback = callback;
    };

    this.subscribeToDeviceCapabilities = function(callback) {
        deviceCapabilitiesCallback = callback;
    };

    this.subscribeToOccupancySensorStatus = function(callback) {
        if (!callback || occupancyStatusSubscribers.indexOf(callback) >= 0) {
            return;
        }

        occupancyStatusSubscribers.push(callback);
        if (occupancyStatusSubscribers.length !== 1) {
            return;
        }

        raiseMessage({
            message: SUBSCRIBE_MESSAGE,
            event: OCCUPANCY_EVENT,
        });
    };

    this.unsubscribeFromOccupancySensorStatus = function(callback) {
        if (!callback) {
            return;
        }

        var subscriberIndex = occupancyStatusSubscribers.indexOf(callback);
        if (subscriberIndex === -1) {
            return;
        }

        occupancyStatusSubscribers.splice(subscriberIndex, 1);
        if (occupancyStatusSubscribers.length !== 0) {
            return;
        }

        raiseMessage({
            message: UNSUBSCRIBE_MESSAGE,
            event: OCCUPANCY_EVENT,
        });
    };

    // Returns the card schema
    this.getSchema = function() {
        return schema;
    };

    // Returns the card model
    this.getModel = function() {
        return model;
    };

    // Returns the template config
    this.getConfig = function() {
        return config;
    };

    // Returns the display mode of the card
    this.getMode = function() {
        return mode;
    };

    // Returns a theme property
    this.getThemeProperty = function(propertyName) {
        return themeProperty[propertyName];
    };

    // Returns true or false depending on whether the card is currently being edited
    this.isEditing = function() {
        if (getLocationParameterByName('editing') == 'true' || getLocationParameterByName('context') == 'theme') {
            return true;
        } else {
            return false;
        }
    };

    // Returns true or false depending on whether the card is in preview mode
    this.isPreview = function() {
        return getLocationParameterByName('isPreview') == 'true';
    };

    // Returns true if the card is in screenshot or theme screenshot mode
    this.isScreenshot = function() {
        return this.getPlaybackContext() ===
            (this.PLAYBACKCONTEXT.SCREENSHOT || this.PLAYBACKCONTEXT.THEMESCREENSHOT);
    };

    this.getPlaybackContext = function() {
        // From appspace 7.1, the context is injected in the query param
        var context = getLocationParameterByName('context').toLowerCase();
        if (this.PLAYBACK_CONTEXT_MAPPING[context]) {
            return this.PLAYBACK_CONTEXT_MAPPING[context];
        }

        if (this.isEditing() && getLocationParameterByName('action') === 'screenshot') {
            return this.PLAYBACKCONTEXT.THEMESCREENSHOT;
        }

        if (this.isEditing()) {
            return this.PLAYBACKCONTEXT.EDIT;
        }

        if (getLocationParameterByName('action') === 'screenshot') {
            return this.PLAYBACKCONTEXT.SCREENSHOT;
        }

        if (getLocationParameterByName('playback') === 'device') {
            return this.PLAYBACKCONTEXT.DEVICE;
        }

        return this.PLAYBACKCONTEXT.NONE;
    };

    function updateServiceWorkerManifest() {
        config.resourceManifest = config.resourceManifest || {};
        // Threshold for max cacheable content size
        config.resourceManifest.maxFileSize = MAX_CACHEABLE_FILE_SIZE;
        console.log('Updating Service Worker manifest');
        sendServiceWorkerMessage({
            command: CACHE_COMMAND.SET_MANIFEST,
            manifest: config.resourceManifest,
        });
    }

    function sendServiceWorkerMessage(message) {
        if (!isServiceWorkerRegistered || !serviceWorkerMessagingChannel || !serviceWorkerMessagingChannel.port1 || !message) {
            return;
        }

        serviceWorkerMessagingChannel.port1.postMessage(message);
    }

    function initializeServiceWorkerMessageChannel() {
        var isHeartbeatDetected = false;
        var checkHeartbeatTimeout;
        var controller = getServiceWorkerController();

        var assignPortMessage = {
            command: CACHE_COMMAND.ASSIGN_MESSAGE_PORT,
        };
        var keepAliveMessage = {
            command: CACHE_COMMAND.KEEP_ALIVE,
        };

        if (!controller.postMessage) {
            return;
        }

        var checkMessageChannelHeartbeat = function() {
            if (checkHeartbeatTimeout) {
                clearTimeout(checkHeartbeatTimeout);
                checkHeartbeatTimeout = undefined;
            }

            checkHeartbeatTimeout = setTimeout(function() {
                isHeartbeatDetected = false;
                serviceWorkerMessagingChannel.port1.postMessage(keepAliveMessage);

                setTimeout(function() {
                    if (isHeartbeatDetected) {
                        return;
                    }

                    initializeServiceWorkerMessageChannel();
                }, ACK_HEARTBEAT_TIMEOUT_DURATION);
            }, CHECK_HEARTBEAT_TIMEOUT_DURATION);
        };

        serviceWorkerMessagingChannel = new window.MessageChannel();
        serviceWorkerMessagingChannel.port1.onmessage = function(event) {
            var data = (event || {}).data || {};

            if (!data.command) {
                return;
            }

            switch (data.command) {
                case CACHE_COMMAND.ACK_ALIVE:
                    isHeartbeatDetected = true;
                    break;
            }

            checkMessageChannelHeartbeat();
        };

        controller.postMessage(assignPortMessage, [serviceWorkerMessagingChannel.port2]);
        checkMessageChannelHeartbeat();
    }

    function getServiceWorkerController() {
        var serviceWorker = navigator.serviceWorker || {};
        return serviceWorker.controller || {};
    }

    this.registerServiceWorker = function() {
        if (!('serviceWorker' in navigator) ||
            !config.deviceCapabilities ||
            !config.deviceCapabilities.supportServiceWorkerCaching ||
            this.getPlaybackContext() !== this.PLAYBACKCONTEXT.DEVICE) {
            return;
        }

        navigator.serviceWorker
            .register(SERVICE_WORKER_FILE, {scope: './'})
            .then(function() {
                console.log('Service Worker Registered');
                isServiceWorkerRegistered = true;
                initializeServiceWorkerMessageChannel();
                updateServiceWorkerManifest();
            });
    };

    this.unregisterServiceWorker = function() {
        isServiceWorkerRegistered = false;
        if (!('serviceWorker' in navigator)) {
            return;
        }

        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            if (registrations.length === 0) {
                return;
            }

            for (var i = 0; i < registrations.length; i++) {
                var registration = registrations[i] || {};
                if (!registration.active ||
                    !registration.active.scriptURL ||
                    !registration.active.scriptURL.indexOf(SERVICE_WORKER_FILE) >= 0
                ) {
                    continue;
                }

                console.log('Service worker is unregistered with scope: ' + registration.active.scriptURL);
                registration.unregister();
                break;
            }
        }, function(error) {
            console.log('Service worker failed to get registrations: ' + JSON.stringify(error));
        });
    };

    // Gets the input model for a specific property
    this.getModelProperty = getModelProperty;

    function isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
}

// Creates a global instance of the CardAPI
var $cardApi = new CardApi();
$cardApi.cacheUrlParameters();

// global function for ms-webview post messaging
function globalMsPostMessaging(message) {
    // '{"message":"abcd"}'
    var messageObject = JSON.parse(message);
    var event = {
        data: messageObject,
    };
    $cardApi.onParentMessage(event);
}

var msMessaging;
// global function for ms-webview retrieve messaging
function globalMsRetrieveMessaging() {
    var message = '[]';
    if (msMessaging) {
        message = JSON.stringify(msMessaging);
        msMessaging = [];
    }

    return message;
}

// export to global
window.msPostMessaging = globalMsPostMessaging;
window.msRetrieveMessaging = globalMsRetrieveMessaging;
