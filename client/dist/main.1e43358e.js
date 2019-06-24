// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.10';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/sweetalert2/dist/sweetalert2.all.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
* sweetalert2 v8.13.0
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Sweetalert2 = factory();
})(this, function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Returns the array ob object values (Object.values isn't supported in IE11)
   * @param obj
   */


  var objectValues = function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
  /**
   * Convert NodeList to Array
   * @param nodeList
   */


  var toArray = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  /**
   * Standardise console warnings
   * @param message
   */


  var warn = function warn(message) {
    console.warn("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Standardise console errors
   * @param message
   */


  var error = function error(message) {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */


  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   */


  var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */


  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };

  var isPromise = function isPromise(arg) {
    return arg && Promise.resolve(arg) === arg;
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var argsToParams = function argsToParams(args) {
    var params = {};

    switch (_typeof(args[0])) {
      case 'object':
        _extends(params, args[0]);

        break;

      default:
        ['title', 'html', 'type'].forEach(function (name, index) {
          switch (_typeof(args[index])) {
            case 'string':
              params[name] = args[index];
              break;

            case 'undefined':
              break;

            default:
              error("Unexpected type of ".concat(name, "! Expected \"string\", got ").concat(_typeof(args[index])));
          }
        });
    }

    return params;
  };

  var swalPrefix = 'swal2-';

  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };

  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'toast-column', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);
  var states = {
    previousBodyPadding: null
  };

  var hasClass = function hasClass(elem, className) {
    return elem.classList.contains(className);
  };

  var applyCustomClass = function applyCustomClass(elem, customClass, className) {
    // Clean up previous custom classes
    toArray(elem.classList).forEach(function (className) {
      if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1)) {
        elem.classList.remove(className);
      }
    });

    if (customClass && customClass[className]) {
      addClass(elem, customClass[className]);
    }
  };

  function getInput(content, inputType) {
    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(content, swalClasses[inputType]);

      case 'checkbox':
        return content.querySelector(".".concat(swalClasses.checkbox, " input"));

      case 'radio':
        return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return content.querySelector(".".concat(swalClasses.range, " input"));

      default:
        return getChildByClass(content, swalClasses.input);
    }
  }

  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  var toggleClass = function toggleClass(target, classList, condition) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };

  var addClass = function addClass(target, classList) {
    toggleClass(target, classList, true);
  };

  var removeClass = function removeClass(target, classList) {
    toggleClass(target, classList, false);
  };

  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };

  var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? value + 'px' : value;
    } else {
      elem.style.removeProperty(property);
    }
  };

  var show = function show(elem) {
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.opacity = '';
    elem.style.display = display;
  };

  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };

  var toggle = function toggle(elem, condition, display) {
    condition ? show(elem, display) : hide(elem);
  }; // borrowed from jquery $(elem).is(':visible') implementation


  var isVisible = function isVisible(elem) {
    return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  };

  var isScrollable = function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }; // borrowed from https://stackoverflow.com/a/46352119


  var hasCssAnimation = function hasCssAnimation(elem) {
    var style = window.getComputedStyle(elem);
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };

  var contains = function contains(haystack, needle) {
    if (typeof haystack.contains === 'function') {
      return haystack.contains(needle);
    }
  };

  var getContainer = function getContainer() {
    return document.body.querySelector('.' + swalClasses.container);
  };

  var elementBySelector = function elementBySelector(selectorString) {
    var container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  var elementByClass = function elementByClass(className) {
    return elementBySelector('.' + className);
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };

  var getIcons = function getIcons() {
    var popup = getPopup();
    return toArray(popup.querySelectorAll('.' + swalClasses.icon));
  };

  var getIcon = function getIcon() {
    var visibleIcon = getIcons().filter(function (icon) {
      return isVisible(icon);
    });
    return visibleIcon.length ? visibleIcon[0] : null;
  };

  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };

  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };

  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };

  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses['progress-steps']);
  };

  var getValidationMessage = function getValidationMessage() {
    return elementByClass(swalClasses['validation-message']);
  };

  var getConfirmButton = function getConfirmButton() {
    return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.confirm);
  };

  var getCancelButton = function getCancelButton() {
    return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.cancel);
  };

  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };

  var getHeader = function getHeader() {
    return elementByClass(swalClasses.header);
  };

  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };

  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  };

  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    }); // https://github.com/jkup/focusable/blob/master/index.js

    var otherFocusableElements = toArray(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function (el) {
      return el.getAttribute('tabindex') !== '-1';
    });
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
      return isVisible(el);
    });
  };

  var isModal = function isModal() {
    return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
  };

  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };

  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  }; // Detect Node env


  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\">\n       <span class=\"swal2-x-mark\"><span class=\"swal2-x-mark-line-left\"></span><span class=\"swal2-x-mark-line-right\"></span></span>\n     </div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\">\n       <div class=\"swal2-success-circular-line-left\"></div>\n       <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n       <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n       <div class=\"swal2-success-circular-line-right\"></div>\n     </div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\">&times;</button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\">OK</button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\">Cancel</button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\">\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

  var resetOldContainer = function resetOldContainer() {
    var oldContainer = getContainer();

    if (!oldContainer) {
      return;
    }

    oldContainer.parentNode.removeChild(oldContainer);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
  };

  var oldInputVal; // IE11 workaround, see #1109 for details

  var resetValidationMessage = function resetValidationMessage(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationMessage();
    }

    oldInputVal = e.target.value;
  };

  var addInputChangeListeners = function addInputChangeListeners() {
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector(".".concat(swalClasses.range, " input"));
    var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
    var textarea = getChildByClass(content, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = function (e) {
      resetValidationMessage(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationMessage(e);
      range.nextSibling.value = range.value;
    };
  };

  var getTarget = function getTarget(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  };

  var setupAccessibility = function setupAccessibility(params) {
    var popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  var setupRTL = function setupRTL(targetElement) {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /*
   * Add modal + backdrop to DOM
   */


  var init = function init(params) {
    // Clean up the old popup container if it exists
    resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;
    container.innerHTML = sweetHTML;
    var targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param); // JQuery element(s)
    } else if (_typeof(param) === 'object') {
      handleJqueryElem(target, param); // Plain string
    } else if (param) {
      target.innerHTML = param;
    }
  };

  var handleJqueryElem = function handleJqueryElem(target, elem) {
    target.innerHTML = '';

    if (0 in elem) {
      for (var i = 0; i in elem; i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  var animationEndEvent = function () {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'animation': 'animationend'
    };

    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }(); // Measure width of scrollbar
  // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286


  var measureScrollbar = function measureScrollbar() {
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch) {
      return 0;
    }

    var scrollDiv = document.createElement('div');
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  function handleButtonsStyling(confirmButton, cancelButton, params) {
    addClass([confirmButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    } // Loading state


    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  }

  function renderButton(button, buttonType, params) {
    toggle(button, params['showC' + buttonType.substring(1) + 'Button'], 'inline-block');
    button.innerHTML = params[buttonType + 'ButtonText']; // Set caption text

    button.setAttribute('aria-label', params[buttonType + 'ButtonAriaLabel']); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params.customClass, buttonType + 'Button');
    addClass(button, params[buttonType + 'ButtonClass']);
  }

  var renderActions = function renderActions(instance, params) {
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    } // Custom class


    applyCustomClass(actions, params.customClass, 'actions'); // Render confirm button

    renderButton(confirmButton, 'confirm', params); // render Cancel Button

    renderButton(cancelButton, 'cancel', params);

    if (params.buttonsStyling) {
      handleButtonsStyling(confirmButton, cancelButton, params);
    } else {
      removeClass([confirmButton, cancelButton], swalClasses.styled);
      confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
      cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
    }
  };

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      var growClass = 'grow-' + grow;

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  var renderContainer = function renderContainer(instance, params) {
    var container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);

    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params.customClass, 'container');

    if (params.customContainerClass) {
      // @deprecated
      addClass(container, params.customContainerClass);
    }
  };
  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */


  var privateProps = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };
  var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

  var renderInput = function renderInput(instance, params) {
    var content = getContent();
    var innerParams = privateProps.innerParams.get(instance);
    var rerender = !innerParams || params.input !== innerParams.input;
    inputTypes.forEach(function (inputType) {
      var inputClass = swalClasses[inputType];
      var inputContainer = getChildByClass(content, inputClass); // set attributes

      setAttributes(inputType, params.inputAttributes); // set class

      setClass(inputContainer, inputClass, params);

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input && rerender) {
      showInput(params);
    }
  };

  var showInput = function showInput(params) {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    var input = renderInputType[params.input](params);
    show(input);
  };

  var removeAttributes = function removeAttributes(input) {
    for (var i = 0; i < input.attributes.length; i++) {
      var attrName = input.attributes[i].name;

      if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
        input.removeAttribute(attrName);
      }
    }
  };

  var setAttributes = function setAttributes(inputType, inputAttributes) {
    var input = getInput(getContent(), inputType);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (var attr in inputAttributes) {
      // Do not set a placeholder for <input type="range">
      // it'll crash Edge, #1298
      if (inputType === 'range' && attr === 'placeholder') {
        continue;
      }

      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  var setClass = function setClass(inputContainer, inputClass, params) {
    inputContainer.className = inputClass;

    if (params.inputClass) {
      addClass(inputContainer, params.inputClass);
    }

    if (params.customClass) {
      addClass(inputContainer, params.customClass.input);
    }
  };

  var setInputPlaceholder = function setInputPlaceholder(input, params) {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  var renderInputType = {};

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (params) {
    var input = getChildByClass(getContent(), swalClasses.input);

    if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
      input.value = params.inputValue;
    } else if (!isPromise(params.inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
    }

    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.file = function (params) {
    var input = getChildByClass(getContent(), swalClasses.file);
    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.range = function (params) {
    var range = getChildByClass(getContent(), swalClasses.range);
    var rangeInput = range.querySelector('input');
    var rangeOutput = range.querySelector('output');
    rangeInput.value = params.inputValue;
    rangeInput.type = params.input;
    rangeOutput.value = params.inputValue;
    return range;
  };

  renderInputType.select = function (params) {
    var select = getChildByClass(getContent(), swalClasses.select);
    select.innerHTML = '';

    if (params.inputPlaceholder) {
      var placeholder = document.createElement('option');
      placeholder.innerHTML = params.inputPlaceholder;
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    return select;
  };

  renderInputType.radio = function () {
    var radio = getChildByClass(getContent(), swalClasses.radio);
    radio.innerHTML = '';
    return radio;
  };

  renderInputType.checkbox = function (params) {
    var checkbox = getChildByClass(getContent(), swalClasses.checkbox);
    var checkboxInput = getInput(getContent(), 'checkbox');
    checkboxInput.type = 'checkbox';
    checkboxInput.value = 1;
    checkboxInput.id = swalClasses.checkbox;
    checkboxInput.checked = Boolean(params.inputValue);
    var label = checkbox.querySelector('span');
    label.innerHTML = params.inputPlaceholder;
    return checkbox;
  };

  renderInputType.textarea = function (params) {
    var textarea = getChildByClass(getContent(), swalClasses.textarea);
    textarea.value = params.inputValue;
    setInputPlaceholder(textarea, params);
    return textarea;
  };

  var renderContent = function renderContent(instance, params) {
    var content = getContent().querySelector('#' + swalClasses.content); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, content);
      show(content, 'block'); // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content, 'block'); // No content
    } else {
      hide(content);
    }

    renderInput(instance, params); // Custom class

    applyCustomClass(getContent(), params.customClass, 'content');
  };

  var renderFooter = function renderFooter(instance, params) {
    var footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params.customClass, 'footer');
  };

  var renderCloseButton = function renderCloseButton(instance, params) {
    var closeButton = getCloseButton(); // Custom class

    applyCustomClass(closeButton, params.customClass, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  var renderIcon = function renderIcon(instance, params) {
    var innerParams = privateProps.innerParams.get(instance); // if the icon with the given type already rendered,
    // apply the custom class without re-rendering the icon

    if (innerParams && params.type === innerParams.type && getIcon()) {
      applyCustomClass(getIcon(), params.customClass, 'icon');
      return;
    }

    hideAllIcons();

    if (!params.type) {
      return;
    }

    adjustSuccessIconBackgoundColor();

    if (Object.keys(iconTypes).indexOf(params.type) !== -1) {
      var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.type]));
      show(icon); // Custom class

      applyCustomClass(icon, params.customClass, 'icon'); // Animate icon

      toggleClass(icon, "swal2-animate-".concat(params.type, "-icon"), params.animation);
    } else {
      error("Unknown type! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.type, "\""));
    }
  };

  var hideAllIcons = function hideAllIcons() {
    var icons = getIcons();

    for (var i = 0; i < icons.length; i++) {
      hide(icons[i]);
    }
  }; // Adjust success icon background color to match the popup background color


  var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
    var popup = getPopup();
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  var renderImage = function renderImage(instance, params) {
    var image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params.customClass, 'image');

    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  };

  var createStepElement = function createStepElement(step) {
    var stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    stepEl.innerHTML = step;
    return stepEl;
  };

  var createLineElement = function createLineElement(params) {
    var lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      lineEl.style.width = params.progressStepsDistance;
    }

    return lineEl;
  };

  var renderProgressSteps = function renderProgressSteps(instance, params) {
    var progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.innerHTML = '';
    var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep);

    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach(function (step, index) {
      var stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        var lineEl = createLineElement(step);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  var renderTitle = function renderTitle(instance, params) {
    var title = getTitle();
    toggle(title, params.title || params.titleText);

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params.customClass, 'title');
  };

  var renderHeader = function renderHeader(instance, params) {
    var header = getHeader(); // Custom class

    applyCustomClass(header, params.customClass, 'header'); // Progress steps

    renderProgressSteps(instance, params); // Icon

    renderIcon(instance, params); // Image

    renderImage(instance, params); // Title

    renderTitle(instance, params); // Close button

    renderCloseButton(instance, params);
  };

  var renderPopup = function renderPopup(instance, params) {
    var popup = getPopup(); // Width

    applyNumericalStyle(popup, 'width', params.width); // Padding

    applyNumericalStyle(popup, 'padding', params.padding); // Background

    if (params.background) {
      popup.style.background = params.background;
    } // Default Class


    popup.className = swalClasses.popup;

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params.customClass, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // CSS animation


    toggleClass(popup, swalClasses.noanimation, !params.animation);
  };

  var render = function render(instance, params) {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderHeader(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);
  };
  /*
   * Global function to determine if SweetAlert2 popup is shown
   */


  var isVisible$1 = function isVisible$$1() {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */


  var clickConfirm = function clickConfirm() {
    return getConfirmButton() && getConfirmButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */


  var clickCancel = function clickCancel() {
    return getCancelButton() && getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Swal, args);
  }
  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */


  function mixin(mixinParams) {
    var MixinSwal =
    /*#__PURE__*/
    function (_this) {
      _inherits(MixinSwal, _this);

      function MixinSwal() {
        _classCallCheck(this, MixinSwal);

        return _possibleConstructorReturn(this, _getPrototypeOf(MixinSwal).apply(this, arguments));
      }

      _createClass(MixinSwal, [{
        key: "_main",
        value: function _main(params) {
          return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
        }
      }]);

      return MixinSwal;
    }(this);

    return MixinSwal;
  } // private global state for the queue feature


  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    var Swal = this;
    currentSteps = steps;

    var resetAndResolve = function resetAndResolve(resolve, value) {
      currentSteps = [];
      document.body.removeAttribute('data-swal2-queue-step');
      resolve(value);
    };

    var queueResult = [];
    return new Promise(function (resolve) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          Swal.fire(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetAndResolve(resolve, {
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetAndResolve(resolve, {
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */


  var getQueueStep = function getQueueStep() {
    return document.body.getAttribute('data-swal2-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */


  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */


  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };
  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */


  var showLoading = function showLoading() {
    var popup = getPopup();

    if (!popup) {
      Swal.fire('');
    }

    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();
    show(actions);
    show(confirmButton);
    addClass([popup, actions], swalClasses.loading);
    confirmButton.disabled = true;
    cancelButton.disabled = true;
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  var RESTORE_FOCUS_TIMEOUT = 100;
  var globalState = {};

  var focusPreviousActiveElement = function focusPreviousActiveElement() {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  }; // Restore previous active (focused) element


  var restoreActiveElement = function restoreActiveElement() {
    return new Promise(function (resolve) {
      var x = window.scrollX;
      var y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(function () {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // IE doesn't have scrollX/scrollY support
        window.scrollTo(x, y);
      }
    });
  };
  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */


  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */


  var stopTimer = function stopTimer() {
    return globalState.timeout && globalState.timeout.stop();
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */


  var resumeTimer = function resumeTimer() {
    return globalState.timeout && globalState.timeout.start();
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */


  var toggleTimer = function toggleTimer() {
    var timer = globalState.timeout;
    return timer && (timer.running ? timer.stop() : timer.start());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */


  var increaseTimer = function increaseTimer(n) {
    return globalState.timeout && globalState.timeout.increase(n);
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */


  var isTimerRunning = function isTimerRunning() {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: null,
    toast: false,
    customClass: '',
    customContainerClass: '',
    target: 'body',
    backdrop: true,
    animation: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: null,
    confirmButtonClass: '',
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: null,
    cancelButtonClass: '',
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusCancel: false,
    showCloseButton: false,
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: '',
    imageClass: '',
    timer: null,
    width: null,
    padding: null,
    background: null,
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: '',
    inputAttributes: {},
    inputValidator: null,
    validationMessage: null,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: null,
    onBeforeOpen: null,
    onAfterClose: null,
    onOpen: null,
    onClose: null,
    scrollbarPadding: true
  };
  var updatableParams = ['title', 'titleText', 'text', 'html', 'type', 'customClass', 'showConfirmButton', 'showCancelButton', 'confirmButtonText', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonClass', 'buttonsStyling', 'reverseButtons', 'imageUrl', 'imageWidth', 'imageHeigth', 'imageAlt', 'imageClass', 'progressSteps', 'currentProgressStep'];
  var deprecatedParams = {
    customContainerClass: 'customClass',
    confirmButtonClass: 'customClass',
    cancelButtonClass: 'customClass',
    imageClass: 'customClass',
    inputClass: 'customClass'
  };
  var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return defaultParams.hasOwnProperty(paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   * @param {String} paramName
   */


  var isUpdatableParameter = function isUpdatableParameter(paramName) {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */


  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams[paramName];
  };

  var checkIfParamIsValid = function checkIfParamIsValid(param) {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
    if (toastIncompatibleParams.indexOf(param) !== -1) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
    if (isDeprecatedParameter(param)) {
      warnAboutDepreation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated();
    }
  };

  var staticMethods = Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getImage: getImage,
    getIcon: getIcon,
    getIcons: getIcons,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getCancelButton: getCancelButton,
    getHeader: getHeader,
    getFooter: getFooter,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning
  });
  /**
   * Enables buttons and hide loader.
   */

  function hideLoading() {
    var innerParams = privateProps.innerParams.get(this);
    var domCache = privateProps.domCache.get(this);

    if (!innerParams.showConfirmButton) {
      hide(domCache.confirmButton);

      if (!innerParams.showCancelButton) {
        hide(domCache.actions);
      }
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function getInput$1(instance) {
    var innerParams = privateProps.innerParams.get(instance || this);
    var domCache = privateProps.domCache.get(instance || this);
    return getInput(domCache.content, innerParams.input);
  }

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
    }
  };

  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = states.previousBodyPadding + 'px';
      states.previousBodyPadding = null;
    }
  };
  /* istanbul ignore next */


  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = offset * -1 + 'px';
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
    }
  };

  var lockBodyScroll = function lockBodyScroll() {
    // #1246
    var container = getContainer();
    var preventTouchMove;

    container.ontouchstart = function (e) {
      preventTouchMove = e.target === container || !isScrollable(container) && e.target.tagName !== 'INPUT' // #1603
      ;
    };

    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };
  /* istanbul ignore next */


  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  var isIE11 = function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }; // Fix IE11 centering sweetalert2/issues/933

  /* istanbul ignore next */


  var fixVerticalPositionIE = function fixVerticalPositionIE() {
    var container = getContainer();
    var popup = getPopup();
    container.style.removeProperty('align-items');

    if (popup.offsetTop < 0) {
      container.style.alignItems = 'flex-start';
    }
  };
  /* istanbul ignore next */


  var IEfix = function IEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      fixVerticalPositionIE();
      window.addEventListener('resize', fixVerticalPositionIE);
    }
  };
  /* istanbul ignore next */


  var undoIEfix = function undoIEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      window.removeEventListener('resize', fixVerticalPositionIE);
    }
  }; // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.


  var setAriaHidden = function setAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el === getContainer() || contains(el, getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };

  var unsetAriaHidden = function unsetAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };
  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */


  var privateMethods = {
    swalPromiseResolve: new WeakMap()
  };
  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(container, isToast, onAfterClose) {
    if (isToast) {
      triggerOnAfterClose(onAfterClose);
    } else {
      restoreActiveElement().then(function () {
        return triggerOnAfterClose(onAfterClose);
      });
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    } // Unset globalState props so GC will dispose globalState (#1569)


    delete globalState.keydownHandler;
    delete globalState.keydownTarget;

    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }

    removeBodyClasses();

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      undoIEfix();
      unsetAriaHidden();
    }
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
  }

  function swalCloseEventFinished(popup, container, isToast, onAfterClose) {
    if (hasClass(popup, swalClasses.hide)) {
      removePopupAndResetState(container, isToast, onAfterClose);
    } // Unset WeakMaps so GC will be able to dispose them (#1569)


    unsetWeakMaps(privateProps);
    unsetWeakMaps(privateMethods);
  }

  function close(resolveValue) {
    var container = getContainer();
    var popup = getPopup();

    if (!popup || hasClass(popup, swalClasses.hide)) {
      return;
    }

    var innerParams = privateProps.innerParams.get(this);
    var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    var onClose = innerParams.onClose;
    var onAfterClose = innerParams.onAfterClose;
    removeClass(popup, swalClasses.show);
    addClass(popup, swalClasses.hide); // If animation is supported, animate

    if (animationEndEvent && hasCssAnimation(popup)) {
      popup.addEventListener(animationEndEvent, function (e) {
        if (e.target === popup) {
          swalCloseEventFinished(popup, container, isToast(), onAfterClose);
        }
      });
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(container, isToast(), onAfterClose);
    }

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    } // Resolve Swal promise


    swalPromiseResolve(resolveValue || {}); // Unset this.params so GC will dispose it (#1569)

    delete this.params;
  }

  var unsetWeakMaps = function unsetWeakMaps(obj) {
    for (var i in obj) {
      obj[i] = new WeakMap();
    }
  };

  var triggerOnAfterClose = function triggerOnAfterClose(onAfterClose) {
    if (onAfterClose !== null && typeof onAfterClose === 'function') {
      setTimeout(function () {
        onAfterClose();
      });
    }
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    var domCache = privateProps.domCache.get(instance);
    buttons.forEach(function (button) {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], false);
  }

  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], true);
  } // @deprecated


  function enableConfirmButton() {
    warnAboutDepreation('Swal.disableConfirmButton()', "Swal.getConfirmButton().removeAttribute('disabled')");
    setButtonsDisabled(this, ['confirmButton'], false);
  } // @deprecated


  function disableConfirmButton() {
    warnAboutDepreation('Swal.enableConfirmButton()', "Swal.getConfirmButton().setAttribute('disabled', '')");
    setButtonsDisabled(this, ['confirmButton'], true);
  }

  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }

  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    var domCache = privateProps.domCache.get(this);
    domCache.validationMessage.innerHTML = error;
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
    domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
    show(domCache.validationMessage);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message


  function resetValidationMessage$1() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    warnAboutDepreation('Swal.getProgressSteps()', "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps");
    var innerParams = privateProps.innerParams.get(this);
    return innerParams.progressSteps;
  }

  function setProgressSteps(progressSteps) {
    warnAboutDepreation('Swal.setProgressSteps()', 'Swal.update()');
    var innerParams = privateProps.innerParams.get(this);

    var updatedParams = _extends({}, innerParams, {
      progressSteps: progressSteps
    });

    renderProgressSteps(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
  }

  function showProgressSteps() {
    var domCache = privateProps.domCache.get(this);
    show(domCache.progressSteps);
  }

  function hideProgressSteps() {
    var domCache = privateProps.domCache.get(this);
    hide(domCache.progressSteps);
  }

  var Timer =
  /*#__PURE__*/
  function () {
    function Timer(callback, delay) {
      _classCallCheck(this, Timer);

      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    _createClass(Timer, [{
      key: "start",
      value: function start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }

        return this.remaining;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date() - this.started;
        }

        return this.remaining;
      }
    }, {
      key: "increase",
      value: function increase(n) {
        var running = this.running;

        if (running) {
          this.stop();
        }

        this.remaining += n;

        if (running) {
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "getTimerLeft",
      value: function getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.running;
      }
    }]);

    return Timer;
  }();

  var defaultInputValidators = {
    email: function email(string, validationMessage) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage ? validationMessage : 'Invalid email address');
    },
    url: function url(string, validationMessage) {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage ? validationMessage : 'Invalid URL');
    }
  };
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */

  function setParameters(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    } // showLoaderOnConfirm && preConfirm


    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    } // params.animation will be actually used in renderPopup.js
    // but in case when params.animation is a function, we need to call that function
    // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
    // inside the params.animation function


    params.animation = callIfFunction(params.animation); // Determine if the custom target element is valid

    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    } // Replace newlines with <br> in title


    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    var oldPopup = getPopup();
    var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;

    if (!oldPopup || // If the model target has changed, refresh the popup
    oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
      init(params);
    }
  }

  function swalOpenAnimationFinished(popup, container) {
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  }
  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */


  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (params.onBeforeOpen !== null && typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    if (params.animation) {
      addClass(popup, swalClasses.show);
      addClass(container, swalClasses.fade);
    }

    show(popup); // scrolling is 'hidden' until animation is done, after that 'auto'

    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished.bind(null, popup, container));
    } else {
      container.style.overflowY = 'auto';
    }

    addClass([document.documentElement, document.body, container], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }

    if (isModal()) {
      if (params.scrollbarPadding) {
        fixScrollbar();
      }

      iOSfix();
      IEfix();
      setAriaHidden(); // sweetalert2/issues/1247

      setTimeout(function () {
        container.scrollTop = 0;
      });
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (params.onOpen !== null && typeof params.onOpen === 'function') {
      setTimeout(function () {
        params.onOpen(popup);
      });
    }
  };

  var _this = undefined;

  var handleInputOptions = function handleInputOptions(instance, params) {
    var content = getContent();

    var processInputOptions = function processInputOptions(inputOptions) {
      return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
    };

    if (isPromise(params.inputOptions)) {
      showLoading();
      params.inputOptions.then(function (inputOptions) {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (_typeof(params.inputOptions) === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
    }
  };

  var handleInputValue = function handleInputValue(instance, params) {
    var input = instance.getInput();
    hide(input);
    params.inputValue.then(function (inputValue) {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
      show(input);
      input.focus();
      instance.hideLoading();
    })["catch"](function (err) {
      error('Error in inputValue promise: ' + err);
      input.value = '';
      show(input);
      input.focus();

      _this.hideLoading();
    });
  };

  var populateInputOptions = {
    select: function select(content, inputOptions, params) {
      var select = getChildByClass(content, swalClasses.select);
      inputOptions.forEach(function (inputOption) {
        var optionValue = inputOption[0];
        var optionLabel = inputOption[1];
        var option = document.createElement('option');
        option.value = optionValue;
        option.innerHTML = optionLabel;

        if (params.inputValue.toString() === optionValue.toString()) {
          option.selected = true;
        }

        select.appendChild(option);
      });
      select.focus();
    },
    radio: function radio(content, inputOptions, params) {
      var radio = getChildByClass(content, swalClasses.radio);
      inputOptions.forEach(function (inputOption) {
        var radioValue = inputOption[0];
        var radioLabel = inputOption[1];
        var radioInput = document.createElement('input');
        var radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (params.inputValue.toString() === radioValue.toString()) {
          radioInput.checked = true;
        }

        var label = document.createElement('span');
        label.innerHTML = radioLabel;
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      var radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
    /**
     * Converts `inputOptions` into an array of `[value, label]`s
     * @param inputOptions
     */

  };

  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        result.push([key, value]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        result.push([key, inputOptions[key]]);
      });
    }

    return result;
  };

  function _main(userParams) {
    var _this = this;

    showWarningsForParams(userParams);

    var innerParams = _extends({}, defaultParams, userParams);

    setParameters(innerParams);
    Object.freeze(innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      cancelButton: getCancelButton(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(this, domCache);
    render(this, innerParams);
    privateProps.innerParams.set(this, innerParams);
    var constructor = this.constructor;
    return new Promise(function (resolve) {
      // functions to handle all closings/dismissals
      var succeedWith = function succeedWith(value) {
        _this.closePopup({
          value: value
        });
      };

      var dismissWith = function dismissWith(dismiss) {
        _this.closePopup({
          dismiss: dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(_this, resolve); // Close on timer

      if (innerParams.timer) {
        globalState.timeout = new Timer(function () {
          dismissWith('timer');
          delete globalState.timeout;
        }, innerParams.timer);
      } // Get the value of the popup input


      var getInputValue = function getInputValue() {
        var input = _this.getInput();

        if (!input) {
          return null;
        }

        switch (innerParams.input) {
          case 'checkbox':
            return input.checked ? 1 : 0;

          case 'radio':
            return input.checked ? input.value : null;

          case 'file':
            return input.files.length ? input.files[0] : null;

          default:
            return innerParams.inputAutoTrim ? input.value.trim() : input.value;
        }
      }; // input autofocus


      if (innerParams.input) {
        setTimeout(function () {
          var input = _this.getInput();

          if (input) {
            focusInput(input);
          }
        }, 0);
      }

      var confirm = function confirm(value) {
        if (innerParams.showLoaderOnConfirm) {
          constructor.showLoading(); // TODO: make showLoading an *instance* method
        }

        if (innerParams.preConfirm) {
          _this.resetValidationMessage();

          var preConfirmPromise = Promise.resolve().then(function () {
            return innerParams.preConfirm(value, innerParams.validationMessage);
          });
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(domCache.validationMessage) || preConfirmValue === false) {
              _this.hideLoading();
            } else {
              succeedWith(typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
            }
          });
        } else {
          succeedWith(value);
        }
      }; // Mouse interactions


      var onButtonEvent = function onButtonEvent(e) {
        var target = e.target;
        var confirmButton = domCache.confirmButton,
            cancelButton = domCache.cancelButton;
        var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
        var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

        switch (e.type) {
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm) {
              _this.disableButtons();

              if (innerParams.input) {
                var inputValue = getInputValue();

                if (innerParams.inputValidator) {
                  _this.disableInput();

                  var validationPromise = Promise.resolve().then(function () {
                    return innerParams.inputValidator(inputValue, innerParams.validationMessage);
                  });
                  validationPromise.then(function (validationMessage) {
                    _this.enableButtons();

                    _this.enableInput();

                    if (validationMessage) {
                      _this.showValidationMessage(validationMessage);
                    } else {
                      confirm(inputValue);
                    }
                  });
                } else if (!_this.getInput().checkValidity()) {
                  _this.enableButtons();

                  _this.showValidationMessage(innerParams.validationMessage);
                } else {
                  confirm(inputValue);
                }
              } else {
                confirm(true);
              } // Clicked 'cancel'

            } else if (targetedCancel) {
              _this.disableButtons();

              dismissWith(constructor.DismissReason.cancel);
            }

            break;

          default:
        }
      };

      var buttons = domCache.popup.querySelectorAll('button');

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = onButtonEvent;
        buttons[i].onmouseover = onButtonEvent;
        buttons[i].onmouseout = onButtonEvent;
        buttons[i].onmousedown = onButtonEvent;
      } // Closing popup by close button


      domCache.closeButton.onclick = function () {
        dismissWith(constructor.DismissReason.close);
      };

      if (innerParams.toast) {
        // Closing popup by internal click
        domCache.popup.onclick = function () {
          if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
            return;
          }

          dismissWith(constructor.DismissReason.close);
        };
      } else {
        var ignoreOutsideClick = false; // Ignore click events that had mousedown on the popup but mouseup on the container
        // This can happen when the user drags a slider

        domCache.popup.onmousedown = function () {
          domCache.container.onmouseup = function (e) {
            domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
            // have any other direct children aside of the popup

            if (e.target === domCache.container) {
              ignoreOutsideClick = true;
            }
          };
        }; // Ignore click events that had mousedown on the container but mouseup on the popup


        domCache.container.onmousedown = function () {
          domCache.popup.onmouseup = function (e) {
            domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

            if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
              ignoreOutsideClick = true;
            }
          };
        };

        domCache.container.onclick = function (e) {
          if (ignoreOutsideClick) {
            ignoreOutsideClick = false;
            return;
          }

          if (e.target !== domCache.container) {
            return;
          }

          if (callIfFunction(innerParams.allowOutsideClick)) {
            dismissWith(constructor.DismissReason.backdrop);
          }
        };
      } // Reverse buttons (Confirm on the right side)


      if (innerParams.reverseButtons) {
        domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
      } else {
        domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
      } // Focus handling


      var setFocus = function setFocus(index, increment) {
        var focusableElements = getFocusableElements(innerParams.focusCancel); // search for visible elements and select the next possible match

        for (var _i = 0; _i < focusableElements.length; _i++) {
          index = index + increment; // rollover to first item

          if (index === focusableElements.length) {
            index = 0; // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1;
          }

          return focusableElements[index].focus();
        } // no visible focusable elements, focus the popup


        domCache.popup.focus();
      };

      var keydownHandler = function keydownHandler(e, innerParams) {
        if (innerParams.stopKeydownPropagation) {
          e.stopPropagation();
        }

        var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
        ];

        if (e.key === 'Enter' && !e.isComposing) {
          if (e.target && _this.getInput() && e.target.outerHTML === _this.getInput().outerHTML) {
            if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
              return; // do not submit
            }

            constructor.clickConfirm();
            e.preventDefault();
          } // TAB

        } else if (e.key === 'Tab') {
          var targetElement = e.target;
          var focusableElements = getFocusableElements(innerParams.focusCancel);
          var btnIndex = -1;

          for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
            if (targetElement === focusableElements[_i2]) {
              btnIndex = _i2;
              break;
            }
          }

          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1);
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1);
          }

          e.stopPropagation();
          e.preventDefault(); // ARROWS - switch focus between buttons
        } else if (arrowKeys.indexOf(e.key) !== -1) {
          // focus Cancel button if Confirm button is currently focused
          if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
            domCache.cancelButton.focus(); // and vice versa
          } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
            domCache.confirmButton.focus();
          } // ESC

        } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(innerParams.allowEscapeKey) === true) {
          e.preventDefault();
          dismissWith(constructor.DismissReason.esc);
        }
      };

      if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = false;
      }

      if (!innerParams.toast) {
        globalState.keydownHandler = function (e) {
          return keydownHandler(e, innerParams);
        };

        globalState.keydownTarget = innerParams.keydownListenerCapture ? window : domCache.popup;
        globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
        globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = true;
      }

      _this.enableButtons();

      _this.hideLoading();

      _this.resetValidationMessage();

      if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
        addClass(document.body, swalClasses['toast-column']);
      } else {
        removeClass(document.body, swalClasses['toast-column']);
      } // inputOptions, inputValue


      if (innerParams.input === 'select' || innerParams.input === 'radio') {
        handleInputOptions(_this, innerParams);
      } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(innerParams.input) !== -1 && isPromise(innerParams.inputValue)) {
        handleInputValue(_this, innerParams);
      }

      openPopup(innerParams);

      if (!innerParams.toast) {
        if (!callIfFunction(innerParams.allowEnterKey)) {
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }
        } else if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
        } else if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        } else {
          setFocus(-1, 1);
        }
      } // fix scroll


      domCache.container.scrollTop = 0;
    });
  }
  /**
   * Updates popup parameters.
   */


  function update(params) {
    var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

    Object.keys(params).forEach(function (param) {
      if (Swal.isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
      }
    });
    var innerParams = privateProps.innerParams.get(this);

    var updatedParams = _extends({}, innerParams, validUpdatableParams);

    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: _extends({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  var instanceMethods = Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableConfirmButton: enableConfirmButton,
    disableConfirmButton: disableConfirmButton,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    setProgressSteps: setProgressSteps,
    showProgressSteps: showProgressSteps,
    hideProgressSteps: hideProgressSteps,
    _main: _main,
    update: update
  });
  var currentInstance; // SweetAlert constructor

  function SweetAlert() {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (typeof window === 'undefined') {
      return;
    } // Check for the existence of Promise

    /* istanbul ignore if */


    if (typeof Promise === 'undefined') {
      error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
    }

    currentInstance = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var outerParams = Object.freeze(this.constructor.argsToParams(args));
    Object.defineProperties(this, {
      params: {
        value: outerParams,
        writable: false,
        enumerable: true,
        configurable: true
      }
    });

    var promise = this._main(this.params);

    privateProps.promise.set(this, promise);
  } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


  SweetAlert.prototype.then = function (onFulfilled) {
    var promise = privateProps.promise.get(this);
    return promise.then(onFulfilled);
  };

  SweetAlert.prototype["finally"] = function (onFinally) {
    var promise = privateProps.promise.get(this);
    return promise["finally"](onFinally);
  }; // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '8.13.0';
  var Swal = SweetAlert;
  Swal["default"] = Swal;
  return Swal;
});

if (typeof this !== 'undefined' && this.Sweetalert2) {
  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2;
}

"undefined" != typeof document && function (e, t) {
  var n = e.createElement("style");
  if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);else try {
    n.innerHTML = t;
  } catch (e) {
    n.innerText = t;
  }
}(document, "@charset \"UTF-8\";@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 1.5em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}@-webkit-keyframes swal2-toast-show{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg)}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg)}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg)}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg)}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg)}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg)}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:\"\";display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{-webkit-transform:none;transform:none;background:0 0;color:#f27474}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-webkit-input-placeholder,.swal2-input::-webkit-input-placeholder,.swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:inherit}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:inherit;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:\"!\"}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info::before{content:\"i\"}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question::before{content:\"?\"}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:\"؟\"}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}");
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/components/LoginModal.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';

var Toast = _sweetalert.default.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

var _default = {
  data: function data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function login() {
      var _this = this;

      console.log(this.email);
      console.log(this.password);
      axios({
        url: "".concat(baseUrl, "/users/login"),
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id', data.id);
        localStorage.setItem('email', data.email); // this.username = data.name

        _this.email = '';
        _this.password = '';

        _this.$emit('setLogin', true); // this.isLogin = true


        Toast.fire({
          type: 'success',
          title: 'Signed in successfully'
        });
      }).catch(function (err) {
        console.log(err);

        _sweetalert.default.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });

        _this.email = '';
        _this.password = '';
      });
    },
    onSignIn: function onSignIn(googleUser) {
      var _this2 = this;

      console.log('masuk');
      var idToken = googleUser.getAuthResponse().id_token;
      app.isLogin = true;
      axios({
        url: "".concat(baseUrl, "/users/loginGoogle"),
        method: 'post',
        data: {
          idToken: idToken
        }
      }).then(function (_ref2) {
        var data = _ref2.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);

        _this2.$emit('setLogin', true);
      }).catch(function (err) {
        console.log(err.config);
      });
    }
  } // function onSignIn(googleUser) {
  //   console.log('masuk')
  //   const idToken= googleUser.getAuthResponse().id_token
  //   app.isLogin = true
  //   axios({
  //     url: `${baseUrl}/users/loginGoogle`,
  //     method: 'post',
  //     data:{idToken}
  //   })
  //   .then(({data}) => {
  //     console.log(data)
  //     localStorage.setItem('token', data.token)
  //     localStorage.setItem('name', data.name)
  //     localStorage.setItem('email', data.email)
  //     this.$emit('setLogin', true)
  //   })
  //   .catch(err => {
  //     console.log(err.config)
  //   })
  // }

};
exports.default = _default;

function renderButton() {
  gapi.signin2.render('g-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSignIn,
    'onfailure': onFailure
  });
}
        var $e03fc3 = exports.default || module.exports;
      
      if (typeof $e03fc3 === 'function') {
        $e03fc3 = $e03fc3.options;
      }
    
        /* template */
        Object.assign($e03fc3, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "loginModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalCenterTitle",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("div", { staticClass: "login-form-1 bg-light" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.email,
                          expression: "email"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: "Email..",
                        value: ""
                      },
                      domProps: { value: _vm.email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.email = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.password,
                          expression: "password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "password",
                        placeholder: "Password..",
                        value: ""
                      },
                      domProps: { value: _vm.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.password = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group d-flex justify-content-center" },
                    [
                      _c("input", {
                        staticClass: "btn btn-secondary",
                        attrs: {
                          "data-dismiss": "modal",
                          type: "submit",
                          value: "Login"
                        },
                        on: { click: _vm.login }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(1)
                ])
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h2",
        { staticClass: "modal-title", attrs: { id: "exampleModalLongTitle" } },
        [_vm._v("Login")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "form-group d-flex justify-content-center" },
      [
        _c("div", {
          staticClass: "g-signin2",
          attrs: { "data-dismiss": "modal", "data-onsuccess": "onSignIn" }
        })
      ]
    )
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e03fc3', $e03fc3);
          } else {
            api.reload('$e03fc3', $e03fc3);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"sweetalert2":"node_modules/sweetalert2/dist/sweetalert2.all.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/RegisterModal.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';

var Toast = _sweetalert.default.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

var _default = {
  data: function data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register: function register() {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      axios({
        url: "".concat(baseUrl, "/users/register"),
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data);
        Toast.fire({
          type: 'success',
          title: 'Registered successfully, You can login now'
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
};
exports.default = _default;
        var $cc665a = exports.default || module.exports;
      
      if (typeof $cc665a === 'function') {
        $cc665a = $cc665a.options;
      }
    
        /* template */
        Object.assign($cc665a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "registerModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalCenterTitle",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("div", { staticClass: "login-form-1 bg-light" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.name,
                          expression: "name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: "Name.. ",
                        value: ""
                      },
                      domProps: { value: _vm.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.name = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.email,
                          expression: "email"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: "Email.. ",
                        value: ""
                      },
                      domProps: { value: _vm.email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.email = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.password,
                          expression: "password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "password",
                        placeholder: "Password.. ",
                        value: ""
                      },
                      domProps: { value: _vm.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.password = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group d-flex justify-content-center" },
                    [
                      _c("input", {
                        staticClass: "btn btn-secondary",
                        attrs: {
                          "data-dismiss": "modal",
                          type: "submit",
                          value: "Register"
                        },
                        on: { click: _vm.register }
                      })
                    ]
                  )
                ])
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h2",
        { staticClass: "modal-title", attrs: { id: "exampleModalLongTitle" } },
        [_vm._v("Register")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$cc665a', $cc665a);
          } else {
            api.reload('$cc665a', $cc665a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"sweetalert2":"node_modules/sweetalert2/dist/sweetalert2.all.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/@voerro/vue-tagsinput/src/VoerroTagsInput.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    elementId: String,
    existingTags: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: [Array, String],
      default: () => {
        return [];
      }
    },
    typeahead: {
      type: Boolean,
      default: false
    },
    typeaheadStyle: {
      type: String,
      default: 'badges'
    },
    typeaheadActivationThreshold: {
      type: Number,
      default: 1
    },
    typeaheadMaxResults: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Add a tag'
    },
    limit: {
      type: Number,
      default: 0
    },
    onlyExistingTags: {
      type: Boolean,
      default: false
    },
    deleteOnBackspace: {
      type: Boolean,
      default: true
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Function,
      default: () => true
    },
    addTagsOnComma: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String,
      default: 'tags-input-wrapper-default'
    }
  },

  data() {
    return {
      badgeId: 0,
      tagBadges: [],
      tags: [],
      input: '',
      oldInput: '',
      hiddenInput: '',
      searchResults: [],
      searchSelection: 0
    };
  },

  created() {
    this.tagsFromValue(); // Emit an event

    this.$emit('initialized');
  },

  watch: {
    tags() {
      // Updating the hidden input
      this.hiddenInput = this.tags.join(','); // Update the bound v-model value

      this.$emit('input', this.tags);
    },

    value() {
      this.tagsFromValue();
    }

  },
  methods: {
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    tagFromInput() {
      // If we're choosing a tag from the search results
      if (this.searchResults.length && this.searchSelection >= 0) {
        this.tagFromSearch(this.searchResults[this.searchSelection]);
        this.input = '';
      } else {
        // If we're adding an unexisting tag
        let text = this.input.trim(); // If the new tag is not an empty string and passes validation

        if (!this.onlyExistingTags && text.length && this.validate(text)) {
          this.input = ''; // Determine the tag's slug and text depending on if the tag exists
          // on the site already or not

          let slug = this.makeSlug(text);
          let existingTag = this.existingTags[slug];
          slug = existingTag ? slug : text;
          text = existingTag ? existingTag : text;
          this.addTag(slug, text);
        }
      }
    },

    tagFromSearchOnClick(tag) {
      this.tagFromSearch(tag);
      this.$refs['taginput'].blur();
    },

    tagFromSearch(tag) {
      this.searchResults = [];
      this.input = '';
      this.oldInput = '';
      this.addTag(tag.slug, tag.text);
    },

    makeSlug(value) {
      return value.toLowerCase().replace(/\s/g, '-');
    },

    addTag(slug, text) {
      // Check if the limit has been reached
      if (this.limit > 0 && this.tags.length >= this.limit) {
        return false;
      } // Attach the tag if it hasn't been attached yet


      if (!this.tagSelected(slug)) {
        this.tagBadges.push(text.replace(/\s/g, '&nbsp;'));
        this.tags.push(slug);
      } // Emit events


      this.$emit('tag-added', slug);
      this.$emit('tags-updated');
    },

    removeLastTag() {
      if (!this.input.length && this.deleteOnBackspace) {
        this.removeTag(this.tags.length - 1);
      }
    },

    removeTag(index) {
      let slug = this.tags[index];
      this.tags.splice(index, 1);
      this.tagBadges.splice(index, 1); // Emit events

      this.$emit('tag-removed', slug);
      this.$emit('tags-updated');
    },

    searchTag() {
      if (this.typeahead === true) {
        if (this.oldInput != this.input || !this.searchResults.length && this.typeaheadActivationThreshold == 0) {
          this.searchResults = [];
          this.searchSelection = 0;
          let input = this.input.trim();

          if (input.length && input.length >= this.typeaheadActivationThreshold || this.typeaheadActivationThreshold == 0) {
            for (let slug in this.existingTags) {
              let text = this.existingTags[slug].toLowerCase();

              if (text.search(this.escapeRegExp(input.toLowerCase())) > -1 && !this.tagSelected(slug)) {
                this.searchResults.push({
                  slug,
                  text: this.existingTags[slug]
                });
              }
            } // Sort the search results alphabetically


            this.searchResults.sort((a, b) => {
              if (a.text < b.text) return -1;
              if (a.text > b.text) return 1;
              return 0;
            }); // Shorten Search results to desired length

            if (this.typeaheadMaxResults > 0) {
              this.searchResults = this.searchResults.slice(0, this.typeaheadMaxResults);
            }
          }

          this.oldInput = this.input;
        }
      }
    },

    onFocus() {
      this.searchTag();
    },

    hideTypeahead() {
      if (!this.input.length) {
        this.$nextTick(() => {
          this.ignoreSearchResults();
        });
      }
    },

    nextSearchResult() {
      if (this.searchSelection + 1 <= this.searchResults.length - 1) {
        this.searchSelection++;
      }
    },

    prevSearchResult() {
      if (this.searchSelection > 0) {
        this.searchSelection--;
      }
    },

    ignoreSearchResults() {
      this.searchResults = [];
      this.searchSelection = 0;
    },

    /**
    * Clear the list of selected tags
    */
    clearTags() {
      this.tags.splice(0, this.tags.length);
      this.tagBadges.splice(0, this.tagBadges.length);
    },

    /**
    * Replace the currently selected tags with the tags from the value
    */
    tagsFromValue() {
      if (this.value && this.value.length) {
        let tags = Array.isArray(this.value) ? this.value : this.value.split(',');

        if (this.tags == tags) {
          return;
        }

        this.clearTags();

        for (let slug of tags) {
          let existingTag = this.existingTags[slug];
          let text = existingTag ? existingTag : slug;
          this.addTag(slug, text);
        }
      } else {
        if (this.tags.length == 0) {
          return;
        }

        this.clearTags();
      }
    },

    /**
    * Check if the tag with the provided slug is already selected
    */
    tagSelected(slug) {
      if (this.allowDuplicates) {
        return false;
      }

      if (!slug) {
        return false;
      }

      let searchSlug = this.makeSlug(slug);
      let found = this.tags.find(value => {
        return searchSlug == this.makeSlug(value);
      });
      return !!found;
    },

    /**
     * Process all the keydown events
     */
    onKeyDown(e) {
      // Insert a new tag on comma keydown if the option is enabled
      if (e.key == ',') {
        if (this.addTagsOnComma) {
          // The comma shouldn't actually be inserted
          e.preventDefault(); // Add the inputed tag

          this.tagFromInput();
        }
      }
    }

  }
};
exports.default = _default;
        var $2ea537 = exports.default || module.exports;
      
      if (typeof $2ea537 === 'function') {
        $2ea537 = $2ea537.options;
      }
    
        /* template */
        Object.assign($2ea537, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "tags-input-root" }, [
    _c(
      "div",
      { class: _vm.wrapperClass + " tags-input" },
      [
        _vm._l(_vm.tagBadges, function(badge, index) {
          return _c(
            "span",
            {
              key: index,
              staticClass:
                "tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
            },
            [
              _c("span", { domProps: { innerHTML: _vm._s(badge) } }),
              _vm._v(" "),
              _c("i", {
                staticClass: "tags-input-remove",
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.removeTag(index)
                  }
                }
              })
            ]
          )
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.input,
              expression: "input"
            }
          ],
          ref: "taginput",
          attrs: { type: "text", placeholder: _vm.placeholder },
          domProps: { value: _vm.input },
          on: {
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.tagFromInput($event)
              },
              function($event) {
                if (!$event.type.indexOf("key") && $event.keyCode !== 8) {
                  return null
                }
                return _vm.removeLastTag($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                return _vm.nextSearchResult($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                return _vm.prevSearchResult($event)
              },
              _vm.onKeyDown
            ],
            keyup: [
              _vm.searchTag,
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape"
                  ])
                ) {
                  return null
                }
                return _vm.ignoreSearchResults($event)
              }
            ],
            focus: _vm.onFocus,
            blur: _vm.hideTypeahead,
            value: _vm.tags,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.input = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _vm.elementId
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.hiddenInput,
                  expression: "hiddenInput"
                }
              ],
              attrs: { type: "hidden", name: _vm.elementId, id: _vm.elementId },
              domProps: { value: _vm.hiddenInput },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.hiddenInput = $event.target.value
                }
              }
            })
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.searchResults.length,
            expression: "searchResults.length"
          }
        ]
      },
      [
        _vm.typeaheadStyle === "badges"
          ? _c(
              "p",
              { class: "typeahead-" + _vm.typeaheadStyle },
              _vm._l(_vm.searchResults, function(tag, index) {
                return _c("span", {
                  key: index,
                  staticClass: "tags-input-badge",
                  class: {
                    "tags-input-typeahead-item-default":
                      index != _vm.searchSelection,
                    "tags-input-typeahead-item-highlighted-default":
                      index == _vm.searchSelection
                  },
                  domProps: { textContent: _vm._s(tag.text) },
                  on: {
                    mouseover: function($event) {
                      _vm.searchSelection = index
                    },
                    mousedown: function($event) {
                      $event.preventDefault()
                      return _vm.tagFromSearchOnClick(tag)
                    }
                  }
                })
              }),
              0
            )
          : _vm.typeaheadStyle === "dropdown"
          ? _c(
              "ul",
              { class: "typeahead-" + _vm.typeaheadStyle },
              _vm._l(_vm.searchResults, function(tag, index) {
                return _c("li", {
                  key: index,
                  class: {
                    "tags-input-typeahead-item-default":
                      index != _vm.searchSelection,
                    "tags-input-typeahead-item-highlighted-default":
                      index == _vm.searchSelection
                  },
                  domProps: { textContent: _vm._s(tag.text) },
                  on: {
                    mouseover: function($event) {
                      _vm.searchSelection = index
                    },
                    mousedown: function($event) {
                      $event.preventDefault()
                      return _vm.tagFromSearchOnClick(tag)
                    }
                  }
                })
              }),
              0
            )
          : _vm._e()
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$2ea537', $2ea537);
          } else {
            api.reload('$2ea537', $2ea537);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/@voerro/vue-tagsinput/src/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VoerroTagsInput = _interopRequireDefault(require("./VoerroTagsInput.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.VoerroTagsInput = _VoerroTagsInput.default;
var _default = _VoerroTagsInput.default;
exports.default = _default;
},{"./VoerroTagsInput.vue":"node_modules/@voerro/vue-tagsinput/src/VoerroTagsInput.vue"}],"js/vueWysiwyg.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("vueWysiwyg", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.vueWysiwyg = t() : e.vueWysiwyg = t();
}("undefined" != typeof self ? self : this, function () {
  return function (e) {
    var t = {};

    function n(i) {
      if (t[i]) return t[i].exports;
      var o = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, {
        configurable: !1,
        enumerable: !0,
        get: i
      });
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "/vue-wysiwyg/", n(n.s = 18);
  }([function (e, t, n) {
    "use strict";

    t.a = function (e, t, n, i, o, r, s, a) {
      var l = _typeof((e = e || {}).default);

      "object" !== l && "function" !== l || (e = e.default);
      var u,
          c = "function" == typeof e ? e.options : e;
      t && (c.render = t, c.staticRenderFns = n, c._compiled = !0);
      i && (c.functional = !0);
      r && (c._scopeId = r);
      s ? (u = function u(e) {
        (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), o && o.call(this, e), e && e._registeredComponents && e._registeredComponents.add(s);
      }, c._ssrRegister = u) : o && (u = a ? function () {
        o.call(this, this.$root.$options.shadowRoot);
      } : o);
      if (u) if (c.functional) {
        c._injectStyles = u;
        var d = c.render;

        c.render = function (e, t) {
          return u.call(t), d(e, t);
        };
      } else {
        var p = c.beforeCreate;
        c.beforeCreate = p ? [].concat(p, u) : [u];
      }
      return {
        exports: e,
        options: c
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = new function () {
      var e = {
        listeners: {},
        on: function on(t, n) {
          void 0 === e.listeners[t] && (e.listeners[t] = []), e.listeners[t].push(n);
        },
        emit: function emit(t) {
          for (var n = arguments.length, i = Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) {
            i[o - 1] = arguments[o];
          }

          void 0 !== e.listeners[t] && e.listeners[t].forEach(function (e) {
            return e.apply(i);
          });
        }
      };
      return e;
    }();
    i.options = {
      image: {
        uploadURL: "None",
        dropzoneOptions: {}
      },
      hideModules: {},
      paragraphSeparator: "div",
      maxHeight: void 0,
      customModules: []
    }, i.utils = {
      getHTMLOfSelection: function getHTMLOfSelection() {
        if (void 0 !== window.getSelection) {
          var e = window.getSelection();

          if (0 < e.rangeCount) {
            var t = e.getRangeAt(0).cloneContents(),
                n = document.createElement("div");
            return n.appendChild(t), n.innerHTML;
          }
        }

        return "";
      }
    }, t.a = i;
  }, function (e, t, n) {
    "use strict";

    t.__esModule = !0;
    var i,
        o = n(20),
        r = (i = o) && i.__esModule ? i : {
      default: i
    };

    t.default = r.default || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
      }

      return e;
    };
  }, function (e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n);
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == _typeof(e) ? null !== e : "function" == typeof e;
    };
  }, function (e, t, n) {
    e.exports = !n(6)(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  }, function (e, t) {
    var n = e.exports = {
      version: "2.5.3"
    };
    "number" == typeof __e && (__e = n);
  }, function (e, t, n) {
    var i = n(9),
        o = n(10);

    e.exports = function (e) {
      return i(o(e));
    };
  }, function (e, t, n) {
    var i = n(37);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == i(e) ? e.split("") : Object(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  }, function (e, t) {
    var n = Math.ceil,
        i = Math.floor;

    e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e);
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(2),
        o = n.n(i),
        r = n(1),
        s = n(50),
        a = n.n(s),
        l = n(51),
        u = n(53),
        c = n.n(u),
        d = n(54),
        p = n.n(d),
        h = n(55),
        f = n.n(h),
        v = n(56),
        m = n.n(v),
        g = n(57),
        b = n.n(g),
        w = n(58),
        y = n.n(w),
        q = n(59),
        k = n(61),
        z = n(63),
        x = n.n(z),
        F = n(64),
        E = n.n(F),
        _ = n(65),
        C = n.n(_),
        S = n(66),
        L = n(72),
        M = n(75),
        T = n.n(M),
        A = n(76),
        O = n.n(A),
        D = [c.a, p.a, f.a, O.a, m.a, b.a, y.a, O.a, q.a, k.a, x.a, E.a, C.a, O.a, S.a, L.a, O.a, T.a];

    t.a = {
      model: {
        prop: "html",
        event: "html"
      },
      props: {
        html: {
          type: String,
          default: ""
        },
        placeholder: {
          type: String,
          default: "Enter text..."
        },
        options: Object
      },
      components: {
        Btn: l.a
      },
      data: function data() {
        return {
          selection: ""
        };
      },
      computed: {
        mergedOptions: function mergedOptions() {
          return o()({}, r.a.options, this.options);
        },
        modules: function modules() {
          var e = this,
              t = this.mergedOptions.iconOverrides;
          return D.filter(function (t) {
            return void 0 === e.mergedOptions.hideModules || !e.mergedOptions.hideModules[t.title];
          }).map(function (e) {
            return void 0 !== t && void 0 !== t[e.title] && (e.icon = t[e.title]), e;
          }).concat(this.mergedOptions.customModules);
        },
        btnsWithDashboards: function btnsWithDashboards() {
          return this.modules ? this.modules.filter(function (e) {
            return e.render;
          }) : [];
        },
        innerHTML: {
          get: function get() {
            return this.$refs.content.innerHTML;
          },
          set: function set(e) {
            this.$refs.content.innerHTML !== e && (this.$refs.content.innerHTML = e);
          }
        }
      },
      methods: {
        saveSelection: function saveSelection() {
          if (void 0 !== window.getSelection) {
            if (this.selection = window.getSelection(), this.selection.getRangeAt && this.selection.rangeCount) return this.selection.getRangeAt(0);
          } else if (document.selection && document.selection.createRange) return document.selection.createRange();

          return null;
        },
        restoreSelection: function restoreSelection(e) {
          e && (void 0 === window.getSelection ? document.selection && e.select && e.select() : (this.selection = window.getSelection(), this.selection.removeAllRanges(), this.selection.addRange(e)));
        },
        clearSelection: function clearSelection() {
          this.selection = null;
          var e = window.getSelection();
          e && (void 0 !== e.empty && e.empty(), void 0 !== e.removeAllRanges && e.removeAllRanges());
        },
        exec: function exec(e, t, n) {
          !1 !== n && this.selection && this.restoreSelection(this.selection), document.execCommand(e, !1, t || ""), this.clearSelection(), this.$nextTick(this.emit);
        },
        onDocumentClick: function onDocumentClick(e) {
          for (var t, n = 0; n < this.btnsWithDashboards.length; n++) {
            (t = this.$refs["btn-" + this.btnsWithDashboards[n].title][0]) && t.showDashboard && !t.$el.contains(e.target) && t.closeDashboard();
          }
        },
        emit: function emit() {
          this.$emit("html", this.$refs.content.innerHTML), this.$emit("change", this.$refs.content.innerHTML);
        },
        onInput: a()(function () {
          this.emit();
        }, 300),
        onFocus: function onFocus() {
          document.execCommand("defaultParagraphSeparator", !1, this.mergedOptions.paragraphSeparator);
        },
        onContentBlur: function onContentBlur() {
          this.selection = this.saveSelection();
        },
        syncHTML: function syncHTML() {
          this.html !== this.$refs.content.innerHTML && (this.innerHTML = this.html);
        }
      },
      mounted: function mounted() {
        this.unwatch = this.$watch("html", this.syncHTML, {
          immediate: !0
        }), document.addEventListener("click", this.onDocumentClick), this.$refs.content.addEventListener("focus", this.onFocus), this.$refs.content.addEventListener("input", this.onInput), this.$refs.content.addEventListener("blur", this.onContentBlur, {
          capture: !0
        }), this.$refs.content.style.maxHeight = this.mergedOptions.maxHeight;
      },
      beforeDestroy: function beforeDestroy() {
        this.unwatch(), document.removeEventListener("click", this.onDocumentClick), this.$refs.content.removeEventListener("blur", this.onContentBlur), this.$refs.content.removeEventListener("input", this.onInput), this.$refs.content.removeEventListener("focus", this.onFocus);
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(1);
    t.a = {
      props: ["module", "options"],
      data: function data() {
        return {
          showDashboard: !1
        };
      },
      computed: {
        uid: function uid() {
          return this.$parent._uid;
        }
      },
      methods: {
        closeDashboard: function closeDashboard() {
          this.showDashboard = !1;
        },
        openDashboard: function openDashboard() {
          this.showDashboard = !0;
        },
        exec: function exec() {
          this.$parent.exec.apply(null, arguments);
        },
        onBtnClick: function onBtnClick(e) {
          var t = this;
          if (e.preventDefault(), void 0 !== this.module.action) this.exec.apply(null, this.module.action);else if (void 0 !== this.module.customAction) this.module.customAction(i.a.utils).forEach(function (e) {
            return t.exec.apply(null, e);
          });else if (!(void 0 === this.module.render || this.$refs.dashboard && this.$refs.dashboard.contains(e.target))) return this.showDashboard = !this.showDashboard, void i.a.emit(this.uid + "_" + (this.showDashboard ? "show" : "hide") + "_dashboard_" + this.module.title);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    t.a = {
      title: "headings",
      description: "Headings (h1-h6)",
      icon: '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1682 1664q-44 0-132.5-3.5t-133.5-3.5q-44 0-132 3.5t-132 3.5q-24 0-37-20.5t-13-45.5q0-31 17-46t39-17 51-7 45-15q33-21 33-140l-1-391q0-21-1-31-13-4-50-4h-675q-38 0-51 4-1 10-1 31l-1 371q0 142 37 164 16 10 48 13t57 3.5 45 15 20 45.5q0 26-12.5 48t-36.5 22q-47 0-139.5-3.5t-138.5-3.5q-43 0-128 3.5t-127 3.5q-23 0-35.5-21t-12.5-45q0-30 15.5-45t36-17.5 47.5-7.5 42-15q33-23 33-143l-1-57v-813q0-3 .5-26t0-36.5-1.5-38.5-3.5-42-6.5-36.5-11-31.5-16-18q-15-10-45-12t-53-2-41-14-18-45q0-26 12-48t36-22q46 0 138.5 3.5t138.5 3.5q42 0 126.5-3.5t126.5-3.5q25 0 37.5 22t12.5 48q0 30-17 43.5t-38.5 14.5-49.5 4-43 13q-35 21-35 160l1 320q0 21 1 32 13 3 39 3h699q25 0 38-3 1-11 1-32l1-320q0-139-35-160-18-11-58.5-12.5t-66-13-25.5-49.5q0-26 12.5-48t37.5-22q44 0 132 3.5t132 3.5q43 0 129-3.5t129-3.5q25 0 37.5 22t12.5 48q0 30-17.5 44t-40 14.5-51.5 3-44 12.5q-35 23-35 161l1 943q0 119 34 140 16 10 46 13.5t53.5 4.5 41.5 15.5 18 44.5q0 26-12 48t-36 22z"/></svg>',
      methods: {
        insertHeading: function insertHeading(e) {
          this.$parent.closeDashboard(), this.$emit("exec", "formatBlock", e.target.textContent);
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(1);
    t.a = {
      title: "link",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"/></svg>',
      description: "Hyperlink",
      props: {
        uid: null
      },
      data: function data() {
        return {
          url: "",
          title: ""
        };
      },
      methods: {
        insertLink: function insertLink() {
          this.$emit("exec", "insertHTML", "<a href='" + this.url + "'>" + this.title + "</a>"), this.$parent.closeDashboard(), this.url = "", this.title = "";
        }
      },
      created: function created() {
        var e = this;
        i.a.on(this.uid + "_show_dashboard_link", function () {
          e.$nextTick(function () {
            e.$refs.url.focus();
          });
        });
      }
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(2),
        o = n.n(i),
        r = n(67),
        s = n.n(r),
        a = (n(1), n(70));
    n.n(a);
    t.a = {
      title: "image",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/></svg>',
      description: "Insert Image",
      props: ["options"],
      components: {
        Dropzone: s.a
      },
      computed: {
        uploadURL: function uploadURL() {
          return this.options.image.uploadURL;
        },
        dropzoneOptions: function dropzoneOptions() {
          return o()({}, this.options.image.dropzoneOptions, {
            id: this._uid + "vwdropzone",
            url: this.uploadURL,
            autoProcessQueue: "None" !== this.uploadURL,
            dictDefaultMessage: '<i class="fa"><svg fill="#666" width="26" height="24" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 864q0-14-9-23l-352-352q-9-9-23-9t-23 9l-351 351q-10 12-10 24 0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5v-352h224q13 0 22.5-9.5t9.5-22.5zm640 288q0 159-112.5 271.5t-271.5 112.5h-1088q-185 0-316.5-131.5t-131.5-316.5q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87t188.5 231q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5t83.5 238.5z"/></svg></i><br>Click here to upload...'
          });
        }
      },
      methods: {
        fileUploaded: function fileUploaded(e, t) {
          t && this.$emit("exec", "insertHTML", "<img src=" + t + ">");
        },
        fileAdded: function fileAdded(e) {
          var t = this;

          if (!e || "None" === this.uploadURL) {
            var n = new FileReader();
            n.addEventListener("load", function () {
              t.$emit("exec", "insertHTML", "<img src=" + n.result + ">");
            }, !1), n.readAsDataURL(e);
          }
        }
      }
    };
  }, function (e, t, n) {
    "use strict";

    t.a = {
      title: "table",
      description: "Insert Table",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>',
      data: function data() {
        return {
          rows: 2,
          cols: 2
        };
      },
      methods: {
        insertTable: function insertTable() {
          var e = ("<tr>" + "<td></td>".repeat(this.cols) + "</tr>").repeat(this.rows);
          this.$emit("exec", "insertHTML", "<table><tbody>" + e + "</tbody></table>"), this.$parent.closeDashboard();
        }
      }
    };
  }, function (e, t, n) {
    e.exports = n(19);
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(2),
        o = n.n(i),
        r = n(48),
        s = n(1);
    t.default = {
      install: function install(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        s.a.options = o()({}, s.a.options, t), e.component("wysiwyg", r.a);
      },
      component: r.a
    };
  }, function (e, t, n) {
    e.exports = {
      default: n(21),
      __esModule: !0
    };
  }, function (e, t, n) {
    n(22), e.exports = n(7).Object.assign;
  }, function (e, t, n) {
    var i = n(23);
    i(i.S + i.F, "Object", {
      assign: n(33)
    });
  }, function (e, t, n) {
    var i = n(3),
        o = n(7),
        r = n(24),
        s = n(26),
        a = function a(e, t, n) {
      var l,
          u,
          c,
          d = e & a.F,
          p = e & a.G,
          h = e & a.S,
          f = e & a.P,
          v = e & a.B,
          m = e & a.W,
          g = p ? o : o[t] || (o[t] = {}),
          b = g.prototype,
          w = p ? i : h ? i[t] : (i[t] || {}).prototype;

      for (l in p && (n = t), n) {
        (u = !d && w && void 0 !== w[l]) && l in g || (c = u ? w[l] : n[l], g[l] = p && "function" != typeof w[l] ? n[l] : v && u ? r(c, i) : m && w[l] == c ? function (e) {
          var t = function t(_t, n, i) {
            if (this instanceof e) {
              switch (arguments.length) {
                case 0:
                  return new e();

                case 1:
                  return new e(_t);

                case 2:
                  return new e(_t, n);
              }

              return new e(_t, n, i);
            }

            return e.apply(this, arguments);
          };

          return t.prototype = e.prototype, t;
        }(c) : f && "function" == typeof c ? r(Function.call, c) : c, f && ((g.virtual || (g.virtual = {}))[l] = c, e & a.R && b && !b[l] && s(b, l, c)));
      }
    };

    a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, e.exports = a;
  }, function (e, t, n) {
    var i = n(25);

    e.exports = function (e, t, n) {
      if (i(e), void 0 === t) return e;

      switch (n) {
        case 1:
          return function (n) {
            return e.call(t, n);
          };

        case 2:
          return function (n, i) {
            return e.call(t, n, i);
          };

        case 3:
          return function (n, i, o) {
            return e.call(t, n, i, o);
          };
      }

      return function () {
        return e.apply(t, arguments);
      };
    };
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    };
  }, function (e, t, n) {
    var i = n(27),
        o = n(32);
    e.exports = n(5) ? function (e, t, n) {
      return i.f(e, t, o(1, n));
    } : function (e, t, n) {
      return e[t] = n, e;
    };
  }, function (e, t, n) {
    var i = n(28),
        o = n(29),
        r = n(31),
        s = Object.defineProperty;
    t.f = n(5) ? Object.defineProperty : function (e, t, n) {
      if (i(e), t = r(t, !0), i(n), o) try {
        return s(e, t, n);
      } catch (e) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
      return "value" in n && (e[t] = n.value), e;
    };
  }, function (e, t, n) {
    var i = n(4);

    e.exports = function (e) {
      if (!i(e)) throw TypeError(e + " is not an object!");
      return e;
    };
  }, function (e, t, n) {
    e.exports = !n(5) && !n(6)(function () {
      return 7 != Object.defineProperty(n(30)("div"), "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (e, t, n) {
    var i = n(4),
        o = n(3).document,
        r = i(o) && i(o.createElement);

    e.exports = function (e) {
      return r ? o.createElement(e) : {};
    };
  }, function (e, t, n) {
    var i = n(4);

    e.exports = function (e, t) {
      if (!i(e)) return e;
      var n, o;
      if (t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      if ("function" == typeof (n = e.valueOf) && !i(o = n.call(e))) return o;
      if (!t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(34),
        o = n(45),
        r = n(46),
        s = n(47),
        a = n(9),
        l = Object.assign;
    e.exports = !l || n(6)(function () {
      var e = {},
          t = {},
          n = Symbol(),
          i = "abcdefghijklmnopqrst";
      return e[n] = 7, i.split("").forEach(function (e) {
        t[e] = e;
      }), 7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != i;
    }) ? function (e, t) {
      for (var n = s(e), l = arguments.length, u = 1, c = o.f, d = r.f; l > u;) {
        for (var p, h = a(arguments[u++]), f = c ? i(h).concat(c(h)) : i(h), v = f.length, m = 0; v > m;) {
          d.call(h, p = f[m++]) && (n[p] = h[p]);
        }
      }

      return n;
    } : l;
  }, function (e, t, n) {
    var i = n(35),
        o = n(44);

    e.exports = Object.keys || function (e) {
      return i(e, o);
    };
  }, function (e, t, n) {
    var i = n(36),
        o = n(8),
        r = n(38)(!1),
        s = n(41)("IE_PROTO");

    e.exports = function (e, t) {
      var n,
          a = o(e),
          l = 0,
          u = [];

      for (n in a) {
        n != s && i(a, n) && u.push(n);
      }

      for (; t.length > l;) {
        i(a, n = t[l++]) && (~r(u, n) || u.push(n));
      }

      return u;
    };
  }, function (e, t) {
    var n = {}.hasOwnProperty;

    e.exports = function (e, t) {
      return n.call(e, t);
    };
  }, function (e, t) {
    var n = {}.toString;

    e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(39),
        r = n(40);

    e.exports = function (e) {
      return function (t, n, s) {
        var a,
            l = i(t),
            u = o(l.length),
            c = r(s, u);

        if (e && n != n) {
          for (; u > c;) {
            if ((a = l[c++]) != a) return !0;
          }
        } else for (; u > c; c++) {
          if ((e || c in l) && l[c] === n) return e || c || 0;
        }

        return !e && -1;
      };
    };
  }, function (e, t, n) {
    var i = n(11),
        o = Math.min;

    e.exports = function (e) {
      return e > 0 ? o(i(e), 9007199254740991) : 0;
    };
  }, function (e, t, n) {
    var i = n(11),
        o = Math.max,
        r = Math.min;

    e.exports = function (e, t) {
      return (e = i(e)) < 0 ? o(e + t, 0) : r(e, t);
    };
  }, function (e, t, n) {
    var i = n(42)("keys"),
        o = n(43);

    e.exports = function (e) {
      return i[e] || (i[e] = o(e));
    };
  }, function (e, t, n) {
    var i = n(3),
        o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});

    e.exports = function (e) {
      return o[e] || (o[e] = {});
    };
  }, function (e, t) {
    var n = 0,
        i = Math.random();

    e.exports = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36));
    };
  }, function (e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function (e, t) {
    t.f = {}.propertyIsEnumerable;
  }, function (e, t, n) {
    var i = n(10);

    e.exports = function (e) {
      return Object(i(e));
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(12),
        o = n(77),
        r = n(0);

    var s = function s(e) {
      n(49);
    },
        a = Object(r.a)(i.a, o.a, o.b, !1, s, null, null);

    t.a = a.exports;
  }, function (e, t) {}, function (e, t) {
    e.exports = function (e, t, n) {
      var i, o, r, s, a;

      function l() {
        var u = Date.now() - s;
        u < t && u >= 0 ? i = setTimeout(l, t - u) : (i = null, n || (a = e.apply(r, o), r = o = null));
      }

      null == t && (t = 100);

      var u = function u() {
        r = this, o = arguments, s = Date.now();
        var u = n && !i;
        return i || (i = setTimeout(l, t)), u && (a = e.apply(r, o), r = o = null), a;
      };

      return u.clear = function () {
        i && (clearTimeout(i), i = null);
      }, u.flush = function () {
        i && (a = e.apply(r, o), r = o = null, clearTimeout(i), i = null);
      }, u;
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(13),
        o = n(52),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        on: {
          mousedown: e.onBtnClick
        }
      }, [n("a", {
        class: "vw-btn-" + e.module.title,
        domProps: {
          innerHTML: e._s(e.module.icon)
        }
      }), n("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.showDashboard,
          expression: "showDashboard"
        }],
        ref: "dashboard",
        staticClass: "dashboard"
      }, [e.module.render ? e._m(0) : e._e()], 1)]);
    },
        o = [function () {
      var e = this.$createElement;
      return (this._self._c || e)(this.module, {
        ref: "moduleDashboard",
        tag: "component",
        attrs: {
          uid: this.uid,
          options: this.options
        },
        on: {
          exec: this.exec
        }
      });
    }];
  }, function (e, t) {
    e.exports = {
      title: "bold",
      action: ["bold"],
      description: "Bold",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68.5.5t67.5.5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "italic",
      description: "Italic",
      action: ["italic"],
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M384 1662l17-85q6-2 81.5-21.5t111.5-37.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "underline",
      action: ["underline"],
      description: "Underline",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyLeft",
      action: ["justifyLeft"],
      description: "Justify Left",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyCenter",
      action: ["justifyCenter"],
      description: "Center",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h896q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-640q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h640q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "justifyRight",
      action: ["justifyRight"],
      description: "Justify Right",
      icon: '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"/></svg>'
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(14),
        o = n(60),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", [n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H1")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H2")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H3")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H4")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H5")]), e._v(" "), n("button", {
        attrs: {
          type: "button"
        },
        on: {
          click: e.insertHeading
        }
      }, [e._v("H6")])]);
    },
        o = [];
  }, function (e, t, n) {
    "use strict";

    var i = n(15),
        o = n(62),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("form", {
        on: {
          submit: function submit(t) {
            t.preventDefault(), e.insertLink(t);
          }
        }
      }, [n("label", [e._v("\n        URL\n        "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.url,
          expression: "url"
        }],
        ref: "url",
        staticStyle: {
          width: "40%"
        },
        attrs: {
          type: "text"
        },
        domProps: {
          value: e.url
        },
        on: {
          input: function input(t) {
            t.target.composing || (e.url = t.target.value);
          }
        }
      })]), e._v(" "), n("label", [e._v("\n        Link Title\n        "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.title,
          expression: "title"
        }],
        staticStyle: {
          width: "40%"
        },
        attrs: {
          type: "text"
        },
        domProps: {
          value: e.title
        },
        on: {
          input: function input(t) {
            t.target.composing || (e.title = t.target.value);
          }
        }
      })]), e._v(" "), n("button", {
        attrs: {
          type: "submit"
        }
      }, [e._v("Insert")])]);
    },
        o = [];
  }, function (e, t) {
    e.exports = {
      title: "code",
      icon: '<svg height="1792" viewBox="0 0 1792 1792" width="1792" xmlns="http://www.w3.org/2000/svg"><path d="M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"/></svg>',
      description: "Code",
      action: ["formatBlock", "pre"]
    };
  }, function (e, t) {
    e.exports = {
      title: "orderedList",
      action: ["insertOrderedList"],
      description: "Ordered List (1, 2, 3)",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-122t.5-121v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "unorderedList",
      action: ["insertUnorderedList"],
      description: "Bullet List",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"/></svg>'
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(16),
        o = n(71),
        r = n(0),
        s = Object(r.a)(i.a, o.a, o.b, !1, null, null, null);
    t.a = s.exports;
  }, function (e, t, n) {
    var i;
    i = function i() {
      "use strict";

      var e = {
        getSignedURL: function getSignedURL(e, t) {
          var n = {
            filePath: e.name,
            contentType: e.type
          };
          return new Promise(function (i, o) {
            var r = new FormData(),
                s = new XMLHttpRequest(),
                a = "function" == typeof t.signingURL ? t.signingURL(e) : t.signingURL;
            s.open("POST", a), s.onload = function () {
              200 == s.status ? i(JSON.parse(s.response)) : o(s.statusText);
            }, s.onerror = function (e) {
              console.error("Network Error : Could not send request to AWS (Maybe CORS errors)"), o(e);
            }, Object.entries(t.headers || {}).forEach(function (e) {
              var t = e[0],
                  n = e[1];
              s.setRequestHeader(t, n);
            }), n = Object.assign(n, t.params || {}), Object.entries(n).forEach(function (e) {
              var t = e[0],
                  n = e[1];
              r.append(t, n);
            }), s.send(r);
          });
        },
        sendFile: function sendFile(e, t) {
          var n = new FormData();
          return this.getSignedURL(e, t).then(function (t) {
            var i = t.signature;
            return Object.keys(i).forEach(function (e) {
              n.append(e, i[e]);
            }), n.append("file", e), new Promise(function (e, i) {
              var o = new XMLHttpRequest();
              o.open("POST", t.postEndpoint), o.onload = function () {
                if (201 == o.status) {
                  var t = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[0].innerHTML;
                  e({
                    success: !0,
                    message: t
                  });
                } else {
                  var n = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[0].innerHTML;
                  i({
                    success: !1,
                    message: n + ". Request is marked as resolved when returns as status 201"
                  });
                }
              }, o.onerror = function (e) {
                var t = new window.DOMParser().parseFromString(o.response, "text/xml").firstChild.children[1].innerHTML;
                i({
                  success: !1,
                  message: t
                });
              }, o.send(n);
            });
          }).catch(function (e) {
            return e;
          });
        }
      };
      return {
        render: function render() {
          var e = this,
              t = e.$createElement;
          return (e._self._c || t)("div", {
            ref: "dropzoneElement",
            class: {
              "vue-dropzone dropzone": e.includeStyling
            },
            attrs: {
              id: e.id
            }
          });
        },
        staticRenderFns: [],
        props: {
          id: {
            type: String,
            required: !0
          },
          options: {
            type: Object,
            required: !0
          },
          includeStyling: {
            type: Boolean,
            default: !0,
            required: !1
          },
          awss3: {
            type: Object,
            required: !1,
            default: null
          },
          destroyDropzone: {
            type: Boolean,
            default: !0,
            required: !1
          }
        },
        data: function data() {
          return {
            isS3: !1,
            wasQueueAutoProcess: !0
          };
        },
        computed: {
          dropzoneSettings: function dropzoneSettings() {
            var e = {
              thumbnailWidth: 200,
              thumbnailHeight: 200
            };
            return Object.keys(this.options).forEach(function (t) {
              e[t] = this.options[t];
            }, this), null !== this.awss3 && (e.autoProcessQueue = !1, this.isS3 = !0, void 0 !== this.options.autoProcessQueue && (this.wasQueueAutoProcess = this.options.autoProcessQueue)), e;
          }
        },
        methods: {
          manuallyAddFile: function manuallyAddFile(e, t) {
            e.manuallyAdded = !0, this.dropzone.emit("addedfile", e), t && this.dropzone.emit("thumbnail", e, t);

            for (var n = e.previewElement.querySelectorAll("[data-dz-thumbnail]"), i = 0; i < n.length; i++) {
              n[i].style.width = this.dropzoneSettings.thumbnailWidth + "px", n[i].style.height = this.dropzoneSettings.thumbnailHeight + "px", n[i].style["object-fit"] = "contain";
            }

            this.dropzone.emit("complete", e), this.dropzone.options.maxFiles && this.dropzone.options.maxFiles--, this.dropzone.files.push(e), this.$emit("vdropzone-file-added-manually", e);
          },
          setOption: function setOption(e, t) {
            this.dropzone.options[e] = t;
          },
          removeAllFiles: function removeAllFiles(e) {
            this.dropzone.removeAllFiles(e);
          },
          processQueue: function processQueue() {
            var e = this,
                t = this.dropzone;
            this.isS3 && !this.wasQueueAutoProcess ? this.getQueuedFiles().forEach(function (t) {
              e.getSignedAndUploadToS3(t);
            }) : this.dropzone.processQueue(), this.dropzone.on("success", function () {
              t.options.autoProcessQueue = !0;
            }), this.dropzone.on("queuecomplete", function () {
              t.options.autoProcessQueue = !1;
            });
          },
          init: function init() {
            return this.dropzone.init();
          },
          destroy: function destroy() {
            return this.dropzone.destroy();
          },
          updateTotalUploadProgress: function updateTotalUploadProgress() {
            return this.dropzone.updateTotalUploadProgress();
          },
          getFallbackForm: function getFallbackForm() {
            return this.dropzone.getFallbackForm();
          },
          getExistingFallback: function getExistingFallback() {
            return this.dropzone.getExistingFallback();
          },
          setupEventListeners: function setupEventListeners() {
            return this.dropzone.setupEventListeners();
          },
          removeEventListeners: function removeEventListeners() {
            return this.dropzone.removeEventListeners();
          },
          disable: function disable() {
            return this.dropzone.disable();
          },
          enable: function enable() {
            return this.dropzone.enable();
          },
          filesize: function filesize(e) {
            return this.dropzone.filesize(e);
          },
          accept: function accept(e, t) {
            return this.dropzone.accept(e, t);
          },
          addFile: function addFile(e) {
            return this.dropzone.addFile(e);
          },
          removeFile: function removeFile(e) {
            this.dropzone.removeFile(e);
          },
          getAcceptedFiles: function getAcceptedFiles() {
            return this.dropzone.getAcceptedFiles();
          },
          getRejectedFiles: function getRejectedFiles() {
            return this.dropzone.getRejectedFiles();
          },
          getFilesWithStatus: function getFilesWithStatus() {
            return this.dropzone.getFilesWithStatus();
          },
          getQueuedFiles: function getQueuedFiles() {
            return this.dropzone.getQueuedFiles();
          },
          getUploadingFiles: function getUploadingFiles() {
            return this.dropzone.getUploadingFiles();
          },
          getAddedFiles: function getAddedFiles() {
            return this.dropzone.getAddedFiles();
          },
          getActiveFiles: function getActiveFiles() {
            return this.dropzone.getActiveFiles();
          },
          getSignedAndUploadToS3: function getSignedAndUploadToS3(t) {
            var n = this;
            e.sendFile(t, this.awss3).then(function (e) {
              e.success ? (t.s3ObjectLocation = e.message, setTimeout(function () {
                return n.dropzone.processFile(t);
              }), n.$emit("vdropzone-s3-upload-success", e.message)) : "undefined" != typeof message ? n.$emit("vdropzone-s3-upload-error", e.message) : n.$emit("vdropzone-s3-upload-error", "Network Error : Could not send request to AWS. (Maybe CORS error)");
            }).catch(function (e) {
              alert(e);
            });
          },
          setAWSSigningURL: function setAWSSigningURL(e) {
            this.isS3 && (this.awss3.signingURL = e);
          }
        },
        mounted: function mounted() {
          if (!this.$isServer || !this.hasBeenMounted) {
            this.hasBeenMounted = !0;
            var e = n(68);
            e.autoDiscover = !1, this.dropzone = new e(this.$refs.dropzoneElement, this.dropzoneSettings);
            var t = this;
            this.dropzone.on("thumbnail", function (e, n) {
              t.$emit("vdropzone-thumbnail", e, n);
            }), this.dropzone.on("addedfile", function (e) {
              t.duplicateCheck && this.files.length && this.files.forEach(function (n) {
                n.name === e.name && (this.removeFile(e), t.$emit("duplicate-file", e));
              }, this), t.$emit("vdropzone-file-added", e), t.isS3 && t.wasQueueAutoProcess && t.getSignedAndUploadToS3(e);
            }), this.dropzone.on("addedfiles", function (e) {
              t.$emit("vdropzone-files-added", e);
            }), this.dropzone.on("removedfile", function (e) {
              t.$emit("vdropzone-removed-file", e), e.manuallyAdded && t.dropzone.options.maxFiles++;
            }), this.dropzone.on("success", function (e, n) {
              t.$emit("vdropzone-success", e, n), t.isS3 && t.wasQueueAutoProcess && t.setOption("autoProcessQueue", !1);
            }), this.dropzone.on("successmultiple", function (e, n) {
              t.$emit("vdropzone-success-multiple", e, n);
            }), this.dropzone.on("error", function (e, n, i) {
              t.$emit("vdropzone-error", e, n, i);
            }), this.dropzone.on("errormultiple", function (e, n, i) {
              t.$emit("vdropzone-error-multiple", e, n, i);
            }), this.dropzone.on("sending", function (e, n, i) {
              t.isS3 && i.append("s3ObjectLocation", e.s3ObjectLocation), t.$emit("vdropzone-sending", e, n, i);
            }), this.dropzone.on("sendingmultiple", function (e, n, i) {
              t.$emit("vdropzone-sending-multiple", e, n, i);
            }), this.dropzone.on("complete", function (e) {
              t.$emit("vdropzone-complete", e);
            }), this.dropzone.on("completemultiple", function (e) {
              t.$emit("vdropzone-complete-multiple", e);
            }), this.dropzone.on("canceled", function (e) {
              t.$emit("vdropzone-canceled", e);
            }), this.dropzone.on("canceledmultiple", function (e) {
              t.$emit("vdropzone-canceled-multiple", e);
            }), this.dropzone.on("maxfilesreached", function (e) {
              t.$emit("vdropzone-max-files-reached", e);
            }), this.dropzone.on("maxfilesexceeded", function (e) {
              t.$emit("vdropzone-max-files-exceeded", e);
            }), this.dropzone.on("processing", function (e) {
              t.$emit("vdropzone-processing", e);
            }), this.dropzone.on("processing", function (e) {
              t.$emit("vdropzone-processing", e);
            }), this.dropzone.on("processingmultiple", function (e) {
              t.$emit("vdropzone-processing-multiple", e);
            }), this.dropzone.on("uploadprogress", function (e, n, i) {
              t.$emit("vdropzone-upload-progress", e, n, i);
            }), this.dropzone.on("totaluploadprogress", function (e, n, i) {
              t.$emit("vdropzone-total-upload-progress", e, n, i);
            }), this.dropzone.on("reset", function () {
              t.$emit("vdropzone-reset");
            }), this.dropzone.on("queuecomplete", function () {
              t.$emit("vdropzone-queue-complete");
            }), this.dropzone.on("drop", function (e) {
              t.$emit("vdropzone-drop", e);
            }), this.dropzone.on("dragstart", function (e) {
              t.$emit("vdropzone-drag-start", e);
            }), this.dropzone.on("dragend", function (e) {
              t.$emit("vdropzone-drag-end", e);
            }), this.dropzone.on("dragenter", function (e) {
              t.$emit("vdropzone-drag-enter", e);
            }), this.dropzone.on("dragover", function (e) {
              t.$emit("vdropzone-drag-over", e);
            }), this.dropzone.on("dragleave", function (e) {
              t.$emit("vdropzone-drag-leave", e);
            }), t.$emit("vdropzone-mounted");
          }
        },
        beforeDestroy: function beforeDestroy() {
          this.destroyDropzone && this.dropzone.destroy();
        }
      };
    }, e.exports = i();
  }, function (e, t, n) {
    "use strict";

    (function (e) {
      var t = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
          }
        }

        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      }();

      function n(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
      }

      function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }

      var o = function () {
        function e() {
          i(this, e);
        }

        return t(e, [{
          key: "on",
          value: function value(e, t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || (this._callbacks[e] = []), this._callbacks[e].push(t), this;
          }
        }, {
          key: "emit",
          value: function value(e) {
            this._callbacks = this._callbacks || {};
            var t = this._callbacks[e];

            if (t) {
              for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) {
                i[o - 1] = arguments[o];
              }

              for (var r = 0, s = s = t;;) {
                if (r >= s.length) break;
                s[r++].apply(this, i);
              }
            }

            return this;
          }
        }, {
          key: "off",
          value: function value(e, t) {
            if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks[e];
            if (!n) return this;
            if (1 === arguments.length) return delete this._callbacks[e], this;

            for (var i = 0; i < n.length; i++) {
              if (n[i] === t) {
                n.splice(i, 1);
                break;
              }
            }

            return this;
          }
        }]), e;
      }(),
          r = function (e) {
        function r(e, t) {
          i(this, r);
          var o,
              s = n(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this)),
              a = void 0;
          if (s.element = e, s.version = r.version, s.defaultOptions.previewTemplate = s.defaultOptions.previewTemplate.replace(/\n*/g, ""), s.clickableElements = [], s.listeners = [], s.files = [], "string" == typeof s.element && (s.element = document.querySelector(s.element)), !s.element || null == s.element.nodeType) throw new Error("Invalid dropzone element.");
          if (s.element.dropzone) throw new Error("Dropzone already attached.");
          r.instances.push(s), s.element.dropzone = s;
          var l,
              u = null != (o = r.optionsForElement(s.element)) ? o : {};
          if (s.options = r.extend({}, s.defaultOptions, u, null != t ? t : {}), s.options.forceFallback || !r.isBrowserSupported()) return l = s.options.fallback.call(s), n(s, l);
          if (null == s.options.url && (s.options.url = s.element.getAttribute("action")), !s.options.url) throw new Error("No URL provided.");
          if (s.options.acceptedFiles && s.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
          if (s.options.uploadMultiple && s.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
          return s.options.acceptedMimeTypes && (s.options.acceptedFiles = s.options.acceptedMimeTypes, delete s.options.acceptedMimeTypes), null != s.options.renameFilename && (s.options.renameFile = function (e) {
            return s.options.renameFilename.call(s, e.name, e);
          }), s.options.method = s.options.method.toUpperCase(), (a = s.getExistingFallback()) && a.parentNode && a.parentNode.removeChild(a), !1 !== s.options.previewsContainer && (s.options.previewsContainer ? s.previewsContainer = r.getElement(s.options.previewsContainer, "previewsContainer") : s.previewsContainer = s.element), s.options.clickable && (!0 === s.options.clickable ? s.clickableElements = [s.element] : s.clickableElements = r.getElements(s.options.clickable, "clickable")), s.init(), s;
        }

        return function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        }(r, o), t(r, null, [{
          key: "initClass",
          value: function value() {
            this.prototype.Emitter = o, this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], this.prototype.defaultOptions = {
              url: null,
              method: "post",
              withCredentials: !1,
              timeout: 3e4,
              parallelUploads: 2,
              uploadMultiple: !1,
              chunking: !1,
              forceChunking: !1,
              chunkSize: 2e6,
              parallelChunkUploads: !1,
              retryChunks: !1,
              retryChunksLimit: 3,
              maxFilesize: 256,
              paramName: "file",
              createImageThumbnails: !0,
              maxThumbnailFilesize: 10,
              thumbnailWidth: 120,
              thumbnailHeight: 120,
              thumbnailMethod: "crop",
              resizeWidth: null,
              resizeHeight: null,
              resizeMimeType: null,
              resizeQuality: .8,
              resizeMethod: "contain",
              filesizeBase: 1e3,
              maxFiles: null,
              headers: null,
              clickable: !0,
              ignoreHiddenFiles: !0,
              acceptedFiles: null,
              acceptedMimeTypes: null,
              autoProcessQueue: !0,
              autoQueue: !0,
              addRemoveLinks: !1,
              previewsContainer: null,
              hiddenInputContainer: "body",
              capture: null,
              renameFilename: null,
              renameFile: null,
              forceFallback: !1,
              dictDefaultMessage: "Drop files here to upload",
              dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
              dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
              dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
              dictInvalidFileType: "You can't upload files of this type.",
              dictResponseError: "Server responded with {{statusCode}} code.",
              dictCancelUpload: "Cancel upload",
              dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
              dictRemoveFile: "Remove file",
              dictRemoveFileConfirmation: null,
              dictMaxFilesExceeded: "You can not upload any more files.",
              dictFileSizeUnits: {
                tb: "TB",
                gb: "GB",
                mb: "MB",
                kb: "KB",
                b: "b"
              },
              init: function init() {},
              params: function params(e, t, n) {
                if (n) return {
                  dzuuid: n.file.upload.uuid,
                  dzchunkindex: n.index,
                  dztotalfilesize: n.file.size,
                  dzchunksize: this.options.chunkSize,
                  dztotalchunkcount: n.file.upload.totalChunkCount,
                  dzchunkbyteoffset: n.index * this.options.chunkSize
                };
              },
              accept: function accept(e, t) {
                return t();
              },
              chunksUploaded: function chunksUploaded(e, t) {
                t();
              },
              fallback: function fallback() {
                var e = void 0;
                this.element.className = this.element.className + " dz-browser-not-supported";

                for (var t = 0, n = n = this.element.getElementsByTagName("div");;) {
                  if (t >= n.length) break;
                  var i = n[t++];

                  if (/(^| )dz-message($| )/.test(i.className)) {
                    e = i, i.className = "dz-message";
                    break;
                  }
                }

                e || (e = r.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(e));
                var o = e.getElementsByTagName("span")[0];
                return o && (null != o.textContent ? o.textContent = this.options.dictFallbackMessage : null != o.innerText && (o.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm());
              },
              resize: function resize(e, t, n, i) {
                var o = {
                  srcX: 0,
                  srcY: 0,
                  srcWidth: e.width,
                  srcHeight: e.height
                },
                    r = e.width / e.height;
                null == t && null == n ? (t = o.srcWidth, n = o.srcHeight) : null == t ? t = n * r : null == n && (n = t / r);
                var s = (t = Math.min(t, o.srcWidth)) / (n = Math.min(n, o.srcHeight));
                if (o.srcWidth > t || o.srcHeight > n) if ("crop" === i) r > s ? (o.srcHeight = e.height, o.srcWidth = o.srcHeight * s) : (o.srcWidth = e.width, o.srcHeight = o.srcWidth / s);else {
                  if ("contain" !== i) throw new Error("Unknown resizeMethod '" + i + "'");
                  r > s ? n = t / r : t = n * r;
                }
                return o.srcX = (e.width - o.srcWidth) / 2, o.srcY = (e.height - o.srcHeight) / 2, o.trgWidth = t, o.trgHeight = n, o;
              },
              transformFile: function transformFile(e, t) {
                return (this.options.resizeWidth || this.options.resizeHeight) && e.type.match(/image.*/) ? this.resizeImage(e, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, t) : t(e);
              },
              previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',
              drop: function drop(e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              dragstart: function dragstart(e) {},
              dragend: function dragend(e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              dragenter: function dragenter(e) {
                return this.element.classList.add("dz-drag-hover");
              },
              dragover: function dragover(e) {
                return this.element.classList.add("dz-drag-hover");
              },
              dragleave: function dragleave(e) {
                return this.element.classList.remove("dz-drag-hover");
              },
              paste: function paste(e) {},
              reset: function reset() {
                return this.element.classList.remove("dz-started");
              },
              addedfile: function addedfile(e) {
                var t = this;

                if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                  e.previewElement = r.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, this.previewsContainer.appendChild(e.previewElement);

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-name]");;) {
                    if (n >= i.length) break;
                    var o = i[n++];
                    o.textContent = e.name;
                  }

                  for (var s = 0, a = a = e.previewElement.querySelectorAll("[data-dz-size]"); !(s >= a.length);) {
                    (o = a[s++]).innerHTML = this.filesize(e.size);
                  }

                  this.options.addRemoveLinks && (e._removeLink = r.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), e.previewElement.appendChild(e._removeLink));

                  for (var l = function l(n) {
                    return n.preventDefault(), n.stopPropagation(), e.status === r.UPLOADING ? r.confirm(t.options.dictCancelUploadConfirmation, function () {
                      return t.removeFile(e);
                    }) : t.options.dictRemoveFileConfirmation ? r.confirm(t.options.dictRemoveFileConfirmation, function () {
                      return t.removeFile(e);
                    }) : t.removeFile(e);
                  }, u = 0, c = c = e.previewElement.querySelectorAll("[data-dz-remove]");;) {
                    if (u >= c.length) break;
                    c[u++].addEventListener("click", l);
                  }
                }
              },
              removedfile: function removedfile(e) {
                return null != e.previewElement && null != e.previewElement.parentNode && e.previewElement.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass();
              },
              thumbnail: function thumbnail(e, t) {
                if (e.previewElement) {
                  e.previewElement.classList.remove("dz-file-preview");

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-thumbnail]");;) {
                    if (n >= i.length) break;
                    var o = i[n++];
                    o.alt = e.name, o.src = t;
                  }

                  return setTimeout(function () {
                    return e.previewElement.classList.add("dz-image-preview");
                  }, 1);
                }
              },
              error: function error(e, t) {
                if (e.previewElement) {
                  e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error);

                  for (var n = 0, i = i = e.previewElement.querySelectorAll("[data-dz-errormessage]");;) {
                    if (n >= i.length) break;
                    i[n++].textContent = t;
                  }
                }
              },
              errormultiple: function errormultiple() {},
              processing: function processing(e) {
                if (e.previewElement && (e.previewElement.classList.add("dz-processing"), e._removeLink)) return e._removeLink.textContent = this.options.dictCancelUpload;
              },
              processingmultiple: function processingmultiple() {},
              uploadprogress: function uploadprogress(e, t, n) {
                if (e.previewElement) for (var i = 0, o = o = e.previewElement.querySelectorAll("[data-dz-uploadprogress]");;) {
                  if (i >= o.length) break;
                  var r = o[i++];
                  "PROGRESS" === r.nodeName ? r.value = t : r.style.width = t + "%";
                }
              },
              totaluploadprogress: function totaluploadprogress() {},
              sending: function sending() {},
              sendingmultiple: function sendingmultiple() {},
              success: function success(e) {
                if (e.previewElement) return e.previewElement.classList.add("dz-success");
              },
              successmultiple: function successmultiple() {},
              canceled: function canceled(e) {
                return this.emit("error", e, "Upload canceled.");
              },
              canceledmultiple: function canceledmultiple() {},
              complete: function complete(e) {
                if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement) return e.previewElement.classList.add("dz-complete");
              },
              completemultiple: function completemultiple() {},
              maxfilesexceeded: function maxfilesexceeded() {},
              maxfilesreached: function maxfilesreached() {},
              queuecomplete: function queuecomplete() {},
              addedfiles: function addedfiles() {}
            }, this.prototype._thumbnailQueue = [], this.prototype._processingThumbnail = !1;
          }
        }, {
          key: "extend",
          value: function value(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
              n[i - 1] = arguments[i];
            }

            for (var o = 0, r = r = n;;) {
              if (o >= r.length) break;
              var s = r[o++];

              for (var a in s) {
                var l = s[a];
                e[a] = l;
              }
            }

            return e;
          }
        }]), t(r, [{
          key: "getAcceptedFiles",
          value: function value() {
            return this.files.filter(function (e) {
              return e.accepted;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getRejectedFiles",
          value: function value() {
            return this.files.filter(function (e) {
              return !e.accepted;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getFilesWithStatus",
          value: function value(e) {
            return this.files.filter(function (t) {
              return t.status === e;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "getQueuedFiles",
          value: function value() {
            return this.getFilesWithStatus(r.QUEUED);
          }
        }, {
          key: "getUploadingFiles",
          value: function value() {
            return this.getFilesWithStatus(r.UPLOADING);
          }
        }, {
          key: "getAddedFiles",
          value: function value() {
            return this.getFilesWithStatus(r.ADDED);
          }
        }, {
          key: "getActiveFiles",
          value: function value() {
            return this.files.filter(function (e) {
              return e.status === r.UPLOADING || e.status === r.QUEUED;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "init",
          value: function value() {
            var e = this;

            if ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(r.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length) {
              !function t() {
                return e.hiddenFileInput && e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput), e.hiddenFileInput = document.createElement("input"), e.hiddenFileInput.setAttribute("type", "file"), (null === e.options.maxFiles || e.options.maxFiles > 1) && e.hiddenFileInput.setAttribute("multiple", "multiple"), e.hiddenFileInput.className = "dz-hidden-input", null !== e.options.acceptedFiles && e.hiddenFileInput.setAttribute("accept", e.options.acceptedFiles), null !== e.options.capture && e.hiddenFileInput.setAttribute("capture", e.options.capture), e.hiddenFileInput.style.visibility = "hidden", e.hiddenFileInput.style.position = "absolute", e.hiddenFileInput.style.top = "0", e.hiddenFileInput.style.left = "0", e.hiddenFileInput.style.height = "0", e.hiddenFileInput.style.width = "0", document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput), e.hiddenFileInput.addEventListener("change", function () {
                  var n = e.hiddenFileInput.files;
                  if (n.length) for (var i = 0, o = o = n; !(i >= o.length);) {
                    var r = o[i++];
                    e.addFile(r);
                  }
                  return e.emit("addedfiles", n), t();
                });
              }();
            }

            this.URL = null !== window.URL ? window.URL : window.webkitURL;

            for (var t = 0, n = n = this.events;;) {
              if (t >= n.length) break;
              var i = n[t++];
              this.on(i, this.options[i]);
            }

            this.on("uploadprogress", function () {
              return e.updateTotalUploadProgress();
            }), this.on("removedfile", function () {
              return e.updateTotalUploadProgress();
            }), this.on("canceled", function (t) {
              return e.emit("complete", t);
            }), this.on("complete", function (t) {
              if (0 === e.getAddedFiles().length && 0 === e.getUploadingFiles().length && 0 === e.getQueuedFiles().length) return setTimeout(function () {
                return e.emit("queuecomplete");
              }, 0);
            });

            var o = function o(e) {
              return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            };

            return this.listeners = [{
              element: this.element,
              events: {
                dragstart: function dragstart(t) {
                  return e.emit("dragstart", t);
                },
                dragenter: function dragenter(t) {
                  return o(t), e.emit("dragenter", t);
                },
                dragover: function dragover(t) {
                  var n = void 0;

                  try {
                    n = t.dataTransfer.effectAllowed;
                  } catch (e) {}

                  return t.dataTransfer.dropEffect = "move" === n || "linkMove" === n ? "move" : "copy", o(t), e.emit("dragover", t);
                },
                dragleave: function dragleave(t) {
                  return e.emit("dragleave", t);
                },
                drop: function drop(t) {
                  return o(t), e.drop(t);
                },
                dragend: function dragend(t) {
                  return e.emit("dragend", t);
                }
              }
            }], this.clickableElements.forEach(function (t) {
              return e.listeners.push({
                element: t,
                events: {
                  click: function click(n) {
                    return (t !== e.element || n.target === e.element || r.elementInside(n.target, e.element.querySelector(".dz-message"))) && e.hiddenFileInput.click(), !0;
                  }
                }
              });
            }), this.enable(), this.options.init.call(this);
          }
        }, {
          key: "destroy",
          value: function value() {
            return this.disable(), this.removeAllFiles(!0), (null != this.hiddenFileInput ? this.hiddenFileInput.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, r.instances.splice(r.instances.indexOf(this), 1);
          }
        }, {
          key: "updateTotalUploadProgress",
          value: function value() {
            var e = void 0,
                t = 0,
                n = 0;

            if (this.getActiveFiles().length) {
              for (var i = 0, o = o = this.getActiveFiles();;) {
                if (i >= o.length) break;
                var r = o[i++];
                t += r.upload.bytesSent, n += r.upload.total;
              }

              e = 100 * t / n;
            } else e = 100;

            return this.emit("totaluploadprogress", e, n, t);
          }
        }, {
          key: "_getParamName",
          value: function value(e) {
            return "function" == typeof this.options.paramName ? this.options.paramName(e) : this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "");
          }
        }, {
          key: "_renameFile",
          value: function value(e) {
            return "function" != typeof this.options.renameFile ? e.name : this.options.renameFile(e);
          }
        }, {
          key: "getFallbackForm",
          value: function value() {
            var e,
                t = void 0;
            if (e = this.getExistingFallback()) return e;
            var n = '<div class="dz-fallback">';
            this.options.dictFallbackText && (n += "<p>" + this.options.dictFallbackText + "</p>"), n += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>';
            var i = r.createElement(n);
            return "FORM" !== this.element.tagName ? (t = r.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>')).appendChild(i) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != t ? t : i;
          }
        }, {
          key: "getExistingFallback",
          value: function value() {
            for (var e = function e(_e) {
              for (var t = 0, n = n = _e;;) {
                if (t >= n.length) break;
                var i = n[t++];
                if (/(^| )fallback($| )/.test(i.className)) return i;
              }
            }, t = ["div", "form"], n = 0; n < t.length; n++) {
              var i,
                  o = t[n];
              if (i = e(this.element.getElementsByTagName(o))) return i;
            }
          }
        }, {
          key: "setupEventListeners",
          value: function value() {
            return this.listeners.map(function (e) {
              return function () {
                var t = [];

                for (var n in e.events) {
                  var i = e.events[n];
                  t.push(e.element.addEventListener(n, i, !1));
                }

                return t;
              }();
            });
          }
        }, {
          key: "removeEventListeners",
          value: function value() {
            return this.listeners.map(function (e) {
              return function () {
                var t = [];

                for (var n in e.events) {
                  var i = e.events[n];
                  t.push(e.element.removeEventListener(n, i, !1));
                }

                return t;
              }();
            });
          }
        }, {
          key: "disable",
          value: function value() {
            var e = this;
            return this.clickableElements.forEach(function (e) {
              return e.classList.remove("dz-clickable");
            }), this.removeEventListeners(), this.files.map(function (t) {
              return e.cancelUpload(t);
            });
          }
        }, {
          key: "enable",
          value: function value() {
            return this.clickableElements.forEach(function (e) {
              return e.classList.add("dz-clickable");
            }), this.setupEventListeners();
          }
        }, {
          key: "filesize",
          value: function value(e) {
            var t = 0,
                n = "b";

            if (e > 0) {
              for (var i = ["tb", "gb", "mb", "kb", "b"], o = 0; o < i.length; o++) {
                var r = i[o];

                if (e >= Math.pow(this.options.filesizeBase, 4 - o) / 10) {
                  t = e / Math.pow(this.options.filesizeBase, 4 - o), n = r;
                  break;
                }
              }

              t = Math.round(10 * t) / 10;
            }

            return "<strong>" + t + "</strong> " + this.options.dictFileSizeUnits[n];
          }
        }, {
          key: "_updateMaxFilesReachedClass",
          value: function value() {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached");
          }
        }, {
          key: "drop",
          value: function value(e) {
            if (e.dataTransfer) {
              this.emit("drop", e);
              var t = e.dataTransfer.files;

              if (this.emit("addedfiles", t), t.length) {
                var n = e.dataTransfer.items;
                n && n.length && null != n[0].webkitGetAsEntry ? this._addFilesFromItems(n) : this.handleFiles(t);
              }
            }
          }
        }, {
          key: "paste",
          value: function value(e) {
            if (null != (void 0 !== (t = null != e ? e.clipboardData : void 0) && null !== t ? function (e) {
              return e.items;
            }(t) : void 0)) {
              var t;
              this.emit("paste", e);
              var n = e.clipboardData.items;
              return n.length ? this._addFilesFromItems(n) : void 0;
            }
          }
        }, {
          key: "handleFiles",
          value: function value(e) {
            var t = this;
            return e.map(function (e) {
              return t.addFile(e);
            });
          }
        }, {
          key: "_addFilesFromItems",
          value: function value(e) {
            var t = this;
            return function () {
              for (var n = [], i = 0, o = o = e;;) {
                if (i >= o.length) break;
                var r,
                    s = o[i++];
                null != s.webkitGetAsEntry && (r = s.webkitGetAsEntry()) ? r.isFile ? n.push(t.addFile(s.getAsFile())) : r.isDirectory ? n.push(t._addFilesFromDirectory(r, r.name)) : n.push(void 0) : null != s.getAsFile && (null == s.kind || "file" === s.kind) ? n.push(t.addFile(s.getAsFile())) : n.push(void 0);
              }

              return n;
            }();
          }
        }, {
          key: "_addFilesFromDirectory",
          value: function value(e, t) {
            var n = this,
                i = e.createReader(),
                o = function o(e) {
              return t = console, n = "log", i = function i(t) {
                return t.log(e);
              }, void 0 !== t && null !== t && "function" == typeof t[n] ? i(t, n) : void 0;
              var t, n, i;
            };

            return function e() {
              return i.readEntries(function (i) {
                if (i.length > 0) {
                  for (var o = 0, r = r = i; !(o >= r.length);) {
                    var s = r[o++];
                    s.isFile ? s.file(function (e) {
                      if (!n.options.ignoreHiddenFiles || "." !== e.name.substring(0, 1)) return e.fullPath = t + "/" + e.name, n.addFile(e);
                    }) : s.isDirectory && n._addFilesFromDirectory(s, t + "/" + s.name);
                  }

                  e();
                }

                return null;
              }, o);
            }();
          }
        }, {
          key: "accept",
          value: function value(e, t) {
            return e.size > 1024 * this.options.maxFilesize * 1024 ? t(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : r.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, t) : t(this.options.dictInvalidFileType);
          }
        }, {
          key: "addFile",
          value: function value(e) {
            var t = this;
            return e.upload = {
              uuid: r.uuidv4(),
              progress: 0,
              total: e.size,
              bytesSent: 0,
              filename: this._renameFile(e),
              chunked: this.options.chunking && (this.options.forceChunking || e.size > this.options.chunkSize),
              totalChunkCount: Math.ceil(e.size / this.options.chunkSize)
            }, this.files.push(e), e.status = r.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), this.accept(e, function (n) {
              return n ? (e.accepted = !1, t._errorProcessing([e], n)) : (e.accepted = !0, t.options.autoQueue && t.enqueueFile(e)), t._updateMaxFilesReachedClass();
            });
          }
        }, {
          key: "enqueueFiles",
          value: function value(e) {
            for (var t = 0, n = n = e;;) {
              if (t >= n.length) break;
              var i = n[t++];
              this.enqueueFile(i);
            }

            return null;
          }
        }, {
          key: "enqueueFile",
          value: function value(e) {
            var t = this;
            if (e.status !== r.ADDED || !0 !== e.accepted) throw new Error("This file can't be queued because it has already been processed or was rejected.");
            if (e.status = r.QUEUED, this.options.autoProcessQueue) return setTimeout(function () {
              return t.processQueue();
            }, 0);
          }
        }, {
          key: "_enqueueThumbnail",
          value: function value(e) {
            var t = this;
            if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024) return this._thumbnailQueue.push(e), setTimeout(function () {
              return t._processThumbnailQueue();
            }, 0);
          }
        }, {
          key: "_processThumbnailQueue",
          value: function value() {
            var e = this;

            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) {
              this._processingThumbnail = !0;

              var t = this._thumbnailQueue.shift();

              return this.createThumbnail(t, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, !0, function (n) {
                return e.emit("thumbnail", t, n), e._processingThumbnail = !1, e._processThumbnailQueue();
              });
            }
          }
        }, {
          key: "removeFile",
          value: function value(e) {
            if (e.status === r.UPLOADING && this.cancelUpload(e), this.files = s(this.files, e), this.emit("removedfile", e), 0 === this.files.length) return this.emit("reset");
          }
        }, {
          key: "removeAllFiles",
          value: function value(e) {
            null == e && (e = !1);

            for (var t = 0, n = n = this.files.slice();;) {
              if (t >= n.length) break;
              var i = n[t++];
              (i.status !== r.UPLOADING || e) && this.removeFile(i);
            }

            return null;
          }
        }, {
          key: "resizeImage",
          value: function value(e, t, n, i, o) {
            var s = this;
            return this.createThumbnail(e, t, n, i, !1, function (t, n) {
              if (null === n) return o(e);
              var i = s.options.resizeMimeType;
              null == i && (i = e.type);
              var a = n.toDataURL(i, s.options.resizeQuality);
              return "image/jpeg" !== i && "image/jpg" !== i || (a = u.restore(e.dataURL, a)), o(r.dataURItoBlob(a));
            });
          }
        }, {
          key: "createThumbnail",
          value: function value(e, t, n, i, o, r) {
            var s = this,
                a = new FileReader();
            return a.onload = function () {
              if (e.dataURL = a.result, "image/svg+xml" !== e.type) return s.createThumbnailFromUrl(e, t, n, i, o, r);
              null != r && r(a.result);
            }, a.readAsDataURL(e);
          }
        }, {
          key: "createThumbnailFromUrl",
          value: function value(e, t, n, i, o, r, s) {
            var a = this,
                u = document.createElement("img");
            return s && (u.crossOrigin = s), u.onload = function () {
              var s = function s(e) {
                return e(1);
              };

              return "undefined" != typeof EXIF && null !== EXIF && o && (s = function s(e) {
                return EXIF.getData(u, function () {
                  return e(EXIF.getTag(this, "Orientation"));
                });
              }), s(function (o) {
                e.width = u.width, e.height = u.height;
                var s = a.options.resize.call(a, e, t, n, i),
                    c = document.createElement("canvas"),
                    d = c.getContext("2d");

                switch (c.width = s.trgWidth, c.height = s.trgHeight, o > 4 && (c.width = s.trgHeight, c.height = s.trgWidth), o) {
                  case 2:
                    d.translate(c.width, 0), d.scale(-1, 1);
                    break;

                  case 3:
                    d.translate(c.width, c.height), d.rotate(Math.PI);
                    break;

                  case 4:
                    d.translate(0, c.height), d.scale(1, -1);
                    break;

                  case 5:
                    d.rotate(.5 * Math.PI), d.scale(1, -1);
                    break;

                  case 6:
                    d.rotate(.5 * Math.PI), d.translate(0, -c.height);
                    break;

                  case 7:
                    d.rotate(.5 * Math.PI), d.translate(c.width, -c.height), d.scale(-1, 1);
                    break;

                  case 8:
                    d.rotate(-.5 * Math.PI), d.translate(-c.width, 0);
                }

                l(d, u, null != s.srcX ? s.srcX : 0, null != s.srcY ? s.srcY : 0, s.srcWidth, s.srcHeight, null != s.trgX ? s.trgX : 0, null != s.trgY ? s.trgY : 0, s.trgWidth, s.trgHeight);
                var p = c.toDataURL("image/png");
                if (null != r) return r(p, c);
              });
            }, null != r && (u.onerror = r), u.src = e.dataURL;
          }
        }, {
          key: "processQueue",
          value: function value() {
            var e = this.options.parallelUploads,
                t = this.getUploadingFiles().length,
                n = t;

            if (!(t >= e)) {
              var i = this.getQueuedFiles();

              if (i.length > 0) {
                if (this.options.uploadMultiple) return this.processFiles(i.slice(0, e - t));

                for (; n < e;) {
                  if (!i.length) return;
                  this.processFile(i.shift()), n++;
                }
              }
            }
          }
        }, {
          key: "processFile",
          value: function value(e) {
            return this.processFiles([e]);
          }
        }, {
          key: "processFiles",
          value: function value(e) {
            for (var t = 0, n = n = e;;) {
              if (t >= n.length) break;
              var i = n[t++];
              i.processing = !0, i.status = r.UPLOADING, this.emit("processing", i);
            }

            return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e);
          }
        }, {
          key: "_getFilesWithXhr",
          value: function value(e) {
            return this.files.filter(function (t) {
              return t.xhr === e;
            }).map(function (e) {
              return e;
            });
          }
        }, {
          key: "cancelUpload",
          value: function value(e) {
            if (e.status === r.UPLOADING) {
              for (var t = this._getFilesWithXhr(e.xhr), n = 0, i = i = t;;) {
                if (n >= i.length) break;
                i[n++].status = r.CANCELED;
              }

              void 0 !== e.xhr && e.xhr.abort();

              for (var o = 0, s = s = t;;) {
                if (o >= s.length) break;
                var a = s[o++];
                this.emit("canceled", a);
              }

              this.options.uploadMultiple && this.emit("canceledmultiple", t);
            } else e.status !== r.ADDED && e.status !== r.QUEUED || (e.status = r.CANCELED, this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [e]));

            if (this.options.autoProcessQueue) return this.processQueue();
          }
        }, {
          key: "resolveOption",
          value: function value(e) {
            if ("function" == typeof e) {
              for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
                n[i - 1] = arguments[i];
              }

              return e.apply(this, n);
            }

            return e;
          }
        }, {
          key: "uploadFile",
          value: function value(e) {
            return this.uploadFiles([e]);
          }
        }, {
          key: "uploadFiles",
          value: function value(e) {
            var t = this;

            this._transformFiles(e, function (n) {
              if (e[0].upload.chunked) {
                var i = e[0],
                    o = n[0];
                i.upload.chunks = [];

                var s = function s() {
                  for (var n = 0; void 0 !== i.upload.chunks[n];) {
                    n++;
                  }

                  if (!(n >= i.upload.totalChunkCount)) {
                    0;
                    var s = n * t.options.chunkSize,
                        a = Math.min(s + t.options.chunkSize, i.size),
                        l = {
                      name: t._getParamName(0),
                      data: o.webkitSlice ? o.webkitSlice(s, a) : o.slice(s, a),
                      filename: i.upload.filename,
                      chunkIndex: n
                    };
                    i.upload.chunks[n] = {
                      file: i,
                      index: n,
                      dataBlock: l,
                      status: r.UPLOADING,
                      progress: 0,
                      retries: 0
                    }, t._uploadData(e, [l]);
                  }
                };

                if (i.upload.finishedChunkUpload = function (n) {
                  var o = !0;
                  n.status = r.SUCCESS, n.dataBlock = null;

                  for (var a = 0; a < i.upload.totalChunkCount; a++) {
                    if (void 0 === i.upload.chunks[a]) return s();
                    i.upload.chunks[a].status !== r.SUCCESS && (o = !1);
                  }

                  o && t.options.chunksUploaded(i, function () {
                    t._finished(e, "", null);
                  });
                }, t.options.parallelChunkUploads) for (var a = 0; a < i.upload.totalChunkCount; a++) {
                  s();
                } else s();
              } else {
                for (var l = [], u = 0; u < e.length; u++) {
                  l[u] = {
                    name: t._getParamName(u),
                    data: n[u],
                    filename: e[u].upload.filename
                  };
                }

                t._uploadData(e, l);
              }
            });
          }
        }, {
          key: "_getChunk",
          value: function value(e, t) {
            for (var n = 0; n < e.upload.totalChunkCount; n++) {
              if (void 0 !== e.upload.chunks[n] && e.upload.chunks[n].xhr === t) return e.upload.chunks[n];
            }
          }
        }, {
          key: "_uploadData",
          value: function value(e, t) {
            for (var n = this, i = new XMLHttpRequest(), o = 0, s = s = e;;) {
              if (o >= s.length) break;
              s[o++].xhr = i;
            }

            e[0].upload.chunked && (e[0].upload.chunks[t[0].chunkIndex].xhr = i);
            var a = this.resolveOption(this.options.method, e),
                l = this.resolveOption(this.options.url, e);
            i.open(a, l, !0), i.timeout = this.resolveOption(this.options.timeout, e), i.withCredentials = !!this.options.withCredentials, i.onload = function (t) {
              n._finishedUploading(e, i, t);
            }, i.onerror = function () {
              n._handleUploadError(e, i);
            }, (null != i.upload ? i.upload : i).onprogress = function (t) {
              return n._updateFilesUploadProgress(e, i, t);
            };
            var u = {
              Accept: "application/json",
              "Cache-Control": "no-cache",
              "X-Requested-With": "XMLHttpRequest"
            };

            for (var c in this.options.headers && r.extend(u, this.options.headers), u) {
              var d = u[c];
              d && i.setRequestHeader(c, d);
            }

            var p = new FormData();

            if (this.options.params) {
              var h = this.options.params;

              for (var f in "function" == typeof h && (h = h.call(this, e, i, e[0].upload.chunked ? this._getChunk(e[0], i) : null)), h) {
                var v = h[f];
                p.append(f, v);
              }
            }

            for (var m = 0, g = g = e;;) {
              if (m >= g.length) break;
              var b = g[m++];
              this.emit("sending", b, i, p);
            }

            this.options.uploadMultiple && this.emit("sendingmultiple", e, i, p), this._addFormElementData(p);

            for (var w = 0; w < t.length; w++) {
              var y = t[w];
              p.append(y.name, y.data, y.filename);
            }

            this.submitRequest(i, p, e);
          }
        }, {
          key: "_transformFiles",
          value: function value(e, t) {
            for (var n = this, i = [], o = 0, r = function r(_r) {
              n.options.transformFile.call(n, e[_r], function (n) {
                i[_r] = n, ++o === e.length && t(i);
              });
            }, s = 0; s < e.length; s++) {
              r(s);
            }
          }
        }, {
          key: "_addFormElementData",
          value: function value(e) {
            if ("FORM" === this.element.tagName) for (var t = 0, n = n = this.element.querySelectorAll("input, textarea, select, button");;) {
              if (t >= n.length) break;
              var i = n[t++],
                  o = i.getAttribute("name"),
                  r = i.getAttribute("type");
              if (r && (r = r.toLowerCase()), void 0 !== o && null !== o) if ("SELECT" === i.tagName && i.hasAttribute("multiple")) for (var s = 0, a = a = i.options;;) {
                if (s >= a.length) break;
                var l = a[s++];
                l.selected && e.append(o, l.value);
              } else (!r || "checkbox" !== r && "radio" !== r || i.checked) && e.append(o, i.value);
            }
          }
        }, {
          key: "_updateFilesUploadProgress",
          value: function value(e, t, n) {
            var i = void 0;

            if (void 0 !== n) {
              if (i = 100 * n.loaded / n.total, e[0].upload.chunked) {
                var o = e[0],
                    r = this._getChunk(o, t);

                r.progress = i, r.total = n.total, r.bytesSent = n.loaded;
                o.upload.progress = 0, o.upload.total = 0, o.upload.bytesSent = 0;

                for (var s = 0; s < o.upload.totalChunkCount; s++) {
                  void 0 !== o.upload.chunks[s] && void 0 !== o.upload.chunks[s].progress && (o.upload.progress += o.upload.chunks[s].progress, o.upload.total += o.upload.chunks[s].total, o.upload.bytesSent += o.upload.chunks[s].bytesSent);
                }

                o.upload.progress = o.upload.progress / o.upload.totalChunkCount;
              } else for (var a = 0, l = l = e;;) {
                if (a >= l.length) break;
                var u = l[a++];
                u.upload.progress = i, u.upload.total = n.total, u.upload.bytesSent = n.loaded;
              }

              for (var c = 0, d = d = e;;) {
                if (c >= d.length) break;
                var p = d[c++];
                this.emit("uploadprogress", p, p.upload.progress, p.upload.bytesSent);
              }
            } else {
              var h = !0;
              i = 100;

              for (var f = 0, v = v = e;;) {
                if (f >= v.length) break;
                var m = v[f++];
                100 === m.upload.progress && m.upload.bytesSent === m.upload.total || (h = !1), m.upload.progress = i, m.upload.bytesSent = m.upload.total;
              }

              if (h) return;

              for (var g = 0, b = b = e;;) {
                if (g >= b.length) break;
                var w = b[g++];
                this.emit("uploadprogress", w, i, w.upload.bytesSent);
              }
            }
          }
        }, {
          key: "_finishedUploading",
          value: function value(e, t, n) {
            var i = void 0;

            if (e[0].status !== r.CANCELED && 4 === t.readyState) {
              if ("arraybuffer" !== t.responseType && "blob" !== t.responseType && (i = t.responseText, t.getResponseHeader("content-type") && ~t.getResponseHeader("content-type").indexOf("application/json"))) try {
                i = JSON.parse(i);
              } catch (e) {
                n = e, i = "Invalid JSON response from server.";
              }
              this._updateFilesUploadProgress(e), 200 <= t.status && t.status < 300 ? e[0].upload.chunked ? e[0].upload.finishedChunkUpload(this._getChunk(e[0], t)) : this._finished(e, i, n) : this._handleUploadError(e, t, i);
            }
          }
        }, {
          key: "_handleUploadError",
          value: function value(e, t, n) {
            if (e[0].status !== r.CANCELED) {
              if (e[0].upload.chunked && this.options.retryChunks) {
                var i = this._getChunk(e[0], t);

                if (i.retries++ < this.options.retryChunksLimit) return void this._uploadData(e, [i.dataBlock]);
                console.warn("Retried this chunk too often. Giving up.");
              }

              for (var o = 0, s = s = e;;) {
                if (o >= s.length) break;
                s[o++];

                this._errorProcessing(e, n || this.options.dictResponseError.replace("{{statusCode}}", t.status), t);
              }
            }
          }
        }, {
          key: "submitRequest",
          value: function value(e, t, n) {
            e.send(t);
          }
        }, {
          key: "_finished",
          value: function value(e, t, n) {
            for (var i = 0, o = o = e;;) {
              if (i >= o.length) break;
              var s = o[i++];
              s.status = r.SUCCESS, this.emit("success", s, t, n), this.emit("complete", s);
            }

            if (this.options.uploadMultiple && (this.emit("successmultiple", e, t, n), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue();
          }
        }, {
          key: "_errorProcessing",
          value: function value(e, t, n) {
            for (var i = 0, o = o = e;;) {
              if (i >= o.length) break;
              var s = o[i++];
              s.status = r.ERROR, this.emit("error", s, t, n), this.emit("complete", s);
            }

            if (this.options.uploadMultiple && (this.emit("errormultiple", e, t, n), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue();
          }
        }], [{
          key: "uuidv4",
          value: function value() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
              var t = 16 * Math.random() | 0;
              return ("x" === e ? t : 3 & t | 8).toString(16);
            });
          }
        }]), r;
      }();

      r.initClass(), r.version = "5.3.0", r.options = {}, r.optionsForElement = function (e) {
        return e.getAttribute("id") ? r.options[a(e.getAttribute("id"))] : void 0;
      }, r.instances = [], r.forElement = function (e) {
        if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return e.dropzone;
      }, r.autoDiscover = !0, r.discover = function () {
        var e = void 0;
        if (document.querySelectorAll) e = document.querySelectorAll(".dropzone");else {
          e = [];

          var t = function t(_t2) {
            return function () {
              for (var n = [], i = 0, o = o = _t2;;) {
                if (i >= o.length) break;
                var r = o[i++];
                /(^| )dropzone($| )/.test(r.className) ? n.push(e.push(r)) : n.push(void 0);
              }

              return n;
            }();
          };

          t(document.getElementsByTagName("div")), t(document.getElementsByTagName("form"));
        }
        return function () {
          for (var t = [], n = 0, i = i = e;;) {
            if (n >= i.length) break;
            var o = i[n++];
            !1 !== r.optionsForElement(o) ? t.push(new r(o)) : t.push(void 0);
          }

          return t;
        }();
      }, r.blacklistedBrowsers = [/opera.*(Macintosh|Windows Phone).*version\/12/i], r.isBrowserSupported = function () {
        var e = !0;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
          if ("classList" in document.createElement("a")) for (var t = 0, n = n = r.blacklistedBrowsers;;) {
            if (t >= n.length) break;
            n[t++].test(navigator.userAgent) && (e = !1);
          } else e = !1;
        } else e = !1;
        return e;
      }, r.dataURItoBlob = function (e) {
        for (var t = atob(e.split(",")[1]), n = e.split(",")[0].split(":")[1].split(";")[0], i = new ArrayBuffer(t.length), o = new Uint8Array(i), r = 0, s = t.length, a = 0 <= s; a ? r <= s : r >= s; a ? r++ : r--) {
          o[r] = t.charCodeAt(r);
        }

        return new Blob([i], {
          type: n
        });
      };

      var s = function s(e, t) {
        return e.filter(function (e) {
          return e !== t;
        }).map(function (e) {
          return e;
        });
      },
          a = function a(e) {
        return e.replace(/[\-_](\w)/g, function (e) {
          return e.charAt(1).toUpperCase();
        });
      };

      r.createElement = function (e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.childNodes[0];
      }, r.elementInside = function (e, t) {
        if (e === t) return !0;

        for (; e = e.parentNode;) {
          if (e === t) return !0;
        }

        return !1;
      }, r.getElement = function (e, t) {
        var n = void 0;
        if ("string" == typeof e ? n = document.querySelector(e) : null != e.nodeType && (n = e), null == n) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return n;
      }, r.getElements = function (e, t) {
        var n = void 0,
            i = void 0;

        if (e instanceof Array) {
          i = [];

          try {
            for (var o = 0, r = r = e; !(o >= r.length);) {
              n = r[o++], i.push(this.getElement(n, t));
            }
          } catch (e) {
            i = null;
          }
        } else if ("string" == typeof e) {
          i = [];

          for (var s = 0, a = a = document.querySelectorAll(e); !(s >= a.length);) {
            n = a[s++], i.push(n);
          }
        } else null != e.nodeType && (i = [e]);

        if (null == i || !i.length) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return i;
      }, r.confirm = function (e, t, n) {
        return window.confirm(e) ? t() : null != n ? n() : void 0;
      }, r.isValidFile = function (e, t) {
        if (!t) return !0;
        t = t.split(",");

        for (var n = e.type, i = n.replace(/\/.*$/, ""), o = 0, r = r = t;;) {
          if (o >= r.length) break;
          var s = r[o++];

          if ("." === (s = s.trim()).charAt(0)) {
            if (-1 !== e.name.toLowerCase().indexOf(s.toLowerCase(), e.name.length - s.length)) return !0;
          } else if (/\/\*$/.test(s)) {
            if (i === s.replace(/\/.*$/, "")) return !0;
          } else if (n === s) return !0;
        }

        return !1;
      }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (e) {
        return this.each(function () {
          return new r(this, e);
        });
      }), void 0 !== e && null !== e ? e.exports = r : window.Dropzone = r, r.ADDED = "added", r.QUEUED = "queued", r.ACCEPTED = r.QUEUED, r.UPLOADING = "uploading", r.PROCESSING = r.UPLOADING, r.CANCELED = "canceled", r.ERROR = "error", r.SUCCESS = "success";

      var l = function l(e, t, n, i, o, r, s, a, _l, u) {
        var c = function (e) {
          e.naturalWidth;
          var t = e.naturalHeight,
              n = document.createElement("canvas");
          n.width = 1, n.height = t;
          var i = n.getContext("2d");
          i.drawImage(e, 0, 0);

          for (var o = i.getImageData(1, 0, 1, t).data, r = 0, s = t, a = t; a > r;) {
            0 === o[4 * (a - 1) + 3] ? s = a : r = a, a = s + r >> 1;
          }

          var l = a / t;
          return 0 === l ? 1 : l;
        }(t);

        return e.drawImage(t, n, i, o, r, s, a, _l, u / c);
      },
          u = function () {
        function e() {
          i(this, e);
        }

        return t(e, null, [{
          key: "initClass",
          value: function value() {
            this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          }
        }, {
          key: "encode64",
          value: function value(e) {
            for (var t = "", n = void 0, i = void 0, o = "", r = void 0, s = void 0, a = void 0, l = "", u = 0; r = (n = e[u++]) >> 2, s = (3 & n) << 4 | (i = e[u++]) >> 4, a = (15 & i) << 2 | (o = e[u++]) >> 6, l = 63 & o, isNaN(i) ? a = l = 64 : isNaN(o) && (l = 64), t = t + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(s) + this.KEY_STR.charAt(a) + this.KEY_STR.charAt(l), n = i = o = "", r = s = a = l = "", u < e.length;) {
              ;
            }

            return t;
          }
        }, {
          key: "restore",
          value: function value(e, t) {
            if (!e.match("data:image/jpeg;base64,")) return t;
            var n = this.decode64(e.replace("data:image/jpeg;base64,", "")),
                i = this.slice2Segments(n),
                o = this.exifManipulation(t, i);
            return "data:image/jpeg;base64," + this.encode64(o);
          }
        }, {
          key: "exifManipulation",
          value: function value(e, t) {
            var n = this.getExifArray(t),
                i = this.insertExif(e, n);
            return new Uint8Array(i);
          }
        }, {
          key: "getExifArray",
          value: function value(e) {
            for (var t = void 0, n = 0; n < e.length;) {
              if (255 === (t = e[n])[0] & 225 === t[1]) return t;
              n++;
            }

            return [];
          }
        }, {
          key: "insertExif",
          value: function value(e, t) {
            var n = e.replace("data:image/jpeg;base64,", ""),
                i = this.decode64(n),
                o = i.indexOf(255, 3),
                r = i.slice(0, o),
                s = i.slice(o),
                a = r;
            return a = (a = a.concat(t)).concat(s);
          }
        }, {
          key: "slice2Segments",
          value: function value(e) {
            for (var t = 0, n = [];;) {
              if (255 === e[t] & 218 === e[t + 1]) break;
              if (255 === e[t] & 216 === e[t + 1]) t += 2;else {
                var i = t + (256 * e[t + 2] + e[t + 3]) + 2,
                    o = e.slice(t, i);
                n.push(o), t = i;
              }
              if (t > e.length) break;
            }

            return n;
          }
        }, {
          key: "decode64",
          value: function value(e) {
            var t = void 0,
                n = void 0,
                i = "",
                o = void 0,
                r = void 0,
                s = "",
                a = 0,
                l = [];

            for (/[^A-Za-z0-9\+\/\=]/g.exec(e) && console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); t = this.KEY_STR.indexOf(e.charAt(a++)) << 2 | (o = this.KEY_STR.indexOf(e.charAt(a++))) >> 4, n = (15 & o) << 4 | (r = this.KEY_STR.indexOf(e.charAt(a++))) >> 2, i = (3 & r) << 6 | (s = this.KEY_STR.indexOf(e.charAt(a++))), l.push(t), 64 !== r && l.push(n), 64 !== s && l.push(i), t = n = i = "", o = r = s = "", a < e.length;) {
              ;
            }

            return l;
          }
        }]), e;
      }();

      u.initClass();
      r._autoDiscoverFunction = function () {
        if (r.autoDiscover) return r.discover();
      }, function (e, t) {
        var n = !1,
            i = !0,
            o = e.document,
            r = o.documentElement,
            s = o.addEventListener ? "addEventListener" : "attachEvent",
            a = o.addEventListener ? "removeEventListener" : "detachEvent",
            l = o.addEventListener ? "" : "on",
            u = function i(r) {
          if ("readystatechange" !== r.type || "complete" === o.readyState) return ("load" === r.type ? e : o)[a](l + r.type, i, !1), !n && (n = !0) ? t.call(e, r.type || r) : void 0;
        };

        if ("complete" !== o.readyState) {
          if (o.createEventObject && r.doScroll) {
            try {
              i = !e.frameElement;
            } catch (e) {}

            i && function e() {
              try {
                r.doScroll("left");
              } catch (t) {
                return void setTimeout(e, 50);
              }

              return u("poll");
            }();
          }

          o[s](l + "DOMContentLoaded", u, !1), o[s](l + "readystatechange", u, !1), e[s](l + "load", u, !1);
        }
      }(window, r._autoDiscoverFunction);
    }).call(t, n(69)(e));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
        enumerable: !0,
        get: function get() {
          return e.l;
        }
      }), Object.defineProperty(e, "id", {
        enumerable: !0,
        get: function get() {
          return e.i;
        }
      }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this.$createElement;
      return (this._self._c || e)("Dropzone", {
        ref: "dropzone",
        attrs: {
          options: this.dropzoneOptions,
          id: this._uid + "vwdropzone"
        },
        on: {
          "vdropzone-success": this.fileUploaded,
          "vdropzone-file-added": this.fileAdded
        }
      });
    },
        o = [];
  }, function (e, t, n) {
    "use strict";

    var i = n(17),
        o = n(74),
        r = n(0);

    var s = function s(e) {
      n(73);
    },
        a = Object(r.a)(i.a, o.a, o.b, !1, s, "data-v-ebce4d12", null);

    t.a = a.exports;
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("form", {
        staticClass: "form",
        on: {
          submit: function submit(t) {
            t.preventDefault(), e.insertTable(t);
          }
        }
      }, [n("label", [n("div", [e._v("Rows")]), e._v(" "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.rows,
          expression: "rows"
        }],
        staticStyle: {
          width: "60px"
        },
        attrs: {
          type: "number",
          min: "2"
        },
        domProps: {
          value: e.rows
        },
        on: {
          input: function input(t) {
            t.target.composing || (e.rows = t.target.value);
          }
        }
      })]), e._v(" "), n("label", [n("div", [e._v("Columns")]), e._v(" "), n("input", {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: e.cols,
          expression: "cols"
        }],
        staticStyle: {
          width: "60px"
        },
        attrs: {
          type: "number",
          min: "2"
        },
        domProps: {
          value: e.cols
        },
        on: {
          input: function input(t) {
            t.target.composing || (e.cols = t.target.value);
          }
        }
      })]), e._v(" "), n("button", {
        attrs: {
          type: "submit"
        }
      }, [e._v("Insert")])]);
    },
        o = [];
  }, function (e, t) {
    e.exports = {
      title: "removeFormat",
      action: ["removeFormat"],
      description: "Remove formatting.\nClears headings, bold, italic, underlined text, etc.",
      icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z"/></svg>'
    };
  }, function (e, t) {
    e.exports = {
      title: "separator",
      icon: "<i class='vw-separator'></i>"
    };
  }, function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var i = function i() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;
      return n("div", {
        staticClass: "editr"
      }, [n("div", {
        staticClass: "editr--toolbar"
      }, e._l(e.modules, function (t, i) {
        return n("Btn", {
          key: t.title + i,
          ref: "btn-" + t.title,
          refInFor: !0,
          attrs: {
            module: t,
            options: e.mergedOptions,
            title: t.description || ""
          }
        });
      })), n("div", {
        ref: "content",
        staticClass: "editr--content",
        attrs: {
          contenteditable: "true",
          tabindex: "1",
          placeholder: e.placeholder
        }
      })]);
    },
        o = [];
  }]);
});
},{}],"src/components/ArticleModal.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueTagsinput = _interopRequireDefault(require("@voerro/vue-tagsinput"));

var _vueWysiwyg = _interopRequireDefault(require("../../js/vueWysiwyg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';
var _default = {
  components: {
    'tags-input': _vueTagsinput.default,
    wysiwyg: _vueWysiwyg.default.component
  },
  data: function data() {
    return {
      props: ['existing'],
      title: '',
      content: '',
      featuredImg: {
        name: 'Choose Your Featured Image..'
      },
      tags: [],
      published: false,
      existingTags: {}
    };
  },
  methods: {
    createArticle: function createArticle() {
      var _this = this;

      console.log('title', this.title);
      console.log('content', this.content);
      console.log('image', this.featuredImg);
      console.log('tags', this.tags);
      console.log('published', this.published);
      var newArticle = new FormData();
      newArticle.append('title', this.title);
      newArticle.append('content', this.content);
      newArticle.append("featuredImg", this.featuredImg);
      newArticle.append("tags", this.tags);
      newArticle.append("published", this.published);
      console.log(newArticle);
      axios({
        url: "".concat(baseUrl, "/articles"),
        method: 'post',
        data: newArticle,
        headers: {
          token: localStorage.token
        }
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data);

        _this.$emit('fetch');
      }).catch(function (err) {
        console.log(err);
      });
      this.title = '';
      this.content = '';
      this.featuredImg = {
        name: 'Choose Your Featured Image..'
      };
      this.tags = [];
      this.published = '';
    },
    previewFile: function previewFile() {
      this.featuredImg = this.$refs.image.files[0];
      console.log(this.featuredImg);
    },
    getTags: function getTags() {
      var _this2 = this;

      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles/tags")
      }).then(function (_ref2) {
        var data = _ref2.data;
        data.tags.forEach(function (tag) {
          if (_this2.existingTags["".concat(tag)] === undefined) {
            _this2.existingTags["".concat(tag)] = tag;
          }
        });
        console.log(_this2.existingTags);
      }).catch(function (err) {
        console.log(err.response.data);
      });
    }
  },
  mounted: function mounted() {
    this.getTags();
  }
};
exports.default = _default;
        var $5936f7 = exports.default || module.exports;
      
      if (typeof $5936f7 === 'function') {
        $5936f7 = $5936f7.options;
      }
    
        /* template */
        Object.assign($5936f7, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "newArticleModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalCenterTitle",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c(
              "div",
              {
                staticClass: "modal-content",
                staticStyle: { width: "200% !important" }
              },
              [
                _vm._m(0),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "login-form-1 bg-light" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.title,
                            expression: "title"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          placeholder: "Title.. ",
                          value: ""
                        },
                        domProps: { value: _vm.title },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.title = $event.target.value
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("div", { staticClass: "custom-file" }, [
                        _c("input", {
                          ref: "image",
                          staticClass: "custom-file-input",
                          attrs: { type: "file", id: "inputGroupFile01" },
                          on: { change: _vm.previewFile }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          {
                            staticClass: "custom-file-label",
                            attrs: { for: "inputGroupFile01" }
                          },
                          [_vm._v(_vm._s(_vm.featuredImg.name))]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "form-group" },
                      [
                        _c("wysiwyg", {
                          model: {
                            value: _vm.content,
                            callback: function($$v) {
                              _vm.content = $$v
                            },
                            expression: "content"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "form-group" },
                      [
                        _c("tags-input", {
                          attrs: {
                            "element-id": "tags",
                            "existing-tags": _vm.existingTags,
                            typeahead: true
                          },
                          model: {
                            value: _vm.tags,
                            callback: function($$v) {
                              _vm.tags = $$v
                            },
                            expression: "tags"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "form-group custom-control custom-checkbox d-flex",
                        staticStyle: { "justify-content": "center" }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.published,
                              expression: "published"
                            }
                          ],
                          staticClass: "custom-control-input",
                          attrs: { type: "checkbox", id: "customCheck1" },
                          domProps: {
                            checked: Array.isArray(_vm.published)
                              ? _vm._i(_vm.published, null) > -1
                              : _vm.published
                          },
                          on: {
                            change: function($event) {
                              var $$a = _vm.published,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 && (_vm.published = $$a.concat([$$v]))
                                } else {
                                  $$i > -1 &&
                                    (_vm.published = $$a
                                      .slice(0, $$i)
                                      .concat($$a.slice($$i + 1)))
                                }
                              } else {
                                _vm.published = $$c
                              }
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          {
                            staticClass: "custom-control-label",
                            attrs: { for: "customCheck1" }
                          },
                          [_vm._v("Publish")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "form-group d-flex justify-content-center"
                      },
                      [
                        _c("input", {
                          staticClass: "btn btn-secondary",
                          attrs: {
                            "data-dismiss": "modal",
                            type: "submit",
                            value: "Submit"
                          },
                          on: { click: _vm.createArticle }
                        })
                      ]
                    )
                  ])
                ])
              ]
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h2",
        { staticClass: "modal-title", attrs: { id: "exampleModalLongTitle" } },
        [_vm._v("New Article")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$5936f7', $5936f7);
          } else {
            api.reload('$5936f7', $5936f7);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"@voerro/vue-tagsinput":"node_modules/@voerro/vue-tagsinput/src/main.js","../../js/vueWysiwyg":"js/vueWysiwyg.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Navbar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LoginModal = _interopRequireDefault(require("./LoginModal.vue"));

var _RegisterModal = _interopRequireDefault(require("./RegisterModal.vue"));

var _ArticleModal = _interopRequireDefault(require("./ArticleModal.vue"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Toast = _sweetalert.default.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

var _default = {
  props: ['existingTags'],
  components: {
    LoginModal: _LoginModal.default,
    RegisterModal: _RegisterModal.default,
    ArticleModal: _ArticleModal.default
  },
  data: function data() {
    return {
      isLogin: false,
      username: ''
    };
  },
  methods: {
    checkLogin: function checkLogin() {
      if (localStorage.hasOwnProperty('token')) {
        this.username = localStorage.name;
        this.isLogin = true;
      } else this.isLogin = false;
    },
    login: function login(option) {
      if (option) {
        this.isLogin = true;
        this.username = localStorage.name;
      } else this.isLogin = false;
    },
    logout: function logout() {
      var _this = this;

      _sweetalert.default.fire({
        title: 'Log out?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          Toast.fire({
            title: 'See you soon'
          });
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
          _this.isLogin = false;
        }
      });
    },
    fetchList: function fetchList() {
      this.$emit('fetch', 'all');
    },
    fetchPublished: function fetchPublished() {
      this.$emit('fetch', 'published');
    },
    fetchDraft: function fetchDraft() {
      this.$emit('fetch', 'draft');
    }
  },
  mounted: function mounted() {
    this.checkLogin();
  }
};
exports.default = _default;
        var $803a3e = exports.default || module.exports;
      
      if (typeof $803a3e === 'function') {
        $803a3e = $803a3e.options;
      }
    
        /* template */
        Object.assign($803a3e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "nav",
        {
          staticClass:
            "container navbar navbar-expand-lg navbar-light bg-light",
          staticStyle: {
            "justify-content": "space-between",
            "border-bottom": "2px solid #444"
          }
        },
        [
          _c("div", [
            _c("img", {
              staticStyle: { width: "50px", "margin-top": "-15px" },
              attrs: {
                src:
                  "https://images.vexels.com/media/users/3/150065/isolated/preview/275104d129d5b0b6247395c41816ff00-terrified-anime-eye-illustration-by-vexels.png"
              }
            }),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "navbar-brand text-dark",
                staticStyle: { cursor: "pointer" },
                on: { click: _vm.fetchList }
              },
              [_c("h1", [_vm._v("AniBurogu")])]
            )
          ]),
          _vm._v(" "),
          !_vm.isLogin
            ? _c(
                "div",
                {
                  staticClass: "d-flex",
                  staticStyle: {
                    "justify-content": "space-between",
                    width: "170px",
                    "align-items": "baseline"
                  }
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success my-2 my-sm-0",
                      attrs: {
                        "data-toggle": "modal",
                        "data-target": "#loginModal"
                      }
                    },
                    [_vm._v("Login")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success my-2 my-sm-0",
                      attrs: {
                        "data-toggle": "modal",
                        "data-target": "#registerModal"
                      }
                    },
                    [_vm._v("Register")]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.isLogin
            ? _c(
                "div",
                {
                  staticClass: "d-flex",
                  staticStyle: {
                    "justify-content": "space-between",
                    "align-items": "baseline"
                  }
                },
                [
                  _c("span", { staticStyle: { "margin-right": "10px" } }, [
                    _vm._v("Hello, " + _vm._s(_vm.username))
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "d-flex",
                      staticStyle: {
                        "justify-content": "space-between",
                        width: "200px"
                      }
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-outline-dark my-2 my-sm-0",
                          attrs: {
                            "data-toggle": "modal",
                            "data-target": "#newArticleModal"
                          }
                        },
                        [_vm._v("Add Article")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-danger my-2 my-sm-0",
                          on: { click: _vm.logout }
                        },
                        [_vm._v("Logout")]
                      )
                    ]
                  )
                ]
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _vm.isLogin
        ? _c(
            "div",
            {
              staticClass: "container d-flex",
              staticStyle: {
                "justify-content": "space-between",
                width: "500px",
                "margin-top": "10px"
              }
            },
            [
              _c(
                "a",
                {
                  staticClass: "text-dark",
                  staticStyle: { "text-decoration": "none", cursor: "pointer" },
                  on: { click: _vm.fetchList }
                },
                [_vm._v("All")]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "text-dark",
                  staticStyle: { "text-decoration": "none", cursor: "pointer" },
                  on: { click: _vm.fetchPublished }
                },
                [_vm._v("Published")]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "text-dark",
                  staticStyle: { "text-decoration": "none", cursor: "pointer" },
                  on: { click: _vm.fetchDraft }
                },
                [_vm._v("My Draft")]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("LoginModal", { on: { setLogin: _vm.login } }),
      _vm._v(" "),
      _c("RegisterModal"),
      _vm._v(" "),
      _c("ArticleModal", {
        attrs: { existingTags: _vm.existingTags },
        on: { fetch: _vm.fetchList }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$803a3e', $803a3e);
          } else {
            api.reload('$803a3e', $803a3e);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./LoginModal.vue":"src/components/LoginModal.vue","./RegisterModal.vue":"src/components/RegisterModal.vue","./ArticleModal.vue":"src/components/ArticleModal.vue","sweetalert2":"node_modules/sweetalert2/dist/sweetalert2.all.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/ArticleCard.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: ['card'],
  methods: {
    articleDetail: function articleDetail(article) {
      console.log(article);
      this.$emit('goToDetail', 'detail', article);
    }
  }
};
exports.default = _default;
        var $adda97 = exports.default || module.exports;
      
      if (typeof $adda97 === 'function') {
        $adda97 = $adda97.options;
      }
    
        /* template */
        Object.assign($adda97, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "grid animated fadeInUp" }, [
    _c(
      "figure",
      {
        staticClass: "effect-marley",
        on: {
          click: function($event) {
            return _vm.articleDetail(_vm.card)
          }
        }
      },
      [
        _c("img", { attrs: { src: _vm.card.featuredImg, alt: "image" } }),
        _vm._v(" "),
        _c("figcaption", [
          _c("h2", [_vm._v(_vm._s(_vm.card.title))]),
          _vm._v(" "),
          _c(
            "span",
            _vm._l(_vm.card.tags, function(tag) {
              return _c(
                "small",
                { key: tag, staticStyle: { "margin-right": "5px" } },
                [_vm._v("#" + _vm._s(tag))]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c("p", {
            staticStyle: {
              height: "95px",
              overflow: "hidden",
              "text-overflow": "ellipsis"
            },
            domProps: { innerHTML: _vm._s(_vm.card.content) }
          })
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$adda97', $adda97);
          } else {
            api.reload('$adda97', $adda97);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/ArticleList.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ArticleCard = _interopRequireDefault(require("./ArticleCard.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    ArticleCard: _ArticleCard.default
  },
  props: ['articles'],
  data: function data() {
    return {};
  },
  methods: {
    articleDetail: function articleDetail(option, article) {
      console.log(option, article);
      this.$emit('toDetail', option, article);
    },
    goBack: function goBack(option) {
      this.$emit('back', option);
    }
  }
};
exports.default = _default;
        var $26048e = exports.default || module.exports;
      
      if (typeof $26048e === 'function') {
        $26048e = $26048e.options;
      }
    
        /* template */
        Object.assign($26048e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "container",
        staticStyle: { "margin-top": "20px", "min-height": "400px" },
        attrs: { id: "articleContainer" }
      },
      [
        _c(
          "div",
          {
            staticClass: "d-flex",
            staticStyle: { "flex-wrap": "wrap", "align-items": "center" }
          },
          _vm._l(_vm.articles, function(article) {
            return _c(
              "div",
              {
                key: article._id,
                staticClass: "col-6",
                on: { backToHome: _vm.goBack }
              },
              [
                _c(
                  "div",
                  { staticClass: "grid" },
                  [
                    _c("ArticleCard", {
                      attrs: { card: article },
                      on: { goToDetail: _vm.articleDetail }
                    })
                  ],
                  1
                )
              ]
            )
          }),
          0
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$26048e', $26048e);
          } else {
            api.reload('$26048e', $26048e);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./ArticleCard.vue":"src/components/ArticleCard.vue","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/EditModal.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueTagsinput = _interopRequireDefault(require("@voerro/vue-tagsinput"));

var _vueWysiwyg = _interopRequireDefault(require("../../js/vueWysiwyg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';
var _default = {
  props: ['edit'],
  components: {
    'tags-input': _vueTagsinput.default,
    wysiwyg: _vueWysiwyg.default.component
  },
  data: function data() {
    return {
      title: this.edit.title,
      content: this.edit.content,
      featuredImg: this.edit.featuredImg,
      tags: this.edit.tags,
      published: false,
      existingTags: {}
    };
  },
  methods: {
    editArticle: function editArticle() {
      var _this = this;

      console.log('title', this.title);
      console.log('content', this.content);
      console.log('image', this.featuredImg);
      console.log('tags', this.tags);
      console.log('published', this.published);
      var editArticle = new FormData();
      editArticle.append('title', this.title);
      editArticle.append('content', this.content);
      editArticle.append("featuredImg", this.featuredImg);
      editArticle.append("tags", this.tags);
      editArticle.append("published", this.published);
      console.log(editArticle);
      axios({
        url: "".concat(baseUrl, "/articles/").concat(this.edit._id),
        method: 'patch',
        data: editArticle,
        headers: {
          token: localStorage.token
        }
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data);

        _this.$emit('fetch');
      }).catch(function (err) {
        console.log(err.response);
      });
    },
    previewFile: function previewFile() {
      this.featuredImg = this.$refs.image.files[0];
      console.log(this.featuredImg);
    },
    getTags: function getTags() {
      var _this2 = this;

      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles/tags")
      }).then(function (_ref2) {
        var data = _ref2.data;
        data.tags.forEach(function (tag) {
          if (_this2.existingTags["".concat(tag)] === undefined) {
            _this2.existingTags["".concat(tag)] = tag;
          }
        });
      }).catch(function (err) {
        console.log(err.response.data);
      });
    }
  },
  computed: {},
  mounted: function mounted() {
    this.getTags();
  }
};
exports.default = _default;
        var $0cc02a = exports.default || module.exports;
      
      if (typeof $0cc02a === 'function') {
        $0cc02a = $0cc02a.options;
      }
    
        /* template */
        Object.assign($0cc02a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modal fade",
      attrs: {
        id: "editModal",
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "exampleModalCenterTitle",
        "aria-hidden": "true"
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "modal-dialog modal-dialog-centered",
          attrs: { role: "document" }
        },
        [
          _c(
            "div",
            {
              staticClass: "modal-content",
              staticStyle: { width: "200% !important" }
            },
            [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("div", { staticClass: "login-form-1 bg-light" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.title,
                          expression: "title"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: "Title.. ",
                        value: ""
                      },
                      domProps: { value: _vm.title },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.title = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("div", { staticClass: "custom-file" }, [
                      _c("input", {
                        ref: "image",
                        staticClass: "custom-file-input",
                        attrs: { type: "file", id: "inputGroupFile01" },
                        on: { change: _vm.previewFile }
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          staticClass: "custom-file-label",
                          attrs: { for: "inputGroupFile01" }
                        },
                        [_vm._v(_vm._s(_vm.featuredImg))]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group" },
                    [
                      _c("wysiwyg", {
                        model: {
                          value: _vm.content,
                          callback: function($$v) {
                            _vm.content = $$v
                          },
                          expression: "content"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group" },
                    [
                      _c("tags-input", {
                        attrs: {
                          "element-id": "tags",
                          "existing-tags": _vm.existingTags,
                          typeahead: true
                        },
                        model: {
                          value: _vm.tags,
                          callback: function($$v) {
                            _vm.tags = $$v
                          },
                          expression: "tags"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "form-group custom-control custom-checkbox d-flex",
                      staticStyle: { "justify-content": "center" }
                    },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.published,
                            expression: "published"
                          }
                        ],
                        staticClass: "custom-control-input",
                        attrs: { type: "checkbox", id: "customCheck1" },
                        domProps: {
                          checked: Array.isArray(_vm.published)
                            ? _vm._i(_vm.published, null) > -1
                            : _vm.published
                        },
                        on: {
                          change: function($event) {
                            var $$a = _vm.published,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 && (_vm.published = $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  (_vm.published = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)))
                              }
                            } else {
                              _vm.published = $$c
                            }
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          staticClass: "custom-control-label",
                          attrs: { for: "customCheck1" }
                        },
                        [_vm._v("Publish")]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group d-flex justify-content-center" },
                    [
                      _c("input", {
                        staticClass: "btn btn-secondary",
                        attrs: {
                          "data-dismiss": "modal",
                          type: "submit",
                          value: "Update"
                        },
                        on: { click: _vm.editArticle }
                      })
                    ]
                  )
                ])
              ])
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h2",
        { staticClass: "modal-title", attrs: { id: "exampleModalLongTitle" } },
        [_vm._v("Edit Article")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$0cc02a', $0cc02a);
          } else {
            api.reload('$0cc02a', $0cc02a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"@voerro/vue-tagsinput":"node_modules/@voerro/vue-tagsinput/src/main.js","../../js/vueWysiwyg":"js/vueWysiwyg.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/ArticleDetail.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EditModal = _interopRequireDefault(require("./EditModal.vue"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';
var _default = {
  components: {
    EditModal: _EditModal.default
  },
  props: ['detail'],
  data: function data() {
    return {
      article: {}
    };
  },
  methods: {
    fetchDetail: function fetchDetail() {
      var _this = this;

      this.article = {};
      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles/")
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data.data);
        _this.articles = data.data;
      }).catch(function (err) {
        console.log(err);
      });
    },
    deleteArticle: function deleteArticle(id) {
      var _this2 = this;

      _sweetalert.default.fire({
        // title: 'Delete this article?',
        text: "Delete this article?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(function (result) {
        if (result.value) {
          axios({
            method: 'delete',
            url: "".concat(baseUrl, "/articles/").concat(id),
            headers: {
              token: localStorage.token
            }
          }).then(function (_ref2) {
            var data = _ref2.data;
            console.log(data);

            _this2.$emit('back', 'home');

            _sweetalert.default.fire('Deleted!', 'Your article has been deleted.', 'success');
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
    },
    backToHome: function backToHome() {
      this.$emit('back', 'home');
    },
    checkAuthor: function checkAuthor(article) {
      if (article.author._id === localStorage.id) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    momentDate: function momentDate() {
      return moment(this.detail.postedAt).format('MMMM Do YYYY');
    }
  }
};
exports.default = _default;
        var $ad3361 = exports.default || module.exports;
      
      if (typeof $ad3361 === 'function') {
        $ad3361 = $ad3361.options;
      }
    
        /* template */
        Object.assign($ad3361, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass: "container center d-flex",
          staticStyle: { "flex-direction": "column", "margin-top": "20px" },
          attrs: { id: "articleDetail" }
        },
        [
          _c("img", {
            attrs: {
              src: _vm.detail.featuredImg,
              width: "100%",
              height: "100%"
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "container" }, [
            _c(
              "h1",
              {
                staticStyle: {
                  "font-size": "50px",
                  color: "white",
                  position: "absolute",
                  "z-index": "1",
                  "margin-top": "-70px"
                }
              },
              [_vm._v(_vm._s(_vm.detail.title))]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "d-flex",
                staticStyle: { "justify-content": "space-between" }
              },
              [
                _c("h5", { staticClass: "mt-3" }, [
                  _vm._v("By: " + _vm._s(_vm.detail.author.name))
                ]),
                _vm._v(" "),
                _c("h5", { staticClass: "mt-3" }, [
                  _vm._v("Posted At: " + _vm._s(_vm.momentDate))
                ])
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "mt-3" }, [
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.detail.content) }
              })
            ]),
            _vm._v(" "),
            _c("h4", [_vm._v("Tags:")]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "d-flex",
                staticStyle: { "justify-content": "flex-start" }
              },
              _vm._l(_vm.detail.tags, function(tag) {
                return _c(
                  "h6",
                  { key: tag, staticStyle: { "margin-right": "5px" } },
                  [
                    _c("a", { staticStyle: { cursor: "pointer" } }, [
                      _vm._v("#" + _vm._s(tag))
                    ])
                  ]
                )
              }),
              0
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "d-flex",
                staticStyle: { "justify-content": "space-between" }
              },
              [
                _c("div", { staticStyle: { width: "50%" } }),
                _vm._v(" "),
                _vm.checkAuthor(_vm.detail)
                  ? _c(
                      "div",
                      {
                        staticClass: "d-flex",
                        staticStyle: {
                          "justify-content": "flex-end",
                          width: "50%"
                        }
                      },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-secondary",
                            attrs: {
                              type: "button",
                              "data-toggle": "modal",
                              "data-target": "#editModal"
                            }
                          },
                          [_vm._v("Edit")]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger ml-3",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                return _vm.deleteArticle(_vm.detail._id)
                              }
                            }
                          },
                          [_vm._v("Delete")]
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "d-flex",
                    staticStyle: { "justify-content": "flex-end", width: "50%" }
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-dark ml-3",
                        attrs: { type: "button" },
                        on: { click: _vm.backToHome }
                      },
                      [_vm._v("Back")]
                    )
                  ]
                )
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("EditModal", {
        attrs: { edit: _vm.detail },
        on: { fetch: _vm.backToHome }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$ad3361', $ad3361);
          } else {
            api.reload('$ad3361', $ad3361);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./EditModal.vue":"src/components/EditModal.vue","sweetalert2":"node_modules/sweetalert2/dist/sweetalert2.all.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/vue-wordcloud/dist/word-cloud.js":[function(require,module,exports) {
var define;
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("WordCloud",[],n):"object"==typeof exports?exports.WordCloud=n():t.WordCloud=n()}("undefined"!=typeof self?self:this,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/dist/",e(e.s=174)}([function(t,n,e){"use strict";e.d(n,"i",function(){return r}),e.d(n,"j",function(){return i}),e.d(n,"o",function(){return c}),e.d(n,"l",function(){return a}),e.d(n,"q",function(){return o}),e.d(n,"w",function(){return u}),e.d(n,"h",function(){return f}),e.d(n,"r",function(){return s}),e.d(n,"a",function(){return l}),e.d(n,"d",function(){return h}),e.d(n,"e",function(){return d}),e.d(n,"g",function(){return b}),e.d(n,"f",function(){return p}),e.d(n,"k",function(){return v}),e.d(n,"n",function(){return _}),e.d(n,"p",function(){return y}),e.d(n,"t",function(){return g}),e.d(n,"s",function(){return m}),e.d(n,"u",function(){return x}),e.d(n,"v",function(){return w}),n.b=function(t){return t>1?0:t<-1?c:Math.acos(t)},n.c=function(t){return t>1?a:t<-1?-a:Math.asin(t)},n.m=function(t){return(t=g(t/2))*t};var r=1e-6,i=1e-12,c=Math.PI,a=c/2,o=c/4,u=2*c,f=180/c,s=c/180,l=Math.abs,h=Math.atan,d=Math.atan2,b=Math.cos,p=Math.ceil,v=Math.exp,_=(Math.floor,Math.log),y=Math.pow,g=Math.sin,m=Math.sign||function(t){return t>0?1:t<0?-1:0},x=Math.sqrt,w=Math.tan},function(t,n,e){"use strict";n.a=function(t){for(var n=t.length/6|0,e=new Array(n),r=0;r<n;)e[r]="#"+t.slice(6*r,6*++r);return e}},function(t,n,e){"use strict";var r=e(6);n.a=function(t){return Object(r.e)(t[t.length-1])}},function(t,n,e){"use strict";e(209),e(35),e(238);var r=e(106);e.d(n,"c",function(){return r.a});var i=e(239);e.d(n,"d",function(){return i.a});var c=e(54);e.d(n,"e",function(){return c.a});e(55),e(36);var a=e(104);e.d(n,"f",function(){return a.a});e(240);var o=e(8);e.d(n,"g",function(){return o.b});var u=e(56);e.d(n,"h",function(){return u.a});var f=e(105);e.d(n,"i",function(){return f.a});var s=e(109);e.d(n,"j",function(){return s.b});var l=e(241);e.d(n,"k",function(){return l.a});e(242),e(57);var h=e(58);e.d(n,"b",function(){return h.c}),e.d(n,"a",function(){return h.a})},function(t,n,e){"use strict";n.a=function t(n,e,c,a){function o(t){return n(t=new Date(+t)),t}o.floor=o;o.ceil=function(t){return n(t=new Date(t-1)),e(t,1),n(t),t};o.round=function(t){var n=o(t),e=o.ceil(t);return t-n<e-t?n:e};o.offset=function(t,n){return e(t=new Date(+t),null==n?1:Math.floor(n)),t};o.range=function(t,r,i){var c,a=[];if(t=o.ceil(t),i=null==i?1:Math.floor(i),!(t<r&&i>0))return a;do{a.push(c=new Date(+t)),e(t,i),n(t)}while(c<t&&t<r);return a};o.filter=function(r){return t(function(t){if(t>=t)for(;n(t),!r(t);)t.setTime(t-1)},function(t,n){if(t>=t)if(n<0)for(;++n<=0;)for(;e(t,-1),!r(t););else for(;--n>=0;)for(;e(t,1),!r(t););})};c&&(o.count=function(t,e){return r.setTime(+t),i.setTime(+e),n(r),n(i),Math.floor(c(r,i))},o.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?o.filter(a?function(n){return a(n)%t==0}:function(n){return o.count(0,n)%t==0}):o:null});return o};var r=new Date,i=new Date},function(t,n,e){"use strict";var r=e(92);e.d(n,"b",function(){return r.a});var i=e(19);e.d(n,"a",function(){return i.a});var c=e(93);e.d(n,"c",function(){return c.a});e(185),e(186),e(95),e(97),e(187),e(190),e(191),e(101),e(192),e(193),e(194);var a=e(195);e.d(n,"d",function(){return a.a});e(102),e(94),e(196);var o=e(52);e.d(n,"e",function(){return o.a});var u=e(99);e.d(n,"f",function(){return u.a});e(197),e(198),e(199);var f=e(100);e.d(n,"i",function(){return f.a}),e.d(n,"g",function(){return f.b}),e.d(n,"h",function(){return f.c});e(103),e(96),e(200)},function(t,n,e){"use strict";var r=e(60);e.d(n,"a",function(){return r.a});e(116),e(63),e(114),e(117);var i=e(37);e.d(n,"c",function(){return i.a});e(118);var c=e(247);e.d(n,"f",function(){return c.a});var a=e(119);e.d(n,"g",function(){return a.a});var o=e(248);e.d(n,"h",function(){return o.a}),e.d(n,"i",function(){return o.b});var u=e(251);e.d(n,"j",function(){return u.a});var f=e(113);e.d(n,"d",function(){return f.a}),e.d(n,"e",function(){return f.b});e(252),e(253),e(254);var s=e(255);e.d(n,"b",function(){return s.a});e(256)},function(t,n,e){"use strict";var r=e(61);e.d(n,"a",function(){return r.e}),e.d(n,"f",function(){return r.g}),e.d(n,"d",function(){return r.f});var i=e(245);e.d(n,"e",function(){return i.a}),e.d(n,"c",function(){return i.b});var c=e(246);e.d(n,"b",function(){return c.a})},function(t,n,e){"use strict";e.d(n,"c",function(){return P}),n.a=R;var r=e(210),i=e(211),c=e(212),a=e(213),o=e(107),u=e(215),f=e(216),s=e(217),l=e(218),h=e(219),d=e(220),b=e(221),p=e(222),v=e(223),_=e(224),y=e(225),g=e(109),m=e(226),x=e(227),w=e(228),O=e(229),j=e(230),M=e(231),T=e(232),S=e(233),E=e(234),N=e(235),C=e(236),k=e(58),A=e(237),P=[null];function R(t,n){this._groups=t,this._parents=n}function z(){return new R([[document.documentElement]],P)}R.prototype=z.prototype={constructor:R,select:r.a,selectAll:i.a,filter:c.a,data:a.a,enter:o.b,exit:u.a,merge:f.a,order:s.a,sort:l.a,call:h.a,nodes:d.a,node:b.a,size:p.a,empty:v.a,each:_.a,attr:y.a,style:g.a,property:m.a,classed:x.a,text:w.a,html:O.a,raise:j.a,lower:M.a,append:T.a,insert:S.a,remove:E.a,clone:N.a,datum:C.a,on:k.b,dispatch:A.a},n.b=z},function(t,n,e){"use strict";e.d(n,"c",function(){return u}),e.d(n,"d",function(){return f}),e.d(n,"b",function(){return h}),e.d(n,"a",function(){return d}),n.g=function(t,n){var e=b(t,n);if(e.state>o)throw new Error("too late; already scheduled");return e},n.h=function(t,n){var e=b(t,n);if(e.state>f)throw new Error("too late; already started");return e},n.f=b;var r=e(12),i=e(38),c=Object(r.dispatch)("start","end","interrupt"),a=[],o=0,u=1,f=2,s=3,l=4,h=5,d=6;function b(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("transition not found");return e}n.e=function(t,n,e,r,b,p){var v=t.__transition;if(v){if(e in v)return}else t.__transition={};!function(t,n,e){var r,c=t.__transition;function a(h){var p,v,_,y;if(e.state!==u)return b();for(p in c)if((y=c[p]).name===e.name){if(y.state===s)return Object(i.b)(a);y.state===l?(y.state=d,y.timer.stop(),y.on.call("interrupt",t,t.__data__,y.index,y.group),delete c[p]):+p<n&&(y.state=d,y.timer.stop(),delete c[p])}if(Object(i.b)(function(){e.state===s&&(e.state=l,e.timer.restart(o,e.delay,e.time),o(h))}),e.state=f,e.on.call("start",t,t.__data__,e.index,e.group),e.state===f){for(e.state=s,r=new Array(_=e.tween.length),p=0,v=-1;p<_;++p)(y=e.tween[p].value.call(t,t.__data__,e.index,e.group))&&(r[++v]=y);r.length=v+1}}function o(n){for(var i=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(b),e.state=h,1),c=-1,a=r.length;++c<a;)r[c].call(null,i);e.state===h&&(e.on.call("end",t,t.__data__,e.index,e.group),b())}function b(){for(var r in e.state=d,e.timer.stop(),delete c[n],c)return;delete t.__transition}c[n]=e,e.timer=Object(i.c)(function(t){e.state=u,e.timer.restart(a,e.delay,e.time),e.delay<=t&&a(t-e.delay)},0,e.time)}(t,e,{name:n,index:r,group:b,on:c,tween:a,time:p.time,delay:p.delay,duration:p.duration,ease:p.ease,timer:null,state:o})}},function(t,n,e){"use strict";n.a=function(t){return b(function(){return t})()},n.b=b;var r=e(132),i=e(138),c=e(42),a=e(131),o=e(74),u=e(0),f=e(41),s=e(43),l=e(77),h=e(350),d=Object(s.a)({point:function(t,n){this.stream.point(t*u.r,n*u.r)}});function b(t){var n,e,b,p,v,_,y,g,m,x,w=150,O=480,j=250,M=0,T=0,S=0,E=0,N=0,C=null,k=r.a,A=null,P=o.a,R=.5,z=Object(h.a)(L,R);function U(t){return[(t=v(t[0]*u.r,t[1]*u.r))[0]*w+e,b-t[1]*w]}function I(t){return(t=v.invert((t[0]-e)/w,(b-t[1])/w))&&[t[0]*u.h,t[1]*u.h]}function L(t,r){return[(t=n(t,r))[0]*w+e,b-t[1]*w]}function D(){v=Object(a.a)(p=Object(f.b)(S,E,N),n);var t=n(M,T);return e=O-t[0]*w,b=j+t[1]*w,q()}function q(){return m=x=null,U}return U.stream=function(t){return m&&x===t?m:m=d(function(t){return Object(s.a)({point:function(n,e){var r=t(n,e);return this.stream.point(r[0],r[1])}})}(p)(k(z(P(x=t)))))},U.preclip=function(t){return arguments.length?(k=t,C=void 0,q()):k},U.postclip=function(t){return arguments.length?(P=t,A=_=y=g=null,q()):P},U.clipAngle=function(t){return arguments.length?(k=+t?Object(i.a)(C=t*u.r):(C=null,r.a),q()):C*u.h},U.clipExtent=function(t){return arguments.length?(P=null==t?(A=_=y=g=null,o.a):Object(c.a)(A=+t[0][0],_=+t[0][1],y=+t[1][0],g=+t[1][1]),q()):null==A?null:[[A,_],[y,g]]},U.scale=function(t){return arguments.length?(w=+t,D()):w},U.translate=function(t){return arguments.length?(O=+t[0],j=+t[1],D()):[O,j]},U.center=function(t){return arguments.length?(M=t[0]%360*u.r,T=t[1]%360*u.r,D()):[M*u.h,T*u.h]},U.rotate=function(t){return arguments.length?(S=t[0]%360*u.r,E=t[1]%360*u.r,N=t.length>2?t[2]%360*u.r:0,D()):[S*u.h,E*u.h,N*u.h]},U.precision=function(t){return arguments.length?(z=Object(h.a)(L,R=t*t),q()):Object(u.u)(R)},U.fitExtent=function(t,n){return Object(l.a)(U,t,n)},U.fitSize=function(t,n){return Object(l.c)(U,t,n)},U.fitWidth=function(t,n){return Object(l.d)(U,t,n)},U.fitHeight=function(t,n){return Object(l.b)(U,t,n)},function(){return n=t.apply(this,arguments),U.invert=n.invert&&I,D()}}},function(t,n,e){"use strict";e.d(n,"d",function(){return r}),e.d(n,"c",function(){return i}),e.d(n,"b",function(){return c}),e.d(n,"a",function(){return a}),e.d(n,"e",function(){return o});var r=1e3,i=6e4,c=36e5,a=864e5,o=6048e5},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(207);e.d(n,"dispatch",function(){return r.a})},function(t,n,e){"use strict";n.a=w,n.b=function(){return++x};var r=e(3),i=e(262),c=e(263),a=e(264),o=e(265),u=e(266),f=e(267),s=e(268),l=e(269),h=e(270),d=e(271),b=e(272),p=e(273),v=e(274),_=e(275),y=e(276),g=e(277),m=e(39),x=0;function w(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}var O=r.g.prototype;w.prototype=function(t){return Object(r.g)().transition(t)}.prototype={constructor:w,select:d.a,selectAll:b.a,filter:f.a,merge:s.a,selection:p.a,transition:g.a,call:O.call,nodes:O.nodes,node:O.node,size:O.size,empty:O.empty,each:O.each,on:l.a,attr:i.a,attrTween:c.a,style:v.a,styleTween:_.a,text:y.a,remove:h.a,tween:m.a,delay:a.a,duration:o.a,ease:u.a}},function(t,n,e){"use strict";n.a=function(){}},function(t,n,e){"use strict";var r=e(297);e.d(n,"a",function(){return r.a})},function(t,n,e){"use strict";function r(t,n){t&&c.hasOwnProperty(t.type)&&c[t.type](t,n)}var i={Feature:function(t,n){r(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,i=-1,c=e.length;++i<c;)r(e[i].geometry,n)}},c={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){a(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)a(e[r],n,0)},Polygon:function(t,n){o(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)o(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,i=-1,c=e.length;++i<c;)r(e[i],n)}};function a(t,n,e){var r,i=-1,c=t.length-e;for(n.lineStart();++i<c;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function o(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)a(t[e],n,1);n.polygonEnd()}n.a=function(t,n){t&&i.hasOwnProperty(t.type)?i[t.type](t,n):r(t,n)}},function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e.d(n,"b",function(){return c});var r=Array.prototype,i=r.map,c=r.slice},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";function r(){this.reset()}n.a=function(){return new r},r.prototype={constructor:r,reset:function(){this.s=this.t=0},add:function(t){c(i,t,this.t),c(this,i.s,this.s),this.s?this.t+=i.t:this.s=i.t},valueOf:function(){return this.s}};var i=new r;function c(t,n,e){var r=t.s=n+e,i=r-n,c=r-i;t.t=n-c+(e-i)}},function(t,n,e){"use strict";n.a=function(){return Math.random()}},function(t,n,e){"use strict";n.a=function(t){return null===t?NaN:+t}},function(t,n,e){"use strict";n.c=function(t,n){var e=n-t;return e?i(t,e>180||e<-180?e-360*Math.round(e/360):e):Object(r.a)(isNaN(t)?n:t)},n.b=function(t){return 1==(t=+t)?c:function(n,e){return e-n?function(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):Object(r.a)(isNaN(n)?e:n)}},n.a=c;var r=e(115);function i(t,n){return function(e){return t+e*n}}function c(t,n){var e=n-t;return e?i(t,e):Object(r.a)(isNaN(t)?n:t)}},function(t,n,e){"use strict";e(298),e(299);var r=e(66);e.d(n,"a",function(){return r.a});e(300),e(301),e(302)},function(t,n,e){"use strict";n.g=function(t){return[Object(r.e)(t[1],t[0]),Object(r.c)(t[2])]},n.a=function(t){var n=t[0],e=t[1],i=Object(r.g)(e);return[i*Object(r.g)(n),i*Object(r.t)(n),Object(r.t)(e)]},n.d=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},n.c=function(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]},n.b=function(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]},n.f=function(t,n){return[t[0]*n,t[1]*n,t[2]*n]},n.e=function(t){var n=Object(r.u)(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n};var r=e(0)},function(t,n,e){"use strict";n.b=function(t){return function(n,e){var i=Object(r.g)(n),c=Object(r.g)(e),a=t(i*c);return[a*c*Object(r.t)(n),a*Object(r.t)(e)]}},n.a=function(t){return function(n,e){var i=Object(r.u)(n*n+e*e),c=t(i),a=Object(r.t)(c),o=Object(r.g)(c);return[Object(r.e)(n*a,i*o),Object(r.c)(i&&e*a/i)]}};var r=e(0)},function(t,n,e){"use strict";n.a=function(t,n,e,r,i){for(var c,a=t.children,o=-1,u=a.length,f=t.value&&(r-n)/t.value;++o<u;)(c=a[o]).y0=e,c.y1=i,c.x0=n,c.x1=n+=c.value*f}},function(t,n,e){"use strict";n.b=o,n.a=function t(){var n=Object(c.b)(c.c,i.c);n.copy=function(){return Object(c.a)(n,t())};return o(n)};var r=e(5),i=e(6),c=e(46),a=e(410);function o(t){var n=t.domain;return t.ticks=function(t){var e=n();return Object(r.i)(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return Object(a.a)(n(),t,e)},t.nice=function(e){null==e&&(e=10);var i,c=n(),a=0,o=c.length-1,u=c[a],f=c[o];return f<u&&(i=u,u=f,f=i,i=a,a=o,o=i),(i=Object(r.g)(u,f,e))>0?(u=Math.floor(u/i)*i,f=Math.ceil(f/i)*i,i=Object(r.g)(u,f,e)):i<0&&(u=Math.ceil(u*i)/i,f=Math.floor(f*i)/i,i=Object(r.g)(u,f,e)),i>0?(c[a]=Math.floor(u/i)*i,c[o]=Math.ceil(f/i)*i,n(c)):i<0&&(c[a]=Math.ceil(u*i)/i,c[o]=Math.floor(f*i)/i,n(c)),t},t}},function(t,n,e){"use strict";n.a=function(t){return t.match(/.{6}/g).map(function(t){return"#"+t})}},function(t,n,e){"use strict";e.d(n,"a",function(){return r}),e.d(n,"d",function(){return i}),e.d(n,"e",function(){return c}),e.d(n,"h",function(){return a}),e.d(n,"i",function(){return o}),e.d(n,"k",function(){return u}),e.d(n,"l",function(){return f}),e.d(n,"f",function(){return s}),e.d(n,"j",function(){return l}),e.d(n,"g",function(){return h}),e.d(n,"m",function(){return d}),n.b=function(t){return t>1?0:t<-1?l:Math.acos(t)},n.c=function(t){return t>=1?h:t<=-1?-h:Math.asin(t)};var r=Math.abs,i=Math.atan2,c=Math.cos,a=Math.max,o=Math.min,u=Math.sin,f=Math.sqrt,s=1e-12,l=Math.PI,h=l/2,d=2*l},function(t,n,e){"use strict";n.a=function(t,n){if((i=t.length)>1)for(var e,r,i,c=1,a=t[n[0]],o=a.length;c<i;++c)for(r=a,a=t[n[c]],e=0;e<o;++e)a[e][1]+=a[e][0]=isNaN(r[e][1])?r[e][0]:r[e][1]}},function(t,n,e){"use strict";n.a=function(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e}},function(t,n,e){"use strict";e.d(n,"f",function(){return h}),e.d(n,"g",function(){return d}),e.d(n,"a",function(){return r}),e.d(n,"b",function(){return i}),e.d(n,"c",function(){return c}),e.d(n,"e",function(){return a}),n.d=p;var r,i,c,a,o=e(469),u=e(171),f=e(172),s=e(91),l=e(90),h=1e-6,d=1e-12;function b(t,n){return n[1]-t[1]||n[0]-t[0]}function p(t,n){var e,h,d,p=t.sort(b).pop();for(a=[],i=new Array(t.length),r=new l.b,c=new l.b;;)if(d=f.c,p&&(!d||p[1]<d.y||p[1]===d.y&&p[0]<d.x))p[0]===e&&p[1]===h||(Object(o.a)(p),e=p[0],h=p[1]),p=t.pop();else{if(!d)break;Object(o.b)(d.arc)}if(Object(u.d)(),n){var v=+n[0][0],_=+n[0][1],y=+n[1][0],g=+n[1][1];Object(s.a)(v,_,y,g),Object(u.b)(v,_,y,g)}this.edges=a,this.cells=i,r=c=a=i=null}p.prototype={constructor:p,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return Object(u.a)(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){if(c=(i=e.halfedges).length)for(var i,c,a,o,u,f,s=e.site,l=-1,h=n[i[c-1]],d=h.left===s?h.right:h.left;++l<c;)a=d,d=(h=n[i[l]]).left===s?h.right:h.left,a&&d&&r<a.index&&r<d.index&&(u=a,f=d,((o=s)[0]-f[0])*(u[1]-o[1])-(o[0]-u[0])*(f[1]-o[1])<0)&&t.push([s.data,a.data,d.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})},find:function(t,n,e){for(var r,i,c=this,a=c._found||0,o=c.cells.length;!(i=c.cells[a]);)if(++a>=o)return null;var u=t-i.site[0],f=n-i.site[1],s=u*u+f*f;do{i=c.cells[r=a],a=null,i.halfedges.forEach(function(e){var r=c.edges[e],o=r.left;if(o!==i.site&&o||(o=r.right)){var u=t-o[0],f=n-o[1],l=u*u+f*f;l<s&&(s=l,a=o.index)}})}while(null!==a);return c._found=r,null==e||s<=e*e?i.site:null}}},function(t,n,e){"use strict";var r=e(54),i=e(55);n.a=function(t){var n=Object(r.a)(t);return(n.local?function(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}:function(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===i.b&&n.documentElement.namespaceURI===i.b?n.createElement(t):n.createElementNS(e,t)}})(n)}},function(t,n,e){"use strict";n.a=function(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,[(r=r.matrixTransform(t.getScreenCTM().inverse())).x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}},function(t,n,e){"use strict";n.a=function(t,n){return n-=t=+t,function(e){return t+n*e}}},function(t,n,e){"use strict";var r=e(65);e.d(n,"a",function(){return r.b}),e.d(n,"c",function(){return r.c});var i=e(259);e.d(n,"b",function(){return i.a});e(260)},function(t,n,e){"use strict";n.b=function(t,n,e){var i=t._id;return t.each(function(){var t=Object(r.h)(this,i);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return Object(r.f)(t,i).value[n]}};var r=e(9);n.a=function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var i,c=Object(r.f)(this.node(),e).tween,a=0,o=c.length;a<o;++a)if((i=c[a]).name===t)return i.value;return null}return this.each((null==n?function(t,n){var e,i;return function(){var c=Object(r.h)(this,t),a=c.tween;if(a!==e)for(var o=0,u=(i=e=a).length;o<u;++o)if(i[o].name===n){(i=i.slice()).splice(o,1);break}c.tween=i}}:function(t,n,e){var i,c;if("function"!=typeof e)throw new Error;return function(){var a=Object(r.h)(this,t),o=a.tween;if(o!==i){c=(i=o).slice();for(var u={name:n,value:e},f=0,s=c.length;f<s;++f)if(c[f].name===n){c[f]=u;break}f===s&&c.push(u)}a.tween=c}})(e,t,n))}},function(t,n,e){"use strict";var r=e(73);n.a=function(t){return(t=Object(r.a)(Math.abs(t)))?t[1]:NaN}},function(t,n,e){"use strict";n.b=a;var r=e(131),i=e(0);function c(t,n){return[t>i.o?t-i.w:t<-i.o?t+i.w:t,n]}function a(t,n,e){return(t%=i.w)?n||e?Object(r.a)(u(t),f(n,e)):u(t):n||e?f(n,e):c}function o(t){return function(n,e){return[(n+=t)>i.o?n-i.w:n<-i.o?n+i.w:n,e]}}function u(t){var n=o(t);return n.invert=o(-t),n}function f(t,n){var e=Object(i.g)(t),r=Object(i.t)(t),c=Object(i.g)(n),a=Object(i.t)(n);function o(t,n){var o=Object(i.g)(n),u=Object(i.g)(t)*o,f=Object(i.t)(t)*o,s=Object(i.t)(n),l=s*e+u*r;return[Object(i.e)(f*c-l*a,u*e-s*r),Object(i.c)(l*c+f*a)]}return o.invert=function(t,n){var o=Object(i.g)(n),u=Object(i.g)(t)*o,f=Object(i.t)(t)*o,s=Object(i.t)(n),l=s*c-f*a;return[Object(i.e)(f*c+s*a,u*e+l*r),Object(i.c)(l*e-u*r)]},o}c.invert=c,n.a=function(t){function n(n){return(n=t(n[0]*i.r,n[1]*i.r))[0]*=i.h,n[1]*=i.h,n}return t=a(t[0]*i.r,t[1]*i.r,t.length>2?t[2]*i.r:0),n.invert=function(n){return(n=t.invert(n[0]*i.r,n[1]*i.r))[0]*=i.h,n[1]*=i.h,n},n}},function(t,n,e){"use strict";n.a=function(t,n,e,s){function l(r,i){return t<=r&&r<=e&&n<=i&&i<=s}function h(r,i,c,a){var o=0,u=0;if(null==r||(o=d(r,c))!==(u=d(i,c))||p(r,i)<0^c>0)do{a.point(0===o||3===o?t:e,o>1?s:n)}while((o=(o+c+4)%4)!==u);else a.point(i[0],i[1])}function d(i,c){return Object(r.a)(i[0]-t)<r.i?c>0?0:3:Object(r.a)(i[0]-e)<r.i?c>0?2:1:Object(r.a)(i[1]-n)<r.i?c>0?1:0:c>0?3:2}function b(t,n){return p(t.x,n.x)}function p(t,n){var e=d(t,1),r=d(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(r){var d,p,v,_,y,g,m,x,w,O,j,M=r,T=Object(i.a)(),S={point:E,lineStart:function(){S.point=N,p&&p.push(v=[]);O=!0,w=!1,m=x=NaN},lineEnd:function(){d&&(N(_,y),g&&w&&T.rejoin(),d.push(T.result()));S.point=E,w&&M.lineEnd()},polygonStart:function(){M=T,d=[],p=[],j=!0},polygonEnd:function(){var n=function(){for(var n=0,e=0,r=p.length;e<r;++e)for(var i,c,a=p[e],o=1,u=a.length,f=a[0],l=f[0],h=f[1];o<u;++o)i=l,c=h,f=a[o],l=f[0],h=f[1],c<=s?h>s&&(l-i)*(s-c)>(h-c)*(t-i)&&++n:h<=s&&(l-i)*(s-c)<(h-c)*(t-i)&&--n;return n}(),e=j&&n,i=(d=Object(o.d)(d)).length;(e||i)&&(r.polygonStart(),e&&(r.lineStart(),h(null,null,1,r),r.lineEnd()),i&&Object(a.a)(d,b,n,h,r),r.polygonEnd());M=r,d=p=v=null}};function E(t,n){l(t,n)&&M.point(t,n)}function N(r,i){var a=l(r,i);if(p&&v.push([r,i]),O)_=r,y=i,g=a,O=!1,a&&(M.lineStart(),M.point(r,i));else if(a&&w)M.point(r,i);else{var o=[m=Math.max(f,Math.min(u,m)),x=Math.max(f,Math.min(u,x))],h=[r=Math.max(f,Math.min(u,r)),i=Math.max(f,Math.min(u,i))];Object(c.a)(o,h,t,n,e,s)?(w||(M.lineStart(),M.point(o[0],o[1])),M.point(h[0],h[1]),a||M.lineEnd(),j=!1):a&&(M.lineStart(),M.point(r,i),j=!1)}m=r,x=i,w=a}return S}};var r=e(0),i=e(134),c=e(340),a=e(135),o=e(5),u=1e9,f=-u},function(t,n,e){"use strict";n.a=r;function r(t){return function(n){var e=new i;for(var r in t)e[r]=t[r];return e.stream=n,e}}function i(){}i.prototype={constructor:i,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}}},function(t,n,e){"use strict";n.a=function(t,n,e,r,i){for(var c,a=t.children,o=-1,u=a.length,f=t.value&&(i-e)/t.value;++o<u;)(c=a[o]).x0=n,c.x1=r,c.y0=e,c.y1=e+=c.value*f}},function(t,n,e){"use strict";var r=e(82);n.a=function(t,n){return function(e,i){var c=Object(r.a)(e).mimeType(t).response(n);if(null!=i){if("function"!=typeof i)throw new Error("invalid callback: "+i);return c.get(i)}return c}}},function(t,n,e){"use strict";n.c=f,n.a=function(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())},n.b=function(t,n){var e,r,a,h=u,d=u,b=i.a,p=!1;function v(){return e=Math.min(h.length,d.length)>2?l:s,r=a=null,_}function _(n){return(r||(r=e(h,d,p?function(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}(t):t,b)))(+n)}return _.invert=function(t){return(a||(a=e(d,h,f,p?function(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}(n):n)))(+t)},_.domain=function(t){return arguments.length?(h=c.a.call(t,o.a),v()):h.slice()},_.range=function(t){return arguments.length?(d=c.b.call(t),v()):d.slice()},_.rangeRound=function(t){return d=c.b.call(t),b=i.f,v()},_.clamp=function(t){return arguments.length?(p=!!t,v()):p},_.interpolate=function(t){return arguments.length?(b=t,v()):b},v()};var r=e(5),i=e(6),c=e(17),a=e(83),o=e(152),u=[0,1];function f(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:Object(a.a)(n)}function s(t,n,e,r){var i=t[0],c=t[1],a=n[0],o=n[1];return c<i?(i=e(c,i),a=r(o,a)):(i=e(i,c),a=r(a,o)),function(t){return a(i(t))}}function l(t,n,e,i){var c=Math.min(t.length,n.length)-1,a=new Array(c),o=new Array(c),u=-1;for(t[c]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++u<c;)a[u]=e(t[u],t[u+1]),o[u]=i(n[u],n[u+1]);return function(n){var e=Object(r.b)(t,n,1,c)-1;return o[e](a[e](n))}}},function(t,n,e){"use strict";e(4);var r=e(416);e.d(n,"c",function(){return r.a}),e.d(n,"n",function(){return r.a});var i=e(417);e.d(n,"g",function(){return i.a}),e.d(n,"r",function(){return i.a});var c=e(418);e.d(n,"d",function(){return c.a});var a=e(419);e.d(n,"b",function(){return a.a});var o=e(420);e.d(n,"a",function(){return o.a});var u=e(421);e.d(n,"j",function(){return u.b}),e.d(n,"h",function(){return u.b}),e.d(n,"e",function(){return u.a}),e.d(n,"i",function(){return u.c});var f=e(422);e.d(n,"f",function(){return f.a});var s=e(423);e.d(n,"k",function(){return s.a});var l=e(424);e.d(n,"o",function(){return l.a});var h=e(425);e.d(n,"m",function(){return h.a});var d=e(426);e.d(n,"l",function(){return d.a});var b=e(427);e.d(n,"u",function(){return b.b}),e.d(n,"s",function(){return b.b}),e.d(n,"p",function(){return b.a}),e.d(n,"t",function(){return b.c});var p=e(428);e.d(n,"q",function(){return p.a});var v=e(429);e.d(n,"v",function(){return v.a})},function(t,n,e){"use strict";function r(t){this._context=t}r.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}},n.a=function(t){return new r(t)}},function(t,n,e){"use strict";n.a=function(){}},function(t,n,e){"use strict";function r(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function i(t){this._context=t}n.b=r,n.a=i,i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:r(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:r(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}}},function(t,n,e){"use strict";function r(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function i(t,n){this._context=t,this._k=(1-n)/6}n.b=r,n.a=i,i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:r(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:r(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return new i(t,n)}return e.tension=function(n){return t(+n)},e})(0)},function(t,n,e){"use strict";var r=e(23);n.a=function(t,n,e){if(null==e&&(e=r.a),i=t.length){if((n=+n)<=0||i<2)return+e(t[0],0,t);if(n>=1)return+e(t[i-1],i-1,t);var i,c=(i-1)*n,a=Math.floor(c),o=+e(t[a],a,t);return o+(+e(t[a+1],a+1,t)-o)*(c-a)}}},function(t,n,e){"use strict";e(208);var r=e(110);e.d(n,"a",function(){return r.a}),e.d(n,"b",function(){return r.b})},function(t,n,e){"use strict";var r=e(55);n.a=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),r.a.hasOwnProperty(n)?{space:r.a[n],local:t}:t}},function(t,n,e){"use strict";e.d(n,"b",function(){return r});var r="http://www.w3.org/1999/xhtml";n.a={svg:"http://www.w3.org/2000/svg",xhtml:r,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"}},function(t,n,e){"use strict";function r(){}n.a=function(t){return null==t?r:function(){return this.querySelector(t)}}},function(t,n,e){"use strict";n.a=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}},function(t,n,e){"use strict";e.d(n,"c",function(){return i}),n.a=function(t,n,e,r){var c=i;t.sourceEvent=i,i=t;try{return n.apply(e,r)}finally{i=c}};var r={},i=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(r={mouseenter:"mouseover",mouseleave:"mouseout"}));function c(t,n,e){return t=a(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function a(t,n,e){return function(r){var c=i;i=r;try{t.call(this,this.__data__,n,e)}finally{i=c}}}function o(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,c=n.length;r<c;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function u(t,n,e){var i=r.hasOwnProperty(t.type)?c:a;return function(r,c,a){var o,u=this.__on,f=i(n,c,a);if(u)for(var s=0,l=u.length;s<l;++s)if((o=u[s]).type===t.type&&o.name===t.name)return this.removeEventListener(o.type,o.listener,o.capture),this.addEventListener(o.type,o.listener=f,o.capture=e),void(o.value=n);this.addEventListener(t.type,f,e),o={type:t.type,name:t.name,value:n,listener:f,capture:e},u?u.push(o):this.__on=[o]}}n.b=function(t,n,e){var r,i,c=function(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}(t+""),a=c.length;if(!(arguments.length<2)){for(f=n?u:o,null==e&&(e=!1),r=0;r<a;++r)this.each(f(c[r],n,e));return this}var f=this.node().__on;if(f)for(var s,l=0,h=f.length;l<h;++l)for(r=0,s=f[l];r<a;++r)if((i=c[r]).type===s.type&&i.name===s.name)return s.value}},function(t,n,e){"use strict";var r=e(58);n.a=function(){for(var t,n=r.c;t=n.sourceEvent;)n=t;return n}},function(t,n,e){"use strict";var r=e(7),i=e(113),c=e(116),a=e(117),o=e(37),u=e(118),f=e(119),s=e(115);n.a=function(t,n){var e,l=typeof n;return null==n||"boolean"===l?Object(s.a)(n):("number"===l?o.a:"string"===l?(e=Object(r.a)(n))?(n=e,i.a):f.a:n instanceof r.a?i.a:n instanceof Date?a.a:Array.isArray(n)?c.a:"function"!=typeof n.valueOf&&"function"!=typeof n.toString||isNaN(n)?u.a:o.a)(t,n)}},function(t,n,e){"use strict";n.a=i,e.d(n,"d",function(){return c}),e.d(n,"c",function(){return a}),n.e=g,n.h=w,n.g=O,n.b=j,n.f=T;var r=e(62);function i(){}var c=.7,a=1/c,o="\\s*([+-]?\\d+)\\s*",u="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",f="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",s=/^#([0-9a-f]{3})$/,l=/^#([0-9a-f]{6})$/,h=new RegExp("^rgb\\("+[o,o,o]+"\\)$"),d=new RegExp("^rgb\\("+[f,f,f]+"\\)$"),b=new RegExp("^rgba\\("+[o,o,o,u]+"\\)$"),p=new RegExp("^rgba\\("+[f,f,f,u]+"\\)$"),v=new RegExp("^hsl\\("+[u,f,f]+"\\)$"),_=new RegExp("^hsla\\("+[u,f,f,u]+"\\)$"),y={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function g(t){var n;return t=(t+"").trim().toLowerCase(),(n=s.exec(t))?new j((n=parseInt(n[1],16))>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):(n=l.exec(t))?m(parseInt(n[1],16)):(n=h.exec(t))?new j(n[1],n[2],n[3],1):(n=d.exec(t))?new j(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=b.exec(t))?x(n[1],n[2],n[3],n[4]):(n=p.exec(t))?x(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=v.exec(t))?M(n[1],n[2]/100,n[3]/100,1):(n=_.exec(t))?M(n[1],n[2]/100,n[3]/100,n[4]):y.hasOwnProperty(t)?m(y[t]):"transparent"===t?new j(NaN,NaN,NaN,0):null}function m(t){return new j(t>>16&255,t>>8&255,255&t,1)}function x(t,n,e,r){return r<=0&&(t=n=e=NaN),new j(t,n,e,r)}function w(t){return t instanceof i||(t=g(t)),t?new j((t=t.rgb()).r,t.g,t.b,t.opacity):new j}function O(t,n,e,r){return 1===arguments.length?w(t):new j(t,n,e,null==r?1:r)}function j(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function M(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new S(t,n,e,r)}function T(t,n,e,r){return 1===arguments.length?function(t){if(t instanceof S)return new S(t.h,t.s,t.l,t.opacity);if(t instanceof i||(t=g(t)),!t)return new S;if(t instanceof S)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,c=Math.min(n,e,r),a=Math.max(n,e,r),o=NaN,u=a-c,f=(a+c)/2;return u?(o=n===a?(e-r)/u+6*(e<r):e===a?(r-n)/u+2:(n-e)/u+4,u/=f<.5?a+c:2-a-c,o*=60):u=f>0&&f<1?0:o,new S(o,u,f,t.opacity)}(t):new S(t,n,e,null==r?1:r)}function S(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function E(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}Object(r.a)(i,g,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),Object(r.a)(j,O,Object(r.b)(i,{brighter:function(t){return t=null==t?a:Math.pow(a,t),new j(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?c:Math.pow(c,t),new j(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),Object(r.a)(S,T,Object(r.b)(i,{brighter:function(t){return t=null==t?a:Math.pow(a,t),new S(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?c:Math.pow(c,t),new S(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new j(E(t>=240?t-240:t+120,i,r),E(t,i,r),E(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}))},function(t,n,e){"use strict";n.b=function(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e},n.a=function(t,n,e){t.prototype=n.prototype=e,e.constructor=t}},function(t,n,e){"use strict";function r(t,n,e,r,i){var c=t*t,a=c*t;return((1-3*t+3*c-a)*n+(4-6*c+3*a)*e+(1+3*t+3*c-3*a)*r+a*i)/6}n.a=r,n.b=function(t){var n=t.length-1;return function(e){var i=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),c=t[i],a=t[i+1],o=i>0?t[i-1]:2*c-a,u=i<n-1?t[i+2]:2*a-c;return r((e-i/n)*n,o,c,a,u)}}},function(t,n,e){"use strict";e(257),e(13),e(288);var r=e(120);e.d(n,"a",function(){return r.a})},function(t,n,e){"use strict";n.b=b,n.a=v,n.c=_;var r,i,c=0,a=0,o=0,u=1e3,f=0,s=0,l=0,h="object"==typeof performance&&performance.now?performance:Date,d="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function b(){return s||(d(p),s=h.now()+l)}function p(){s=0}function v(){this._call=this._time=this._next=null}function _(t,n,e){var r=new v;return r.restart(t,n,e),r}function y(){s=(f=h.now())+l,c=a=0;try{!function(){b(),++c;for(var t,n=r;n;)(t=s-n._time)>=0&&n._call.call(null,t),n=n._next;--c}()}finally{c=0,function(){var t,n,e=r,c=1/0;for(;e;)e._call?(c>e._time&&(c=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:r=n);i=t,m(c)}(),s=0}}function g(){var t=h.now(),n=t-f;n>u&&(l-=n,f=t)}function m(t){c||(a&&(a=clearTimeout(a)),t-s>24?(t<1/0&&(a=setTimeout(y,t-h.now()-l)),o&&(o=clearInterval(o))):(o||(f=h.now(),o=setInterval(g,u)),c=1,d(y)))}v.prototype=_.prototype={constructor:v,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?b():+e)+(null==n?0:+n),this._next||i===this||(i?i._next=this:r=this,i=this),this._call=t,this._time=e,m()},stop:function(){this._call&&(this._call=null,this._time=1/0,m())}}},function(t,n,e){"use strict";e.d(n,"b",function(){return r});var r="$";function i(){}function c(t,n){var e=new i;if(t instanceof i)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,c=-1,a=t.length;if(null==n)for(;++c<a;)e.set(c,t[c]);else for(;++c<a;)e.set(n(r=t[c],c,t),r)}else if(t)for(var o in t)e.set(o,t[o]);return e}i.prototype=c.prototype={constructor:i,has:function(t){return r+t in this},get:function(t){return this[r+t]},set:function(t,n){return this[r+t]=n,this},remove:function(t){var n=r+t;return n in this&&delete this[n]},clear:function(){for(var t in this)t[0]===r&&delete this[t]},keys:function(){var t=[];for(var n in this)n[0]===r&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)n[0]===r&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)n[0]===r&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)n[0]===r&&++t;return t},empty:function(){for(var t in this)if(t[0]===r)return!1;return!0},each:function(t){for(var n in this)n[0]===r&&t(this[n],n.slice(1),this)}},n.a=c},function(t,n,e){"use strict";e(68);var r=e(303);e.d(n,"a",function(){return r.a});var i=e(304);e.d(n,"b",function(){return i.a})},function(t,n,e){"use strict";var r={},i={},c=34,a=10,o=13;function u(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}n.a=function(t){var n=new RegExp('["'+t+"\n\r]"),e=t.charCodeAt(0);function f(t,n){var u,f=[],s=t.length,l=0,h=0,d=s<=0,b=!1;function p(){if(d)return i;if(b)return b=!1,r;var n,u,f=l;if(t.charCodeAt(f)===c){for(;l++<s&&t.charCodeAt(l)!==c||t.charCodeAt(++l)===c;);return(n=l)>=s?d=!0:(u=t.charCodeAt(l++))===a?b=!0:u===o&&(b=!0,t.charCodeAt(l)===a&&++l),t.slice(f+1,n-1).replace(/""/g,'"')}for(;l<s;){if((u=t.charCodeAt(n=l++))===a)b=!0;else if(u===o)b=!0,t.charCodeAt(l)===a&&++l;else if(u!==e)continue;return t.slice(f,n)}return d=!0,t.slice(f,s)}for(t.charCodeAt(s-1)===a&&--s,t.charCodeAt(s-1)===o&&--s;(u=p())!==i;){for(var v=[];u!==r&&u!==i;)v.push(u),u=p();n&&null==(v=n(v,h++))||f.push(v)}return f}function s(n){return n.map(l).join(t)}function l(t){return null==t?"":n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,n){var e,r,i=f(t,function(t,i){if(e)return e(t,i-1);r=t,e=n?function(t,n){var e=u(t);return function(r,i){return n(e(r),i,t)}}(t,n):u(t)});return i.columns=r||[],i},parseRows:f,format:function(n,e){return null==e&&(e=function(t){var n=Object.create(null),e=[];return t.forEach(function(t){for(var r in t)r in n||e.push(n[r]=r)}),e}(n)),[e.map(l).join(t)].concat(n.map(function(n){return e.map(function(t){return l(n[t])}).join(t)})).join("\n")},formatRows:function(t){return t.map(s).join("\n")}}}},function(t,n,e){"use strict";n.a=function(){return 1e-6*(Math.random()-.5)}},function(t,n,e){"use strict";var r=e(308);e.d(n,"a",function(){return r.a})},function(t,n,e){"use strict";n.a=function(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}},function(t,n,e){"use strict";var r=e(326);e.d(n,"a",function(){return r.a}),e.d(n,"b",function(){return r.b});e(125);var i=e(126);e.d(n,"c",function(){return i.a});var c=e(332);e.d(n,"d",function(){return c.a});var a=e(333);e.d(n,"e",function(){return a.a});var o=e(334);e.d(n,"f",function(){return o.a})},function(t,n,e){"use strict";n.a=function(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}},function(t,n,e){"use strict";n.a=function(t){return t}},function(t,n,e){"use strict";var r=e(0),i=e(76),c=e(351);function a(t,n){var e=Object(r.t)(t),i=(e+Object(r.t)(n))/2;if(Object(r.a)(i)<r.i)return Object(c.a)(t);var a=1+e*(2*i-e),o=Object(r.u)(a)/i;function u(t,n){var e=Object(r.u)(a-2*i*Object(r.t)(n))/i;return[e*Object(r.t)(t*=i),o-e*Object(r.g)(t)]}return u.invert=function(t,n){var e=o-n;return[Object(r.e)(t,Object(r.a)(e))/i*Object(r.s)(e),Object(r.c)((a-(t*t+e*e)*i*i)/(2*i))]},u}n.a=function(){return Object(i.a)(a).scale(155.424).center([0,33.6442])}},function(t,n,e){"use strict";n.a=function(t){var n=0,e=r.o/3,c=Object(i.b)(t),a=c(n,e);return a.parallels=function(t){return arguments.length?c(n=t[0]*r.r,e=t[1]*r.r):[n*r.h,e*r.h]},a};var r=e(0),i=e(10)},function(t,n,e){"use strict";n.a=a,n.c=function(t,n,e){return a(t,[[0,0],n],e)},n.d=function(t,n,e){return c(t,function(e){var r=+n,i=r/(e[1][0]-e[0][0]),c=(r-i*(e[1][0]+e[0][0]))/2,a=-i*e[0][1];t.scale(150*i).translate([c,a])},e)},n.b=function(t,n,e){return c(t,function(e){var r=+n,i=r/(e[1][1]-e[0][1]),c=-i*e[0][0],a=(r-i*(e[1][1]+e[0][1]))/2;t.scale(150*i).translate([c,a])},e)};var r=e(16),i=e(141);function c(t,n,e){var c=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),null!=c&&t.clipExtent(null),Object(r.a)(e,t.stream(i.a)),n(i.a.result()),null!=c&&t.clipExtent(c),t}function a(t,n,e){return c(t,function(e){var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],c=Math.min(r/(e[1][0]-e[0][0]),i/(e[1][1]-e[0][1])),a=+n[0][0]+(r-c*(e[1][0]+e[0][0]))/2,o=+n[0][1]+(i-c*(e[1][1]+e[0][1]))/2;t.scale(150*c).translate([a,o])},e)}},function(t,n,e){"use strict";n.b=a,n.a=o;var r=e(0),i=e(41),c=e(10);function a(t,n){return[t,Object(r.n)(Object(r.v)((r.l+n)/2))]}a.invert=function(t,n){return[t,2*Object(r.d)(Object(r.k)(n))-r.l]};function o(t){var n,e,o,u=Object(c.a)(t),f=u.center,s=u.scale,l=u.translate,h=u.clipExtent,d=null;function b(){var c=r.o*s(),f=u(Object(i.a)(u.rotate()).invert([0,0]));return h(null==d?[[f[0]-c,f[1]-c],[f[0]+c,f[1]+c]]:t===a?[[Math.max(f[0]-c,d),n],[Math.min(f[0]+c,e),o]]:[[d,Math.max(f[1]-c,n)],[e,Math.min(f[1]+c,o)]])}return u.scale=function(t){return arguments.length?(s(t),b()):s()},u.translate=function(t){return arguments.length?(l(t),b()):l()},u.center=function(t){return arguments.length?(f(t),b()):f()},u.clipExtent=function(t){return arguments.length?(null==t?d=n=e=o=null:(d=+t[0][0],n=+t[0][1],e=+t[1][0],o=+t[1][1]),b()):null==d?null:[[d,n],[e,o]]},b()}},function(t,n,e){"use strict";n.b=_,n.a=y;var r=e(365),i=e(366),c=e(367),a=e(368),o=e(369),u=e(370),f=e(371),s=e(372),l=e(373),h=e(374),d=e(375);function b(t,n){var e,r,i,c,a,o=new y(t),u=+t.value&&(o.value=t.value),f=[o];for(null==n&&(n=p);e=f.pop();)if(u&&(e.value=+e.data.value),(i=n(e.data))&&(a=i.length))for(e.children=new Array(a),c=a-1;c>=0;--c)f.push(r=e.children[c]=new y(i[c])),r.parent=e,r.depth=e.depth+1;return o.eachBefore(_)}function p(t){return t.children}function v(t){t.data=t.data.data}function _(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function y(t){this.data=t,this.depth=this.height=0,this.parent=null}y.prototype=b.prototype={constructor:y,count:r.a,each:i.a,eachAfter:a.a,eachBefore:c.a,sum:o.a,sort:u.a,path:f.a,ancestors:s.a,descendants:l.a,leaves:h.a,links:d.a,copy:function(){return b(this).eachBefore(v)}}},function(t,n,e){"use strict";function r(t){if("function"!=typeof t)throw new Error;return t}n.a=function(t){return null==t?null:r(t)},n.b=r},function(t,n,e){"use strict";e.d(n,"b",function(){return c}),n.c=a;var r=e(28),i=e(44),c=(1+Math.sqrt(5))/2;function a(t,n,e,c,a,o){for(var u,f,s,l,h,d,b,p,v,_,y,g=[],m=n.children,x=0,w=0,O=m.length,j=n.value;x<O;){s=a-e,l=o-c;do{h=m[w++].value}while(!h&&w<O);for(d=b=h,y=h*h*(_=Math.max(l/s,s/l)/(j*t)),v=Math.max(b/y,y/d);w<O;++w){if(h+=f=m[w].value,f<d&&(d=f),f>b&&(b=f),y=h*h*_,(p=Math.max(b/y,y/d))>v){h-=f;break}v=p}g.push(u={value:h,dice:s<l,children:m.slice(x,w)}),u.dice?Object(r.a)(u,e,c,a,j?c+=l*h/j:o):Object(i.a)(u,e,c,j?e+=s*h/j:a,o),j-=h,x=w}return g}n.a=function t(n){function e(t,e,r,i,c){a(n,t,e,r,i,c)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(c)},function(t,n,e){"use strict";var r=e(25),i=e(12);n.a=function(t,n){var e,c,a,o,u=Object(i.dispatch)("beforesend","progress","load","error"),f=Object(r.a)(),s=new XMLHttpRequest,l=null,h=null,d=0;function b(t){var n,r=s.status;if(!r&&function(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}(s)||r>=200&&r<300||304===r){if(a)try{n=a.call(e,s)}catch(t){return void u.call("error",e,t)}else n=s;u.call("load",e,n)}else u.call("error",e,t)}if("undefined"==typeof XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),"onload"in s?s.onload=s.onerror=s.ontimeout=b:s.onreadystatechange=function(t){s.readyState>3&&b(t)},s.onprogress=function(t){u.call("progress",e,t)},e={header:function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?f.get(t):(null==n?f.remove(t):f.set(t,n+""),e)},mimeType:function(t){return arguments.length?(c=null==t?null:t+"",e):c},responseType:function(t){return arguments.length?(o=t,e):o},timeout:function(t){return arguments.length?(d=+t,e):d},user:function(t){return arguments.length<1?l:(l=null==t?null:t+"",e)},password:function(t){return arguments.length<1?h:(h=null==t?null:t+"",e)},response:function(t){return a=t,e},get:function(t,n){return e.send("GET",t,n)},post:function(t,n){return e.send("POST",t,n)},send:function(n,r,i){return s.open(n,t,!0,l,h),null==c||f.has("accept")||f.set("accept",c+",*/*"),s.setRequestHeader&&f.each(function(t,n){s.setRequestHeader(n,t)}),null!=c&&s.overrideMimeType&&s.overrideMimeType(c),null!=o&&(s.responseType=o),d>0&&(s.timeout=d),null==i&&"function"==typeof r&&(i=r,r=null),null!=i&&1===i.length&&(i=function(t){return function(n,e){t(null==n?e:null)}}(i)),null!=i&&e.on("error",i).on("load",function(t){i(null,t)}),u.call("beforesend",e,s),s.send(null==r?null:r),e},abort:function(){return s.abort(),e},on:function(){var t=u.on.apply(u,arguments);return t===u?e:t}},null!=n){if("function"!=typeof n)throw new Error("invalid callback: "+n);return e.get(n)}return e}},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";var r=e(85);e.d(n,"a",function(){return r.a}),e.d(n,"b",function(){return r.b});e(155),e(156),e(430)},function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e.d(n,"b",function(){return c}),e.d(n,"c",function(){return a});var r,i,c,a,o,u=e(155);o={dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},r=Object(u.a)(o),i=r.format,r.parse,c=r.utcFormat,a=r.utcParse},function(t,n,e){"use strict";var r=e(15),i=e(18),c=e(48),a=e(87);n.a=function(){var t=a.a,n=a.b,e=Object(i.a)(!0),o=null,u=c.a,f=null;function s(i){var c,a,s,l=i.length,h=!1;for(null==o&&(f=u(s=Object(r.a)())),c=0;c<=l;++c)!(c<l&&e(a=i[c],c,i))===h&&((h=!h)?f.lineStart():f.lineEnd()),h&&f.point(+t(a,c,i),+n(a,c,i));if(s)return f=null,s+""||null}return s.x=function(n){return arguments.length?(t="function"==typeof n?n:Object(i.a)(+n),s):t},s.y=function(t){return arguments.length?(n="function"==typeof t?t:Object(i.a)(+t),s):n},s.defined=function(t){return arguments.length?(e="function"==typeof t?t:Object(i.a)(!!t),s):e},s.curve=function(t){return arguments.length?(u=t,null!=o&&(f=u(o)),s):u},s.context=function(t){return arguments.length?(null==t?o=f=null:f=u(o=t),s):o},s}},function(t,n,e){"use strict";n.a=function(t){return t[0]},n.b=function(t){return t[1]}},function(t,n,e){"use strict";n.a=c;var r=e(31),i=e(51);function c(t,n,e){var i=t._x1,c=t._y1,a=t._x2,o=t._y2;if(t._l01_a>r.f){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,f=3*t._l01_a*(t._l01_a+t._l12_a);i=(i*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/f,c=(c*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/f}if(t._l23_a>r.f){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,l=3*t._l23_a*(t._l23_a+t._l12_a);a=(a*s+t._x1*t._l23_2a-n*t._l12_2a)/l,o=(o*s+t._y1*t._l23_2a-e*t._l12_2a)/l}t._context.bezierCurveTo(i,c,a,o,t._x2,t._y2)}function a(t,n){this._context=t,this._alpha=n}a.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:c(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return n?new a(t,n):new i.a(t,0)}return e.alpha=function(n){return t(+n)},e})(.5)},function(t,n,e){"use strict";n.b=i;var r=e(33);function i(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}n.a=function(t){var n=t.map(i);return Object(r.a)(t).sort(function(t,e){return n[t]-n[e]})}},function(t,n,e){"use strict";function r(){this._=null}function i(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function c(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function a(t){for(;t.L;)t=t.L;return t}n.a=function(t){t.U=t.C=t.L=t.R=t.P=t.N=null},r.prototype={constructor:r,insert:function(t,n){var e,r,o;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=a(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)e===(r=e.U).L?(o=r.R)&&o.C?(e.C=o.C=!1,r.C=!0,t=r):(t===e.R&&(i(this,e),e=(t=e).U),e.C=!1,r.C=!0,c(this,r)):(o=r.L)&&o.C?(e.C=o.C=!1,r.C=!0,t=r):(t===e.L&&(c(this,e),e=(t=e).U),e.C=!1,r.C=!0,i(this,r)),e=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var n,e,r,o=t.U,u=t.L,f=t.R;if(e=u?f?a(f):u:f,o?o.L===t?o.L=e:o.R=e:this._=e,u&&f?(r=e.C,e.C=t.C,e.L=u,u.U=e,e!==f?(o=e.U,e.U=t.U,t=e.R,o.L=t,e.R=f,f.U=e):(e.U=o,o=e,t=e.R)):(r=t.C,t=e),t&&(t.U=o),!r)if(t&&t.C)t.C=!1;else{do{if(t===this._)break;if(t===o.L){if((n=o.R).C&&(n.C=!1,o.C=!0,i(this,o),n=o.R),n.L&&n.L.C||n.R&&n.R.C){n.R&&n.R.C||(n.L.C=!1,n.C=!0,c(this,n),n=o.R),n.C=o.C,o.C=n.R.C=!1,i(this,o),t=this._;break}}else if((n=o.L).C&&(n.C=!1,o.C=!0,c(this,o),n=o.L),n.L&&n.L.C||n.R&&n.R.C){n.L&&n.L.C||(n.R.C=!1,n.C=!0,i(this,n),n=o.L),n.C=o.C,o.C=n.L.C=!1,c(this,o),t=this._;break}n.C=!0,t=o,o=o.U}while(!t.C);t&&(t.C=!1)}}},n.b=r},function(t,n,e){"use strict";n.c=function(t,n,e,c){var a=[null,null],o=r.e.push(a)-1;a.left=t,a.right=n,e&&i(a,t,n,e);c&&i(a,n,t,c);return r.b[t.index].halfedges.push(o),r.b[n.index].halfedges.push(o),a},n.b=function(t,n,e){var r=[n,e];return r.left=t,r},n.d=i,n.a=function(t,n,e,i){var o,u=r.e.length;for(;u--;)a(o=r.e[u],t,n,e,i)&&c(o,t,n,e,i)&&(Math.abs(o[0][0]-o[1][0])>r.f||Math.abs(o[0][1]-o[1][1])>r.f)||delete r.e[u]};var r=e(34);function i(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function c(t,n,e,r,i){var c,a=t[0],o=t[1],u=a[0],f=a[1],s=0,l=1,h=o[0]-u,d=o[1]-f;if(c=n-u,h||!(c>0)){if(c/=h,h<0){if(c<s)return;c<l&&(l=c)}else if(h>0){if(c>l)return;c>s&&(s=c)}if(c=r-u,h||!(c<0)){if(c/=h,h<0){if(c>l)return;c>s&&(s=c)}else if(h>0){if(c<s)return;c<l&&(l=c)}if(c=e-f,d||!(c>0)){if(c/=d,d<0){if(c<s)return;c<l&&(l=c)}else if(d>0){if(c>l)return;c>s&&(s=c)}if(c=i-f,d||!(c<0)){if(c/=d,d<0){if(c>l)return;c>s&&(s=c)}else if(d>0){if(c<s)return;c<l&&(l=c)}return!(s>0||l<1)||(s>0&&(t[0]=[u+s*h,f+s*d]),l<1&&(t[1]=[u+l*h,f+l*d]),!0)}}}}}function a(t,n,e,r,i){var c=t[1];if(c)return!0;var a,o,u=t[0],f=t.left,s=t.right,l=f[0],h=f[1],d=s[0],b=s[1],p=(l+d)/2,v=(h+b)/2;if(b===h){if(p<n||p>=r)return;if(l>d){if(u){if(u[1]>=i)return}else u=[p,e];c=[p,i]}else{if(u){if(u[1]<e)return}else u=[p,i];c=[p,e]}}else if(o=v-(a=(l-d)/(b-h))*p,a<-1||a>1)if(l>d){if(u){if(u[1]>=i)return}else u=[(e-o)/a,e];c=[(i-o)/a,i]}else{if(u){if(u[1]<e)return}else u=[(i-o)/a,i];c=[(e-o)/a,e]}else if(h<b){if(u){if(u[0]>=r)return}else u=[n,a*n+o];c=[r,a*r+o]}else{if(u){if(u[0]<n)return}else u=[r,a*r+o];c=[n,a*n+o]}return t[0]=u,t[1]=c,!0}},function(t,n,e){"use strict";var r=e(19),i=e(93),c=Object(i.a)(r.a),a=c.right;c.left;n.a=a},function(t,n,e){"use strict";var r=e(19);n.a=function(t){var n;return 1===t.length&&(n=t,t=function(t,e){return Object(r.a)(n(t),e)}),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var c=r+i>>>1;t(n[c],e)<0?r=c+1:i=c}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var c=r+i>>>1;t(n[c],e)>0?i=c:r=c+1}return r}}}},function(t,n,e){"use strict";n.a=r;function r(t,n){return[t,n]}},function(t,n,e){"use strict";var r=e(96);n.a=function(t,n){var e=Object(r.a)(t,n);return e?Math.sqrt(e):e}},function(t,n,e){"use strict";var r=e(23);n.a=function(t,n){var e,i,c=t.length,a=0,o=-1,u=0,f=0;if(null==n)for(;++o<c;)isNaN(e=Object(r.a)(t[o]))||(f+=(i=e-u)*(e-(u+=i/++a)));else for(;++o<c;)isNaN(e=Object(r.a)(n(t[o],o,t)))||(f+=(i=e-u)*(e-(u+=i/++a)));if(a>1)return f/(a-1)}},function(t,n,e){"use strict";n.a=function(t,n){var e,r,i,c=t.length,a=-1;if(null==n){for(;++a<c;)if(null!=(e=t[a])&&e>=e)for(r=i=e;++a<c;)null!=(e=t[a])&&(r>e&&(r=e),i<e&&(i=e))}else for(;++a<c;)if(null!=(e=n(t[a],a,t))&&e>=e)for(r=i=e;++a<c;)null!=(e=n(t[a],a,t))&&(r>e&&(r=e),i<e&&(i=e));return[r,i]}},function(t,n,e){"use strict";e.d(n,"b",function(){return i}),e.d(n,"a",function(){return c});var r=Array.prototype,i=r.slice,c=r.map},function(t,n,e){"use strict";n.a=function(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),c=new Array(i);++r<i;)c[r]=t+r*e;return c}},function(t,n,e){"use strict";n.b=a,n.c=function(t,n,e){var a=Math.abs(n-t)/Math.max(0,e),o=Math.pow(10,Math.floor(Math.log(a)/Math.LN10)),u=a/o;u>=r?o*=10:u>=i?o*=5:u>=c&&(o*=2);return n<t?-o:o};var r=Math.sqrt(50),i=Math.sqrt(10),c=Math.sqrt(2);function a(t,n,e){var a=(n-t)/Math.max(0,e),o=Math.floor(Math.log(a)/Math.LN10),u=a/Math.pow(10,o);return o>=0?(u>=r?10:u>=i?5:u>=c?2:1)*Math.pow(10,o):-Math.pow(10,-o)/(u>=r?10:u>=i?5:u>=c?2:1)}n.a=function(t,n,e){var r,i,c,o,u=-1;if(e=+e,(t=+t)===(n=+n)&&e>0)return[t];if((r=n<t)&&(i=t,t=n,n=i),0===(o=a(t,n,e))||!isFinite(o))return[];if(o>0)for(t=Math.ceil(t/o),n=Math.floor(n/o),c=new Array(i=Math.ceil(n-t+1));++u<i;)c[u]=(t+u)*o;else for(t=Math.floor(t*o),n=Math.ceil(n*o),c=new Array(i=Math.ceil(t-n+1));++u<i;)c[u]=(t-u)/o;return r&&c.reverse(),c}},function(t,n,e){"use strict";n.a=function(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1}},function(t,n,e){"use strict";n.a=function(t,n){var e,r,i=t.length,c=-1;if(null==n){for(;++c<i;)if(null!=(e=t[c])&&e>=e)for(r=e;++c<i;)null!=(e=t[c])&&r>e&&(r=e)}else for(;++c<i;)if(null!=(e=n(t[c],c,t))&&e>=e)for(r=e;++c<i;)null!=(e=n(t[c],c,t))&&r>e&&(r=e);return r}},function(t,n,e){"use strict";var r=e(102);function i(t){return t.length}n.a=function(t){if(!(a=t.length))return[];for(var n=-1,e=Object(r.a)(t,i),c=new Array(e);++n<e;)for(var a,o=-1,u=c[n]=new Array(a);++o<a;)u[o]=t[o][n];return c}},function(t,n,e){"use strict";var r=e(8);n.a=function(t){return"string"==typeof t?new r.a([[document.querySelector(t)]],[document.documentElement]):new r.a([[t]],r.c)}},function(t,n,e){"use strict";function r(){return[]}n.a=function(t){return null==t?r:function(){return this.querySelectorAll(t)}}},function(t,n,e){"use strict";var r=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var i=document.documentElement;if(!i.matches){var c=i.webkitMatchesSelector||i.msMatchesSelector||i.mozMatchesSelector||i.oMatchesSelector;r=function(t){return function(){return c.call(this,t)}}}}n.a=r},function(t,n,e){"use strict";n.a=c;var r=e(108),i=e(8);function c(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}n.b=function(){return new i.a(this._enter||this._groups.map(r.a),this._parents)},c.prototype={constructor:c,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}}},function(t,n,e){"use strict";n.a=function(t){return new Array(t.length)}},function(t,n,e){"use strict";n.b=i;var r=e(57);function i(t,n){return t.style.getPropertyValue(n)||Object(r.a)(t).getComputedStyle(t,null).getPropertyValue(n)}n.a=function(t,n,e){return arguments.length>1?this.each((null==n?function(t){return function(){this.style.removeProperty(t)}}:"function"==typeof n?function(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}:function(t,n,e){return function(){this.style.setProperty(t,n,e)}})(t,n,null==e?"":e)):i(this.node(),t)}},function(t,n,e){"use strict";n.b=function(t,n){var e=t.document.documentElement,c=Object(r.f)(t).on("dragstart.drag",null);n&&(c.on("click.drag",i.a,!0),setTimeout(function(){c.on("click.drag",null)},0));"onselectstart"in e?c.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)};var r=e(3),i=e(111);n.a=function(t){var n=t.document.documentElement,e=Object(r.f)(t).on("dragstart.drag",i.a,!0);"onselectstart"in n?e.on("selectstart.drag",i.a,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}},function(t,n,e){"use strict";n.b=function(){r.b.stopImmediatePropagation()};var r=e(3);n.a=function(){r.b.preventDefault(),r.b.stopImmediatePropagation()}},function(t,n,e){"use strict";e.d(n,"a",function(){return r}),e.d(n,"b",function(){return i});var r=Math.PI/180,i=180/Math.PI},function(t,n,e){"use strict";e.d(n,"b",function(){return u});var r=e(7),i=e(63),c=e(114),a=e(24);function o(t){return function(n){var e,i,c=n.length,a=new Array(c),o=new Array(c),u=new Array(c);for(e=0;e<c;++e)i=Object(r.f)(n[e]),a[e]=i.r||0,o[e]=i.g||0,u[e]=i.b||0;return a=t(a),o=t(o),u=t(u),i.opacity=1,function(t){return i.r=a(t),i.g=o(t),i.b=u(t),i+""}}}n.a=function t(n){var e=Object(a.b)(n);function i(t,n){var i=e((t=Object(r.f)(t)).r,(n=Object(r.f)(n)).r),c=e(t.g,n.g),o=e(t.b,n.b),u=Object(a.a)(t.opacity,n.opacity);return function(n){return t.r=i(n),t.g=c(n),t.b=o(n),t.opacity=u(n),t+""}}return i.gamma=t,i}(1);var u=o(i.b);o(c.a)},function(t,n,e){"use strict";var r=e(63);n.a=function(t){var n=t.length;return function(e){var i=Math.floor(((e%=1)<0?++e:e)*n),c=t[(i+n-1)%n],a=t[i%n],o=t[(i+1)%n],u=t[(i+2)%n];return Object(r.a)((e-i/n)*n,c,a,o,u)}}},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";var r=e(60);n.a=function(t,n){var e,i=n?n.length:0,c=t?Math.min(i,t.length):0,a=new Array(c),o=new Array(i);for(e=0;e<c;++e)a[e]=Object(r.a)(t[e],n[e]);for(;e<i;++e)o[e]=n[e];return function(t){for(e=0;e<c;++e)o[e]=a[e](t);return o}}},function(t,n,e){"use strict";n.a=function(t,n){var e=new Date;return n-=t=+t,function(r){return e.setTime(t+n*r),e}}},function(t,n,e){"use strict";var r=e(60);n.a=function(t,n){var e,i={},c={};for(e in null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={}),n)e in t?i[e]=Object(r.a)(t[e],n[e]):c[e]=n[e];return function(t){for(e in i)c[e]=i[e](t);return c}}},function(t,n,e){"use strict";var r=e(37),i=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,c=new RegExp(i.source,"g");n.a=function(t,n){var e,a,o,u=i.lastIndex=c.lastIndex=0,f=-1,s=[],l=[];for(t+="",n+="";(e=i.exec(t))&&(a=c.exec(n));)(o=a.index)>u&&(o=n.slice(u,o),s[f]?s[f]+=o:s[++f]=o),(e=e[0])===(a=a[0])?s[f]?s[f]+=a:s[++f]=a:(s[++f]=null,l.push({i:f,x:Object(r.a)(e,a)})),u=c.lastIndex;return u<n.length&&(o=n.slice(u),s[f]?s[f]+=o:s[++f]=o),s.length<2?l[0]?function(t){return function(n){return t(n)+""}}(l[0].x):function(t){return function(){return t}}(n):(n=l.length,function(t){for(var e,r=0;r<n;++r)s[(e=l[r]).i]=e.x(t);return s.join("")})}},function(t,n,e){"use strict";var r=e(9);n.a=function(t,n){var e,i,c,a=t.__transition,o=!0;if(a){for(c in n=null==n?null:n+"",a)(e=a[c]).name===n?(i=e.state>r.d&&e.state<r.b,e.state=r.a,e.timer.stop(),i&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete a[c]):o=!1;o&&delete t.__transition}}},function(t,n,e){"use strict";var r=e(7),i=e(6);n.a=function(t,n){var e;return("number"==typeof n?i.c:n instanceof r.a?i.d:(e=Object(r.a)(n))?(n=e,i.d):i.g)(t,n)}},function(t,n,e){"use strict";e(278),e(279);var r=e(280);e.d(n,"a",function(){return r.a});e(281),e(282),e(283),e(284),e(285),e(286),e(287)},function(t,n,e){"use strict";e.d(n,"a",function(){return r}),e.d(n,"d",function(){return i}),e.d(n,"b",function(){return a}),e.d(n,"e",function(){return o}),e.d(n,"c",function(){return u});var r=Math.cos,i=Math.sin,c=Math.PI,a=c/2,o=2*c,u=Math.max},function(t,n,e){"use strict";n.a=function(t){return t.x},n.b=function(t){return t.y};e(12),e(25),e(38);Math.PI,Math.sqrt(5)},function(t,n,e){"use strict";var r=e(40),i=e(327),c=e(328),a=e(126),o=e(127),u=e(128),f=e(331),s=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];n.a=function(t){var n=t.grouping&&t.thousands?Object(i.a)(t.grouping,t.thousands):f.a,e=t.currency,l=t.decimal,h=t.numerals?Object(c.a)(t.numerals):f.a,d=t.percent||"%";function b(t){var r=(t=Object(a.a)(t)).fill,i=t.align,c=t.sign,f=t.symbol,b=t.zero,p=t.width,v=t.comma,_=t.precision,y=t.type,g="$"===f?e[0]:"#"===f&&/[boxX]/.test(y)?"0"+y.toLowerCase():"",m="$"===f?e[1]:/[%p]/.test(y)?d:"",x=o.a[y],w=!y||/[defgprs%]/.test(y);function O(t){var e,a,o,f=g,d=m;if("c"===y)d=x(t)+d,t="";else{var O=(t=+t)<0;if(t=x(Math.abs(t),_),O&&0==+t&&(O=!1),f=(O?"("===c?c:"-":"-"===c||"("===c?"":c)+f,d=("s"===y?s[8+u.b/3]:"")+d+(O&&"("===c?")":""),w)for(e=-1,a=t.length;++e<a;)if(48>(o=t.charCodeAt(e))||o>57){d=(46===o?l+t.slice(e+1):t.slice(e))+d,t=t.slice(0,e);break}}v&&!b&&(t=n(t,1/0));var j=f.length+t.length+d.length,M=j<p?new Array(p-j+1).join(r):"";switch(v&&b&&(t=n(M+t,M.length?p-d.length:1/0),M=""),i){case"<":t=f+t+d+M;break;case"=":t=f+M+t+d;break;case"^":t=M.slice(0,j=M.length>>1)+f+t+d+M.slice(j);break;default:t=M+f+t+d}return h(t)}return _=null==_?y?6:12:/[gprs]/.test(y)?Math.max(1,Math.min(21,_)):Math.max(0,Math.min(20,_)),O.toString=function(){return t+""},O}return{format:b,formatPrefix:function(t,n){var e=b(((t=Object(a.a)(t)).type="f",t)),i=3*Math.max(-8,Math.min(8,Math.floor(Object(r.a)(n)/3))),c=Math.pow(10,-i),o=s[8+i/3];return function(t){return e(c*t)+o}}}}},function(t,n,e){"use strict";n.a=c;var r=e(127),i=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;function c(t){return new a(t)}function a(t){if(!(n=i.exec(t)))throw new Error("invalid format: "+t);var n,e=n[1]||" ",c=n[2]||">",a=n[3]||"-",o=n[4]||"",u=!!n[5],f=n[6]&&+n[6],s=!!n[7],l=n[8]&&+n[8].slice(1),h=n[9]||"";"n"===h?(s=!0,h="g"):r.a[h]||(h=""),(u||"0"===e&&"="===c)&&(u=!0,e="0",c="="),this.fill=e,this.align=c,this.sign=a,this.symbol=o,this.zero=u,this.width=f,this.comma=s,this.precision=l,this.type=h}c.prototype=a.prototype,a.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type}},function(t,n,e){"use strict";var r=e(329),i=e(128),c=e(330);n.a={"":r.a,"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return Object(c.a)(100*t,n)},r:c.a,s:i.a,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}}},function(t,n,e){"use strict";e.d(n,"b",function(){return r});var r,i=e(73);n.a=function(t,n){var e=Object(i.a)(t,n);if(!e)return t+"";var c=e[0],a=e[1],o=a-(r=3*Math.max(-8,Math.min(8,Math.floor(a/3))))+1,u=c.length;return o===u?c:o>u?c+new Array(o-u+1).join("0"):o>0?c.slice(0,o)+"."+c.slice(o):"0."+new Array(1-o).join("0")+Object(i.a)(t,Math.max(0,n+o-1))[0]}},function(t,n,e){"use strict";e.d(n,"a",function(){return l}),e.d(n,"b",function(){return d});var r,i,c,a,o,u=e(21),f=e(0),s=e(14),l=(e(16),Object(u.a)()),h=Object(u.a)(),d={point:s.a,lineStart:s.a,lineEnd:s.a,polygonStart:function(){l.reset(),d.lineStart=b,d.lineEnd=p},polygonEnd:function(){var t=+l;h.add(t<0?f.w+t:t),this.lineStart=this.lineEnd=this.point=s.a},sphere:function(){h.add(f.w)}};function b(){d.point=v}function p(){_(r,i)}function v(t,n){d.point=_,r=t,i=n,t*=f.r,n*=f.r,c=t,a=Object(f.g)(n=n/2+f.q),o=Object(f.t)(n)}function _(t,n){t*=f.r,n=(n*=f.r)/2+f.q;var e=t-c,r=e>=0?1:-1,i=r*e,u=Object(f.g)(n),s=Object(f.t)(n),h=o*s,d=a*u+h*Object(f.g)(i),b=h*r*Object(f.t)(i);l.add(Object(f.e)(b,d)),c=t,a=u,o=s}},function(t,n,e){"use strict";n.a=c;var r=e(26),i=(e(338),e(0));e(41);function c(t,n,e,c,o,u){if(e){var f=Object(i.g)(n),s=Object(i.t)(n),l=c*e;null==o?(o=n+c*i.w,u=n-l/2):(o=a(f,o),u=a(f,u),(c>0?o<u:o>u)&&(o+=c*i.w));for(var h,d=o;c>0?d>u:d<u;d-=l)h=Object(r.g)([f,-s*Object(i.g)(d),-s*Object(i.t)(d)]),t.point(h[0],h[1])}}function a(t,n){(n=Object(r.a)(n))[0]-=t,Object(r.e)(n);var e=Object(i.b)(-n[1]);return((-n[2]<0?-e:e)+i.w-i.i)%i.w}},function(t,n,e){"use strict";n.a=function(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return(e=n.invert(e,r))&&t.invert(e[0],e[1])}),e}},function(t,n,e){"use strict";var r=e(133),i=e(0);n.a=Object(r.a)(function(){return!0},function(t){var n,e=NaN,r=NaN,c=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(a,o){var u=a>0?i.o:-i.o,f=Object(i.a)(a-e);Object(i.a)(f-i.o)<i.i?(t.point(e,r=(r+o)/2>0?i.l:-i.l),t.point(c,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(a,r),n=0):c!==u&&f>=i.o&&(Object(i.a)(e-c)<i.i&&(e-=c*i.i),Object(i.a)(a-u)<i.i&&(a-=u*i.i),r=function(t,n,e,r){var c,a,o=Object(i.t)(t-e);return Object(i.a)(o)>i.i?Object(i.d)((Object(i.t)(n)*(a=Object(i.g)(r))*Object(i.t)(e)-Object(i.t)(r)*(c=Object(i.g)(n))*Object(i.t)(t))/(c*a*o)):(n+r)/2}(e,r,a,o),t.point(c,r),t.lineEnd(),t.lineStart(),t.point(u,r),n=0),t.point(e=a,r=o),c=u},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}},function(t,n,e,r){var c;if(null==t)c=e*i.l,r.point(-i.o,c),r.point(0,c),r.point(i.o,c),r.point(i.o,0),r.point(i.o,-c),r.point(0,-c),r.point(-i.o,-c),r.point(-i.o,0),r.point(-i.o,c);else if(Object(i.a)(t[0]-n[0])>i.i){var a=t[0]<n[0]?i.o:-i.o;c=e*a/2,r.point(-a,c),r.point(0,c),r.point(a,c)}else r.point(n[0],n[1])},[-i.o,-i.l])},function(t,n,e){"use strict";var r=e(134),i=e(135),c=e(0),a=e(137),o=e(5);function u(t){return t.length>1}function f(t,n){return((t=t.x)[0]<0?t[1]-c.l-c.i:c.l-t[1])-((n=n.x)[0]<0?n[1]-c.l-c.i:c.l-n[1])}n.a=function(t,n,e,c){return function(s){var l,h,d,b=n(s),p=Object(r.a)(),v=n(p),_=!1,y={point:g,lineStart:x,lineEnd:w,polygonStart:function(){y.point=O,y.lineStart=j,y.lineEnd=M,h=[],l=[]},polygonEnd:function(){y.point=g,y.lineStart=x,y.lineEnd=w,h=Object(o.d)(h);var t=Object(a.a)(l,c);h.length?(_||(s.polygonStart(),_=!0),Object(i.a)(h,f,t,e,s)):t&&(_||(s.polygonStart(),_=!0),s.lineStart(),e(null,null,1,s),s.lineEnd()),_&&(s.polygonEnd(),_=!1),h=l=null},sphere:function(){s.polygonStart(),s.lineStart(),e(null,null,1,s),s.lineEnd(),s.polygonEnd()}};function g(n,e){t(n,e)&&s.point(n,e)}function m(t,n){b.point(t,n)}function x(){y.point=m,b.lineStart()}function w(){y.point=g,b.lineEnd()}function O(t,n){d.push([t,n]),v.point(t,n)}function j(){v.lineStart(),d=[]}function M(){O(d[0][0],d[0][1]),v.lineEnd();var t,n,e,r,i=v.clean(),c=p.result(),a=c.length;if(d.pop(),l.push(d),d=null,a)if(1&i){if((n=(e=c[0]).length-1)>0){for(_||(s.polygonStart(),_=!0),s.lineStart(),t=0;t<n;++t)s.point((r=e[t])[0],r[1]);s.lineEnd()}}else a>1&&2&i&&c.push(c.pop().concat(c.shift())),h.push(c.filter(u))}return y}}},function(t,n,e){"use strict";var r=e(14);n.a=function(){var t,n=[];return{point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},lineEnd:r.a,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}},function(t,n,e){"use strict";var r=e(136);function i(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function c(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}n.a=function(t,n,e,a,o){var u,f,s=[],l=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,e,c=t[0],a=t[n];if(Object(r.a)(c,a)){for(o.lineStart(),u=0;u<n;++u)o.point((c=t[u])[0],c[1]);o.lineEnd()}else s.push(e=new i(c,t,null,!0)),l.push(e.o=new i(c,null,e,!1)),s.push(e=new i(a,t,null,!1)),l.push(e.o=new i(a,null,e,!0))}}),s.length){for(l.sort(n),c(s),c(l),u=0,f=l.length;u<f;++u)l[u].e=e=!e;for(var h,d,b=s[0];;){for(var p=b,v=!0;p.v;)if((p=p.n)===b)return;h=p.z,o.lineStart();do{if(p.v=p.o.v=!0,p.e){if(v)for(u=0,f=h.length;u<f;++u)o.point((d=h[u])[0],d[1]);else a(p.x,p.n.x,1,o);p=p.n}else{if(v)for(h=p.p.z,u=h.length-1;u>=0;--u)o.point((d=h[u])[0],d[1]);else a(p.x,p.p.x,-1,o);p=p.p}h=(p=p.o).z,v=!v}while(!p.v);o.lineEnd()}}}},function(t,n,e){"use strict";var r=e(0);n.a=function(t,n){return Object(r.a)(t[0]-n[0])<r.i&&Object(r.a)(t[1]-n[1])<r.i}},function(t,n,e){"use strict";var r=e(21),i=e(26),c=e(0),a=Object(r.a)();n.a=function(t,n){var e=n[0],r=n[1],o=[Object(c.t)(e),-Object(c.g)(e),0],u=0,f=0;a.reset();for(var s=0,l=t.length;s<l;++s)if(d=(h=t[s]).length)for(var h,d,b=h[d-1],p=b[0],v=b[1]/2+c.q,_=Object(c.t)(v),y=Object(c.g)(v),g=0;g<d;++g,p=x,_=O,y=j,b=m){var m=h[g],x=m[0],w=m[1]/2+c.q,O=Object(c.t)(w),j=Object(c.g)(w),M=x-p,T=M>=0?1:-1,S=T*M,E=S>c.o,N=_*O;if(a.add(Object(c.e)(N*T*Object(c.t)(S),y*j+N*Object(c.g)(S))),u+=E?M+T*c.w:M,E^p>=e^x>=e){var C=Object(i.c)(Object(i.a)(b),Object(i.a)(m));Object(i.e)(C);var k=Object(i.c)(o,C);Object(i.e)(k);var A=(E^M>=0?-1:1)*Object(c.c)(k[2]);(r>A||r===A&&(C[0]||C[1]))&&(f+=E^M>=0?1:-1)}}return(u<-c.i||u<c.i&&a<-c.i)^1&f}},function(t,n,e){"use strict";var r=e(26),i=e(130),c=e(0),a=e(136),o=e(133);n.a=function(t){var n=Object(c.g)(t),e=6*c.r,u=n>0,f=Object(c.a)(n)>c.i;function s(t,e){return Object(c.g)(t)*Object(c.g)(e)>n}function l(t,e,i){var a=Object(r.a)(t),o=Object(r.a)(e),u=[1,0,0],f=Object(r.c)(a,o),s=Object(r.d)(f,f),l=f[0],h=s-l*l;if(!h)return!i&&t;var d=n*s/h,b=-n*l/h,p=Object(r.c)(u,f),v=Object(r.f)(u,d),_=Object(r.f)(f,b);Object(r.b)(v,_);var y=p,g=Object(r.d)(v,y),m=Object(r.d)(y,y),x=g*g-m*(Object(r.d)(v,v)-1);if(!(x<0)){var w=Object(c.u)(x),O=Object(r.f)(y,(-g-w)/m);if(Object(r.b)(O,v),O=Object(r.g)(O),!i)return O;var j,M=t[0],T=e[0],S=t[1],E=e[1];T<M&&(j=M,M=T,T=j);var N=T-M,C=Object(c.a)(N-c.o)<c.i,k=C||N<c.i;if(!C&&E<S&&(j=S,S=E,E=j),k?C?S+E>0^O[1]<(Object(c.a)(O[0]-M)<c.i?S:E):S<=O[1]&&O[1]<=E:N>c.o^(M<=O[0]&&O[0]<=T)){var A=Object(r.f)(y,(-g+w)/m);return Object(r.b)(A,v),[O,Object(r.g)(A)]}}}function h(n,e){var r=u?t:c.o-t,i=0;return n<-r?i|=1:n>r&&(i|=2),e<-r?i|=4:e>r&&(i|=8),i}return Object(o.a)(s,function(t){var n,e,r,i,o;return{lineStart:function(){i=r=!1,o=1},point:function(d,b){var p,v=[d,b],_=s(d,b),y=u?_?0:h(d,b):_?h(d+(d<0?c.o:-c.o),b):0;if(!n&&(i=r=_)&&t.lineStart(),_!==r&&(!(p=l(n,v))||Object(a.a)(n,p)||Object(a.a)(v,p))&&(v[0]+=c.i,v[1]+=c.i,_=s(v[0],v[1])),_!==r)o=0,_?(t.lineStart(),p=l(v,n),t.point(p[0],p[1])):(p=l(n,v),t.point(p[0],p[1]),t.lineEnd()),n=p;else if(f&&n&&u^_){var g;y&e||!(g=l(v,n,!0))||(o=0,u?(t.lineStart(),t.point(g[0][0],g[0][1]),t.point(g[1][0],g[1][1]),t.lineEnd()):(t.point(g[1][0],g[1][1]),t.lineEnd(),t.lineStart(),t.point(g[0][0],g[0][1])))}!_||n&&Object(a.a)(n,v)||t.point(v[0],v[1]),n=v,r=_,e=y},lineEnd:function(){r&&t.lineEnd(),n=null},clean:function(){return o|(i&&r)<<1}}},function(n,r,c,a){Object(i.a)(a,t,e,c,n,r)},u?[0,-t]:[-c.o,t-c.o])}},function(t,n,e){"use strict";var r=e(140),i=[null,null],c={type:"LineString",coordinates:i};n.a=function(t,n){return i[0]=t,i[1]=n,Object(r.a)(c)}},function(t,n,e){"use strict";var r,i,c,a=e(21),o=e(0),u=e(14),f=e(16),s=Object(a.a)(),l={sphere:u.a,point:u.a,lineStart:function(){l.point=d,l.lineEnd=h},lineEnd:u.a,polygonStart:u.a,polygonEnd:u.a};function h(){l.point=l.lineEnd=u.a}function d(t,n){t*=o.r,n*=o.r,r=t,i=Object(o.t)(n),c=Object(o.g)(n),l.point=b}function b(t,n){t*=o.r,n*=o.r;var e=Object(o.t)(n),a=Object(o.g)(n),u=Object(o.a)(t-r),f=Object(o.g)(u),l=a*Object(o.t)(u),h=c*e-i*a*f,d=i*e+c*a*f;s.add(Object(o.e)(Object(o.u)(l*l+h*h),d)),r=t,i=e,c=a}n.a=function(t){return s.reset(),Object(f.a)(t,l),+s}},function(t,n,e){"use strict";var r=e(14),i=1/0,c=i,a=-i,o=a,u={point:function(t,n){t<i&&(i=t);t>a&&(a=t);n<c&&(c=n);n>o&&(o=n)},lineStart:r.a,lineEnd:r.a,polygonStart:r.a,polygonEnd:r.a,result:function(){var t=[[i,c],[a,o]];return a=o=-(c=i=1/0),t}};n.a=u},function(t,n,e){"use strict";var r=e(75);n.a=function(){return Object(r.a)().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}},function(t,n,e){"use strict";n.a=r;e(10);function r(t,n){return[t,n]}r.invert=r},function(t,n,e){"use strict";n.a=u;var r=e(145);function i(t,n,e){var r=t.x,i=t.y,c=n.r+e.r,a=t.r+e.r,o=n.x-r,u=n.y-i,f=o*o+u*u;if(f){var s=.5+((a*=a)-(c*=c))/(2*f),l=Math.sqrt(Math.max(0,2*c*(a+f)-(a-=f)*a-c*c))/(2*f);e.x=r+s*o+l*u,e.y=i+s*u-l*o}else e.x=r+a,e.y=i}function c(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r+n.r;return i*i-1e-6>e*e+r*r}function a(t){var n=t._,e=t.next._,r=n.r+e.r,i=(n.x*e.r+e.x*n.r)/r,c=(n.y*e.r+e.y*n.r)/r;return i*i+c*c}function o(t){this._=t,this.next=null,this.previous=null}function u(t){if(!(f=t.length))return 0;var n,e,u,f,s,l,h,d,b,p,v;if((n=t[0]).x=0,n.y=0,!(f>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(f>2))return n.r+e.r;i(e,n,u=t[2]),n=new o(n),e=new o(e),u=new o(u),n.next=u.previous=e,e.next=n.previous=u,u.next=e.previous=n;t:for(h=3;h<f;++h){i(n._,e._,u=t[h]),u=new o(u),d=e.next,b=n.previous,p=e._.r,v=n._.r;do{if(p<=v){if(c(d._,u._)){e=d,n.next=e,e.previous=n,--h;continue t}p+=d._.r,d=d.next}else{if(c(b._,u._)){(n=b).next=e,e.previous=n,--h;continue t}v+=b._.r,b=b.previous}}while(d!==b.next);for(u.previous=n,u.next=e,n.next=e.previous=e=u,s=a(n);(u=u.next)!==e;)(l=a(u))<s&&(n=u,s=l);e=n.next}for(n=[e._],u=e;(u=u.next)!==e;)n.push(u._);for(u=Object(r.a)(n),h=0;h<f;++h)(n=t[h]).x-=u.x,n.y-=u.y;return u.r}},function(t,n,e){"use strict";var r=e(377);function i(t,n){var e,r;if(o(n,t))return[n];for(e=0;e<t.length;++e)if(c(n,t[e])&&o(f(t[e],n),t))return[t[e],n];for(e=0;e<t.length-1;++e)for(r=e+1;r<t.length;++r)if(c(f(t[e],t[r]),n)&&c(f(t[e],n),t[r])&&c(f(t[r],n),t[e])&&o(s(t[e],t[r],n),t))return[t[e],t[r],n];throw new Error}function c(t,n){var e=t.r-n.r,r=n.x-t.x,i=n.y-t.y;return e<0||e*e<r*r+i*i}function a(t,n){var e=t.r-n.r+1e-6,r=n.x-t.x,i=n.y-t.y;return e>0&&e*e>r*r+i*i}function o(t,n){for(var e=0;e<n.length;++e)if(!a(t,n[e]))return!1;return!0}function u(t){switch(t.length){case 1:return{x:(n=t[0]).x,y:n.y,r:n.r};case 2:return f(t[0],t[1]);case 3:return s(t[0],t[1],t[2])}var n}function f(t,n){var e=t.x,r=t.y,i=t.r,c=n.x,a=n.y,o=n.r,u=c-e,f=a-r,s=o-i,l=Math.sqrt(u*u+f*f);return{x:(e+c+u/l*s)/2,y:(r+a+f/l*s)/2,r:(l+i+o)/2}}function s(t,n,e){var r=t.x,i=t.y,c=t.r,a=n.x,o=n.y,u=n.r,f=e.x,s=e.y,l=e.r,h=r-a,d=r-f,b=i-o,p=i-s,v=u-c,_=l-c,y=r*r+i*i-c*c,g=y-a*a-o*o+u*u,m=y-f*f-s*s+l*l,x=d*b-h*p,w=(b*m-p*g)/(2*x)-r,O=(p*v-b*_)/x,j=(d*g-h*m)/(2*x)-i,M=(h*_-d*v)/x,T=O*O+M*M-1,S=2*(c+w*O+j*M),E=w*w+j*j-c*c,N=-(T?(S+Math.sqrt(S*S-4*T*E))/(2*T):E/S);return{x:r+w+O*N,y:i+j+M*N,r:N}}n.a=function(t){for(var n,e,c=0,o=(t=Object(r.a)(r.b.call(t))).length,f=[];c<o;)n=t[c],e&&a(e,n)?++c:(e=u(f=i(f,n)),c=0);return e}},function(t,n,e){"use strict";n.a=function(){return 0},n.b=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}},function(t,n,e){"use strict";var r=e(22);n.a=function t(n){function e(t,e){var r,i;return t=null==t?0:+t,e=null==e?1:+e,function(){var c;if(null!=r)c=r,r=null;else do{r=2*n()-1,c=2*n()-1,i=r*r+c*c}while(!i||i>1);return t+e*c*Math.sqrt(-2*Math.log(i)/i)}}return e.source=t,e}(r.a)},function(t,n,e){"use strict";var r=e(22);n.a=function t(n){function e(t){return function(){for(var e=0,r=0;r<t;++r)e+=n();return e}}return e.source=t,e}(r.a)},function(t,n,e){"use strict";var r=e(82);n.a=function(t,n){return function(e,i,c){arguments.length<3&&(c=i,i=null);var a=Object(r.a)(e).mimeType(t);return a.row=function(t){return arguments.length?a.response(function(t,n){return function(e){return t(e.responseText,n)}}(n,i=t)):i},a.row(i),c?a.get(c):a}}},function(t,n,e){"use strict";n.a=function t(n){var e=Object(r.a)(),a=[],o=c;n=null==n?[]:i.b.call(n);function u(t){var r=t+"",i=e.get(r);if(!i){if(o!==c)return o;e.set(r,i=a.push(t))}return n[(i-1)%n.length]}u.domain=function(t){if(!arguments.length)return a.slice();a=[],e=Object(r.a)();for(var n,i,c=-1,o=t.length;++c<o;)e.has(i=(n=t[c])+"")||e.set(i,a.push(n));return u};u.range=function(t){return arguments.length?(n=i.b.call(t),u):n.slice()};u.unknown=function(t){return arguments.length?(o=t,u):o};u.copy=function(){return t().domain(a).range(n).unknown(o)};return u};var r=e(25),i=e(17),c={name:"implicit"}},function(t,n,e){"use strict";n.a=function(t){return+t}},function(t,n,e){"use strict";n.a=function(t,n){var e,r=0,i=(t=t.slice()).length-1,c=t[r],a=t[i];return a<c&&(e=r,r=i,i=e,e=c,c=a,a=e),t[r]=n.floor(c),t[i]=n.ceil(a),t}},function(t,n,e){"use strict";n.a=_;var r=e(5),i=e(6),c=(e(47),e(84),e(17)),a=e(46),o=e(153),u=1e3,f=60*u,s=60*f,l=24*s,h=7*l,d=30*l,b=365*l;function p(t){return new Date(t)}function v(t){return t instanceof Date?+t:+new Date(+t)}function _(t,n,e,y,g,m,x,w,O){var j=Object(a.b)(a.c,i.c),M=j.invert,T=j.domain,S=O(".%L"),E=O(":%S"),N=O("%I:%M"),C=O("%I %p"),k=O("%a %d"),A=O("%b %d"),P=O("%B"),R=O("%Y"),z=[[x,1,u],[x,5,5*u],[x,15,15*u],[x,30,30*u],[m,1,f],[m,5,5*f],[m,15,15*f],[m,30,30*f],[g,1,s],[g,3,3*s],[g,6,6*s],[g,12,12*s],[y,1,l],[y,2,2*l],[e,1,h],[n,1,d],[n,3,3*d],[t,1,b]];function U(r){return(x(r)<r?S:m(r)<r?E:g(r)<r?N:y(r)<r?C:n(r)<r?e(r)<r?k:A:t(r)<r?P:R)(r)}function I(n,e,i,c){if(null==n&&(n=10),"number"==typeof n){var a=Math.abs(i-e)/n,o=Object(r.c)(function(t){return t[2]}).right(z,a);o===z.length?(c=Object(r.h)(e/b,i/b,n),n=t):o?(c=(o=z[a/z[o-1][2]<z[o][2]/a?o-1:o])[1],n=o[0]):(c=Math.max(Object(r.h)(e,i,n),1),n=w)}return null==c?n:n.every(c)}return j.invert=function(t){return new Date(M(t))},j.domain=function(t){return arguments.length?T(c.a.call(t,v)):T().map(p)},j.ticks=function(t,n){var e,r=T(),i=r[0],c=r[r.length-1],a=c<i;return a&&(e=i,i=c,c=e),e=(e=I(t,i,c,n))?e.range(i,c+1):[],a?e.reverse():e},j.tickFormat=function(t,n){return null==n?U:O(n)},j.nice=function(t,n){var e=T();return(t=I(t,e[0],e[e.length-1],n))?T(Object(o.a)(e,t)):j},j.copy=function(){return Object(a.a)(j,_(t,n,e,y,g,m,x,w,O))},j}},function(t,n,e){"use strict";n.a=function(t){var n=t.dateTime,e=t.date,u=t.time,f=t.periods,s=t.days,l=t.shortDays,h=t.months,_t=t.shortMonths,yt=d(f),gt=b(f),mt=d(s),xt=b(s),wt=d(l),Ot=b(l),jt=d(h),Mt=b(h),Tt=d(_t),St=b(_t),Et={a:function(t){return l[t.getDay()]},A:function(t){return s[t.getDay()]},b:function(t){return _t[t.getMonth()]},B:function(t){return h[t.getMonth()]},c:null,d:R,e:R,f:D,H:z,I:U,j:I,L,m:q,M:F,p:function(t){return f[+(t.getHours()>=12)]},Q:pt,s:vt,S:Y,u:B,U:H,V:X,w:G,W:V,x:null,X:null,y:W,Y:$,Z,"%":bt},Nt={a:function(t){return l[t.getUTCDay()]},A:function(t){return s[t.getUTCDay()]},b:function(t){return _t[t.getUTCMonth()]},B:function(t){return h[t.getUTCMonth()]},c:null,d:Q,e:Q,f:et,H:J,I:K,j:tt,L:nt,m:rt,M:it,p:function(t){return f[+(t.getUTCHours()>=12)]},Q:pt,s:vt,S:ct,u:at,U:ot,V:ut,w:ft,W:st,x:null,X:null,y:lt,Y:ht,Z:dt,"%":bt},Ct={a:function(t,n,e){var r=wt.exec(n.slice(e));return r?(t.w=Ot[r[0].toLowerCase()],e+r[0].length):-1},A:function(t,n,e){var r=mt.exec(n.slice(e));return r?(t.w=xt[r[0].toLowerCase()],e+r[0].length):-1},b:function(t,n,e){var r=Tt.exec(n.slice(e));return r?(t.m=St[r[0].toLowerCase()],e+r[0].length):-1},B:function(t,n,e){var r=jt.exec(n.slice(e));return r?(t.m=Mt[r[0].toLowerCase()],e+r[0].length):-1},c:function(t,e,r){return Pt(t,n,e,r)},d:j,e:j,f:C,H:T,I:T,j:M,L:N,m:O,M:S,p:function(t,n,e){var r=yt.exec(n.slice(e));return r?(t.p=gt[r[0].toLowerCase()],e+r[0].length):-1},Q:A,s:P,S:E,u:v,U:_,V:y,w:p,W:g,x:function(t,n,r){return Pt(t,e,n,r)},X:function(t,n,e){return Pt(t,u,n,e)},y:x,Y:m,Z:w,"%":k};function kt(t,n){return function(e){var r,i,c,a=[],u=-1,f=0,s=t.length;for(e instanceof Date||(e=new Date(+e));++u<s;)37===t.charCodeAt(u)&&(a.push(t.slice(f,u)),null!=(i=o[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",(c=n[r])&&(r=c(e,i)),a.push(r),f=u+1);return a.push(t.slice(f,u)),a.join("")}}function At(t,n){return function(e){var i,o,u=a(1900),f=Pt(u,t,e+="",0);if(f!=e.length)return null;if("Q"in u)return new Date(u.Q);if("p"in u&&(u.H=u.H%12+12*u.p),"V"in u){if(u.V<1||u.V>53)return null;"w"in u||(u.w=1),"Z"in u?(i=c(a(u.y)),o=i.getUTCDay(),i=o>4||0===o?r.p.ceil(i):Object(r.p)(i),i=r.l.offset(i,7*(u.V-1)),u.y=i.getUTCFullYear(),u.m=i.getUTCMonth(),u.d=i.getUTCDate()+(u.w+6)%7):(i=n(a(u.y)),o=i.getDay(),i=o>4||0===o?r.e.ceil(i):Object(r.e)(i),i=r.a.offset(i,7*(u.V-1)),u.y=i.getFullYear(),u.m=i.getMonth(),u.d=i.getDate()+(u.w+6)%7)}else("W"in u||"U"in u)&&("w"in u||(u.w="u"in u?u.u%7:"W"in u?1:0),o="Z"in u?c(a(u.y)).getUTCDay():n(a(u.y)).getDay(),u.m=0,u.d="W"in u?(u.w+6)%7+7*u.W-(o+5)%7:u.w+7*u.U-(o+6)%7);return"Z"in u?(u.H+=u.Z/100|0,u.M+=u.Z%100,c(u)):n(u)}}function Pt(t,n,e,r){for(var i,c,a=0,u=n.length,f=e.length;a<u;){if(r>=f)return-1;if(37===(i=n.charCodeAt(a++))){if(i=n.charAt(a++),!(c=Ct[i in o?n.charAt(a++):i])||(r=c(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}return Et.x=kt(e,Et),Et.X=kt(u,Et),Et.c=kt(n,Et),Nt.x=kt(e,Nt),Nt.X=kt(u,Nt),Nt.c=kt(n,Nt),{format:function(t){var n=kt(t+="",Et);return n.toString=function(){return t},n},parse:function(t){var n=At(t+="",i);return n.toString=function(){return t},n},utcFormat:function(t){var n=kt(t+="",Nt);return n.toString=function(){return t},n},utcParse:function(t){var n=At(t,c);return n.toString=function(){return t},n}}};var r=e(47);function i(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function c(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function a(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}var o={"-":"",_:" ",0:"0"},u=/^\s*\d+/,f=/^%/,s=/[\\^$*+?|[\]().{}]/g;function l(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",c=i.length;return r+(c<e?new Array(e-c+1).join(n)+i:i)}function h(t){return t.replace(s,"\\$&")}function d(t){return new RegExp("^(?:"+t.map(h).join("|")+")","i")}function b(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function p(t,n,e){var r=u.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function v(t,n,e){var r=u.exec(n.slice(e,e+1));return r?(t.u=+r[0],e+r[0].length):-1}function _(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.U=+r[0],e+r[0].length):-1}function y(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.V=+r[0],e+r[0].length):-1}function g(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.W=+r[0],e+r[0].length):-1}function m(t,n,e){var r=u.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function x(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function w(t,n,e){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function O(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function j(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function M(t,n,e){var r=u.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function T(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function S(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function E(t,n,e){var r=u.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function N(t,n,e){var r=u.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function C(t,n,e){var r=u.exec(n.slice(e,e+6));return r?(t.L=Math.floor(r[0]/1e3),e+r[0].length):-1}function k(t,n,e){var r=f.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function A(t,n,e){var r=u.exec(n.slice(e));return r?(t.Q=+r[0],e+r[0].length):-1}function P(t,n,e){var r=u.exec(n.slice(e));return r?(t.Q=1e3*+r[0],e+r[0].length):-1}function R(t,n){return l(t.getDate(),n,2)}function z(t,n){return l(t.getHours(),n,2)}function U(t,n){return l(t.getHours()%12||12,n,2)}function I(t,n){return l(1+r.a.count(Object(r.k)(t),t),n,3)}function L(t,n){return l(t.getMilliseconds(),n,3)}function D(t,n){return L(t,n)+"000"}function q(t,n){return l(t.getMonth()+1,n,2)}function F(t,n){return l(t.getMinutes(),n,2)}function Y(t,n){return l(t.getSeconds(),n,2)}function B(t){var n=t.getDay();return 0===n?7:n}function H(t,n){return l(r.h.count(Object(r.k)(t),t),n,2)}function X(t,n){var e=t.getDay();return t=e>=4||0===e?Object(r.i)(t):r.i.ceil(t),l(r.i.count(Object(r.k)(t),t)+(4===Object(r.k)(t).getDay()),n,2)}function G(t){return t.getDay()}function V(t,n){return l(r.e.count(Object(r.k)(t),t),n,2)}function W(t,n){return l(t.getFullYear()%100,n,2)}function $(t,n){return l(t.getFullYear()%1e4,n,4)}function Z(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+l(n/60|0,"0",2)+l(n%60,"0",2)}function Q(t,n){return l(t.getUTCDate(),n,2)}function J(t,n){return l(t.getUTCHours(),n,2)}function K(t,n){return l(t.getUTCHours()%12||12,n,2)}function tt(t,n){return l(1+r.l.count(Object(r.v)(t),t),n,3)}function nt(t,n){return l(t.getUTCMilliseconds(),n,3)}function et(t,n){return nt(t,n)+"000"}function rt(t,n){return l(t.getUTCMonth()+1,n,2)}function it(t,n){return l(t.getUTCMinutes(),n,2)}function ct(t,n){return l(t.getUTCSeconds(),n,2)}function at(t){var n=t.getUTCDay();return 0===n?7:n}function ot(t,n){return l(r.s.count(Object(r.v)(t),t),n,2)}function ut(t,n){var e=t.getUTCDay();return t=e>=4||0===e?Object(r.t)(t):r.t.ceil(t),l(r.t.count(Object(r.v)(t),t)+(4===Object(r.v)(t).getUTCDay()),n,2)}function ft(t){return t.getUTCDay()}function st(t,n){return l(r.p.count(Object(r.v)(t),t),n,2)}function lt(t,n){return l(t.getUTCFullYear()%100,n,2)}function ht(t,n){return l(t.getUTCFullYear()%1e4,n,4)}function dt(){return"+0000"}function bt(){return"%"}function pt(t){return+t}function vt(t){return Math.floor(+t/1e3)}},function(t,n,e){"use strict";e.d(n,"a",function(){return i});var r=e(85),i="%Y-%m-%dT%H:%M:%S.%LZ";Date.prototype.toISOString||Object(r.b)(i)},function(t,n,e){"use strict";var r=e(15),i=e(18),c=e(48),a=e(86),o=e(87);n.a=function(){var t=o.a,n=null,e=Object(i.a)(0),u=o.b,f=Object(i.a)(!0),s=null,l=c.a,h=null;function d(i){var c,a,o,d,b,p=i.length,v=!1,_=new Array(p),y=new Array(p);for(null==s&&(h=l(b=Object(r.a)())),c=0;c<=p;++c){if(!(c<p&&f(d=i[c],c,i))===v)if(v=!v)a=c,h.areaStart(),h.lineStart();else{for(h.lineEnd(),h.lineStart(),o=c-1;o>=a;--o)h.point(_[o],y[o]);h.lineEnd(),h.areaEnd()}v&&(_[c]=+t(d,c,i),y[c]=+e(d,c,i),h.point(n?+n(d,c,i):_[c],u?+u(d,c,i):y[c]))}if(b)return h=null,b+""||null}function b(){return Object(a.a)().defined(f).curve(l).context(s)}return d.x=function(e){return arguments.length?(t="function"==typeof e?e:Object(i.a)(+e),n=null,d):t},d.x0=function(n){return arguments.length?(t="function"==typeof n?n:Object(i.a)(+n),d):t},d.x1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:Object(i.a)(+t),d):n},d.y=function(t){return arguments.length?(e="function"==typeof t?t:Object(i.a)(+t),u=null,d):e},d.y0=function(t){return arguments.length?(e="function"==typeof t?t:Object(i.a)(+t),d):e},d.y1=function(t){return arguments.length?(u=null==t?null:"function"==typeof t?t:Object(i.a)(+t),d):u},d.lineX0=d.lineY0=function(){return b().x(t).y(e)},d.lineY1=function(){return b().x(t).y(u)},d.lineX1=function(){return b().x(n).y(e)},d.defined=function(t){return arguments.length?(f="function"==typeof t?t:Object(i.a)(!!t),d):f},d.curve=function(t){return arguments.length?(l=t,null!=s&&(h=l(s)),d):l},d.context=function(t){return arguments.length?(null==t?s=h=null:h=l(s=t),d):s},d}},function(t,n,e){"use strict";e.d(n,"a",function(){return r}),n.b=c;var r=c(e(48).a);function i(t){this._curve=t}function c(t){function n(n){return new i(t(n))}return n._curve=t,n}i.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}}},function(t,n,e){"use strict";n.a=i;var r=e(158);e(86);function i(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(Object(r.b)(t)):n()._curve},t}},function(t,n,e){"use strict";n.a=function(t,n){return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]}},function(t,n,e){"use strict";e.d(n,"a",function(){return r});var r=Array.prototype.slice},function(t,n,e){"use strict";var r=e(31);n.a={draw:function(t,n){var e=Math.sqrt(n/r.j);t.moveTo(e,0),t.arc(0,0,e,0,r.m)}}},function(t,n,e){"use strict";n.a={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}}},function(t,n,e){"use strict";var r=Math.sqrt(1/3),i=2*r;n.a={draw:function(t,n){var e=Math.sqrt(n/i),c=e*r;t.moveTo(0,-e),t.lineTo(c,0),t.lineTo(0,e),t.lineTo(-c,0),t.closePath()}}},function(t,n,e){"use strict";var r=e(31),i=Math.sin(r.j/10)/Math.sin(7*r.j/10),c=Math.sin(r.m/10)*i,a=-Math.cos(r.m/10)*i;n.a={draw:function(t,n){var e=Math.sqrt(.8908130915292852*n),i=c*e,o=a*e;t.moveTo(0,-e),t.lineTo(i,o);for(var u=1;u<5;++u){var f=r.m*u/5,s=Math.cos(f),l=Math.sin(f);t.lineTo(l*e,-s*e),t.lineTo(s*i-l*o,l*i+s*o)}t.closePath()}}},function(t,n,e){"use strict";n.a={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}}},function(t,n,e){"use strict";var r=Math.sqrt(3);n.a={draw:function(t,n){var e=-Math.sqrt(n/(3*r));t.moveTo(0,2*e),t.lineTo(-r*e,-e),t.lineTo(r*e,-e),t.closePath()}}},function(t,n,e){"use strict";var r=-.5,i=Math.sqrt(3)/2,c=1/Math.sqrt(12),a=3*(c/2+1);n.a={draw:function(t,n){var e=Math.sqrt(n/a),o=e/2,u=e*c,f=o,s=e*c+e,l=-f,h=s;t.moveTo(o,u),t.lineTo(f,s),t.lineTo(l,h),t.lineTo(r*o-i*u,i*o+r*u),t.lineTo(r*f-i*s,i*f+r*s),t.lineTo(r*l-i*h,i*l+r*h),t.lineTo(r*o+i*u,r*u-i*o),t.lineTo(r*f+i*s,r*s-i*f),t.lineTo(r*l+i*h,r*h-i*l),t.closePath()}}},function(t,n,e){"use strict";n.a=c;var r=e(49),i=e(51);function c(t,n){this._context=t,this._k=(1-n)/6}c.prototype={areaStart:r.a,areaEnd:r.a,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Object(i.b)(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return new c(t,n)}return e.tension=function(n){return t(+n)},e})(0)},function(t,n,e){"use strict";n.a=i;var r=e(51);function i(t,n){this._context=t,this._k=(1-n)/6}i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Object(r.b)(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return new i(t,n)}return e.tension=function(n){return t(+n)},e})(0)},function(t,n,e){"use strict";n.c=function(t){return i.b[t.index]={site:t,halfedges:[]}},n.a=a,n.d=function(){for(var t,n,e,r,a=0,o=i.b.length;a<o;++a)if((t=i.b[a])&&(r=(n=t.halfedges).length)){var u=new Array(r),f=new Array(r);for(e=0;e<r;++e)u[e]=e,f[e]=c(t,i.e[n[e]]);for(u.sort(function(t,n){return f[n]-f[t]}),e=0;e<r;++e)f[e]=n[u[e]];for(e=0;e<r;++e)n[e]=f[e]}},n.b=function(t,n,e,c){var u,f,s,l,h,d,b,p,v,_,y,g,m=i.b.length,x=!0;for(u=0;u<m;++u)if(f=i.b[u]){for(s=f.site,h=f.halfedges,l=h.length;l--;)i.e[h[l]]||h.splice(l,1);for(l=0,d=h.length;l<d;)_=o(f,i.e[h[l]]),y=_[0],g=_[1],b=a(f,i.e[h[++l%d]]),p=b[0],v=b[1],(Math.abs(y-p)>i.f||Math.abs(g-v)>i.f)&&(h.splice(l,0,i.e.push(Object(r.b)(s,_,Math.abs(y-t)<i.f&&c-g>i.f?[t,Math.abs(p-t)<i.f?v:c]:Math.abs(g-c)<i.f&&e-y>i.f?[Math.abs(v-c)<i.f?p:e,c]:Math.abs(y-e)<i.f&&g-n>i.f?[e,Math.abs(p-e)<i.f?v:n]:Math.abs(g-n)<i.f&&y-t>i.f?[Math.abs(v-n)<i.f?p:t,n]:null))-1),++d);d&&(x=!1)}if(x){var w,O,j,M=1/0;for(u=0,x=null;u<m;++u)(f=i.b[u])&&(s=f.site,w=s[0]-t,O=s[1]-n,(j=w*w+O*O)<M&&(M=j,x=f));if(x){var T=[t,n],S=[t,c],E=[e,c],N=[e,n];x.halfedges.push(i.e.push(Object(r.b)(s=x.site,T,S))-1,i.e.push(Object(r.b)(s,S,E))-1,i.e.push(Object(r.b)(s,E,N))-1,i.e.push(Object(r.b)(s,N,T))-1)}}for(u=0;u<m;++u)(f=i.b[u])&&(f.halfedges.length||delete i.b[u])};var r=e(91),i=e(34);function c(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function a(t,n){return n[+(n.left!==t.site)]}function o(t,n){return n[+(n.left===t.site)]}},function(t,n,e){"use strict";e.d(n,"c",function(){return r}),n.a=function(t){var n=t.P,e=t.N;if(!n||!e)return;var o=n.site,u=t.site,f=e.site;if(o===f)return;var s=u[0],l=u[1],h=o[0]-s,d=o[1]-l,b=f[0]-s,p=f[1]-l,v=2*(h*p-d*b);if(v>=-c.g)return;var _=h*h+d*d,y=b*b+p*p,g=(p*_-d*y)/v,m=(h*y-b*_)/v,x=a.pop()||new function(){Object(i.a)(this),this.x=this.y=this.arc=this.site=this.cy=null};x.arc=t,x.site=u,x.x=g+s,x.y=(x.cy=m+l)+Math.sqrt(g*g+m*m),t.circle=x;var w=null,O=c.c._;for(;O;)if(x.y<O.y||x.y===O.y&&x.x<=O.x){if(!O.L){w=O.P;break}O=O.L}else{if(!O.R){w=O;break}O=O.R}c.c.insert(w,x),w||(r=x)},n.b=function(t){var n=t.circle;n&&(n.P||(r=n.N),c.c.remove(n),a.push(n),Object(i.a)(n),t.circle=null)};var r,i=e(90),c=e(34),a=[]},function(t,n,e){"use strict";function r(t,n,e){this.k=t,this.x=n,this.y=e}n.a=r,e.d(n,"b",function(){return i}),r.prototype={constructor:r,scale:function(t){return 1===t?this:new r(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new r(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var i=new r(1,0,0);r.prototype},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(175),i=e.n(r);n.default=i.a,"undefined"!=typeof window&&window.Vue&&window.Vue.component("word-cloud",i.a)},function(t,n,e){var r=e(181)(e(182),e(521),function(t){e(176)},null,null);t.exports=r.exports},function(t,n,e){var r=e(177);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e(179)("23ce8918",r,!0,{})},function(t,n,e){(t.exports=e(178)()).push([t.i,".wordCloud{display:inline-block;position:relative;width:100%;height:400px}.wordCloud svg{display:inline-block;position:absolute;top:0;left:0}div.tooltip{position:absolute;width:140px;height:50px;padding:8px;font:18px Arial;line-height:24px;color:#fff;background:#000;border:0;border-radius:2px;pointer-events:none}",""])},function(t,n){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],n=0;n<this.length;n++){var e=this[n];e[2]?t.push("@media "+e[2]+"{"+e[1]+"}"):t.push(e[1])}return t.join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},i=0;i<this.length;i++){var c=this[i][0];"number"==typeof c&&(r[c]=!0)}for(i=0;i<n.length;i++){var a=n[i];"number"==typeof a[0]&&r[a[0]]||(e&&!a[2]?a[2]=e:e&&(a[2]="("+a[2]+") and ("+e+")"),t.push(a))}},t}},function(t,n,e){var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=e(180),c={},a=r&&(document.head||document.getElementsByTagName("head")[0]),o=null,u=0,f=!1,s=function(){},l=null,h="data-vue-ssr-id",d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function b(t){for(var n=0;n<t.length;n++){var e=t[n],r=c[e.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](e.parts[i]);for(;i<e.parts.length;i++)r.parts.push(v(e.parts[i]));r.parts.length>e.parts.length&&(r.parts.length=e.parts.length)}else{var a=[];for(i=0;i<e.parts.length;i++)a.push(v(e.parts[i]));c[e.id]={id:e.id,refs:1,parts:a}}}}function p(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function v(t){var n,e,r=document.querySelector("style["+h+'~="'+t.id+'"]');if(r){if(f)return s;r.parentNode.removeChild(r)}if(d){var i=u++;r=o||(o=p()),n=g.bind(null,r,i,!1),e=g.bind(null,r,i,!0)}else r=p(),n=function(t,n){var e=n.css,r=n.media,i=n.sourceMap;r&&t.setAttribute("media",r);l.ssrId&&t.setAttribute(h,n.id);i&&(e+="\n/*# sourceURL="+i.sources[0]+" */",e+="\n");if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}.bind(null,r),e=function(){r.parentNode.removeChild(r)};return n(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;n(t=r)}else e()}}t.exports=function(t,n,e,r){f=e,l=r||{};var a=i(t,n);return b(a),function(n){for(var e=[],r=0;r<a.length;r++){var o=a[r];(u=c[o.id]).refs--,e.push(u)}n?b(a=i(t,n)):a=[];for(r=0;r<e.length;r++){var u;if(0===(u=e[r]).refs){for(var f=0;f<u.parts.length;f++)u.parts[f]();delete c[u.id]}}}};var _,y=(_=[],function(t,n){return _[t]=n,_.filter(Boolean).join("\n")});function g(t,n,e,r){var i=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(n,i);else{var c=document.createTextNode(i),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(c,a[n]):t.appendChild(c)}}},function(t,n){t.exports=function(t,n){for(var e=[],r={},i=0;i<n.length;i++){var c=n[i],a=c[0],o={id:t+":"+i,css:c[1],media:c[2],sourceMap:c[3]};r[a]?r[a].parts.push(o):e.push(r[a]={id:a,parts:[o]})}return e}},function(t,n){t.exports=function(t,n,e,r,i){var c,a=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(c=t,a=t.default);var u,f="function"==typeof a?a.options:a;if(n&&(f.render=n.render,f.staticRenderFns=n.staticRenderFns),r&&(f._scopeId=r),i?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},f._ssrRegister=u):e&&(u=e),u){var s=f.functional,l=s?f.render:f.beforeCreate;s?f.render=function(t,n){return u.call(n),l(t,n)}:f.beforeCreate=l?[].concat(l,u):[u]}return{esModule:c,exports:a,options:f}}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(183),i=e(475),c=(e.n(i),e(476)),a=e(517);const o={resize:e.n(a).a},u={margin:{type:Object,default:function(){return{top:15,right:15,bottom:15,left:15}}},wordPadding:{type:Number,default:3},rotate:{type:Object,default:function(){return{from:-60,to:60,numOfOrientation:5}}},spiral:{type:String,default:"archimedean"},fontScale:{type:String,default:"sqrt"},font:{type:String,default:"impact"},fontSize:{type:Array,default:function(){return[10,80]}},color:{type:[String,Array],default:"Category10"},data:{type:Array,required:!0},nameKey:{type:String,default:"name"},valueKey:{type:String,default:"value"},showTooltip:{type:Boolean,default:!0},wordClick:{type:Function,default:null}};n.default={name:"word-cloud",directives:o,props:u,data:()=>({svgWidth:0,svgHeight:0}),computed:{size(){const{svgWidth:t,svgHeight:n}=this,{margin:e}=this;return{width:t-e.left-e.right,height:n-e.top-e.bottom}},words(){const{data:t,valueKey:n}=this;return t.sort(function(t,e){return parseFloat(e[n])-parseFloat(t[n])})}},mounted(){this.getSize(),this.chart=this.createChart(),this.renderChart()},watch:{words:{handler:function(t,n){this.update()},deep:!0}},methods:{onResize(){var t,n;this.getSize(),t=this.update,clearTimeout(t.tid),t.tid=setTimeout(function(){t.call(n)},200)},getSize(){this.svgWidth=this.$el.clientWidth,this.svgHeight=this.$el.clientHeight},createSvg(){return r.f(this.$el).append("svg").attr("width","100%").attr("height","100%")},createChart(){const{margin:t}=this,{width:n,height:e}=this.size;return this.createSvg().append("g").attr("width",n).attr("height",e).attr("class","chart").attr("transform","translate("+t.left+","+t.top+")")},getRotation(){const{from:t,to:n,numOfOrientation:e}=this.rotate,r=(Math.abs(t)+Math.abs(n))/(e-1)||1;return{a:e,b:t/r,c:r}},getColorScale:t=>"string"==typeof t?r.d(c["scheme"+t]):r.d(t),setFontSizeScale(){const{fontSize:t,fontScale:n,words:e,valueKey:i}=this;switch(n){case"sqrt":this.fontSizeScale=r.e();break;case"log":this.fontSizeScale=r.c();break;case"n":this.fontSizeScale=r.b()}this.fontSizeScale.range(t),e.length&&this.fontSizeScale.domain([+e[e.length-1][i]||1,+e[0][i]])},renderChart(){this.setFontSizeScale();const{spiral:t,wordPadding:n,fontSizeScale:e,font:r,words:c,nameKey:a,valueKey:o}=this,{width:u,height:f}=this.size,{a:s,b:l,c:h}=this.getRotation(),d=i().size([u,f]).words(c).fontSize(t=>e(t[o])).text(t=>t[a]).font(r).padding(n).rotate(()=>(~~(Math.random()*s)+l)*h).spiral(t).on("end",this.draw);this.layout=d,d.start()},draw(t){const{layout:n,chart:e,color:i,nameKey:c,valueKey:a,showTooltip:o,wordClick:u}=this,f=this.getColorScale(i),s=this,l=e.append("g").attr("transform","translate("+n.size()[0]/2+","+n.size()[1]/2+")"),h=r.f("body").append("div").attr("class","tooltip").style("opacity",0),d=l.selectAll("text").data(t).enter().append("text").style("font-size",t=>t.size+"px").style("font-family",t=>t.font).style("fill",(t,n)=>f(n)).attr("class","text").attr("text-anchor","middle");d.transition().duration(500).attr("transform",t=>"translate("+[t.x,t.y]+")rotate("+t.rotate+")").text(t=>t.text),o&&d.on("mouseover",function(t){h.transition().duration(200).style("opacity",.7),h.html(c+": "+t[c]+"<br/>"+a+": "+t[a])}).on("mousemove",function(t){h.style("left",r.a.pageX+"px").style("top",r.a.pageY-40+"px")}).on("mouseout",function(t){h.transition().duration(500).style("opacity",0)}),d.on("click",t=>{u(t[c],t[a],s)})},update(){const{words:t,layout:n,fontSizeScale:e,chart:r,valueKey:i}=this,{width:c,height:a}=this.size;t.length&&e.domain([+t[t.length-1][i]||1,+t[0][i]]),r.select("g").remove(),n.stop().size([c,a]).words(t).start()}}}},function(t,n,e){"use strict";e(184),e(5),e(201),e(205),e(292),e(25),e(7),e(12),e(53),e(67),e(122),e(305),e(72),e(335),e(363),e(6),e(15),e(385),e(70),e(392),e(395),e(400);var r=e(407);e.d(n,"b",function(){return r.a}),e.d(n,"c",function(){return r.b}),e.d(n,"d",function(){return r.c}),e.d(n,"e",function(){return r.d});var i=e(3);e.d(n,"a",function(){return i.b}),e.d(n,"f",function(){return i.f});e(440),e(47),e(84),e(38),e(64),e(465),e(470)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(94)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(98),e(92),e(188),e(97),e(189),e(99),e(100),e(101)},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t){return t}},function(t,n,e){"use strict";e(98),e(19),e(23),e(52)},function(t,n,e){"use strict";e(95)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(23)},function(t,n,e){"use strict";e(19),e(23),e(52)},function(t,n,e){"use strict";n.a=function(t){for(var n,e,r,i=t.length,c=-1,a=0;++c<i;)a+=t[c].length;for(e=new Array(a);--i>=0;)for(n=(r=t[i]).length;--n>=0;)e[--a]=r[n];return e}},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(19)},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(103)},function(t,n,e){"use strict";e(202)},function(t,n,e){"use strict";e(203),e(204)},function(t,n,e){"use strict";e.d(n,"a",function(){return r});var r=Array.prototype.slice},function(t,n,e){"use strict";n.a=function(t){return t}},function(t,n,e){"use strict";e(206)},function(t,n,e){"use strict";e(12),e(53),e(6),e(3),e(64),e(289),e(290),e(291),["e","w"].map(r),["n","s"].map(r),["n","e","s","w","nw","ne","se","sw"].map(r);function r(t){return{type:t}}},function(t,n,e){"use strict";var r={value:function(){}};function i(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new c(r)}function c(t){this._=t}function a(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function o(t,n,e){for(var i=0,c=t.length;i<c;++i)if(t[i].name===n){t[i]=r,t=t.slice(0,i).concat(t.slice(i+1));break}return null!=e&&t.push({name:n,value:e}),t}c.prototype=i.prototype={constructor:c,on:function(t,n){var e,r,i=this._,c=(r=i,(t+"").trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");if(e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),t&&!r.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}})),u=-1,f=c.length;if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++u<f;)if(e=(t=c[u]).type)i[e]=o(i[e],t.name,n);else if(null==n)for(e in i)i[e]=o(i[e],t.name,null);return this}for(;++u<f;)if((e=(t=c[u]).type)&&(e=a(i[e],t.name)))return e},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new c(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),c=0;c<e;++c)i[c]=arguments[c+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(c=0,e=(r=this._[t]).length;c<e;++c)r[c].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,c=r.length;i<c;++i)r[i].value.apply(n,e)}},n.a=i},function(t,n,e){"use strict";e(12),e(3),e(110),e(111),e(243),e(244)},function(t,n,e){"use strict";e(35),e(104)},function(t,n,e){"use strict";var r=e(8),i=e(56);n.a=function(t){"function"!=typeof t&&(t=Object(i.a)(t));for(var n=this._groups,e=n.length,c=new Array(e),a=0;a<e;++a)for(var o,u,f=n[a],s=f.length,l=c[a]=new Array(s),h=0;h<s;++h)(o=f[h])&&(u=t.call(o,o.__data__,h,f))&&("__data__"in o&&(u.__data__=o.__data__),l[h]=u);return new r.a(c,this._parents)}},function(t,n,e){"use strict";var r=e(8),i=e(105);n.a=function(t){"function"!=typeof t&&(t=Object(i.a)(t));for(var n=this._groups,e=n.length,c=[],a=[],o=0;o<e;++o)for(var u,f=n[o],s=f.length,l=0;l<s;++l)(u=f[l])&&(c.push(t.call(u,u.__data__,l,f)),a.push(u));return new r.a(c,a)}},function(t,n,e){"use strict";var r=e(8),i=e(106);n.a=function(t){"function"!=typeof t&&(t=Object(i.a)(t));for(var n=this._groups,e=n.length,c=new Array(e),a=0;a<e;++a)for(var o,u=n[a],f=u.length,s=c[a]=[],l=0;l<f;++l)(o=u[l])&&t.call(o,o.__data__,l,u)&&s.push(o);return new r.a(c,this._parents)}},function(t,n,e){"use strict";var r=e(8),i=e(107),c=e(214),a="$";function o(t,n,e,r,c,a){for(var o,u=0,f=n.length,s=a.length;u<s;++u)(o=n[u])?(o.__data__=a[u],r[u]=o):e[u]=new i.a(t,a[u]);for(;u<f;++u)(o=n[u])&&(c[u]=o)}function u(t,n,e,r,c,o,u){var f,s,l,h={},d=n.length,b=o.length,p=new Array(d);for(f=0;f<d;++f)(s=n[f])&&(p[f]=l=a+u.call(s,s.__data__,f,n),l in h?c[f]=s:h[l]=s);for(f=0;f<b;++f)(s=h[l=a+u.call(t,o[f],f,o)])?(r[f]=s,s.__data__=o[f],h[l]=null):e[f]=new i.a(t,o[f]);for(f=0;f<d;++f)(s=n[f])&&h[p[f]]===s&&(c[f]=s)}n.a=function(t,n){if(!t)return _=new Array(this.size()),d=-1,this.each(function(t){_[++d]=t}),_;var e=n?u:o,i=this._parents,a=this._groups;"function"!=typeof t&&(t=Object(c.a)(t));for(var f=a.length,s=new Array(f),l=new Array(f),h=new Array(f),d=0;d<f;++d){var b=i[d],p=a[d],v=p.length,_=t.call(b,b&&b.__data__,d,i),y=_.length,g=l[d]=new Array(y),m=s[d]=new Array(y);e(b,p,g,m,h[d]=new Array(v),_,n);for(var x,w,O=0,j=0;O<y;++O)if(x=g[O]){for(O>=j&&(j=O+1);!(w=m[j])&&++j<y;);x._next=w||null}}return(s=new r.a(s,i))._enter=l,s._exit=h,s}},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";var r=e(108),i=e(8);n.a=function(){return new i.a(this._exit||this._groups.map(r.a),this._parents)}},function(t,n,e){"use strict";var r=e(8);n.a=function(t){for(var n=this._groups,e=t._groups,i=n.length,c=e.length,a=Math.min(i,c),o=new Array(i),u=0;u<a;++u)for(var f,s=n[u],l=e[u],h=s.length,d=o[u]=new Array(h),b=0;b<h;++b)(f=s[b]||l[b])&&(d[b]=f);for(;u<i;++u)o[u]=n[u];return new r.a(o,this._parents)}},function(t,n,e){"use strict";n.a=function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],c=i.length-1,a=i[c];--c>=0;)(r=i[c])&&(a&&a!==r.nextSibling&&a.parentNode.insertBefore(r,a),a=r);return this}},function(t,n,e){"use strict";var r=e(8);function i(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}n.a=function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=i);for(var e=this._groups,c=e.length,a=new Array(c),o=0;o<c;++o){for(var u,f=e[o],s=f.length,l=a[o]=new Array(s),h=0;h<s;++h)(u=f[h])&&(l[h]=u);l.sort(n)}return new r.a(a,this._parents).order()}},function(t,n,e){"use strict";n.a=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}},function(t,n,e){"use strict";n.a=function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t}},function(t,n,e){"use strict";n.a=function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,c=r.length;i<c;++i){var a=r[i];if(a)return a}return null}},function(t,n,e){"use strict";n.a=function(){var t=0;return this.each(function(){++t}),t}},function(t,n,e){"use strict";n.a=function(){return!this.node()}},function(t,n,e){"use strict";n.a=function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,c=n[e],a=0,o=c.length;a<o;++a)(i=c[a])&&t.call(i,i.__data__,a,c);return this}},function(t,n,e){"use strict";var r=e(54);n.a=function(t,n){var e=Object(r.a)(t);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((null==n?e.local?function(t){return function(){this.removeAttributeNS(t.space,t.local)}}:function(t){return function(){this.removeAttribute(t)}}:"function"==typeof n?e.local?function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}:function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}:e.local?function(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}:function(t,n){return function(){this.setAttribute(t,n)}})(e,n))}},function(t,n,e){"use strict";n.a=function(t,n){return arguments.length>1?this.each((null==n?function(t){return function(){delete this[t]}}:"function"==typeof n?function(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}:function(t,n){return function(){this[t]=n}})(t,n)):this.node()[t]}},function(t,n,e){"use strict";function r(t){return t.trim().split(/^|\s+/)}function i(t){return t.classList||new c(t)}function c(t){this._node=t,this._names=r(t.getAttribute("class")||"")}function a(t,n){for(var e=i(t),r=-1,c=n.length;++r<c;)e.add(n[r])}function o(t,n){for(var e=i(t),r=-1,c=n.length;++r<c;)e.remove(n[r])}c.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}},n.a=function(t,n){var e=r(t+"");if(arguments.length<2){for(var c=i(this.node()),u=-1,f=e.length;++u<f;)if(!c.contains(e[u]))return!1;return!0}return this.each(("function"==typeof n?function(t,n){return function(){(n.apply(this,arguments)?a:o)(this,t)}}:n?function(t){return function(){a(this,t)}}:function(t){return function(){o(this,t)}})(e,n))}},function(t,n,e){"use strict";function r(){this.textContent=""}n.a=function(t){return arguments.length?this.each(null==t?r:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}:function(t){return function(){this.textContent=t}})(t)):this.node().textContent}},function(t,n,e){"use strict";function r(){this.innerHTML=""}n.a=function(t){return arguments.length?this.each(null==t?r:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}:function(t){return function(){this.innerHTML=t}})(t)):this.node().innerHTML}},function(t,n,e){"use strict";function r(){this.nextSibling&&this.parentNode.appendChild(this)}n.a=function(){return this.each(r)}},function(t,n,e){"use strict";function r(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}n.a=function(){return this.each(r)}},function(t,n,e){"use strict";var r=e(35);n.a=function(t){var n="function"==typeof t?t:Object(r.a)(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}},function(t,n,e){"use strict";var r=e(35),i=e(56);function c(){return null}n.a=function(t,n){var e="function"==typeof t?t:Object(r.a)(t),a=null==n?c:"function"==typeof n?n:Object(i.a)(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),a.apply(this,arguments)||null)})}},function(t,n,e){"use strict";function r(){var t=this.parentNode;t&&t.removeChild(this)}n.a=function(){return this.each(r)}},function(t,n,e){"use strict";function r(){return this.parentNode.insertBefore(this.cloneNode(!1),this.nextSibling)}function i(){return this.parentNode.insertBefore(this.cloneNode(!0),this.nextSibling)}n.a=function(t){return this.select(t?i:r)}},function(t,n,e){"use strict";n.a=function(t){return arguments.length?this.property("__data__",t):this.node().__data__}},function(t,n,e){"use strict";var r=e(57);function i(t,n,e){var i=Object(r.a)(t),c=i.CustomEvent;"function"==typeof c?c=new c(n,e):(c=i.document.createEvent("Event"),e?(c.initEvent(n,e.bubbles,e.cancelable),c.detail=e.detail):c.initEvent(n,!1,!1)),t.dispatchEvent(c)}n.a=function(t,n){return this.each(("function"==typeof n?function(t,n){return function(){return i(this,t,n.apply(this,arguments))}}:function(t,n){return function(){return i(this,t,n)}})(t,n))}},function(t,n,e){"use strict";var r=0;function i(){this._="@"+(++r).toString(36)}i.prototype=function(){return new i}.prototype={constructor:i,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}}},function(t,n,e){"use strict";var r=e(59),i=e(36);n.a=function(t){var n=Object(r.a)();return n.changedTouches&&(n=n.changedTouches[0]),Object(i.a)(t,n)}},function(t,n,e){"use strict";e(8)},function(t,n,e){"use strict";var r=e(59),i=e(36);n.a=function(t,n,e){arguments.length<3&&(e=n,n=Object(r.a)().changedTouches);for(var c,a=0,o=n?n.length:0;a<o;++a)if((c=n[a]).identifier===e)return Object(i.a)(t,c);return null}},function(t,n,e){"use strict";e(59),e(36)},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";function r(t,n,e,r,i,c,a,o,u,f){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=c,this.y=a,this.dx=o,this.dy=u,this._=f}n.a=r,r.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t}},function(t,n,e){"use strict";n.a=b,n.b=m;var r=e(62),i=e(61),c=e(112),a=.95047,o=1,u=1.08883,f=4/29,s=6/29,l=3*s*s,h=s*s*s;function d(t){if(t instanceof p)return new p(t.l,t.a,t.b,t.opacity);if(t instanceof x){var n=t.h*c.a;return new p(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof i.b||(t=Object(i.h)(t));var e=g(t.r),r=g(t.g),f=g(t.b),s=v((.4124564*e+.3575761*r+.1804375*f)/a),l=v((.2126729*e+.7151522*r+.072175*f)/o);return new p(116*l-16,500*(s-l),200*(l-v((.0193339*e+.119192*r+.9503041*f)/u)),t.opacity)}function b(t,n,e,r){return 1===arguments.length?d(t):new p(t,n,e,null==r?1:r)}function p(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function v(t){return t>h?Math.pow(t,1/3):t/l+f}function _(t){return t>s?t*t*t:l*(t-f)}function y(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function g(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function m(t,n,e,r){return 1===arguments.length?function(t){if(t instanceof x)return new x(t.h,t.c,t.l,t.opacity);t instanceof p||(t=d(t));var n=Math.atan2(t.b,t.a)*c.b;return new x(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}(t):new x(t,n,e,null==r?1:r)}function x(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}Object(r.a)(p,b,Object(r.b)(i.a,{brighter:function(t){return new p(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new p(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return t=o*_(t),n=a*_(n),e=u*_(e),new i.b(y(3.2404542*n-1.5371385*t-.4985314*e),y(-.969266*n+1.8760108*t+.041556*e),y(.0556434*n-.2040259*t+1.0572252*e),this.opacity)}})),Object(r.a)(x,m,Object(r.b)(i.a,{brighter:function(t){return new x(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new x(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return d(this).rgb()}}))},function(t,n,e){"use strict";n.a=b;var r=e(62),i=e(61),c=e(112),a=-.14861,o=1.78277,u=-.29227,f=-.90649,s=1.97294,l=s*f,h=s*o,d=o*u-f*a;function b(t,n,e,r){return 1===arguments.length?function(t){if(t instanceof p)return new p(t.h,t.s,t.l,t.opacity);t instanceof i.b||(t=Object(i.h)(t));var n=t.r/255,e=t.g/255,r=t.b/255,a=(d*r+l*n-h*e)/(d+l-h),o=r-a,b=(s*(e-a)-u*o)/f,v=Math.sqrt(b*b+o*o)/(s*a*(1-a)),_=v?Math.atan2(b,o)*c.b-120:NaN;return new p(_<0?_+360:_,v,a,t.opacity)}(t):new p(t,n,e,null==r?1:r)}function p(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}Object(r.a)(p,b,Object(r.b)(i.a,{brighter:function(t){return t=null==t?i.c:Math.pow(i.c,t),new p(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?i.d:Math.pow(i.d,t),new p(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*c.a,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),l=Math.sin(t);return new i.b(255*(n+e*(a*r+o*l)),255*(n+e*(u*r+f*l)),255*(n+e*(s*r)),this.opacity)}}))},function(t,n,e){"use strict";n.a=function(t,n){return n-=t=+t,function(e){return Math.round(t+n*e)}}},function(t,n,e){"use strict";e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o});var r=e(37),i=e(249);function c(t,n,e,i){function c(t){return t.length?t.pop()+" ":""}return function(a,o){var u=[],f=[];return a=t(a),o=t(o),function(t,i,c,a,o,u){if(t!==c||i!==a){var f=o.push("translate(",null,n,null,e);u.push({i:f-4,x:Object(r.a)(t,c)},{i:f-2,x:Object(r.a)(i,a)})}else(c||a)&&o.push("translate("+c+n+a+e)}(a.translateX,a.translateY,o.translateX,o.translateY,u,f),function(t,n,e,a){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),a.push({i:e.push(c(e)+"rotate(",null,i)-2,x:Object(r.a)(t,n)})):n&&e.push(c(e)+"rotate("+n+i)}(a.rotate,o.rotate,u,f),function(t,n,e,a){t!==n?a.push({i:e.push(c(e)+"skewX(",null,i)-2,x:Object(r.a)(t,n)}):n&&e.push(c(e)+"skewX("+n+i)}(a.skewX,o.skewX,u,f),function(t,n,e,i,a,o){if(t!==e||n!==i){var u=a.push(c(a)+"scale(",null,",",null,")");o.push({i:u-4,x:Object(r.a)(t,e)},{i:u-2,x:Object(r.a)(n,i)})}else 1===e&&1===i||a.push(c(a)+"scale("+e+","+i+")")}(a.scaleX,a.scaleY,o.scaleX,o.scaleY,u,f),a=o=null,function(t){for(var n,e=-1,r=f.length;++e<r;)u[(n=f[e]).i]=n.x(t);return u.join("")}}}var a=c(i.a,"px, ","px)","deg)"),o=c(i.b,", ",")",")")},function(t,n,e){"use strict";n.a=function(t){if("none"===t)return o.b;r||(r=document.createElement("DIV"),i=document.documentElement,c=document.defaultView);return r.style.transform=t,t=c.getComputedStyle(i.appendChild(r),null).getPropertyValue("transform"),i.removeChild(r),t=t.slice(7,-1).split(","),Object(o.a)(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5])},n.b=function(t){if(null==t)return o.b;a||(a=document.createElementNS("http://www.w3.org/2000/svg","g"));return a.setAttribute("transform",t),(t=a.transform.baseVal.consolidate())?(t=t.matrix,Object(o.a)(t.a,t.b,t.c,t.d,t.e,t.f)):o.b};var r,i,c,a,o=e(250)},function(t,n,e){"use strict";e.d(n,"b",function(){return i});var r=180/Math.PI,i={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};n.a=function(t,n,e,i,c,a){var o,u,f;return(o=Math.sqrt(t*t+n*n))&&(t/=o,n/=o),(f=t*e+n*i)&&(e-=t*f,i-=n*f),(u=Math.sqrt(e*e+i*i))&&(e/=u,i/=u,f/=u),t*i<n*e&&(t=-t,n=-n,f=-f,o=-o),{translateX:c,translateY:a,rotate:Math.atan2(n,t)*r,skewX:Math.atan(f)*r,scaleX:o,scaleY:u}}},function(t,n,e){"use strict";var r=Math.SQRT2;function i(t){return((t=Math.exp(t))+1/t)/2}n.a=function(t,n){var e,c,a=t[0],o=t[1],u=t[2],f=n[0],s=n[1],l=n[2],h=f-a,d=s-o,b=h*h+d*d;if(b<1e-12)c=Math.log(l/u)/r,e=function(t){return[a+t*h,o+t*d,u*Math.exp(r*t*c)]};else{var p=Math.sqrt(b),v=(l*l-u*u+4*b)/(2*u*2*p),_=(l*l-u*u-4*b)/(2*l*2*p),y=Math.log(Math.sqrt(v*v+1)-v),g=Math.log(Math.sqrt(_*_+1)-_);c=(g-y)/r,e=function(t){var n,e=t*c,f=i(y),s=u/(2*p)*(f*(n=r*e+y,((n=Math.exp(2*n))-1)/(n+1))-function(t){return((t=Math.exp(t))-1/t)/2}(y));return[a+s*h,o+s*d,u*f/i(r*e+y)]}}return e.duration=1e3*c,e}},function(t,n,e){"use strict";var r=e(7),i=e(24);function c(t){return function(n,e){var c=t((n=Object(r.d)(n)).h,(e=Object(r.d)(e)).h),a=Object(i.a)(n.s,e.s),o=Object(i.a)(n.l,e.l),u=Object(i.a)(n.opacity,e.opacity);return function(t){return n.h=c(t),n.s=a(t),n.l=o(t),n.opacity=u(t),n+""}}}c(i.c),c(i.a)},function(t,n,e){"use strict";e(7),e(24)},function(t,n,e){"use strict";var r=e(7),i=e(24);function c(t){return function(n,e){var c=t((n=Object(r.c)(n)).h,(e=Object(r.c)(e)).h),a=Object(i.a)(n.c,e.c),o=Object(i.a)(n.l,e.l),u=Object(i.a)(n.opacity,e.opacity);return function(t){return n.h=c(t),n.c=a(t),n.l=o(t),n.opacity=u(t),n+""}}}c(i.c),c(i.a)},function(t,n,e){"use strict";e.d(n,"a",function(){return a});var r=e(7),i=e(24);function c(t){return function n(e){function c(n,c){var a=t((n=Object(r.b)(n)).h,(c=Object(r.b)(c)).h),o=Object(i.a)(n.s,c.s),u=Object(i.a)(n.l,c.l),f=Object(i.a)(n.opacity,c.opacity);return function(t){return n.h=a(t),n.s=o(t),n.l=u(Math.pow(t,e)),n.opacity=f(t),n+""}}return e=+e,c.gamma=n,c}(1)}c(i.c);var a=c(i.a)},function(t,n,e){"use strict"},function(t,n,e){"use strict";var r=e(3),i=e(258),c=e(261);r.g.prototype.interrupt=i.a,r.g.prototype.transition=c.a},function(t,n,e){"use strict";var r=e(120);n.a=function(t){return this.each(function(){Object(r.a)(this,t)})}},function(t,n,e){"use strict";var r=e(65);n.a=function(t,n,e){var i=new r.a;return n=null==n?0:+n,i.restart(function(e){i.stop(),t(e+n)},n,e),i}},function(t,n,e){"use strict";e(65)},function(t,n,e){"use strict";var r=e(13),i=e(9),c=e(122),a=e(38),o={time:null,delay:0,duration:250,ease:c.a};function u(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return o.time=Object(a.a)(),o;return e}n.a=function(t){var n,e;t instanceof r.a?(n=t._id,t=t._name):(n=Object(r.b)(),(e=o).time=Object(a.a)(),t=null==t?null:t+"");for(var c=this._groups,f=c.length,s=0;s<f;++s)for(var l,h=c[s],d=h.length,b=0;b<d;++b)(l=h[b])&&Object(i.e)(l,t,n,b,h,e||u(l,n));return new r.a(c,this._parents,t,n)}},function(t,n,e){"use strict";var r=e(6),i=e(3),c=e(39),a=e(121);n.a=function(t,n){var e=Object(i.e)(t),o="transform"===e?r.i:a.a;return this.attrTween(t,"function"==typeof n?(e.local?function(t,n,e){var r,i,c;return function(){var a,o=e(this);if(null!=o)return(a=this.getAttributeNS(t.space,t.local))===o?null:a===r&&o===i?c:c=n(r=a,i=o);this.removeAttributeNS(t.space,t.local)}}:function(t,n,e){var r,i,c;return function(){var a,o=e(this);if(null!=o)return(a=this.getAttribute(t))===o?null:a===r&&o===i?c:c=n(r=a,i=o);this.removeAttribute(t)}})(e,o,Object(c.b)(this,"attr."+t,n)):null==n?(e.local?function(t){return function(){this.removeAttributeNS(t.space,t.local)}}:function(t){return function(){this.removeAttribute(t)}})(e):(e.local?function(t,n,e){var r,i;return function(){var c=this.getAttributeNS(t.space,t.local);return c===e?null:c===r?i:i=n(r=c,e)}}:function(t,n,e){var r,i;return function(){var c=this.getAttribute(t);return c===e?null:c===r?i:i=n(r=c,e)}})(e,o,n+""))}},function(t,n,e){"use strict";var r=e(3);n.a=function(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var i=Object(r.e)(t);return this.tween(e,(i.local?function(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}:function(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e})(i,n))}},function(t,n,e){"use strict";var r=e(9);n.a=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?function(t,n){return function(){Object(r.g)(this,t).delay=+n.apply(this,arguments)}}:function(t,n){return n=+n,function(){Object(r.g)(this,t).delay=n}})(n,t)):Object(r.f)(this.node(),n).delay}},function(t,n,e){"use strict";var r=e(9);n.a=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?function(t,n){return function(){Object(r.h)(this,t).duration=+n.apply(this,arguments)}}:function(t,n){return n=+n,function(){Object(r.h)(this,t).duration=n}})(n,t)):Object(r.f)(this.node(),n).duration}},function(t,n,e){"use strict";var r=e(9);n.a=function(t){var n=this._id;return arguments.length?this.each(function(t,n){if("function"!=typeof n)throw new Error;return function(){Object(r.h)(this,t).ease=n}}(n,t)):Object(r.f)(this.node(),n).ease}},function(t,n,e){"use strict";var r=e(3),i=e(13);n.a=function(t){"function"!=typeof t&&(t=Object(r.c)(t));for(var n=this._groups,e=n.length,c=new Array(e),a=0;a<e;++a)for(var o,u=n[a],f=u.length,s=c[a]=[],l=0;l<f;++l)(o=u[l])&&t.call(o,o.__data__,l,u)&&s.push(o);return new i.a(c,this._parents,this._name,this._id)}},function(t,n,e){"use strict";var r=e(13);n.a=function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,i=n.length,c=e.length,a=Math.min(i,c),o=new Array(i),u=0;u<a;++u)for(var f,s=n[u],l=e[u],h=s.length,d=o[u]=new Array(h),b=0;b<h;++b)(f=s[b]||l[b])&&(d[b]=f);for(;u<i;++u)o[u]=n[u];return new r.a(o,this._parents,this._name,this._id)}},function(t,n,e){"use strict";var r=e(9);n.a=function(t,n){var e=this._id;return arguments.length<2?Object(r.f)(this.node(),e).on.on(t):this.each(function(t,n,e){var i,c,a=function(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}(n)?r.g:r.h;return function(){var r=a(this,t),o=r.on;o!==i&&(c=(i=o).copy()).on(n,e),r.on=c}}(e,t,n))}},function(t,n,e){"use strict";n.a=function(){return this.on("end.remove",(t=this._id,function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}));var t}},function(t,n,e){"use strict";var r=e(3),i=e(13),c=e(9);n.a=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Object(r.h)(t));for(var a=this._groups,o=a.length,u=new Array(o),f=0;f<o;++f)for(var s,l,h=a[f],d=h.length,b=u[f]=new Array(d),p=0;p<d;++p)(s=h[p])&&(l=t.call(s,s.__data__,p,h))&&("__data__"in s&&(l.__data__=s.__data__),b[p]=l,Object(c.e)(b[p],n,e,p,b,Object(c.f)(s,e)));return new i.a(u,this._parents,n,e)}},function(t,n,e){"use strict";var r=e(3),i=e(13),c=e(9);n.a=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Object(r.i)(t));for(var a=this._groups,o=a.length,u=[],f=[],s=0;s<o;++s)for(var l,h=a[s],d=h.length,b=0;b<d;++b)if(l=h[b]){for(var p,v=t.call(l,l.__data__,b,h),_=Object(c.f)(l,e),y=0,g=v.length;y<g;++y)(p=v[y])&&Object(c.e)(p,n,e,y,v,_);u.push(v),f.push(l)}return new i.a(u,f,n,e)}},function(t,n,e){"use strict";var r=e(3).g.prototype.constructor;n.a=function(){return new r(this._groups,this._parents)}},function(t,n,e){"use strict";var r=e(6),i=e(3),c=e(39),a=e(121);n.a=function(t,n,e){var o="transform"==(t+="")?r.h:a.a;return null==n?this.styleTween(t,function(t,n){var e,r,c;return function(){var a=Object(i.j)(this,t),o=(this.style.removeProperty(t),Object(i.j)(this,t));return a===o?null:a===e&&o===r?c:c=n(e=a,r=o)}}(t,o)).on("end.style."+t,function(t){return function(){this.style.removeProperty(t)}}(t)):this.styleTween(t,"function"==typeof n?function(t,n,e){var r,c,a;return function(){var o=Object(i.j)(this,t),u=e(this);return null==u&&(this.style.removeProperty(t),u=Object(i.j)(this,t)),o===u?null:o===r&&u===c?a:a=n(r=o,c=u)}}(t,o,Object(c.b)(this,"style."+t,n)):function(t,n,e){var r,c;return function(){var a=Object(i.j)(this,t);return a===e?null:a===r?c:c=n(r=a,e)}}(t,o,n+""),e)}},function(t,n,e){"use strict";n.a=function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,function(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}(t,n,null==e?"":e))}},function(t,n,e){"use strict";var r=e(39);n.a=function(t){return this.tween("text","function"==typeof t?function(t){return function(){var n=t(this);this.textContent=null==n?"":n}}(Object(r.b)(this,"text",t)):function(t){return function(){this.textContent=t}}(null==t?"":t+""))}},function(t,n,e){"use strict";var r=e(13),i=e(9);n.a=function(){for(var t=this._name,n=this._id,e=Object(r.b)(),c=this._groups,a=c.length,o=0;o<a;++o)for(var u,f=c[o],s=f.length,l=0;l<s;++l)if(u=f[l]){var h=Object(i.f)(u,n);Object(i.e)(u,t,e,l,f,{time:h.time+h.delay+h.duration,delay:0,duration:h.duration,ease:h.ease})}return new r.a(c,this._parents,t,e)}},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";n.a=function(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}},function(t,n,e){"use strict";(function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e})(3),function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(3),function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(3)},function(t,n,e){"use strict";Math.PI},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";(function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e})(1.70158),function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(1.70158),function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(1.70158)},function(t,n,e){"use strict";var r=2*Math.PI;(function t(n,e){var i=Math.asin(1/(n=Math.max(1,n)))*(e/=r);function c(t){return n*Math.pow(2,10*--t)*Math.sin((i-t)/e)}return c.amplitude=function(n){return t(n,e*r)},c.period=function(e){return t(n,e)},c})(1,.3),function t(n,e){var i=Math.asin(1/(n=Math.max(1,n)))*(e/=r);function c(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+i)/e)}return c.amplitude=function(n){return t(n,e*r)},c.period=function(e){return t(n,e)},c}(1,.3),function t(n,e){var i=Math.asin(1/(n=Math.max(1,n)))*(e/=r);function c(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((i-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((i+t)/e))/2}return c.amplitude=function(n){return t(n,e*r)},c.period=function(e){return t(n,e)},c}(1,.3)},function(t,n,e){"use strict";e(13),e(9)},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t,n,e){this.target=t,this.type=n,this.selection=e}},function(t,n,e){"use strict";n.b=function(){r.b.stopImmediatePropagation()};var r=e(3);n.a=function(){r.b.preventDefault(),r.b.stopImmediatePropagation()}},function(t,n,e){"use strict";e(293),e(294)},function(t,n,e){"use strict";e(5),e(123)},function(t,n,e){"use strict";e(295),e(296),e(123),e(15)},function(t,n,e){"use strict";e.d(n,"a",function(){return r});var r=Array.prototype.slice},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";var r=Math.PI,i=2*r,c=i-1e-6;function a(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function o(){return new a}a.prototype=o.prototype={constructor:a,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,c){this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+c)},arcTo:function(t,n,e,i,c){t=+t,n=+n,e=+e,i=+i,c=+c;var a=this._x1,o=this._y1,u=e-t,f=i-n,s=a-t,l=o-n,h=s*s+l*l;if(c<0)throw new Error("negative radius: "+c);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(h>1e-6)if(Math.abs(l*u-f*s)>1e-6&&c){var d=e-a,b=i-o,p=u*u+f*f,v=d*d+b*b,_=Math.sqrt(p),y=Math.sqrt(h),g=c*Math.tan((r-Math.acos((p+h-v)/(2*_*y)))/2),m=g/y,x=g/_;Math.abs(m-1)>1e-6&&(this._+="L"+(t+m*s)+","+(n+m*l)),this._+="A"+c+","+c+",0,0,"+ +(l*d>s*b)+","+(this._x1=t+x*u)+","+(this._y1=n+x*f)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,a,o,u){t=+t,n=+n;var f=(e=+e)*Math.cos(a),s=e*Math.sin(a),l=t+f,h=n+s,d=1^u,b=u?a-o:o-a;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+l+","+h:(Math.abs(this._x1-l)>1e-6||Math.abs(this._y1-h)>1e-6)&&(this._+="L"+l+","+h),e&&(b<0&&(b=b%i+i),b>c?this._+="A"+e+","+e+",0,1,"+d+","+(t-f)+","+(n-s)+"A"+e+","+e+",0,1,"+d+","+(this._x1=l)+","+(this._y1=h):b>1e-6&&(this._+="A"+e+","+e+",0,"+ +(b>=r)+","+d+","+(this._x1=t+e*Math.cos(o))+","+(this._y1=n+e*Math.sin(o))))},rect:function(t,n,e,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}},n.a=o},function(t,n,e){"use strict";e(66)},function(t,n,e){"use strict";var r=e(66);function i(){}var c=r.a.prototype;function a(t,n){var e=new i;if(t instanceof i)t.each(function(t){e.add(t)});else if(t){var r=-1,c=t.length;if(null==n)for(;++r<c;)e.add(t[r]);else for(;++r<c;)e.add(n(t[r],r,t))}return e}i.prototype=a.prototype={constructor:i,has:c.has,add:function(t){return t+="",this[r.b+t]=t,this},remove:c.remove,clear:c.clear,values:c.keys,size:c.size,empty:c.empty,each:c.each}},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";e.d(n,"a",function(){return c});var r=e(68),i=Object(r.a)(","),c=i.parse;i.parseRows,i.format,i.formatRows},function(t,n,e){"use strict";e.d(n,"a",function(){return c});var r=e(68),i=Object(r.a)("\t"),c=i.parse;i.parseRows,i.format,i.formatRows},function(t,n,e){"use strict";e(306),e(307),e(321),e(322),e(323),e(124),e(324),e(325)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(20),e(69),e(70)},function(t,n,e){"use strict";n.a=p;var r=e(309),i=e(310),c=e(311),a=e(312),o=e(313),u=e(314),f=e(315),s=e(316),l=e(317),h=e(318),d=e(319),b=e(320);function p(t,n,e){var r=new v(null==n?d.b:n,null==e?b.b:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function v(t,n,e,r,i,c){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=c,this._root=void 0}function _(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}var y=p.prototype=v.prototype;y.copy=function(){var t,n,e=new v(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=_(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=_(n));return e},y.add=r.b,y.addAll=r.a,y.cover=i.a,y.data=c.a,y.extent=a.a,y.find=o.a,y.remove=u.a,y.removeAll=u.b,y.root=f.a,y.size=s.a,y.visit=l.a,y.visitAfter=h.a,y.x=d.a,y.y=b.a},function(t,n,e){"use strict";function r(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,c,a,o,u,f,s,l,h,d=t._root,b={data:r},p=t._x0,v=t._y0,_=t._x1,y=t._y1;if(!d)return t._root=b,t;for(;d.length;)if((f=n>=(c=(p+_)/2))?p=c:_=c,(s=e>=(a=(v+y)/2))?v=a:y=a,i=d,!(d=d[l=s<<1|f]))return i[l]=b,t;if(o=+t._x.call(null,d.data),u=+t._y.call(null,d.data),n===o&&e===u)return b.next=d,i?i[l]=b:t._root=b,t;do{i=i?i[l]=new Array(4):t._root=new Array(4),(f=n>=(c=(p+_)/2))?p=c:_=c,(s=e>=(a=(v+y)/2))?v=a:y=a}while((l=s<<1|f)==(h=(u>=a)<<1|o>=c));return i[h]=d,i[l]=b,t}n.a=function(t){var n,e,i,c,a=t.length,o=new Array(a),u=new Array(a),f=1/0,s=1/0,l=-1/0,h=-1/0;for(e=0;e<a;++e)isNaN(i=+this._x.call(null,n=t[e]))||isNaN(c=+this._y.call(null,n))||(o[e]=i,u[e]=c,i<f&&(f=i),i>l&&(l=i),c<s&&(s=c),c>h&&(h=c));l<f&&(f=this._x0,l=this._x1);h<s&&(s=this._y0,h=this._y1);for(this.cover(f,s).cover(l,h),e=0;e<a;++e)r(this,o[e],u[e],t[e]);return this},n.b=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t);return r(this.cover(n,e),n,e,t)}},function(t,n,e){"use strict";n.a=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,c=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,c=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>c))return this;var a,o,u=i-e,f=this._root;switch(o=(n<(r+c)/2)<<1|t<(e+i)/2){case 0:do{(a=new Array(4))[o]=f,f=a}while(c=r+(u*=2),t>(i=e+u)||n>c);break;case 1:do{(a=new Array(4))[o]=f,f=a}while(c=r+(u*=2),(e=i-u)>t||n>c);break;case 2:do{(a=new Array(4))[o]=f,f=a}while(r=c-(u*=2),t>(i=e+u)||r>n);break;case 3:do{(a=new Array(4))[o]=f,f=a}while(r=c-(u*=2),(e=i-u)>t||r>n)}this._root&&this._root.length&&(this._root=f)}return this._x0=e,this._y0=r,this._x1=i,this._y1=c,this}},function(t,n,e){"use strict";n.a=function(){var t=[];return this.visit(function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)}),t}},function(t,n,e){"use strict";n.a=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}},function(t,n,e){"use strict";var r=e(71);n.a=function(t,n,e){var i,c,a,o,u,f,s,l=this._x0,h=this._y0,d=this._x1,b=this._y1,p=[],v=this._root;for(v&&p.push(new r.a(v,l,h,d,b)),null==e?e=1/0:(l=t-e,h=n-e,d=t+e,b=n+e,e*=e);f=p.pop();)if(!(!(v=f.node)||(c=f.x0)>d||(a=f.y0)>b||(o=f.x1)<l||(u=f.y1)<h))if(v.length){var _=(c+o)/2,y=(a+u)/2;p.push(new r.a(v[3],_,y,o,u),new r.a(v[2],c,y,_,u),new r.a(v[1],_,a,o,y),new r.a(v[0],c,a,_,y)),(s=(n>=y)<<1|t>=_)&&(f=p[p.length-1],p[p.length-1]=p[p.length-1-s],p[p.length-1-s]=f)}else{var g=t-+this._x.call(null,v.data),m=n-+this._y.call(null,v.data),x=g*g+m*m;if(x<e){var w=Math.sqrt(e=x);l=t-w,h=n-w,d=t+w,b=n+w,i=v.data}}return i}},function(t,n,e){"use strict";n.b=function(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this},n.a=function(t){if(isNaN(c=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var n,e,r,i,c,a,o,u,f,s,l,h,d=this._root,b=this._x0,p=this._y0,v=this._x1,_=this._y1;if(!d)return this;if(d.length)for(;;){if((f=c>=(o=(b+v)/2))?b=o:v=o,(s=a>=(u=(p+_)/2))?p=u:_=u,n=d,!(d=d[l=s<<1|f]))return this;if(!d.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(d=n[0]||n[1]||n[2]||n[3])&&d===(n[3]||n[2]||n[1]||n[0])&&!d.length&&(e?e[h]=d:this._root=d),this):(this._root=i,this)}},function(t,n,e){"use strict";n.a=function(){return this._root}},function(t,n,e){"use strict";n.a=function(){var t=0;return this.visit(function(n){if(!n.length)do{++t}while(n=n.next)}),t}},function(t,n,e){"use strict";var r=e(71);n.a=function(t){var n,e,i,c,a,o,u=[],f=this._root;for(f&&u.push(new r.a(f,this._x0,this._y0,this._x1,this._y1));n=u.pop();)if(!t(f=n.node,i=n.x0,c=n.y0,a=n.x1,o=n.y1)&&f.length){var s=(i+a)/2,l=(c+o)/2;(e=f[3])&&u.push(new r.a(e,s,l,a,o)),(e=f[2])&&u.push(new r.a(e,i,l,s,o)),(e=f[1])&&u.push(new r.a(e,s,c,a,l)),(e=f[0])&&u.push(new r.a(e,i,c,s,l))}return this}},function(t,n,e){"use strict";var r=e(71);n.a=function(t){var n,e=[],i=[];for(this._root&&e.push(new r.a(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var c=n.node;if(c.length){var a,o=n.x0,u=n.y0,f=n.x1,s=n.y1,l=(o+f)/2,h=(u+s)/2;(a=c[0])&&e.push(new r.a(a,o,u,l,h)),(a=c[1])&&e.push(new r.a(a,l,u,f,h)),(a=c[2])&&e.push(new r.a(a,o,h,l,s)),(a=c[3])&&e.push(new r.a(a,l,h,f,s))}i.push(n)}for(;n=i.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this}},function(t,n,e){"use strict";n.b=function(t){return t[0]},n.a=function(t){return arguments.length?(this._x=t,this):this._x}},function(t,n,e){"use strict";n.b=function(t){return t[1]},n.a=function(t){return arguments.length?(this._y=t,this):this._y}},function(t,n,e){"use strict";e(20),e(69),e(25)},function(t,n,e){"use strict";e(20),e(69),e(70),e(124)},function(t,n,e){"use strict";e(20)},function(t,n,e){"use strict";e(20)},function(t,n,e){"use strict";e(20)},function(t,n,e){"use strict";e.d(n,"a",function(){return i}),e.d(n,"b",function(){return c});var r,i,c,a,o=e(125);a={decimal:".",thousands:",",grouping:[3],currency:["$",""]},r=Object(o.a)(a),i=r.format,c=r.formatPrefix},function(t,n,e){"use strict";n.a=function(t,n){return function(e,r){for(var i=e.length,c=[],a=0,o=t[0],u=0;i>0&&o>0&&(u+o+1>r&&(o=Math.max(1,r-u)),c.push(e.substring(i-=o,i+o)),!((u+=o+1)>r));)o=t[a=(a+1)%t.length];return c.reverse().join(n)}}},function(t,n,e){"use strict";n.a=function(t){return function(n){return n.replace(/[0-9]/g,function(n){return t[+n]})}}},function(t,n,e){"use strict";n.a=function(t,n){t=t.toPrecision(n);t:for(var e,r=t.length,i=1,c=-1;i<r;++i)switch(t[i]){case".":c=e=i;break;case"0":0===c&&(c=i),e=i;break;case"e":break t;default:c>0&&(c=0)}return c>0?t.slice(0,c)+t.slice(e+1):t}},function(t,n,e){"use strict";var r=e(73);n.a=function(t,n){var e=Object(r.a)(t,n);if(!e)return t+"";var i=e[0],c=e[1];return c<0?"0."+new Array(-c).join("0")+i:i.length>c+1?i.slice(0,c+1)+"."+i.slice(c+1):i+new Array(c-i.length+2).join("0")}},function(t,n,e){"use strict";n.a=function(t){return t}},function(t,n,e){"use strict";var r=e(40);n.a=function(t){return Math.max(0,-Object(r.a)(Math.abs(t)))}},function(t,n,e){"use strict";var r=e(40);n.a=function(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Object(r.a)(n)/3)))-Object(r.a)(Math.abs(t)))}},function(t,n,e){"use strict";var r=e(40);n.a=function(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,Object(r.a)(n)-Object(r.a)(t))+1}},function(t,n,e){"use strict";e(129),e(336),e(337),e(130),e(132),e(138),e(339),e(42),e(341),e(139),e(342),e(343),e(140),e(344),e(142),e(352),e(353),e(354),e(355),e(75),e(356),e(143),e(357),e(358),e(10),e(78),e(359),e(360),e(361),e(362),e(41),e(16),e(43)},function(t,n,e){"use strict";var r=e(21);e(129),e(26),e(0),e(16),Object(r.a)()},function(t,n,e){"use strict";var r,i,c,a,o,u,f,s,l,h=e(0),d=e(14),b=(e(16),{sphere:d.a,point:p,lineStart:_,lineEnd:m,polygonStart:function(){b.lineStart=x,b.lineEnd=w},polygonEnd:function(){b.lineStart=_,b.lineEnd=m}});function p(t,n){t*=h.r,n*=h.r;var e=Object(h.g)(n);v(e*Object(h.g)(t),e*Object(h.t)(t),Object(h.t)(n))}function v(t,n,e){i+=(t-i)/++r,c+=(n-c)/r,a+=(e-a)/r}function _(){b.point=y}function y(t,n){t*=h.r,n*=h.r;var e=Object(h.g)(n);f=e*Object(h.g)(t),s=e*Object(h.t)(t),l=Object(h.t)(n),b.point=g,v(f,s,l)}function g(t,n){t*=h.r,n*=h.r;var e=Object(h.g)(n),r=e*Object(h.g)(t),i=e*Object(h.t)(t),c=Object(h.t)(n),a=Object(h.e)(Object(h.u)((a=s*c-l*i)*a+(a=l*r-f*c)*a+(a=f*i-s*r)*a),f*r+s*i+l*c);a,a*(f+(f=r)),a*(s+(s=i)),a*(l+(l=c)),v(f,s,l)}function m(){b.point=p}function x(){b.point=O}function w(){j(o,u),b.point=p}function O(t,n){o=t,u=n,t*=h.r,n*=h.r,b.point=j;var e=Object(h.g)(n);f=e*Object(h.g)(t),s=e*Object(h.t)(t),l=Object(h.t)(n),v(f,s,l)}function j(t,n){t*=h.r,n*=h.r;var e=Object(h.g)(n),r=e*Object(h.g)(t),i=e*Object(h.t)(t),c=Object(h.t)(n),a=s*c-l*i,o=l*r-f*c,u=f*i-s*r,d=Object(h.u)(a*a+o*o+u*u),b=Object(h.c)(d),p=d&&-b/d;p*a,p*o,p*u,b,b*(f+(f=r)),b*(s+(s=i)),b*(l+(l=c)),v(f,s,l)}},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";e(42)},function(t,n,e){"use strict";n.a=function(t,n,e,r,i,c){var a,o=t[0],u=t[1],f=0,s=1,l=n[0]-o,h=n[1]-u;if(a=e-o,l||!(a>0)){if(a/=l,l<0){if(a<f)return;a<s&&(s=a)}else if(l>0){if(a>s)return;a>f&&(f=a)}if(a=i-o,l||!(a<0)){if(a/=l,l<0){if(a>s)return;a>f&&(f=a)}else if(l>0){if(a<f)return;a<s&&(s=a)}if(a=r-u,h||!(a>0)){if(a/=h,h<0){if(a<f)return;a<s&&(s=a)}else if(h>0){if(a>s)return;a>f&&(f=a)}if(a=c-u,h||!(a<0)){if(a/=h,h<0){if(a>s)return;a>f&&(f=a)}else if(h>0){if(a<f)return;a<s&&(s=a)}return f>0&&(t[0]=o+f*l,t[1]=u+f*h),s<1&&(n[0]=o+s*l,n[1]=u+s*h),!0}}}}}},function(t,n,e){"use strict";e(137),e(139),e(0)},function(t,n,e){"use strict";e(5),e(0)},function(t,n,e){"use strict";e(0)},function(t,n,e){"use strict";e(74),e(16),e(345),e(141),e(346),e(347),e(348),e(349)},function(t,n,e){"use strict";var r,i,c,a,o=e(21),u=e(0),f=e(14),s=Object(o.a)(),l=Object(o.a)(),h={point:f.a,lineStart:f.a,lineEnd:f.a,polygonStart:function(){h.lineStart=d,h.lineEnd=v},polygonEnd:function(){h.lineStart=h.lineEnd=h.point=f.a,s.add(Object(u.a)(l)),l.reset()},result:function(){var t=s/2;return s.reset(),t}};function d(){h.point=b}function b(t,n){h.point=p,r=c=t,i=a=n}function p(t,n){l.add(a*t-c*n),c=t,a=n}function v(){p(r,i)}n.a=h},function(t,n,e){"use strict";var r,i,c,a,o=e(0),u=0,f=0,s=0,l=0,h=0,d=0,b=0,p=0,v=0,_={point:y,lineStart:g,lineEnd:w,polygonStart:function(){_.lineStart=O,_.lineEnd=j},polygonEnd:function(){_.point=y,_.lineStart=g,_.lineEnd=w},result:function(){var t=v?[b/v,p/v]:d?[l/d,h/d]:s?[u/s,f/s]:[NaN,NaN];return u=f=s=l=h=d=b=p=v=0,t}};function y(t,n){u+=t,f+=n,++s}function g(){_.point=m}function m(t,n){_.point=x,y(c=t,a=n)}function x(t,n){var e=t-c,r=n-a,i=Object(o.u)(e*e+r*r);l+=i*(c+t)/2,h+=i*(a+n)/2,d+=i,y(c=t,a=n)}function w(){_.point=y}function O(){_.point=M}function j(){T(r,i)}function M(t,n){_.point=T,y(r=c=t,i=a=n)}function T(t,n){var e=t-c,r=n-a,i=Object(o.u)(e*e+r*r);l+=i*(c+t)/2,h+=i*(a+n)/2,d+=i,b+=(i=a*t-c*n)*(c+t),p+=i*(a+n),v+=3*i,y(c=t,a=n)}n.a=_},function(t,n,e){"use strict";n.a=c;var r=e(0),i=e(14);function c(t){this._context=t}c.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,r.w)}},result:i.a}},function(t,n,e){"use strict";var r,i,c,a,o,u=e(21),f=e(0),s=e(14),l=Object(u.a)(),h={point:s.a,lineStart:function(){h.point=d},lineEnd:function(){r&&b(i,c),h.point=s.a},polygonStart:function(){r=!0},polygonEnd:function(){r=null},result:function(){var t=+l;return l.reset(),t}};function d(t,n){h.point=b,i=a=t,c=o=n}function b(t,n){a-=t,o-=n,l.add(Object(f.u)(a*a+o*o)),a=t,o=n}n.a=h},function(t,n,e){"use strict";function r(){this._string=[]}function i(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}n.a=r,r.prototype={_radius:4.5,_circle:i(4.5),pointRadius:function(t){return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:null==this._circle&&(this._circle=i(this._radius)),this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}return null}}},function(t,n,e){"use strict";var r=e(26),i=e(0),c=e(43),a=16,o=Object(i.g)(30*i.r);n.a=function(t,n){return+n?function(t,n){function e(r,c,a,u,f,s,l,h,d,b,p,v,_,y){var g=l-r,m=h-c,x=g*g+m*m;if(x>4*n&&_--){var w=u+b,O=f+p,j=s+v,M=Object(i.u)(w*w+O*O+j*j),T=Object(i.c)(j/=M),S=Object(i.a)(Object(i.a)(j)-1)<i.i||Object(i.a)(a-d)<i.i?(a+d)/2:Object(i.e)(O,w),E=t(S,T),N=E[0],C=E[1],k=N-r,A=C-c,P=m*k-g*A;(P*P/x>n||Object(i.a)((g*k+m*A)/x-.5)>.3||u*b+f*p+s*v<o)&&(e(r,c,a,u,f,s,N,C,S,w/=M,O/=M,j,_,y),y.point(N,C),e(N,C,S,w,O,j,l,h,d,b,p,v,_,y))}}return function(n){var i,c,o,u,f,s,l,h,d,b,p,v,_={point:y,lineStart:g,lineEnd:x,polygonStart:function(){n.polygonStart(),_.lineStart=w},polygonEnd:function(){n.polygonEnd(),_.lineStart=g}};function y(e,r){e=t(e,r),n.point(e[0],e[1])}function g(){h=NaN,_.point=m,n.lineStart()}function m(i,c){var o=Object(r.a)([i,c]),u=t(i,c);e(h,d,l,b,p,v,h=u[0],d=u[1],l=i,b=o[0],p=o[1],v=o[2],a,n),n.point(h,d)}function x(){_.point=y,n.lineEnd()}function w(){g(),_.point=O,_.lineEnd=j}function O(t,n){m(i=t,n),c=h,o=d,u=b,f=p,s=v,_.point=m}function j(){e(h,d,l,b,p,v,c,o,i,u,f,s,a,n),_.lineEnd=x,x()}return _}}(t,n):function(t){return Object(c.a)({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}(t)}},function(t,n,e){"use strict";n.a=function(t){var n=Object(r.g)(t);function e(t,e){return[t*n,Object(r.t)(e)/n]}return e.invert=function(t,e){return[t/n,Object(r.c)(e*n)]},e};var r=e(0)},function(t,n,e){"use strict";e(0),e(142),e(75),e(77)},function(t,n,e){"use strict";var r=e(0),i=e(27),c=(e(10),Object(i.b)(function(t){return Object(r.u)(2/(1+t))}));c.invert=Object(i.a)(function(t){return 2*Object(r.c)(t/2)})},function(t,n,e){"use strict";var r=e(0),i=e(27),c=(e(10),Object(i.b)(function(t){return(t=Object(r.b)(t))&&t/Object(r.t)(t)}));c.invert=Object(i.a)(function(t){return t})},function(t,n,e){"use strict";e(0),e(76),e(78)},function(t,n,e){"use strict";e(0),e(76),e(143)},function(t,n,e){"use strict";var r=e(0),i=e(27);e(10);function c(t,n){var e=Object(r.g)(n),i=Object(r.g)(t)*e;return[e*Object(r.t)(t)/i,Object(r.t)(n)/i]}c.invert=Object(i.a)(r.d)},function(t,n,e){"use strict";e(42),e(74),e(43),e(77)},function(t,n,e){"use strict";e(10);var r=e(0);function i(t,n){var e=n*n,r=e*e;return[t*(.8707-.131979*e+r*(r*(.003971*e-.001529*r)-.013791)),n*(1.007226+e*(.015085+r*(.028874*e-.044475-.005916*r)))]}i.invert=function(t,n){var e,i=n,c=25;do{var a=i*i,o=a*a;i-=e=(i*(1.007226+a*(.015085+o*(.028874*a-.044475-.005916*o)))-n)/(1.007226+a*(.045255+o*(.259866*a-.311325-.005916*11*o)))}while(Object(r.a)(e)>r.i&&--c>0);return[t/(.8707+(a=i*i)*(a*(a*a*a*(.003971-.001529*a)-.013791)-.131979)),i]}},function(t,n,e){"use strict";var r=e(0),i=e(27);e(10);function c(t,n){return[Object(r.g)(n)*Object(r.t)(t),Object(r.t)(n)]}c.invert=Object(i.a)(r.c)},function(t,n,e){"use strict";var r=e(0),i=e(27);e(10);function c(t,n){var e=Object(r.g)(n),i=1+Object(r.g)(t)*e;return[e*Object(r.t)(t)/i,Object(r.t)(n)/i]}c.invert=Object(i.a)(function(t){return 2*Object(r.d)(t)})},function(t,n,e){"use strict";var r=e(0);e(78);function i(t,n){return[Object(r.n)(Object(r.v)((r.l+n)/2)),-t]}i.invert=function(t,n){return[-n,2*Object(r.d)(Object(r.k)(t))-r.l]}},function(t,n,e){"use strict";e(364),e(79),e(376),e(144),e(145),e(378),e(379),e(380),e(381),e(382),e(28),e(44),e(383),e(81),e(384)},function(t,n,e){"use strict"},function(t,n,e){"use strict";function r(t){var n=0,e=t.children,r=e&&e.length;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}n.a=function(){return this.eachAfter(r)}},function(t,n,e){"use strict";n.a=function(t){var n,e,r,i,c=this,a=[c];do{for(n=a.reverse(),a=[];c=n.pop();)if(t(c),e=c.children)for(r=0,i=e.length;r<i;++r)a.push(e[r])}while(a.length);return this}},function(t,n,e){"use strict";n.a=function(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this}},function(t,n,e){"use strict";n.a=function(t){for(var n,e,r,i=this,c=[i],a=[];i=c.pop();)if(a.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)c.push(n[e]);for(;i=a.pop();)t(i);return this}},function(t,n,e){"use strict";n.a=function(t){return this.eachAfter(function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e})}},function(t,n,e){"use strict";n.a=function(t){return this.eachBefore(function(n){n.children&&n.children.sort(t)})}},function(t,n,e){"use strict";n.a=function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;t=e.pop(),n=r.pop();for(;t===n;)i=t,t=e.pop(),n=r.pop();return i}(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r}},function(t,n,e){"use strict";n.a=function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n}},function(t,n,e){"use strict";n.a=function(){var t=[];return this.each(function(n){t.push(n)}),t}},function(t,n,e){"use strict";n.a=function(){var t=[];return this.eachBefore(function(n){n.children||t.push(n)}),t}},function(t,n,e){"use strict";n.a=function(){var t=this,n=[];return t.each(function(e){e!==t&&n.push({source:e.parent,target:e})}),n}},function(t,n,e){"use strict";e(144),e(80),e(146)},function(t,n,e){"use strict";e.d(n,"b",function(){return r}),n.a=function(t){var n,e,r=t.length;for(;r;)e=Math.random()*r--|0,n=t[r],t[r]=t[e],t[e]=n;return t};var r=Array.prototype.slice},function(t,n,e){"use strict";e(147),e(28)},function(t,n,e){"use strict";e(80),e(79)},function(t,n,e){"use strict";var r=e(79);function i(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}i.prototype=Object.create(r.a.prototype)},function(t,n,e){"use strict";e(147),e(81),e(80),e(146)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(28),e(44)},function(t,n,e){"use strict";var r=e(28),i=e(44),c=e(81);(function t(n){function e(t,e,a,o,u){if((f=t._squarify)&&f.ratio===n)for(var f,s,l,h,d,b=-1,p=f.length,v=t.value;++b<p;){for(l=(s=f[b]).children,h=s.value=0,d=l.length;h<d;++h)s.value+=l[h].value;s.dice?Object(r.a)(s,e,a,o,a+=(u-a)*s.value/v):Object(i.a)(s,e,a,e+=(o-e)*s.value/v,u),v-=s.value}else t._squarify=f=Object(c.c)(n,t,e,a,o,u),f.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e})(c.b)},function(t,n,e){"use strict";e(386),e(387),e(388),e(390),e(391)},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(389)},function(t,n,e){"use strict";n.a=function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])}},function(t,n,e){"use strict"},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(393)},function(t,n,e){"use strict";var r=e(394),i={};function c(t){this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function a(t){if(!t._start)try{!function(t){for(;t._start=t._waiting&&t._active<t._size;){var n=t._ended+t._active,e=t._tasks[n],r=e.length-1,c=e[r];e[r]=o(t,n),--t._waiting,++t._active,e=c.apply(null,e),t._tasks[n]&&(t._tasks[n]=e||i)}}(t)}catch(n){if(t._tasks[t._ended+t._active-1])u(t,n);else if(!t._data)throw n}}function o(t,n){return function(e,r){t._tasks[n]&&(--t._active,++t._ended,t._tasks[n]=null,null==t._error&&(null!=e?u(t,e):(t._data[n]=r,t._waiting?a(t):f(t))))}}function u(t,n){var e,r=t._tasks.length;for(t._error=n,t._data=void 0,t._waiting=NaN;--r>=0;)if((e=t._tasks[r])&&(t._tasks[r]=null,e.abort))try{e.abort()}catch(n){}t._active=NaN,f(t)}function f(t){if(!t._active&&t._call){var n=t._data;t._data=void 0,t._call(t._error,n)}}c.prototype=function(t){if(null==t)t=1/0;else if(!((t=+t)>=1))throw new Error("invalid concurrency");return new c(t)}.prototype={constructor:c,defer:function(t){if("function"!=typeof t)throw new Error("invalid callback");if(this._call)throw new Error("defer after await");if(null!=this._error)return this;var n=r.a.call(arguments,1);return n.push(t),++this._waiting,this._tasks.push(n),a(this),this},abort:function(){return null==this._error&&u(this,new Error("abort")),this},await:function(t){if("function"!=typeof t)throw new Error("invalid callback");if(this._call)throw new Error("multiple await");return this._call=function(n,e){t.apply(null,[n].concat(e))},f(this),this},awaitAll:function(t){if("function"!=typeof t)throw new Error("invalid callback");if(this._call)throw new Error("multiple await");return this._call=t,f(this),this}}},function(t,n,e){"use strict";e.d(n,"a",function(){return r});var r=[].slice},function(t,n,e){"use strict";e(396),e(148),e(397),e(398),e(149),e(399)},function(t,n,e){"use strict";(function t(n){function e(t,e){return t=null==t?0:+t,e=null==e?1:+e,1===arguments.length?(e=t,t=0):e-=t,function(){return n()*e+t}}return e.source=t,e})(e(22).a)},function(t,n,e){"use strict";var r=e(22),i=e(148);(function t(n){function e(){var t=i.a.source(n).apply(this,arguments);return function(){return Math.exp(t())}}return e.source=t,e})(r.a)},function(t,n,e){"use strict";var r=e(22),i=e(149);(function t(n){function e(t){var e=i.a.source(n)(t);return function(){return e()/t}}return e.source=t,e})(r.a)},function(t,n,e){"use strict";(function t(n){function e(t){return function(){return-Math.log(1-n())/t}}return e.source=t,e})(e(22).a)},function(t,n,e){"use strict";e(82),e(401),e(402),e(403),e(404),e(405),e(406)},function(t,n,e){"use strict";var r=e(45);Object(r.a)("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)})},function(t,n,e){"use strict";var r=e(45);Object(r.a)("application/json",function(t){return JSON.parse(t.responseText)})},function(t,n,e){"use strict";var r=e(45);Object(r.a)("text/plain",function(t){return t.responseText})},function(t,n,e){"use strict";var r=e(45);Object(r.a)("application/xml",function(t){var n=t.responseXML;if(!n)throw new Error("parse error");return n})},function(t,n,e){"use strict";var r=e(67),i=e(150);Object(i.a)("text/csv",r.a)},function(t,n,e){"use strict";var r=e(67),i=e(150);Object(i.a)("text/tab-separated-values",r.b)},function(t,n,e){"use strict";e(408),e(409);var r=e(29);e.d(n,"a",function(){return r.a});var i=e(411);e.d(n,"b",function(){return i.a});var c=e(151);e.d(n,"c",function(){return c.a});var a=e(412);e.d(n,"d",function(){return a.a});e(413),e(414),e(415),e(154),e(431),e(432),e(433),e(434),e(435),e(436),e(437),e(438),e(439)},function(t,n,e){"use strict";e(5),e(151)},function(t,n,e){"use strict";e(17),e(29),e(152)},function(t,n,e){"use strict";var r=e(5),i=e(72);n.a=function(t,n,e){var c,a=t[0],o=t[t.length-1],u=Object(r.h)(a,o,null==n?10:n);switch((e=Object(i.c)(null==e?",f":e)).type){case"s":var f=Math.max(Math.abs(a),Math.abs(o));return null!=e.precision||isNaN(c=Object(i.e)(u,f))||(e.precision=c),Object(i.b)(e,f);case"":case"e":case"g":case"p":case"r":null!=e.precision||isNaN(c=Object(i.f)(u,Math.max(Math.abs(a),Math.abs(o))))||(e.precision=c-("e"===e.type));break;case"f":case"%":null!=e.precision||isNaN(c=Object(i.d)(u))||(e.precision=c-2*("%"===e.type))}return Object(i.a)(e)}},function(t,n,e){"use strict";n.a=function t(){var n=Object(o.b)(u,f).domain([1,10]),e=n.domain,c=10,s=h(10),b=l(10);function p(){return s=h(c),b=l(c),e()[0]<0&&(s=d(s),b=d(b)),n}n.base=function(t){return arguments.length?(c=+t,p()):c};n.domain=function(t){return arguments.length?(e(t),p()):e()};n.ticks=function(t){var n,i=e(),a=i[0],o=i[i.length-1];(n=o<a)&&(h=a,a=o,o=h);var u,f,l,h=s(a),d=s(o),p=null==t?10:+t,v=[];if(!(c%1)&&d-h<p){if(h=Math.round(h)-1,d=Math.round(d)+1,a>0){for(;h<d;++h)for(f=1,u=b(h);f<c;++f)if(!((l=u*f)<a)){if(l>o)break;v.push(l)}}else for(;h<d;++h)for(f=c-1,u=b(h);f>=1;--f)if(!((l=u*f)<a)){if(l>o)break;v.push(l)}}else v=Object(r.i)(h,d,Math.min(d-h,p)).map(b);return n?v.reverse():v};n.tickFormat=function(t,e){if(null==e&&(e=10===c?".0e":","),"function"!=typeof e&&(e=Object(i.a)(e)),t===1/0)return e;null==t&&(t=10);var r=Math.max(1,c*t/n.ticks().length);return function(t){var n=t/b(Math.round(s(t)));return n*c<c-.5&&(n*=c),n<=r?e(t):""}};n.nice=function(){return e(Object(a.a)(e(),{floor:function(t){return b(Math.floor(s(t)))},ceil:function(t){return b(Math.ceil(s(t)))}}))};n.copy=function(){return Object(o.a)(n,t().base(c))};return n};var r=e(5),i=e(72),c=e(83),a=e(153),o=e(46);function u(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:Object(c.a)(n)}function f(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function s(t){return isFinite(t)?+("1e"+t):t<0?0:t}function l(t){return 10===t?s:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function h(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function d(t){return function(n){return-t(-n)}}},function(t,n,e){"use strict";n.a=function(){return function t(){var n=1,e=Object(c.b)(function(t,e){return(e=a(e,n)-(t=a(t,n)))?function(r){return(a(r,n)-t)/e}:Object(r.a)(e)},function(t,e){return e=a(e,n)-(t=a(t,n)),function(r){return a(t+e*r,1/n)}}),o=e.domain;e.exponent=function(t){return arguments.length?(n=+t,o(o())):n};e.copy=function(){return Object(c.a)(e,t().exponent(n))};return Object(i.b)(e)}().exponent(.5)};var r=e(83),i=e(29),c=e(46);function a(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}},function(t,n,e){"use strict";e(5),e(17)},function(t,n,e){"use strict";e(5),e(17),e(29)},function(t,n,e){"use strict";e(5),e(17)},function(t,n,e){"use strict";var r=e(4),i=Object(r.a)(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Object(r.a)(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):i:null},n.a=i;i.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setTime(Math.floor(t/i.d)*i.d)},function(t,n){t.setTime(+t+n*i.d)},function(t,n){return(n-t)/i.d},function(t){return t.getUTCSeconds()});n.a=c;c.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setTime(Math.floor(t/i.c)*i.c)},function(t,n){t.setTime(+t+n*i.c)},function(t,n){return(n-t)/i.c},function(t){return t.getMinutes()});n.a=c;c.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){var n=t.getTimezoneOffset()*i.c%i.b;n<0&&(n+=i.b),t.setTime(Math.floor((+t-n)/i.b)*i.b+n)},function(t,n){t.setTime(+t+n*i.b)},function(t,n){return(n-t)/i.b},function(t){return t.getHours()});n.a=c;c.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*i.c)/i.a},function(t){return t.getDate()-1});n.a=c;c.range},function(t,n,e){"use strict";e.d(n,"b",function(){return a}),e.d(n,"a",function(){return o}),e.d(n,"c",function(){return s});var r=e(4),i=e(11);function c(t){return Object(r.a)(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*i.c)/i.e})}var a=c(0),o=c(1),u=c(2),f=c(3),s=c(4),l=c(5),h=c(6);a.range,o.range,u.range,f.range,s.range,l.range,h.range},function(t,n,e){"use strict";var r=e(4),i=Object(r.a)(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()});n.a=i;i.range},function(t,n,e){"use strict";var r=e(4),i=Object(r.a)(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});i.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Object(r.a)(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null},n.a=i;i.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*i.c)},function(t,n){return(n-t)/i.c},function(t){return t.getUTCMinutes()});n.a=c;c.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+n*i.b)},function(t,n){return(n-t)/i.b},function(t){return t.getUTCHours()});n.a=c;c.range},function(t,n,e){"use strict";var r=e(4),i=e(11),c=Object(r.a)(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/i.a},function(t){return t.getUTCDate()-1});n.a=c;c.range},function(t,n,e){"use strict";e.d(n,"b",function(){return a}),e.d(n,"a",function(){return o}),e.d(n,"c",function(){return s});var r=e(4),i=e(11);function c(t){return Object(r.a)(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/i.e})}var a=c(0),o=c(1),u=c(2),f=c(3),s=c(4),l=c(5),h=c(6);a.range,o.range,u.range,f.range,s.range,l.range,h.range},function(t,n,e){"use strict";var r=e(4),i=Object(r.a)(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()});n.a=i;i.range},function(t,n,e){"use strict";var r=e(4),i=Object(r.a)(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});i.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Object(r.a)(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null},n.a=i;i.range},function(t,n,e){"use strict";var r=e(156),i=e(85);+new Date("2000-01-01T00:00:00.000Z")||Object(i.c)(r.a)},function(t,n,e){"use strict";e(154),e(84),e(47)},function(t,n,e){"use strict";var r=e(30);Object(r.a)("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf")},function(t,n,e){"use strict";var r=e(30);Object(r.a)("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6")},function(t,n,e){"use strict";var r=e(30);Object(r.a)("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9")},function(t,n,e){"use strict";var r=e(30);Object(r.a)("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5")},function(t,n,e){"use strict";var r=e(7),i=e(6);Object(i.b)(Object(r.b)(300,.5,0),Object(r.b)(-240,.5,1))},function(t,n,e){"use strict";var r=e(7),i=e(6);Object(i.b)(Object(r.b)(-100,.75,.35),Object(r.b)(80,1.5,.8)),Object(i.b)(Object(r.b)(260,.75,.35),Object(r.b)(80,1.5,.8)),Object(r.b)()},function(t,n,e){"use strict";var r=e(30);function i(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}i(Object(r.a)("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),i(Object(r.a)("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),i(Object(r.a)("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),i(Object(r.a)("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"))},function(t,n,e){"use strict";e(29)},function(t,n,e){"use strict";e(441),e(157),e(86),e(442),e(445),e(159),e(160),e(446),e(447),e(162),e(163),e(164),e(166),e(165),e(167),e(168),e(448),e(449),e(50),e(450),e(169),e(170),e(51),e(451),e(452),e(88),e(453),e(48),e(454),e(455),e(456),e(457),e(458),e(459),e(32),e(460),e(461),e(89),e(462),e(463),e(33),e(464)},function(t,n,e){"use strict";e(15),e(18),e(31)},function(t,n,e){"use strict";e(18),e(443),e(444),e(31)},function(t,n,e){"use strict";n.a=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}},function(t,n,e){"use strict";n.a=function(t){return t}},function(t,n,e){"use strict";e(158),e(157),e(159)},function(t,n,e){"use strict";e(15),e(161),e(18),e(87),e(160)},function(t,n,e){"use strict";e(15);var r=e(162),i=e(163),c=e(164),a=e(165),o=e(166),u=e(167),f=e(168);e(18),r.a,i.a,c.a,o.a,a.a,u.a,f.a},function(t,n,e){"use strict";var r=e(49),i=e(50);function c(t){this._context=t}c.prototype={areaStart:r.a,areaEnd:r.a,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:Object(i.b)(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}}},function(t,n,e){"use strict";var r=e(50);function i(t){this._context=t}i.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,i=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,i):this._context.moveTo(e,i);break;case 3:this._point=4;default:Object(r.b)(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}}},function(t,n,e){"use strict";var r=e(50);function i(t,n){this._basis=new r.a(t),this._beta=n}i.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],c=n[0],a=t[e]-i,o=n[e]-c,u=-1;++u<=e;)r=u/e,this._basis.point(this._beta*t[u]+(1-this._beta)*(i+r*a),this._beta*n[u]+(1-this._beta)*(c+r*o));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};(function t(n){function e(t){return 1===n?new r.a(t):new i(t,n)}return e.beta=function(n){return t(+n)},e})(.85)},function(t,n,e){"use strict";var r=e(169),i=e(49),c=e(88);function a(t,n){this._context=t,this._alpha=n}a.prototype={areaStart:i.a,areaEnd:i.a,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Object(c.a)(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return n?new a(t,n):new r.a(t,0)}return e.alpha=function(n){return t(+n)},e})(.5)},function(t,n,e){"use strict";var r=e(170),i=e(88);function c(t,n){this._context=t,this._alpha=n}c.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Object(i.a)(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};(function t(n){function e(t){return n?new c(t,n):new r.a(t,0)}return e.alpha=function(n){return t(+n)},e})(.5)},function(t,n,e){"use strict";var r=e(49);function i(t){this._context=t}i.prototype={areaStart:r.a,areaEnd:r.a,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}}},function(t,n,e){"use strict";function r(t){return t<0?-1:1}function i(t,n,e){var i=t._x1-t._x0,c=n-t._x1,a=(t._y1-t._y0)/(i||c<0&&-0),o=(e-t._y1)/(c||i<0&&-0),u=(a*c+o*i)/(i+c);return(r(a)+r(o))*Math.min(Math.abs(a),Math.abs(o),.5*Math.abs(u))||0}function c(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function a(t,n,e){var r=t._x0,i=t._y0,c=t._x1,a=t._y1,o=(c-r)/3;t._context.bezierCurveTo(r+o,i+o*n,c-o,a-o*e,c,a)}function o(t){this._context=t}function u(t){this._context=new f(t)}function f(t){this._context=t}o.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:a(this,this._t0,c(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(n=+n,(t=+t)!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,a(this,c(this,e=i(this,t,n)),e);break;default:a(this,this._t0,e=i(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(u.prototype=Object.create(o.prototype)).point=function(t,n){o.prototype.point.call(this,n,t)},f.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,c){this._context.bezierCurveTo(n,t,r,e,c,i)}}},function(t,n,e){"use strict";function r(t){this._context=t}function i(t){var n,e,r=t.length-1,i=new Array(r),c=new Array(r),a=new Array(r);for(i[0]=0,c[0]=2,a[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,c[n]=4,a[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,c[r-1]=7,a[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/c[n-1],c[n]-=e,a[n]-=e*a[n-1];for(i[r-1]=a[r-1]/c[r-1],n=r-2;n>=0;--n)i[n]=(a[n]-i[n+1])/c[n];for(c[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)c[n]=2*t[n+1]-i[n+1];return[i,c]}r.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=i(t),c=i(n),a=0,o=1;o<e;++a,++o)this._context.bezierCurveTo(r[0][a],c[0][a],r[1][a],c[1][a],t[o],n[o]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}}},function(t,n,e){"use strict";function r(t,n){this._context=t,this._t=n}r.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}}},function(t,n,e){"use strict";e(161),e(18),e(32),e(33)},function(t,n,e){"use strict";e(32)},function(t,n,e){"use strict"},function(t,n,e){"use strict";e(32)},function(t,n,e){"use strict";e(32)},function(t,n,e){"use strict";e(89)},function(t,n,e){"use strict";e(33),e(89)},function(t,n,e){"use strict";e(33)},function(t,n,e){"use strict";e(466)},function(t,n,e){"use strict";e(467),e(468),e(34)},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t){return t[0]},n.b=function(t){return t[1]}},function(t,n,e){"use strict";n.b=function(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],u=t.P,f=t.N,l=[t];s(t);var h=u;for(;h.circle&&Math.abs(e-h.circle.x)<o.f&&Math.abs(r-h.circle.cy)<o.f;)u=h.P,l.unshift(h),s(h),h=u;l.unshift(h),Object(c.b)(h);var d=f;for(;d.circle&&Math.abs(e-d.circle.x)<o.f&&Math.abs(r-d.circle.cy)<o.f;)f=d.N,l.push(d),s(d),d=f;l.push(d),Object(c.b)(d);var b,p=l.length;for(b=1;b<p;++b)d=l[b],h=l[b-1],Object(a.d)(d.edge,h.site,d.site,i);h=l[0],(d=l[p-1]).edge=Object(a.c)(h.site,d.site,null,i),Object(c.a)(h),Object(c.a)(d)},n.a=function(t){var n,e,r,u,s=t[0],d=t[1],b=o.a._;for(;b;)if((r=l(b,d)-s)>o.f)b=b.L;else{if(!((u=s-h(b,d))>o.f)){r>-o.f?(n=b.P,e=b):u>-o.f?(n=b,e=b.N):n=e=b;break}if(!b.R){n=b;break}b=b.R}Object(i.c)(t);var p=f(t);if(o.a.insert(n,p),!n&&!e)return;if(n===e)return Object(c.b)(n),e=f(n.site),o.a.insert(p,e),p.edge=e.edge=Object(a.c)(n.site,p.site),Object(c.a)(n),void Object(c.a)(e);if(!e)return void(p.edge=Object(a.c)(n.site,p.site));Object(c.b)(n),Object(c.b)(e);var v=n.site,_=v[0],y=v[1],g=t[0]-_,m=t[1]-y,x=e.site,w=x[0]-_,O=x[1]-y,j=2*(g*O-m*w),M=g*g+m*m,T=w*w+O*O,S=[(O*M-m*T)/j+_,(g*T-w*M)/j+y];Object(a.d)(e.edge,v,x,S),p.edge=Object(a.c)(v,t,null,S),e.edge=Object(a.c)(t,x,null,S),Object(c.a)(n),Object(c.a)(e)};var r=e(90),i=e(171),c=e(172),a=e(91),o=e(34),u=[];function f(t){var n=u.pop()||new function(){Object(r.a)(this),this.edge=this.site=this.circle=null};return n.site=t,n}function s(t){Object(c.b)(t),o.a.remove(t),u.push(t),Object(r.a)(t)}function l(t,n){var e=t.site,r=e[0],i=e[1],c=i-n;if(!c)return r;var a=t.P;if(!a)return-1/0;var o=(e=a.site)[0],u=e[1],f=u-n;if(!f)return o;var s=o-r,l=1/c-1/f,h=s/f;return l?(-h+Math.sqrt(h*h-2*l*(s*s/(-2*f)-u+f/2+i-c/2)))/l+r:(r+o)/2}function h(t,n){var e=t.N;if(e)return l(e,n);var r=t.site;return r[1]===n?r[0]:1/0}},function(t,n,e){"use strict";e(471),e(173)},function(t,n,e){"use strict";e(12),e(53),e(6),e(3),e(64),e(472),e(473),e(173),e(474)},function(t,n,e){"use strict";n.a=function(t){return function(){return t}}},function(t,n,e){"use strict";n.a=function(t,n,e){this.target=t,this.type=n,this.transform=e}},function(t,n,e){"use strict";n.b=function(){r.b.stopImmediatePropagation()};var r=e(3);n.a=function(){r.b.preventDefault(),r.b.stopImmediatePropagation()}},function(t,n,e){var r=e(12).dispatch,i=Math.PI/180,c=64,a=2048;function o(t){return t.text}function u(){return"serif"}function f(){return"normal"}function s(t){return Math.sqrt(t.value)}function l(){return 30*(~~(6*Math.random())-3)}function h(){return 1}function d(t,n,e,r){if(!n.sprite){var o=t.context,u=t.ratio;o.clearRect(0,0,(c<<5)/u,a/u);var f=0,s=0,l=0,h=e.length;for(--r;++r<h;){n=e[r],o.save(),o.font=n.style+" "+n.weight+" "+~~((n.size+1)/u)+"px "+n.font;var d=o.measureText(n.text+"m").width*u,b=n.size<<1;if(n.rotate){var p=Math.sin(n.rotate*i),v=Math.cos(n.rotate*i),_=d*v,y=d*p,g=b*v,m=b*p;d=Math.max(Math.abs(_+m),Math.abs(_-m))+31>>5<<5,b=~~Math.max(Math.abs(y+g),Math.abs(y-g))}else d=d+31>>5<<5;if(b>l&&(l=b),f+d>=c<<5&&(f=0,s+=l,l=0),s+b>=a)break;o.translate((f+(d>>1))/u,(s+(b>>1))/u),n.rotate&&o.rotate(n.rotate*i),o.fillText(n.text,0,0),n.padding&&(o.lineWidth=2*n.padding,o.strokeText(n.text,0,0)),o.restore(),n.width=d,n.height=b,n.xoff=f,n.yoff=s,n.x1=d>>1,n.y1=b>>1,n.x0=-n.x1,n.y0=-n.y1,n.hasText=!0,f+=d}for(var x=o.getImageData(0,0,(c<<5)/u,a/u).data,w=[];--r>=0;)if((n=e[r]).hasText){for(var O=(d=n.width)>>5,j=(b=n.y1-n.y0,0);j<b*O;j++)w[j]=0;if(null==(f=n.xoff))return;s=n.yoff;for(var M=0,T=-1,S=0;S<b;S++){for(j=0;j<d;j++){var E=O*S+(j>>5),N=x[(s+S)*(c<<5)+(f+j)<<2]?1<<31-j%32:0;w[E]|=N,M|=N}M?T=S:(n.y0++,b--,S--,s++)}n.y1=n.y0+T,n.sprite=w.slice(0,(n.y1-n.y0)*O)}}}function b(t,n,e){e>>=5;for(var r,i=t.sprite,c=t.width>>5,a=t.x-(c<<4),o=127&a,u=32-o,f=t.y1-t.y0,s=(t.y+t.y0)*e+(a>>5),l=0;l<f;l++){r=0;for(var h=0;h<=c;h++)if((r<<u|(h<c?(r=i[l*c+h])>>>o:0))&n[s+h])return!0;s+=e}return!1}function p(t,n){var e=t[0],r=t[1];n.x+n.x0<e.x&&(e.x=n.x+n.x0),n.y+n.y0<e.y&&(e.y=n.y+n.y0),n.x+n.x1>r.x&&(r.x=n.x+n.x1),n.y+n.y1>r.y&&(r.y=n.y+n.y1)}function v(t){var n=t[0]/t[1];return function(t){return[n*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function _(){return document.createElement("canvas")}function y(t){return"function"==typeof t?t:function(){return t}}t.exports=function(){var t=[256,256],n=o,e=u,i=s,m=f,x=f,w=l,O=h,j=v,M=[],T=1/0,S=r("word","end"),E=null,N=Math.random,C={},k=_;function A(n,e,r){t[0],t[1];for(var i,c,a,o,u,f=e.x,s=e.y,l=Math.sqrt(t[0]*t[0]+t[1]*t[1]),h=j(t),d=N()<.5?1:-1,p=-d;(i=h(p+=d))&&(c=~~i[0],a=~~i[1],!(Math.min(Math.abs(c),Math.abs(a))>=l));)if(e.x=f+c,e.y=s+a,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>t[0]||e.y+e.y1>t[1]||r&&b(e,n,t[0])||r&&(u=r,!((o=e).x+o.x1>u[0].x&&o.x+o.x0<u[1].x&&o.y+o.y1>u[0].y&&o.y+o.y0<u[1].y)))){for(var v,_=e.sprite,y=e.width>>5,g=t[0]>>5,m=e.x-(y<<4),x=127&m,w=32-x,O=e.y1-e.y0,M=(e.y+e.y0)*g+(m>>5),T=0;T<O;T++){v=0;for(var S=0;S<=y;S++)n[M+S]|=v<<w|(S<y?(v=_[T*y+S])>>>x:0);M+=g}return delete e.sprite,!0}return!1}return C.canvas=function(t){return arguments.length?(k=y(t),C):k},C.start=function(){var r=function(t){t.width=t.height=1;var n=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2);t.width=(c<<5)/n,t.height=a/n;var e=t.getContext("2d");return e.fillStyle=e.strokeStyle="red",e.textAlign="center",{context:e,ratio:n}}(k()),o=function(t){var n=[],e=-1;for(;++e<t;)n[e]=0;return n}((t[0]>>5)*t[1]),u=null,f=M.length,s=-1,l=[],h=M.map(function(t,r){return t.text=n.call(this,t,r),t.font=e.call(this,t,r),t.style=m.call(this,t,r),t.weight=x.call(this,t,r),t.rotate=w.call(this,t,r),t.size=~~i.call(this,t,r),t.padding=O.call(this,t,r),t}).sort(function(t,n){return n.size-t.size});return E&&clearInterval(E),E=setInterval(b,0),b(),C;function b(){for(var n=Date.now();Date.now()-n<T&&++s<f&&E;){var e=h[s];e.x=t[0]*(N()+.5)>>1,e.y=t[1]*(N()+.5)>>1,d(r,e,h,s),e.hasText&&A(o,e,u)&&(l.push(e),S.call("word",C,e),u?p(u,e):u=[{x:e.x+e.x0,y:e.y+e.y0},{x:e.x+e.x1,y:e.y+e.y1}],e.x-=t[0]>>1,e.y-=t[1]>>1)}s>=f&&(C.stop(),S.call("end",C,l,u))}},C.stop=function(){return E&&(clearInterval(E),E=null),C},C.timeInterval=function(t){return arguments.length?(T=null==t?1/0:t,C):T},C.words=function(t){return arguments.length?(M=t,C):M},C.size=function(n){return arguments.length?(t=[+n[0],+n[1]],C):t},C.font=function(t){return arguments.length?(e=y(t),C):e},C.fontStyle=function(t){return arguments.length?(m=y(t),C):m},C.fontWeight=function(t){return arguments.length?(x=y(t),C):x},C.rotate=function(t){return arguments.length?(w=y(t),C):w},C.text=function(t){return arguments.length?(n=y(t),C):n},C.spiral=function(t){return arguments.length?(j=g[t]||t,C):j},C.fontSize=function(t){return arguments.length?(i=y(t),C):i},C.padding=function(t){return arguments.length?(O=y(t),C):O},C.random=function(t){return arguments.length?(N=t,C):N},C.on=function(){var t=S.on.apply(S,arguments);return t===S?C:t},C};var g={archimedean:v,rectangular:function(t){var n=4*t[0]/t[1],e=0,r=0;return function(t){var i=t<0?-1:1;switch(Math.sqrt(1+4*i*t)-i&3){case 0:e+=n;break;case 1:r+=4;break;case 2:e-=n;break;default:r-=4}return[e,r]}}}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(477);e.d(n,"schemeCategory10",function(){return r.a});var i=e(478);e.d(n,"schemeAccent",function(){return i.a});var c=e(479);e.d(n,"schemeDark2",function(){return c.a});var a=e(480);e.d(n,"schemePaired",function(){return a.a});var o=e(481);e.d(n,"schemePastel1",function(){return o.a});var u=e(482);e.d(n,"schemePastel2",function(){return u.a});var f=e(483);e.d(n,"schemeSet1",function(){return f.a});var s=e(484);e.d(n,"schemeSet2",function(){return s.a});var l=e(485);e.d(n,"schemeSet3",function(){return l.a});var h=e(486);e.d(n,"interpolateBrBG",function(){return h.a}),e.d(n,"schemeBrBG",function(){return h.b});var d=e(487);e.d(n,"interpolatePRGn",function(){return d.a}),e.d(n,"schemePRGn",function(){return d.b});var b=e(488);e.d(n,"interpolatePiYG",function(){return b.a}),e.d(n,"schemePiYG",function(){return b.b});var p=e(489);e.d(n,"interpolatePuOr",function(){return p.a}),e.d(n,"schemePuOr",function(){return p.b});var v=e(490);e.d(n,"interpolateRdBu",function(){return v.a}),e.d(n,"schemeRdBu",function(){return v.b});var _=e(491);e.d(n,"interpolateRdGy",function(){return _.a}),e.d(n,"schemeRdGy",function(){return _.b});var y=e(492);e.d(n,"interpolateRdYlBu",function(){return y.a}),e.d(n,"schemeRdYlBu",function(){return y.b});var g=e(493);e.d(n,"interpolateRdYlGn",function(){return g.a}),e.d(n,"schemeRdYlGn",function(){return g.b});var m=e(494);e.d(n,"interpolateSpectral",function(){return m.a}),e.d(n,"schemeSpectral",function(){return m.b});var x=e(495);e.d(n,"interpolateBuGn",function(){return x.a}),e.d(n,"schemeBuGn",function(){return x.b});var w=e(496);e.d(n,"interpolateBuPu",function(){return w.a}),e.d(n,"schemeBuPu",function(){return w.b});var O=e(497);e.d(n,"interpolateGnBu",function(){return O.a}),e.d(n,"schemeGnBu",function(){return O.b});var j=e(498);e.d(n,"interpolateOrRd",function(){return j.a}),e.d(n,"schemeOrRd",function(){return j.b});var M=e(499);e.d(n,"interpolatePuBuGn",function(){return M.a}),e.d(n,"schemePuBuGn",function(){return M.b});var T=e(500);e.d(n,"interpolatePuBu",function(){return T.a}),e.d(n,"schemePuBu",function(){return T.b});var S=e(501);e.d(n,"interpolatePuRd",function(){return S.a}),e.d(n,"schemePuRd",function(){return S.b});var E=e(502);e.d(n,"interpolateRdPu",function(){return E.a}),e.d(n,"schemeRdPu",function(){return E.b});var N=e(503);e.d(n,"interpolateYlGnBu",function(){return N.a}),e.d(n,"schemeYlGnBu",function(){return N.b});var C=e(504);e.d(n,"interpolateYlGn",function(){return C.a}),e.d(n,"schemeYlGn",function(){return C.b});var k=e(505);e.d(n,"interpolateYlOrBr",function(){return k.a}),e.d(n,"schemeYlOrBr",function(){return k.b});var A=e(506);e.d(n,"interpolateYlOrRd",function(){return A.a}),e.d(n,"schemeYlOrRd",function(){return A.b});var P=e(507);e.d(n,"interpolateBlues",function(){return P.a}),e.d(n,"schemeBlues",function(){return P.b});var R=e(508);e.d(n,"interpolateGreens",function(){return R.a}),e.d(n,"schemeGreens",function(){return R.b});var z=e(509);e.d(n,"interpolateGreys",function(){return z.a}),e.d(n,"schemeGreys",function(){return z.b});var U=e(510);e.d(n,"interpolatePurples",function(){return U.a}),e.d(n,"schemePurples",function(){return U.b});var I=e(511);e.d(n,"interpolateReds",function(){return I.a}),e.d(n,"schemeReds",function(){return I.b});var L=e(512);e.d(n,"interpolateOranges",function(){return L.a}),e.d(n,"schemeOranges",function(){return L.b});var D=e(513);e.d(n,"interpolateCubehelixDefault",function(){return D.a});var q=e(514);e.d(n,"interpolateRainbow",function(){return q.b}),e.d(n,"interpolateWarm",function(){return q.c}),e.d(n,"interpolateCool",function(){return q.a});var F=e(515);e.d(n,"interpolateSinebow",function(){return F.a});var Y=e(516);e.d(n,"interpolateViridis",function(){return Y.a}),e.d(n,"interpolateMagma",function(){return Y.c}),e.d(n,"interpolateInferno",function(){return Y.b}),e.d(n,"interpolatePlasma",function(){return Y.d})},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3")},function(t,n,e){"use strict";var r=e(1);n.a=Object(r.a)("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f")},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";e.d(n,"b",function(){return c});var r=e(1),i=e(2),c=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(r.a);n.a=Object(i.a)(c)},function(t,n,e){"use strict";var r=e(7),i=e(6);n.a=Object(i.b)(Object(r.b)(300,.5,0),Object(r.b)(-240,.5,1))},function(t,n,e){"use strict";e.d(n,"c",function(){return c}),e.d(n,"a",function(){return a});var r=e(7),i=e(6),c=Object(i.b)(Object(r.b)(-100,.75,.35),Object(r.b)(80,1.5,.8)),a=Object(i.b)(Object(r.b)(260,.75,.35),Object(r.b)(80,1.5,.8)),o=Object(r.b)();n.b=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return o.h=360*t-100,o.s=1.5-1.5*n,o.l=.8-.9*n,o+""}},function(t,n,e){"use strict";var r=e(7),i=Object(r.f)(),c=Math.PI/3,a=2*Math.PI/3;n.a=function(t){var n;return t=(.5-t)*Math.PI,i.r=255*(n=Math.sin(t))*n,i.g=255*(n=Math.sin(t+c))*n,i.b=255*(n=Math.sin(t+a))*n,i+""}},function(t,n,e){"use strict";e.d(n,"c",function(){return c}),e.d(n,"b",function(){return a}),e.d(n,"d",function(){return o});var r=e(1);function i(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}n.a=i(Object(r.a)("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));var c=i(Object(r.a)("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),a=i(Object(r.a)("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),o=i(Object(r.a)("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"))},function(t,n,e){var r;r=function(t,n){return function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};return n.m=t,n.c=e,n.p="/",n(0)}([function(t,n,e){var r,i,c;i=[t,n,e(10),e(38),e(39),e(9),e(37)],r=function(t,n,e,r,i){"use strict";function c(t){return t&&t.__esModule?t:{default:t}}function a(t,n){var e=n.value,r=n.arg,i=n.options,c=function(){return e(t)};switch(r){case"debounce":c=l(function(){return e(t)},i.delay);break;case"throttle":c=l(function(){return e(t)},i.delay,{leading:!0,trailing:!0,maxWait:i.delay})}var a=new u.default(t,c);return i.initial&&e(t),a}Object.defineProperty(n,"__esModule",{value:!0});var o=c(e),u=c(r),f=c(i),s=f.default.debounce,l=void 0===s?f.default:s,h=150;n.default={inserted:function(t,n){var e=n.value,r=n.arg,i=n.modifiers;if(e&&"function"==typeof e){var c=function(t){if(!t)return{delay:h,initial:!1};var n=t.initial,e=void 0!==n&&n,r=(0,o.default)(t).map(function(t){return parseInt(t)}).find(function(t){return!isNaN(t)});return{delay:r=r||h,initial:e}}(i);return t.offsetParent?void a(t,{value:e,arg:r,options:c}):(c.initial=!0,void(t.__visibility__listener__=function(t,n){var e={root:document.documentElement},r=new IntersectionObserver(function(t,e){t.forEach(function(t){t.isIntersecting&&(n(),e.disconnect())})},e);return r.observe(t),r}(t,function(){return a(t,{value:e,arg:r,options:c})})))}console.warn("v-resize should received a function as value")},unbind:function(t){t.__visibility__listener__&&t.__visibility__listener__.disconnect(),t.resizeSensor&&u.default.detach(t)}},t.exports=n.default},void 0===(c="function"==typeof r?r.apply(n,i):r)||(t.exports=c)},function(t,n){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},function(t,n,e){t.exports=!e(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n,e){var r=e(23),i=e(6);t.exports=function(t){return r(i(t))}},function(t,n,e){var r,i,c;i=[],void 0===(c="function"==typeof(r=function(){"use strict";Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),e=n.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var r=arguments[1],i=0;i<e;){var c=n[i];if(t.call(r,c,i,n))return c;i++}},configurable:!0,writable:!0})})?r.apply(n,i):r)||(t.exports=c)},function(t,n,e){t.exports={default:e(11),__esModule:!0}},function(t,n,e){e(36),t.exports=e(1).Object.keys},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var r=e(5);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var r=e(8),i=e(32),c=e(31);t.exports=function(t){return function(n,e,a){var o,u=r(n),f=i(u.length),s=c(a,f);if(t&&e!=e){for(;f>s;)if((o=u[s++])!=o)return!0}else for(;f>s;s++)if((t||s in u)&&u[s]===e)return t||s||0;return!t&&-1}}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(12);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(5),i=e(4).document,c=r(i)&&r(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(4),i=e(1),c=e(16),a=e(21),o="prototype",u=function(t,n,e){var f,s,l,h=t&u.F,d=t&u.G,b=t&u.S,p=t&u.P,v=t&u.B,_=t&u.W,y=d?i:i[n]||(i[n]={}),g=y[o],m=d?r:b?r[n]:(r[n]||{})[o];for(f in d&&(e=n),e)(s=!h&&m&&void 0!==m[f])&&f in y||(l=s?m[f]:e[f],y[f]=d&&"function"!=typeof m[f]?e[f]:v&&s?c(l,r):_&&m[f]==l?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[o]=t[o],n}(l):p&&"function"==typeof l?c(Function.call,l):l,p&&((y.virtual||(y.virtual={}))[f]=l,t&u.R&&g&&!g[f]&&a(g,f,l)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(24),i=e(28);t.exports=e(2)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports=!e(2)&&!e(3)(function(){return 7!=Object.defineProperty(e(17)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(15);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(13),i=e(22),c=e(34),a=Object.defineProperty;n.f=e(2)?Object.defineProperty:function(t,n,e){if(r(t),n=c(n,!0),r(e),i)try{return a(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(20),i=e(8),c=e(14)(!1),a=e(29)("IE_PROTO");t.exports=function(t,n){var e,o=i(t),u=0,f=[];for(e in o)e!=a&&r(o,e)&&f.push(e);for(;n.length>u;)r(o,e=n[u++])&&(~c(f,e)||f.push(e));return f}},function(t,n,e){var r=e(25),i=e(18);t.exports=Object.keys||function(t){return r(t,i)}},function(t,n,e){var r=e(19),i=e(1),c=e(3);t.exports=function(t,n){var e=(i.Object||{})[t]||Object[t],a={};a[t]=n(e),r(r.S+r.F*c(function(){e(1)}),"Object",a)}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var r=e(30)("keys"),i=e(35);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,n,e){var r=e(4),i="__core-js_shared__",c=r[i]||(r[i]={});t.exports=function(t){return c[t]||(c[t]={})}},function(t,n,e){var r=e(7),i=Math.max,c=Math.min;t.exports=function(t,n){return(t=r(t))<0?i(t+n,0):c(t,n)}},function(t,n,e){var r=e(7),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,n,e){var r=e(6);t.exports=function(t){return Object(r(t))}},function(t,n,e){var r=e(5);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(33),i=e(26);e(27)("keys",function(){return function(t){return i(r(t))}})},function(t,n){!function(t,n){"use strict";function e(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var n=this.boundingClientRect,e=n.width*n.height,r=this.intersectionRect,i=r.width*r.height;this.intersectionRatio=e?i/e:this.isIntersecting?1:0}function r(t,n){var e=n||{};if("function"!=typeof t)throw new Error("callback must be a function");if(e.root&&1!=e.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=function(t,n){var e=null;return function(){e||(e=setTimeout(function(){t(),e=null},n))}}(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(e.rootMargin),this.thresholds=this._initThresholds(e.threshold),this.root=e.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function i(){return t.performance&&performance.now&&performance.now()}function c(t,n,e,r){"function"==typeof t.addEventListener?t.addEventListener(n,e,r||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+n,e)}function a(t,n,e,r){"function"==typeof t.removeEventListener?t.removeEventListener(n,e,r||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+n,e)}function o(t,n){var e=Math.max(t.top,n.top),r=Math.min(t.bottom,n.bottom),i=Math.max(t.left,n.left),c=Math.min(t.right,n.right),a=c-i,o=r-e;return a>=0&&o>=0&&{top:e,bottom:r,left:i,right:c,width:a,height:o}}function u(t){var n;try{n=t.getBoundingClientRect()}catch(t){}return n?(n.width&&n.height||(n={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.right-n.left,height:n.bottom-n.top}),n):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function f(t,n){for(var e=n;e;){if(e==t)return!0;e=s(e)}return!1}function s(t){var n=t.parentNode;return n&&11==n.nodeType&&n.host?n.host:n}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var l=[];r.prototype.THROTTLE_TIMEOUT=100,r.prototype.POLL_INTERVAL=null,r.prototype.USE_MUTATION_OBSERVER=!0,r.prototype.observe=function(t){if(!this._observationTargets.some(function(n){return n.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},r.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(n){return n.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},r.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},r.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},r.prototype._initThresholds=function(t){var n=t||[0];return Array.isArray(n)||(n=[n]),n.sort().filter(function(t,n,e){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==e[n-1]})},r.prototype._parseRootMargin=function(t){var n=(t||"0px").split(/\s+/).map(function(t){var n=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!n)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(n[1]),unit:n[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},r.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(c(t,"resize",this._checkForIntersections,!0),c(n,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(n,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},r.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,a(t,"resize",this._checkForIntersections,!0),a(n,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},r.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),n=t?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(r){var c=r.element,a=u(c),o=this._rootContainsTarget(c),f=r.entry,s=t&&o&&this._computeTargetAndRootIntersection(c,n),l=r.entry=new e({time:i(),target:c,boundingClientRect:a,rootBounds:n,intersectionRect:s});f?t&&o?this._hasCrossedThreshold(f,l)&&this._queuedEntries.push(l):f&&f.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},r.prototype._computeTargetAndRootIntersection=function(e,r){if("none"!=t.getComputedStyle(e).display){for(var i=u(e),c=s(e),a=!1;!a;){var f=null,l=1==c.nodeType?t.getComputedStyle(c):{};if("none"==l.display)return;if(c==this.root||c==n?(a=!0,f=r):c!=n.body&&c!=n.documentElement&&"visible"!=l.overflow&&(f=u(c)),f&&!(i=o(f,i)))break;c=s(c)}return i}},r.prototype._getRootRect=function(){var t;if(this.root)t=u(this.root);else{var e=n.documentElement,r=n.body;t={top:0,left:0,right:e.clientWidth||r.clientWidth,width:e.clientWidth||r.clientWidth,bottom:e.clientHeight||r.clientHeight,height:e.clientHeight||r.clientHeight}}return this._expandRectByRootMargin(t)},r.prototype._expandRectByRootMargin=function(t){var n=this._rootMarginValues.map(function(n,e){return"px"==n.unit?n.value:n.value*(e%2?t.width:t.height)/100}),e={top:t.top-n[0],right:t.right+n[1],bottom:t.bottom+n[2],left:t.left-n[3]};return e.width=e.right-e.left,e.height=e.bottom-e.top,e},r.prototype._hasCrossedThreshold=function(t,n){var e=t&&t.isIntersecting?t.intersectionRatio||0:-1,r=n.isIntersecting?n.intersectionRatio||0:-1;if(e!==r)for(var i=0;i<this.thresholds.length;i++){var c=this.thresholds[i];if(c==e||c==r||c<e!=c<r)return!0}},r.prototype._rootIsInDom=function(){return!this.root||f(n,this.root)},r.prototype._rootContainsTarget=function(t){return f(this.root||n,t)},r.prototype._registerInstance=function(){l.indexOf(this)<0&&l.push(this)},r.prototype._unregisterInstance=function(){var t=l.indexOf(this);-1!=t&&l.splice(t,1)},t.IntersectionObserver=r,t.IntersectionObserverEntry=e}}(window,document)},function(n,e){n.exports=t},function(t,e){t.exports=n}])},t.exports=r(e(518),e(519))},function(t,n,e){"use strict";var r,i;"undefined"!=typeof window&&window,void 0===(i="function"==typeof(r=function(){if("undefined"==typeof window)return null;var t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return window.setTimeout(t,20)};function n(t,n){var e=Object.prototype.toString.call(t),r="[object Array]"===e||"[object NodeList]"===e||"[object HTMLCollection]"===e||"[object Object]"===e||"undefined"!=typeof jQuery&&t instanceof jQuery||"undefined"!=typeof Elements&&t instanceof Elements,i=0,c=t.length;if(r)for(;i<c;i++)n(t[i]);else n(t)}function e(t){if(!t.getBoundingClientRect)return{width:t.offsetWidth,height:t.offsetHeight};var n=t.getBoundingClientRect();return{width:Math.round(n.width),height:Math.round(n.height)}}var r=function(i,c){function a(n,r){if(n)if(n.resizedAttached)n.resizedAttached.add(r);else{n.resizedAttached=new function(){var t,n,e=[];this.add=function(t){e.push(t)},this.call=function(r){for(t=0,n=e.length;t<n;t++)e[t].call(this,r)},this.remove=function(r){var i=[];for(t=0,n=e.length;t<n;t++)e[t]!==r&&i.push(e[t]);e=i},this.length=function(){return e.length}},n.resizedAttached.add(r),n.resizeSensor=document.createElement("div"),n.resizeSensor.dir="ltr",n.resizeSensor.className="resize-sensor";var i="position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; max-width: 100%",c="position: absolute; left: 0; top: 0; transition: 0s;";n.resizeSensor.style.cssText=i,n.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+i+'"><div style="'+c+'"></div></div><div class="resize-sensor-shrink" style="'+i+'"><div style="'+c+' width: 200%; height: 200%"></div></div>',n.appendChild(n.resizeSensor);var a=window.getComputedStyle(n),o=a?a.getPropertyValue("position"):null;"absolute"!==o&&"relative"!==o&&"fixed"!==o&&(n.style.position="relative");var u,f,s=n.resizeSensor.childNodes[0],l=s.childNodes[0],h=n.resizeSensor.childNodes[1],d=e(n),b=d.width,p=d.height,v=!0,_=0,y=function(){if(v){if(0===n.offsetWidth&&0===n.offsetHeight)return void(_||(_=t(function(){_=0,y()})));v=!1}l.style.width="100000px",l.style.height="100000px",s.scrollLeft=1e5,s.scrollTop=1e5,h.scrollLeft=1e5,h.scrollTop=1e5};n.resizeSensor.resetSensor=y;var g=function(){f=0,u&&(b=d.width,p=d.height,n.resizedAttached&&n.resizedAttached.call(d))},m=function(){d=e(n),(u=d.width!==b||d.height!==p)&&!f&&(f=t(g)),y()},x=function(t,n,e){t.attachEvent?t.attachEvent("on"+n,e):t.addEventListener(n,e)};x(s,"scroll",m),x(h,"scroll",m),t(y)}}n(i,function(t){a(t,c)}),this.detach=function(t){r.detach(i,t)},this.reset=function(){i.resizeSensor.resetSensor()}};return r.reset=function(t,e){n(t,function(t){t.resizeSensor.resetSensor()})},r.detach=function(t,e){n(t,function(t){t&&(t.resizedAttached&&"function"==typeof e&&(t.resizedAttached.remove(e),t.resizedAttached.length())||t.resizeSensor&&(t.contains(t.resizeSensor)&&t.removeChild(t.resizeSensor),delete t.resizeSensor,delete t.resizedAttached))})},r})?r.call(n,e,n,t):r)||(t.exports=i)},function(t,n,e){(function(n){var e="Expected a function",r=NaN,i="[object Symbol]",c=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,s="object"==typeof n&&n&&n.Object===Object&&n,l="object"==typeof self&&self&&self.Object===Object&&self,h=s||l||Function("return this")(),d=Object.prototype.toString,b=Math.max,p=Math.min,v=function(){return h.Date.now()};function _(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&d.call(t)==i}(t))return r;if(_(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=_(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(c,"");var e=o.test(t);return e||u.test(t)?f(t.slice(2),e?2:8):a.test(t)?r:+t}t.exports=function(t,n,r){var i,c,a,o,u,f,s=0,l=!1,h=!1,d=!0;if("function"!=typeof t)throw new TypeError(e);function g(n){var e=i,r=c;return i=c=void 0,s=n,o=t.apply(r,e)}function m(t){var e=t-f;return void 0===f||e>=n||e<0||h&&t-s>=a}function x(){var t=v();if(m(t))return w(t);u=setTimeout(x,function(t){var e=n-(t-f);return h?p(e,a-(t-s)):e}(t))}function w(t){return u=void 0,d&&i?g(t):(i=c=void 0,o)}function O(){var t=v(),e=m(t);if(i=arguments,c=this,f=t,e){if(void 0===u)return function(t){return s=t,u=setTimeout(x,n),l?g(t):o}(f);if(h)return u=setTimeout(x,n),g(f)}return void 0===u&&(u=setTimeout(x,n)),o}return n=y(n)||0,_(r)&&(l=!!r.leading,a=(h="maxWait"in r)?b(y(r.maxWait)||0,n):a,d="trailing"in r?!!r.trailing:d),O.cancel=function(){void 0!==u&&clearTimeout(u),s=0,i=f=c=u=void 0},O.flush=function(){return void 0===u?o:w(v())},O}}).call(n,e(520))},function(t,n){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{directives:[{name:"resize",rawName:"v-resize",value:this.onResize,expression:"onResize"}],staticClass:"wordCloud"})},staticRenderFns:[]}}])});
//# sourceMappingURL=word-cloud.js.map
},{}],"node_modules/vuewordcloud/VueWordCloud.js":[function(require,module,exports) {
var define;
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.VueWordCloud=n()}(this,function(){"use strict";function c(t){return"function"==typeof t}function E(){}var h=function(t){this.previousValue=t,this.interrupted=!1,this.interruptHandlers=new Set};h.prototype.throwIfInterrupted=function(){if(this.interrupted)throw new Error},h.prototype.interrupt=function(){this.interrupted||(this.interrupted=!0,this.interruptHandlers.forEach(function(t){try{t()}catch(t){}}))},h.prototype.onInterrupt=function(t){if(this.interrupted&&!this.interruptHandlers.has(t))try{t()}catch(t){}this.interruptHandlers.add(t)};var t="asyncComputed_",l=t+"promise_",d=t+"trigger_";function n(t){return function(){return t}}function i(){return[]}var r={words:{type:Array,default:i},text:{type:[String,Function],default:""},weight:{type:[Number,Function],default:1},rotation:{type:[Number,Function],default:0},rotationUnit:{type:[String,Function],default:"turn"},fontFamily:{type:[String,Function],default:"serif"},fontWeight:{type:[String,Function],default:"normal"},fontVariant:{type:[String,Function],default:"normal"},fontStyle:{type:[String,Function],default:"normal"},color:{type:[String,Function],default:"Black"},spacing:{type:Number,default:0},fontSizeRatio:{type:Number,default:0},enterAnimation:{type:[Object,String],default:n({opacity:0})},leaveAnimation:{type:[Object,String],default:n({opacity:0})},animationDuration:{type:Number,default:1e3},animationOverlap:{type:Number,default:1},animationEasing:{type:String,default:"ease"},createCanvas:{type:Function,default:function(){return document.createElement("canvas")}},loadFont:{type:Function,default:function(t,n,i,r){return document.fonts.load([n,i,"1px",t].join(" "),r)}},createWorker:{type:Function,default:function(t){return new Worker(URL.createObjectURL(new Blob([t])))}}};var s=n(null);function C(t){return t&&"object"==typeof t}function L(t){return"string"==typeof t}var e={animationOptions:function(){var t,r,e,n=this.enterAnimation,i=this.leaveAnimation,o=this.animationDuration;if(C(n)&&C(i)){var u=(t=Object.assign({},n,i),r=s,e={},Object.entries(t).forEach(function(t){var n=t[0],i=t[1];e[n]=r(i,n)}),e),a=function(t){Object.assign(t.style,n)},f=function(t,n){setTimeout(function(){Object.assign(t.style,u),setTimeout(n,o)},1)};return{props:{css:!1},on:{beforeAppear:a,appear:f,beforeEnter:a,enter:f,leave:function(t,n){Object.assign(t.style,i),setTimeout(n,o)}}}}return L(n)&&L(i)?{props:{duration:o,appear:!0,appearActiveClass:n,enterActiveClass:n,leaveActiveClass:i}}:{}},normalizedAnimationOverlap:function(){var t=this.animationOverlap;return(t=Math.abs(t))<1&&(t=1/t),t},separateAnimationDelay:function(){var t=this.animationDuration,n=this.cloudWords,i=this.separateAnimationDuration;return 1<n.length?(t-i)/(n.length-1):0},separateAnimationDuration:function(){var t=this.animationDuration,n=this.normalizedAnimationOverlap,i=this.cloudWords;return 0<i.length?t/Math.min(n,i.length):0}};function N(t){return c(t)?t:n(t)}function q(t){return void 0===t}function z(t,n){return t.postMessage(n),o=t,new Promise(function(i,r){var e,t=function(t){var n=t.data;e(),i(n)},n=function(t){var n=t.error;e(),r(n)};e=function(){o.removeEventListener("message",t),o.removeEventListener("error",n)},o.addEventListener("message",t),o.addEventListener("error",n)});var o}function A(t,n,i){return Math.ceil(t*Math.abs(Math.sin(i))+n*Math.abs(Math.cos(i)))}function B(t,n,i){return Math.ceil(t*Math.abs(Math.cos(i))+n*Math.abs(Math.sin(i)))}function k(t,n,i,r,e){return[t,n,i,r+"px",e].join(" ")}function P(t,n){return Math.ceil(t/n)*n}function T(t,n,i){var r=i().getContext("2d");return r.font=n,r.measureText(t).width}var H=function(t,n,i,r,e,o,u){this.t=t,this.n=n,this.i=i,this.r=r,this.e=e,this.o=o,this.u=u,this.a=1,this.f=0,this.s=0,this.c=0},o={h:{configurable:!0},l:{configurable:!0},d:{configurable:!0},v:{configurable:!0},p:{configurable:!0},m:{configurable:!0},g:{configurable:!0},b:{configurable:!0},y:{configurable:!0},M:{configurable:!0},w:{configurable:!0},x:{configurable:!0},F:{configurable:!0},S:{configurable:!0},j:{configurable:!0},O:{configurable:!0},W:{configurable:!0},A:{configurable:!0},B:{configurable:!0}};o.h.get=function(){return this.a},o.h.set=function(t){this.a!==t&&(this.a=t,this.k=void 0)},o.l.get=function(){return k(this.o,this.e,this.r,this.h,this.i)},o.d.get=function(){return void 0===this.P&&(this.P=T(this.t,k(this.o,this.e,this.r,1,this.i),this.u)),this.P},o.v.get=function(){return this.d*this.h},o.p.get=function(){return this.s*this.h},o.p.set=function(t){this.s=t/this.h},o.m.get=function(){return this.c*this.h},o.m.set=function(t){this.c=t/this.h},o.g.get=function(){return B(this.v,this.h,this.n)},o.b.get=function(){return A(this.v,this.h,this.n)},o.y.get=function(){return this.p-this.g/2},o.M.get=function(){return this.m-this.b/2},o.w.get=function(){return this.f},o.w.set=function(t){this.f!==t&&(this.f=t,this.k=void 0)},o.x.get=function(){return void 0===this.k&&(this.k=function(t,n,i,r,e,o,u,a,f){var s=k(n,i,r,e*=4,o),c=T(t,s,f),h=u*e*2,l=f(),d=l.getContext("2d"),v=P(B(h+2*e+c,h+3*e,a),4),p=P(A(h+2*e+c,h+3*e,a),4);l.width=v,l.height=p,d.translate(v/2,p/2),d.rotate(a),d.font=s,d.textAlign="center",d.textBaseline="middle",d.fillText(t,0,0),0<h&&(d.miterLimit=1,d.lineWidth=h,d.strokeText(t,0,0));for(var m=d.getImageData(0,0,v,p).data,g=[],b=1/0,y=0,M=1/0,w=0,x=v/4,F=p/4,S=0;S<x;++S)for(var j=0;j<F;++j)t:for(var O=0;O<4;++O)for(var W=0;W<4;++W)if(m[4*(v*(4*j+W)+(4*S+O))+3]){g.push([S,j]),b=Math.min(S,b),y=Math.max(S+1,y),M=Math.min(j,M),w=Math.max(j+1,w);break t}return 0<g.length?[g.map(function(t){var n=t[0],i=t[1];return[n-b,i-M]}),y-b,w-M,Math.ceil(x/2)-b,Math.ceil(F/2)-M]:[g,0,0,0,0]}(this.t,this.o,this.e,this.r,this.h,this.i,this.w,this.n,this.u)),this.k},o.F.get=function(){return this.x[0]},o.S.get=function(){return this.x[1]},o.j.get=function(){return this.x[2]},o.O.get=function(){return this.x[3]},o.W.get=function(){return this.x[4]},o.A.get=function(){return Math.ceil(this.p)-this.O},o.A.set=function(t){this.p=t+this.O},o.B.get=function(){return Math.ceil(this.m)-this.W},o.B.set=function(t){this.m=t+this.W},Object.defineProperties(H.prototype,o);var S="div";var u,a={name:"VueWordCloud",mixins:[(u={cloudWords:{get:function(s){var t,r=this,n=this,c=n.elementWidth,h=n.elementHeight,p=n.words,i=n.text,e=n.weight,o=n.rotation,u=n.rotationUnit,a=n.fontFamily,f=n.fontWeight,l=n.fontVariant,d=n.fontStyle,v=n.color,m=n.spacing,g=n.fontSizeRatio,b=n.createCanvas,y=n.loadFont,M=n.createWorker;t=g,g=1<(t=Math.abs(t))?1/t:t;var w,x,F,S=(x=(w=[c,h])[0],(F=w[1])<x?[1,F/x]:x<F?[x/F,1]:[1,1]);if(0<c&&0<h){var j=N(i),O=N(e),W=N(o),A=N(u),B=N(a),k=N(f),P=N(l),T=N(d),D=N(v);return p=p.map(function(t,n){var i,r,e,o,u,a,f,s,c,h,l;t&&(L(t)?e=t:Array.isArray(t)?(e=(i=t)[0],o=i[1]):C(t)&&(e=(r=t).text,o=r.weight,u=r.rotation,a=r.rotationUnit,f=r.fontFamily,s=r.fontWeight,c=r.fontVariant,h=r.fontStyle,l=r.color)),q(e)&&(e=j(t,n,p)),q(o)&&(o=O(t,n,p)),q(u)&&(u=W(t,n,p)),q(a)&&(a=A(t,n,p)),q(f)&&(f=B(t,n,p)),q(s)&&(s=k(t,n,p)),q(c)&&(c=P(t,n,p)),q(h)&&(h=T(t,n,p)),q(l)&&(l=D(t,n,p));var d=new H(e,function(){switch(a){case"turn":return u*Math.PI*2;case"deg":return u*Math.PI/180}return u}(),f,s,c,h,b);return Object.assign(d,{T:t,D:o,C:l}),d}),Promise.resolve().then(function(){return Promise.all(p.map(function(t){var n=t.i,i=t.o,r=t.r,e=t.t;return y(n,i,r,e)}))}).catch(E).then(function(){if(0<(p=p.filter(function(t){return 0<t.v}).sort(function(t,n){return n.D-t.D})).length){var t=p[0],n=(i=p)[i.length-1],e=t.D,o=n.D;if(o<e){var u=0<g?1/g:0<o?e/o:e<0?o/e:1+e-o;p.forEach(function(t){var n,i,r;t.h=(n=t.D,(r=1)+(n-(i=o))*(u-r)/(e-i))})}p.reduceRight(function(t,n){return n.h<2*t?n.h/=t:(t=n.h,n.h=1),n.L=t},1),p.forEach(function(t){t.h*=4});var a=M('!function(){"use strict";var h=function(r){self.removeEventListener("message",h);var i,o,v,c,s,n=r.data,t=function(){i={},s=c=v=o=0};t();var f=function(){return Math.ceil((o+v)/2)},a=function(){return Math.ceil((c+s)/2)},u=function(){return{left:f(),top:a(),width:v-o,height:s-c}},e=function(u,r,t){return function(r,t,n){var f,a,u=r[0],e=r[1],i=t[0],o=t[1];e<u?(f=1,a=e/u):u<e?(a=1,f=u/e):f=a=1;var v=[i,o];if(n(v))return v;for(var c=i,s=o,h=i,M=o,l=c,g=s;;){i-=f,o-=a,c+=f,s+=a;var d=Math.floor(i),m=Math.floor(o),p=Math.ceil(c),w=Math.ceil(s);if(l<p)for(var B=m;B<w;++B){var F=[p,B];if(n(F))return F}if(g<w)for(var b=p;d<b;--b){var j=[b,w];if(n(j))return j}if(d<h)for(var k=w;m<k;--k){var q=[d,k];if(n(q))return q}if(m<M)for(var x=d;x<p;++x){var y=[x,m];if(n(y))return y}h=d,M=m,l=p,g=w}}(n,[r+f(),t+a()],function(r){var f,a,t=r[0],n=r[1];return f=t,a=n,u.every(function(r){var t=r[0],n=r[1];return!i[f+t+"|"+(a+n)]})})};self.postMessage({}),self.addEventListener("message",function(r){self.postMessage({getBounds:u,put:function(r,u,e){r.forEach(function(r){var t=r[0],n=r[1],f=u+t,a=e+n;i[f+"|"+a]=!0,o=Math.min(f,o),v=Math.max(f+1,v),c=Math.min(a,c),s=Math.max(a+1,s)})},findFit:e,clear:t}[r.data.name].apply(null,r.data.args))})};self.addEventListener("message",h)}();\n'),f={completedWords:0,totalWords:p.length};return Promise.resolve().then(function(){return s.throwIfInterrupted(),r.progress=f,z(a,S)}).then(function(){s.throwIfInterrupted(),f.completedWords++;var n=Promise.resolve();return p.reduce(function(t,r,e){return n=n.then(function(){return r.L<t.L?Promise.resolve().then(function(){return z(a,{name:"clear"})}).then(function(){var n=Promise.resolve(),i=t.L/r.L;return p.slice(0,e).forEach(function(t){n=n.then(function(){return t.h*=i,z(a,{name:"put",args:[t.F,t.A,t.B]})})}),n}):z(a,{name:"put",args:[t.F,t.A,t.B]})}).then(function(){return r.w=m,z(a,{name:"findFit",args:[r.F,r.A,r.B]})}).then(function(t){var n=t[0],i=t[1];s.throwIfInterrupted(),f.completedWords++,r.A=n,r.B=i,r.w=0}),r}),n}).then(function(){return z(a,{name:"put",args:[n.F,n.A,n.B]})}).then(function(){return z(a,{name:"getBounds"})}).then(function(t){var n=t.left,i=t.top,r=t.width,e=t.height;if(0<r&&0<e){var o=Math.min(c/r,h/e);p.forEach(function(t){t.p-=n,t.m-=i,t.h*=o})}var v=new Set;return p.map(function(t){for(var n=t.T,i=t.t,r=t.D,e=t.n,o=t.i,u=t.r,a=t.e,f=t.o,s=t.l,c=t.p,h=t.m,l=t.C,d=JSON.stringify([i,o,u,a,f]);v.has(d);)d+="!";return v.add(d),{key:d,word:n,text:i,weight:r,rotation:e,font:s,color:l,left:c,top:h}})}).finally(function(){a.terminate()}).finally(function(){s.throwIfInterrupted(),r.progress=null})}var i;return[]})}return[]},default:i}},{data:function(){var n={};return Object.keys(u).forEach(function(t){n[d+t]={}}),n},computed:{},beforeCreate:function(){var i=this,s=new Set;Object.entries(u).forEach(function(t){var r=t[0],n=t[1],e=n.get,o=n.default,u=n.errorHandler;void 0===u&&(u=E);var a,f=!0;i.$options.computed[r]=function(){return this[d+r],this[l+r],o},i.$options.computed[l+r]=function(){var n=this;a&&(a.interrupt(),s.delete(a)),f&&(f=!1,c(o)&&(o=o.call(this)));var i=new h(o);a=i,s.add(a),new Promise(function(t){t(e.call(n,i))}).then(function(t){i.throwIfInterrupted(),o=t,n[d+r]={}}).catch(u)}})}})],props:r,data:function(){return{elementWidth:0,elementHeight:0,progress:null}},computed:e,watch:{cloudWords:function(t){this.$emit("update:cloudWords",t)},progress:{handler:function(t){this.$emit("update:progress",t)},deep:!0,immediate:!0}},mounted:function(){var t,n,i,r=this;t=function(){if(r._isDestroyed)return!1;r.updateElementSize()},n=1e3,(i=function(){requestAnimationFrame(function(){!1!==t()&&setTimeout(i,n)})})()},methods:{updateElementSize:function(){this.elementWidth=this.$el.offsetWidth,this.elementHeight=this.$el.offsetHeight}},render:function(b){var t=this,y=t.$scopedSlots,M=t.animationEasing,w=t.animationOptions,n=t.cloudWords,x=t.separateAnimationDelay,F=t.separateAnimationDuration;y=Object.assign({},{default:function(t){return t.text}},y);var i=n.map(function(t,n){var i=t.word,r=t.key,e=t.text,o=t.weight,u=t.rotation,a=t.font,f=t.color,s=t.left,c=t.top,h=y.default({word:i,text:e,weight:o,font:a,color:f,left:s,top:c}),l={position:"absolute",left:"50%",top:"50%",color:f,font:a,whiteSpace:"nowrap",transform:["translate(-50%,-50%)","rotate("+u+"rad)"].join(" ")},d={position:"absolute",left:s+"px",top:c+"px"};if(0<F){var v={transitionProperty:"all",transitionDuration:F+"ms",transitionTimingFunction:M,transitionDelay:x*n+"ms"},p={animationDuration:F+"ms",animationTimingFunction:M,animationDelay:x*n+"ms"};Object.assign(l,v),Object.assign(d,v,p)}var m=b(S,{style:l},[h]),g=b(S,{key:r,style:d},[m]);return b("transition",Object.assign({},w),[g])}),r=b(S,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}},i);return b(S,{style:{position:"relative",width:"100%",height:"100%"}},[r])}};return"undefined"!=typeof window&&window.Vue&&window.Vue.component(a.name,a),a});

},{}],"src/components/Footer.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueWordcloud = _interopRequireDefault(require("vue-wordcloud"));

var _vuewordcloud = _interopRequireDefault(require("vuewordcloud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseUrl = "http://localhost:3000";
var _default = {
  components: _defineProperty({
    wordcloud: _vueWordcloud.default
  }, _vuewordcloud.default.name, _vuewordcloud.default),
  data: function data() {
    return {
      tags: []
    };
  },
  methods: {
    onWordClick: function onWordClick(word) {
      console.log(word);
      this.$emit('withTag', word[0]);
    },
    getTags: function getTags() {
      var _this = this;

      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles/tags")
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data.tags);
        var obj = [];
        data.tags.forEach(function (dat, index) {
          var filter = obj.filter(function (ob) {
            return ob[0] === dat;
          });

          if (filter.length === 0) {
            obj.push([dat, 1]);
          } else {
            obj[obj.indexOf(filter[0])][1]++;
          }
        });
        console.log(obj);
        _this.tags = obj;
      }).catch(function (err) {
        console.log(err.response.data);
      });
    }
  },
  mounted: function mounted() {
    this.getTags();
  }
};
exports.default = _default;
        var $8c7073 = exports.default || module.exports;
      
      if (typeof $8c7073 === 'function') {
        $8c7073 = $8c7073.options;
      }
    
        /* template */
        Object.assign($8c7073, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c(
      "footer",
      {
        staticClass: "page-footer font-small blue pt-4",
        staticStyle: { "margin-top": "100px", height: "210px" }
      },
      [
        _c("vue-word-cloud", {
          staticStyle: {
            "border-top": "3px solid black",
            "margin-top": "-50px"
          },
          attrs: {
            words: _vm.tags,
            color: function(ref) {
              var weight = ref[1]

              return weight > 5
                ? "DeepPink"
                : weight > 1
                ? "RoyalBlue"
                : "Indigo"
            }
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var text = ref.text
                var weight = ref.weight
                var word = ref.word
                return [
                  _c(
                    "div",
                    {
                      staticStyle: { cursor: "pointer" },
                      attrs: { title: weight },
                      on: {
                        click: function($event) {
                          return _vm.onWordClick(word)
                        }
                      }
                    },
                    [_vm._v("\n        " + _vm._s(text) + "\n      ")]
                  )
                ]
              }
            }
          ])
        }),
        _vm._v(" "),
        _vm._m(0)
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "footer-copyright text-center",
        staticStyle: { "margin-top": "15px", "border-top": "3px solid black" }
      },
      [_c("small", [_vm._v("© 2019 Copyright: Rizky Anas Bukhori")])]
    )
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$8c7073', $8c7073);
          } else {
            api.reload('$8c7073', $8c7073);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue-wordcloud":"node_modules/vue-wordcloud/dist/word-cloud.js","vuewordcloud":"node_modules/vuewordcloud/VueWordCloud.js","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Navbar = _interopRequireDefault(require("./components/Navbar.vue"));

var _ArticleList = _interopRequireDefault(require("./components/ArticleList.vue"));

var _ArticleDetail = _interopRequireDefault(require("./components/ArticleDetail.vue"));

var _Footer = _interopRequireDefault(require("./components/Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var baseUrl = 'http://localhost:3000';
var _default = {
  name: 'App',
  components: {
    Navbar: _Navbar.default,
    ArticleList: _ArticleList.default,
    ArticleDetail: _ArticleDetail.default,
    Foot: _Footer.default
  },
  data: function data() {
    return {
      isLogin: false,
      section: 'home',
      articles: [],
      article: {},
      tags: [],
      username: ''
    };
  },
  methods: {
    goTo: function goTo(section, article) {
      this.section = section;
      this.article = article;
    },
    goBack: function goBack(option) {
      this.section = option;
      this.getArticles();
    },
    fetch: function fetch(option) {
      if (option === 'all') this.getArticles('all');
      if (option === 'published') this.getArticles('published');
      if (option === 'draft') this.getArticles('draft');
    },
    getArticles: function getArticles(option) {
      var _this = this;

      this.articles = [];
      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles")
      }).then(function (_ref) {
        var data = _ref.data;
        console.log(data.data);
        _this.articles = data.data;
        _this.section = 'home';
        var articles = [];

        if (option === 'published') {
          _this.articles.forEach(function (article) {
            if (article.author._id === localStorage.id && article.published === true) articles.push(article);
          });

          _this.articles = articles;
        } else if (option === 'draft') {
          var _articles = [];

          _this.articles.forEach(function (article) {
            if (article.author._id === localStorage.id && article.published === false) _articles.push(article);
          });

          _this.articles = _articles;
        } else {
          _this.articles.forEach(function (article) {
            if (article.published === true) articles.push(article);
          });

          _this.articles = articles;
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    getArticlesByTag: function getArticlesByTag(tag) {
      var _this2 = this;

      this.articles = [];
      axios({
        method: 'get',
        url: "".concat(baseUrl, "/articles?tag=").concat(tag)
      }).then(function (_ref2) {
        var data = _ref2.data;
        console.log(data.data);
        _this2.section = 'home';
        _this2.articles = data.data;
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  mounted: function mounted() {
    this.getArticles();
    console.log(this.articles);
  }
};
exports.default = _default;
        var $e7d7de = exports.default || module.exports;
      
      if (typeof $e7d7de === 'function') {
        $e7d7de = $e7d7de.options;
      }
    
        /* template */
        Object.assign($e7d7de, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", [_c("Navbar", { on: { fetch: _vm.fetch } })], 1),
    _vm._v(" "),
    _c(
      "div",
      [
        _vm.section === "home"
          ? _c("ArticleList", {
              attrs: { articles: _vm.articles },
              on: { toDetail: _vm.goTo }
            })
          : _vm._e()
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      [
        _vm.section === "detail"
          ? _c("ArticleDetail", {
              staticClass: "animated fadeIn",
              attrs: { detail: _vm.article },
              on: { back: _vm.goBack }
            })
          : _vm._e()
      ],
      1
    ),
    _vm._v(" "),
    _c("div", [_c("Foot", { on: { withTag: _vm.getArticlesByTag } })], 1)
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-e7d7de",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e7d7de', $e7d7de);
          } else {
            api.reload('$e7d7de', $e7d7de);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/Navbar.vue":"src/components/Navbar.vue","./components/ArticleList.vue":"src/components/ArticleList.vue","./components/ArticleDetail.vue":"src/components/ArticleDetail.vue","./components/Footer":"src/components/Footer.vue","_css_loader":"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue.default({
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"src/App.vue"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40453" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map