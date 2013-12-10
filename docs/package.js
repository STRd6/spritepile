(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "spritepile\n==========\n\nEdit a pile of sprites.\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.10.1.min.js\"\n  \"https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\"\n  \"https://pixipaint.net/envweb-v0.4.7.js\"\n]\ndependencies:\n  appcache: \"distri/appcache:v0.2.0\"\n  \"hotkeys\": \"distri/hotkeys:v0.2.0\"\n  \"jquery-utils\": \"distri/jquery-utils:v0.2.0\"\n  runtime: \"STRd6/runtime:v0.2.0\"\n  \"touch-canvas\": \"distri/touch-canvas:v0.3.0\"\n  \"undo\": \"distri/undo:v0.2.0\"\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Sprite Pile\n===========\n\nDisplay a collection of sprites. Maybe have metadata like a name or some other\njunk.\n\nEdit a sprite by double clicking and opening a pixel editor in a sub-window.\n\n    require \"./lib/dragabilly\"\n\n    # TODO: Close spawned windows when closing parent\n\n    editSprite = (data) ->\n      eventProcessor = (event) ->\n        if event.source is pixelEditorWindow\n          console.log event\n\n          if event.data?.status is \"unload\"\n            removeEventListener eventProcessor\n\n          if event.data?.status is \"ready\"\n            send pixelEditorWindow, \"fromDataURL\", data\n\n      addEventListener \"message\", eventProcessor, false\n\n      pixelEditorWindow = window.open \"http://strd6.github.io/pixel-editor/\", \"\", \"width=640,height=480\"\n\n    send = (target, method, params...) ->\n      target.postMessage \n        method: method\n        params: params\n      , \"*\"\n\n    try\n      sprites = JSON.parse(localStorage.images)\n    catch\n      sprites = \n        wizard: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2WyxHCMAxEnT6YoQRKoBBqgBNlcIIaKIQSKIEZ+jDeYHmWkGBJAcKBHJjg3z5vJNlNmPhpxuovl9t4Ou3c67gnAhzis8U6HPdz9zruiSIOkMkBrudD8H4GlwO8ezgwOcCYz2B2oLt7ySKvC38AkwNiP+zmB7XAG4xqAIiLaEq53gKaxrTtlpQ0AbBwjDE0zX06vwPiIwB5y8WFIYA0Tr0prGkZHMnip0+Qd25d0w7AAScU0pYLkgnC7EA+/cJqcykupMOo/Me7xVktQGu/7DSLPIj29KvWVg1CoLOAWC0uAOinACyx8DYHICqO5INJFQtagLbe4IdTsRuI0p8Llmpt1SBK+lKIWFz6JTg/kQWFYeg+YPnuXMWsDpSb8FMpTA2eS4kJQE5ErnwM8hUAiEOISzIDWSHUDry6C/YAqFJQPUgqISZ0xbpO8G1Jcy+oOsA3ob7Aq7XVIKoANYGx/ZMD3AAsruMhfeZcmgAAAABJRU5ErkJggg==\"\n\n    Object.keys(sprites).forEach (name) ->\n      img = new Image\n\n      img.src = sprites[name]\n      \n      document.body.appendChild img\n\n    $(\"body\").on \"dblclick\", \"img\", ->\n      editSprite(this.src)\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "html, body\n  width: 100%\n  height: 100%\n\n",
      "type": "blob"
    },
    "lib/dragabilly.js": {
      "path": "lib/dragabilly.js",
      "mode": "100644",
      "content": "/*!\n * Draggabilly PACKAGED v1.0.7\n * Make that shiz draggable\n * http://draggabilly.desandro.com\n */\n\n\n/*!\n * classie - class helper functions\n * from bonzo https://github.com/ded/bonzo\n * \n * classie.has( elem, 'my-class' ) -> true/false\n * classie.add( elem, 'my-new-class' )\n * classie.remove( elem, 'my-unwanted-class' )\n * classie.toggle( elem, 'my-class' )\n */\n\n/*jshint browser: true, strict: true, undef: true */\n/*global define: false */\n\n( function( window ) {\n\n\n\n// class helper functions from bonzo https://github.com/ded/bonzo\n\nfunction classReg( className ) {\n  return new RegExp(\"(^|\\\\s+)\" + className + \"(\\\\s+|$)\");\n}\n\n// classList support for class management\n// altho to be fair, the api sucks because it won't accept multiple classes at once\nvar hasClass, addClass, removeClass;\n\nif ( 'classList' in document.documentElement ) {\n  hasClass = function( elem, c ) {\n    return elem.classList.contains( c );\n  };\n  addClass = function( elem, c ) {\n    elem.classList.add( c );\n  };\n  removeClass = function( elem, c ) {\n    elem.classList.remove( c );\n  };\n}\nelse {\n  hasClass = function( elem, c ) {\n    return classReg( c ).test( elem.className );\n  };\n  addClass = function( elem, c ) {\n    if ( !hasClass( elem, c ) ) {\n      elem.className = elem.className + ' ' + c;\n    }\n  };\n  removeClass = function( elem, c ) {\n    elem.className = elem.className.replace( classReg( c ), ' ' );\n  };\n}\n\nfunction toggleClass( elem, c ) {\n  var fn = hasClass( elem, c ) ? removeClass : addClass;\n  fn( elem, c );\n}\n\nvar classie = {\n  // full names\n  hasClass: hasClass,\n  addClass: addClass,\n  removeClass: removeClass,\n  toggleClass: toggleClass,\n  // short names\n  has: hasClass,\n  add: addClass,\n  remove: removeClass,\n  toggle: toggleClass\n};\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'classie/classie',classie );\n} else {\n  // browser global\n  window.classie = classie;\n}\n\n})( window );\n\n/*!\n * EventEmitter v4.2.4 - git.io/ee\n * Oliver Caldwell\n * MIT license\n * @preserve\n */\n\n(function () {\n  \n\n\t/**\n\t * Class for managing events.\n\t * Can be extended to provide event functionality in other classes.\n\t *\n\t * @class EventEmitter Manages event registering and emitting.\n\t */\n\tfunction EventEmitter() {}\n\n\t// Shortcuts to improve speed and size\n\n\t// Easy access to the prototype\n\tvar proto = EventEmitter.prototype;\n\n\t/**\n\t * Finds the index of the listener for the event in it's storage array.\n\t *\n\t * @param {Function[]} listeners Array of listeners to search through.\n\t * @param {Function} listener Method to look for.\n\t * @return {Number} Index of the specified listener, -1 if not found\n\t * @api private\n\t */\n\tfunction indexOfListener(listeners, listener) {\n\t\tvar i = listeners.length;\n\t\twhile (i--) {\n\t\t\tif (listeners[i].listener === listener) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\n\t\treturn -1;\n\t}\n\n\t/**\n\t * Alias a method while keeping the context correct, to allow for overwriting of target method.\n\t *\n\t * @param {String} name The name of the target method.\n\t * @return {Function} The aliased method\n\t * @api private\n\t */\n\tfunction alias(name) {\n\t\treturn function aliasClosure() {\n\t\t\treturn this[name].apply(this, arguments);\n\t\t};\n\t}\n\n\t/**\n\t * Returns the listener array for the specified event.\n\t * Will initialise the event object and listener arrays if required.\n\t * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.\n\t * Each property in the object response is an array of listener functions.\n\t *\n\t * @param {String|RegExp} evt Name of the event to return the listeners from.\n\t * @return {Function[]|Object} All listener functions for the event.\n\t */\n\tproto.getListeners = function getListeners(evt) {\n\t\tvar events = this._getEvents();\n\t\tvar response;\n\t\tvar key;\n\n\t\t// Return a concatenated array of all matching events if\n\t\t// the selector is a regular expression.\n\t\tif (typeof evt === 'object') {\n\t\t\tresponse = {};\n\t\t\tfor (key in events) {\n\t\t\t\tif (events.hasOwnProperty(key) && evt.test(key)) {\n\t\t\t\t\tresponse[key] = events[key];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\tresponse = events[evt] || (events[evt] = []);\n\t\t}\n\n\t\treturn response;\n\t};\n\n\t/**\n\t * Takes a list of listener objects and flattens it into a list of listener functions.\n\t *\n\t * @param {Object[]} listeners Raw listener objects.\n\t * @return {Function[]} Just the listener functions.\n\t */\n\tproto.flattenListeners = function flattenListeners(listeners) {\n\t\tvar flatListeners = [];\n\t\tvar i;\n\n\t\tfor (i = 0; i < listeners.length; i += 1) {\n\t\t\tflatListeners.push(listeners[i].listener);\n\t\t}\n\n\t\treturn flatListeners;\n\t};\n\n\t/**\n\t * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.\n\t *\n\t * @param {String|RegExp} evt Name of the event to return the listeners from.\n\t * @return {Object} All listener functions for an event in an object.\n\t */\n\tproto.getListenersAsObject = function getListenersAsObject(evt) {\n\t\tvar listeners = this.getListeners(evt);\n\t\tvar response;\n\n\t\tif (listeners instanceof Array) {\n\t\t\tresponse = {};\n\t\t\tresponse[evt] = listeners;\n\t\t}\n\n\t\treturn response || listeners;\n\t};\n\n\t/**\n\t * Adds a listener function to the specified event.\n\t * The listener will not be added if it is a duplicate.\n\t * If the listener returns true then it will be removed after it is called.\n\t * If you pass a regular expression as the event name then the listener will be added to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to attach the listener to.\n\t * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addListener = function addListener(evt, listener) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar listenerIsWrapped = typeof listener === 'object';\n\t\tvar key;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {\n\t\t\t\tlisteners[key].push(listenerIsWrapped ? listener : {\n\t\t\t\t\tlistener: listener,\n\t\t\t\t\tonce: false\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of addListener\n\t */\n\tproto.on = alias('addListener');\n\n\t/**\n\t * Semi-alias of addListener. It will add a listener that will be\n\t * automatically removed after it's first execution.\n\t *\n\t * @param {String|RegExp} evt Name of the event to attach the listener to.\n\t * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addOnceListener = function addOnceListener(evt, listener) {\n\t\treturn this.addListener(evt, {\n\t\t\tlistener: listener,\n\t\t\tonce: true\n\t\t});\n\t};\n\n\t/**\n\t * Alias of addOnceListener.\n\t */\n\tproto.once = alias('addOnceListener');\n\n\t/**\n\t * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.\n\t * You need to tell it what event names should be matched by a regex.\n\t *\n\t * @param {String} evt Name of the event to create.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.defineEvent = function defineEvent(evt) {\n\t\tthis.getListeners(evt);\n\t\treturn this;\n\t};\n\n\t/**\n\t * Uses defineEvent to define multiple events.\n\t *\n\t * @param {String[]} evts An array of event names to define.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.defineEvents = function defineEvents(evts) {\n\t\tfor (var i = 0; i < evts.length; i += 1) {\n\t\t\tthis.defineEvent(evts[i]);\n\t\t}\n\t\treturn this;\n\t};\n\n\t/**\n\t * Removes a listener function from the specified event.\n\t * When passed a regular expression as the event name, it will remove the listener from all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to remove the listener from.\n\t * @param {Function} listener Method to remove from the event.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeListener = function removeListener(evt, listener) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar index;\n\t\tvar key;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key)) {\n\t\t\t\tindex = indexOfListener(listeners[key], listener);\n\n\t\t\t\tif (index !== -1) {\n\t\t\t\t\tlisteners[key].splice(index, 1);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of removeListener\n\t */\n\tproto.off = alias('removeListener');\n\n\t/**\n\t * Adds listeners in bulk using the manipulateListeners method.\n\t * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.\n\t * You can also pass it a regular expression to add the array of listeners to all events that match it.\n\t * Yeah, this function does quite a bit. That's probably a bad thing.\n\t *\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to add.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addListeners = function addListeners(evt, listeners) {\n\t\t// Pass through to manipulateListeners\n\t\treturn this.manipulateListeners(false, evt, listeners);\n\t};\n\n\t/**\n\t * Removes listeners in bulk using the manipulateListeners method.\n\t * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n\t * You can also pass it an event name and an array of listeners to be removed.\n\t * You can also pass it a regular expression to remove the listeners from all events that match it.\n\t *\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to remove.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeListeners = function removeListeners(evt, listeners) {\n\t\t// Pass through to manipulateListeners\n\t\treturn this.manipulateListeners(true, evt, listeners);\n\t};\n\n\t/**\n\t * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.\n\t * The first argument will determine if the listeners are removed (true) or added (false).\n\t * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n\t * You can also pass it an event name and an array of listeners to be added/removed.\n\t * You can also pass it a regular expression to manipulate the listeners of all events that match it.\n\t *\n\t * @param {Boolean} remove True if you want to remove listeners, false if you want to add.\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to add/remove.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {\n\t\tvar i;\n\t\tvar value;\n\t\tvar single = remove ? this.removeListener : this.addListener;\n\t\tvar multiple = remove ? this.removeListeners : this.addListeners;\n\n\t\t// If evt is an object then pass each of it's properties to this method\n\t\tif (typeof evt === 'object' && !(evt instanceof RegExp)) {\n\t\t\tfor (i in evt) {\n\t\t\t\tif (evt.hasOwnProperty(i) && (value = evt[i])) {\n\t\t\t\t\t// Pass the single listener straight through to the singular method\n\t\t\t\t\tif (typeof value === 'function') {\n\t\t\t\t\t\tsingle.call(this, i, value);\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\t// Otherwise pass back to the multiple function\n\t\t\t\t\t\tmultiple.call(this, i, value);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\t// So evt must be a string\n\t\t\t// And listeners must be an array of listeners\n\t\t\t// Loop over it and pass each one to the multiple method\n\t\t\ti = listeners.length;\n\t\t\twhile (i--) {\n\t\t\t\tsingle.call(this, evt, listeners[i]);\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Removes all listeners from a specified event.\n\t * If you do not specify an event then all listeners will be removed.\n\t * That means every event will be emptied.\n\t * You can also pass a regex to remove all events that match it.\n\t *\n\t * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeEvent = function removeEvent(evt) {\n\t\tvar type = typeof evt;\n\t\tvar events = this._getEvents();\n\t\tvar key;\n\n\t\t// Remove different things depending on the state of evt\n\t\tif (type === 'string') {\n\t\t\t// Remove all listeners for the specified event\n\t\t\tdelete events[evt];\n\t\t}\n\t\telse if (type === 'object') {\n\t\t\t// Remove all events matching the regex.\n\t\t\tfor (key in events) {\n\t\t\t\tif (events.hasOwnProperty(key) && evt.test(key)) {\n\t\t\t\t\tdelete events[key];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\t// Remove all listeners in all events\n\t\t\tdelete this._events;\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of removeEvent.\n\t *\n\t * Added to mirror the node API.\n\t */\n\tproto.removeAllListeners = alias('removeEvent');\n\n\t/**\n\t * Emits an event of your choice.\n\t * When emitted, every listener attached to that event will be executed.\n\t * If you pass the optional argument array then those arguments will be passed to every listener upon execution.\n\t * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.\n\t * So they will not arrive within the array on the other side, they will be separate.\n\t * You can also pass a regular expression to emit to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n\t * @param {Array} [args] Optional array of arguments to be passed to each listener.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.emitEvent = function emitEvent(evt, args) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar listener;\n\t\tvar i;\n\t\tvar key;\n\t\tvar response;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key)) {\n\t\t\t\ti = listeners[key].length;\n\n\t\t\t\twhile (i--) {\n\t\t\t\t\t// If the listener returns true then it shall be removed from the event\n\t\t\t\t\t// The function is executed either with a basic call or an apply if there is an args array\n\t\t\t\t\tlistener = listeners[key][i];\n\n\t\t\t\t\tif (listener.once === true) {\n\t\t\t\t\t\tthis.removeListener(evt, listener.listener);\n\t\t\t\t\t}\n\n\t\t\t\t\tresponse = listener.listener.apply(this, args || []);\n\n\t\t\t\t\tif (response === this._getOnceReturnValue()) {\n\t\t\t\t\t\tthis.removeListener(evt, listener.listener);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of emitEvent\n\t */\n\tproto.trigger = alias('emitEvent');\n\n\t/**\n\t * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.\n\t * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n\t * @param {...*} Optional additional arguments to be passed to each listener.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.emit = function emit(evt) {\n\t\tvar args = Array.prototype.slice.call(arguments, 1);\n\t\treturn this.emitEvent(evt, args);\n\t};\n\n\t/**\n\t * Sets the current value to check against when executing listeners. If a\n\t * listeners return value matches the one set here then it will be removed\n\t * after execution. This value defaults to true.\n\t *\n\t * @param {*} value The new value to check for when executing listeners.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.setOnceReturnValue = function setOnceReturnValue(value) {\n\t\tthis._onceReturnValue = value;\n\t\treturn this;\n\t};\n\n\t/**\n\t * Fetches the current value to check against when executing listeners. If\n\t * the listeners return value matches this one then it should be removed\n\t * automatically. It will return true by default.\n\t *\n\t * @return {*|Boolean} The current value to check for or the default, true.\n\t * @api private\n\t */\n\tproto._getOnceReturnValue = function _getOnceReturnValue() {\n\t\tif (this.hasOwnProperty('_onceReturnValue')) {\n\t\t\treturn this._onceReturnValue;\n\t\t}\n\t\telse {\n\t\t\treturn true;\n\t\t}\n\t};\n\n\t/**\n\t * Fetches the events object and creates one if required.\n\t *\n\t * @return {Object} The events storage object.\n\t * @api private\n\t */\n\tproto._getEvents = function _getEvents() {\n\t\treturn this._events || (this._events = {});\n\t};\n\n  global.EventEmitter = EventEmitter;\n\n}.call(this));\n\n/*!\n * eventie v1.0.3\n * event binding helper\n *   eventie.bind( elem, 'click', myFn )\n *   eventie.unbind( elem, 'click', myFn )\n */\n\n/*jshint browser: true, undef: true, unused: true */\n/*global define: false */\n\n( function( window ) {\n\n\n\nvar docElem = document.documentElement;\n\nvar bind = function() {};\n\nif ( docElem.addEventListener ) {\n  bind = function( obj, type, fn ) {\n    obj.addEventListener( type, fn, false );\n  };\n} else if ( docElem.attachEvent ) {\n  bind = function( obj, type, fn ) {\n    obj[ type + fn ] = fn.handleEvent ?\n      function() {\n        var event = window.event;\n        // add event.target\n        event.target = event.target || event.srcElement;\n        fn.handleEvent.call( fn, event );\n      } :\n      function() {\n        var event = window.event;\n        // add event.target\n        event.target = event.target || event.srcElement;\n        fn.call( obj, event );\n      };\n    obj.attachEvent( \"on\" + type, obj[ type + fn ] );\n  };\n}\n\nvar unbind = function() {};\n\nif ( docElem.removeEventListener ) {\n  unbind = function( obj, type, fn ) {\n    obj.removeEventListener( type, fn, false );\n  };\n} else if ( docElem.detachEvent ) {\n  unbind = function( obj, type, fn ) {\n    obj.detachEvent( \"on\" + type, obj[ type + fn ] );\n    try {\n      delete obj[ type + fn ];\n    } catch ( err ) {\n      // can't delete window object properties\n      obj[ type + fn ] = undefined;\n    }\n  };\n}\n\nvar eventie = {\n  bind: bind,\n  unbind: unbind\n};\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'eventie/eventie',eventie );\n} else {\n  // browser global\n  window.eventie = eventie;\n}\n\n})( this );\n\n/*!\n * getStyleProperty by kangax\n * http://perfectionkills.com/feature-testing-css-properties/\n */\n\n/*jshint browser: true, strict: true, undef: true */\n/*globals define: false */\n\n( function( window ) {\n\n\n\nvar prefixes = 'Webkit Moz ms Ms O'.split(' ');\nvar docElemStyle = document.documentElement.style;\n\nfunction getStyleProperty( propName ) {\n  if ( !propName ) {\n    return;\n  }\n\n  // test standard property first\n  if ( typeof docElemStyle[ propName ] === 'string' ) {\n    return propName;\n  }\n\n  // capitalize\n  propName = propName.charAt(0).toUpperCase() + propName.slice(1);\n\n  // test vendor specific properties\n  var prefixed;\n  for ( var i=0, len = prefixes.length; i < len; i++ ) {\n    prefixed = prefixes[i] + propName;\n    if ( typeof docElemStyle[ prefixed ] === 'string' ) {\n      return prefixed;\n    }\n  }\n}\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'get-style-property/get-style-property',[],function() {\n    return getStyleProperty;\n  });\n} else {\n  // browser global\n  window.getStyleProperty = getStyleProperty;\n}\n\n})( window );\n\n/**\n * getSize v1.1.5\n * measure size of elements\n */\n\n/*jshint browser: true, strict: true, undef: true, unused: true */\n/*global define: false */\n\n( function( window, undefined ) {\n\n\n\n// -------------------------- helpers -------------------------- //\n\nvar defView = document.defaultView;\nvar isComputedStyle = defView && defView.getComputedStyle;\n\nvar getStyle = isComputedStyle ?\n  function( elem ) {\n    return defView.getComputedStyle( elem, null );\n  } :\n  function( elem ) {\n    return elem.currentStyle;\n  };\n\n// get a number from a string, not a percentage\nfunction getStyleSize( value ) {\n  var num = parseFloat( value );\n  // not a percent like '100%', and a number\n  var isValid = value.indexOf('%') === -1 && !isNaN( num );\n  return isValid && num;\n}\n\n// -------------------------- measurements -------------------------- //\n\nvar measurements = [\n  'paddingLeft',\n  'paddingRight',\n  'paddingTop',\n  'paddingBottom',\n  'marginLeft',\n  'marginRight',\n  'marginTop',\n  'marginBottom',\n  'borderLeftWidth',\n  'borderRightWidth',\n  'borderTopWidth',\n  'borderBottomWidth'\n];\n\nfunction getZeroSize() {\n  var size = {\n    width: 0,\n    height: 0,\n    innerWidth: 0,\n    innerHeight: 0,\n    outerWidth: 0,\n    outerHeight: 0\n  };\n  for ( var i=0, len = measurements.length; i < len; i++ ) {\n    var measurement = measurements[i];\n    size[ measurement ] = 0;\n  }\n  return size;\n}\n\n\n\nfunction defineGetSize( getStyleProperty ) {\n\n// -------------------------- box sizing -------------------------- //\n\nvar boxSizingProp = getStyleProperty('boxSizing');\nvar isBoxSizeOuter;\n\n/**\n * WebKit measures the outer-width on style.width on border-box elems\n * IE & Firefox measures the inner-width\n */\n( function() {\n  if ( !boxSizingProp ) {\n    return;\n  }\n\n  var div = document.createElement('div');\n  div.style.width = '200px';\n  div.style.padding = '1px 2px 3px 4px';\n  div.style.borderStyle = 'solid';\n  div.style.borderWidth = '1px 2px 3px 4px';\n  div.style[ boxSizingProp ] = 'border-box';\n\n  var body = document.body || document.documentElement;\n  body.appendChild( div );\n  var style = getStyle( div );\n\n  isBoxSizeOuter = getStyleSize( style.width ) === 200;\n  body.removeChild( div );\n})();\n\n\n// -------------------------- getSize -------------------------- //\n\nfunction getSize( elem ) {\n  // use querySeletor if elem is string\n  if ( typeof elem === 'string' ) {\n    elem = document.querySelector( elem );\n  }\n\n  // do not proceed on non-objects\n  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {\n    return;\n  }\n\n  var style = getStyle( elem );\n\n  // if hidden, everything is 0\n  if ( style.display === 'none' ) {\n    return getZeroSize();\n  }\n\n  var size = {};\n  size.width = elem.offsetWidth;\n  size.height = elem.offsetHeight;\n\n  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&\n    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );\n\n  // get all measurements\n  for ( var i=0, len = measurements.length; i < len; i++ ) {\n    var measurement = measurements[i];\n    var value = style[ measurement ];\n    value = mungeNonPixel( elem, value );\n    var num = parseFloat( value );\n    // any 'auto', 'medium' value will be 0\n    size[ measurement ] = !isNaN( num ) ? num : 0;\n  }\n\n  var paddingWidth = size.paddingLeft + size.paddingRight;\n  var paddingHeight = size.paddingTop + size.paddingBottom;\n  var marginWidth = size.marginLeft + size.marginRight;\n  var marginHeight = size.marginTop + size.marginBottom;\n  var borderWidth = size.borderLeftWidth + size.borderRightWidth;\n  var borderHeight = size.borderTopWidth + size.borderBottomWidth;\n\n  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;\n\n  // overwrite width and height if we can get it from style\n  var styleWidth = getStyleSize( style.width );\n  if ( styleWidth !== false ) {\n    size.width = styleWidth +\n      // add padding and border unless it's already including it\n      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );\n  }\n\n  var styleHeight = getStyleSize( style.height );\n  if ( styleHeight !== false ) {\n    size.height = styleHeight +\n      // add padding and border unless it's already including it\n      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );\n  }\n\n  size.innerWidth = size.width - ( paddingWidth + borderWidth );\n  size.innerHeight = size.height - ( paddingHeight + borderHeight );\n\n  size.outerWidth = size.width + marginWidth;\n  size.outerHeight = size.height + marginHeight;\n\n  return size;\n}\n\n// IE8 returns percent values, not pixels\n// taken from jQuery's curCSS\nfunction mungeNonPixel( elem, value ) {\n  // IE8 and has percent value\n  if ( isComputedStyle || value.indexOf('%') === -1 ) {\n    return value;\n  }\n  var style = elem.style;\n\t// Remember the original values\n\tvar left = style.left;\n\tvar rs = elem.runtimeStyle;\n\tvar rsLeft = rs && rs.left;\n\n\t// Put in the new values to get a computed value out\n\tif ( rsLeft ) {\n\t\trs.left = elem.currentStyle.left;\n\t}\n\tstyle.left = value;\n\tvalue = style.pixelLeft;\n\n\t// Revert the changed values\n\tstyle.left = left;\n\tif ( rsLeft ) {\n\t\trs.left = rsLeft;\n\t}\n\n  return value;\n}\n\nreturn getSize;\n\n}\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );\n} else {\n  // browser global\n  window.getSize = defineGetSize( window.getStyleProperty );\n}\n\n})( window );\n\n/*!\n * Draggabilly v1.0.7\n * Make that shiz draggable\n * http://draggabilly.desandro.com\n */\n\n( function( window ) {\n\n\n\n// vars\nvar document = window.document;\n\n// -------------------------- helpers -------------------------- //\n\n// extend objects\nfunction extend( a, b ) {\n  for ( var prop in b ) {\n    a[ prop ] = b[ prop ];\n  }\n  return a;\n}\n\nfunction noop() {}\n\n// ----- get style ----- //\n\nvar defView = document.defaultView;\n\nvar getStyle = defView && defView.getComputedStyle ?\n  function( elem ) {\n    return defView.getComputedStyle( elem, null );\n  } :\n  function( elem ) {\n    return elem.currentStyle;\n  };\n\n\n// http://stackoverflow.com/a/384380/182183\nvar isElement = ( typeof HTMLElement === 'object' ) ?\n  function isElementDOM2( obj ) {\n    return obj instanceof HTMLElement;\n  } :\n  function isElementQuirky( obj ) {\n    return obj && typeof obj === 'object' &&\n      obj.nodeType === 1 && typeof obj.nodeName === 'string';\n  };\n\n// -------------------------- requestAnimationFrame -------------------------- //\n\n// https://gist.github.com/1866474\n\nvar lastTime = 0;\nvar prefixes = 'webkit moz ms o'.split(' ');\n// get unprefixed rAF and cAF, if present\nvar requestAnimationFrame = window.requestAnimationFrame;\nvar cancelAnimationFrame = window.cancelAnimationFrame;\n// loop through vendor prefixes and get prefixed rAF and cAF\nvar prefix;\nfor( var i = 0; i < prefixes.length; i++ ) {\n  if ( requestAnimationFrame && cancelAnimationFrame ) {\n    break;\n  }\n  prefix = prefixes[i];\n  requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];\n  cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||\n                            window[ prefix + 'CancelRequestAnimationFrame' ];\n}\n\n// fallback to setTimeout and clearTimeout if either request/cancel is not supported\nif ( !requestAnimationFrame || !cancelAnimationFrame )  {\n  requestAnimationFrame = function( callback ) {\n    var currTime = new Date().getTime();\n    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );\n    var id = window.setTimeout( function() {\n      callback( currTime + timeToCall );\n    }, timeToCall );\n    lastTime = currTime + timeToCall;\n    return id;\n  };\n\n  cancelAnimationFrame = function( id ) {\n    window.clearTimeout( id );\n  };\n}\n\n// -------------------------- definition -------------------------- //\n\nfunction draggabillyDefinition( classie, EventEmitter, eventie, getStyleProperty, getSize ) {\n\n// -------------------------- support -------------------------- //\n\nvar transformProperty = getStyleProperty('transform');\n// TODO fix quick & dirty check for 3D support\nvar is3d = !!getStyleProperty('perspective');\n\n// --------------------------  -------------------------- //\n\nfunction Draggabilly( element, options ) {\n  this.element = element;\n\n  this.options = extend( {}, this.options );\n  extend( this.options, options );\n\n  this._create();\n\n}\n\n// inherit EventEmitter methods\nextend( Draggabilly.prototype, EventEmitter.prototype );\n\nDraggabilly.prototype.options = {\n};\n\nDraggabilly.prototype._create = function() {\n\n  // properties\n  this.position = {};\n  this._getPosition();\n\n  this.startPoint = { x: 0, y: 0 };\n  this.dragPoint = { x: 0, y: 0 };\n\n  this.startPosition = extend( {}, this.position );\n\n  // set relative positioning\n  var style = getStyle( this.element );\n  if ( style.position !== 'relative' && style.position !== 'absolute' ) {\n    this.element.style.position = 'relative';\n  }\n\n  this.enable();\n  this.setHandles();\n\n};\n\n/**\n * set this.handles and bind start events to 'em\n */\nDraggabilly.prototype.setHandles = function() {\n  this.handles = this.options.handle ?\n    this.element.querySelectorAll( this.options.handle ) : [ this.element ];\n\n  for ( var i=0, len = this.handles.length; i < len; i++ ) {\n    var handle = this.handles[i];\n    // bind pointer start event\n    // listen for both, for devices like Chrome Pixel\n    //   which has touch and mouse events\n    eventie.bind( handle, 'mousedown', this );\n    eventie.bind( handle, 'touchstart', this );\n    disableImgOndragstart( handle );\n  }\n};\n\n// remove default dragging interaction on all images in IE8\n// IE8 does its own drag thing on images, which messes stuff up\n\nfunction noDragStart() {\n  return false;\n}\n\n// TODO replace this with a IE8 test\nvar isIE8 = 'attachEvent' in document.documentElement;\n\n// IE8 only\nvar disableImgOndragstart = !isIE8 ? noop : function( handle ) {\n\n  if ( handle.nodeName === 'IMG' ) {\n    handle.ondragstart = noDragStart;\n  }\n\n  var images = handle.querySelectorAll('img');\n  for ( var i=0, len = images.length; i < len; i++ ) {\n    var img = images[i];\n    img.ondragstart = noDragStart;\n  }\n};\n\n\n// get left/top position from style\nDraggabilly.prototype._getPosition = function() {\n  // properties\n  var style = getStyle( this.element );\n\n  var x = parseInt( style.left, 10 );\n  var y = parseInt( style.top, 10 );\n\n  // clean up 'auto' or other non-integer values\n  this.position.x = isNaN( x ) ? 0 : x;\n  this.position.y = isNaN( y ) ? 0 : y;\n\n  this._addTransformPosition( style );\n};\n\n// add transform: translate( x, y ) to position\nDraggabilly.prototype._addTransformPosition = function( style ) {\n  if ( !transformProperty ) {\n    return;\n  }\n  var transform = style[ transformProperty ];\n  // bail out if value is 'none'\n  if ( transform.indexOf('matrix') !== 0 ) {\n    return;\n  }\n  // split matrix(1, 0, 0, 1, x, y)\n  var matrixValues = transform.split(',');\n  // translate X value is in 12th or 4th position\n  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;\n  var translateX = parseInt( matrixValues[ xIndex ], 10 );\n  // translate Y value is in 13th or 5th position\n  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );\n  this.position.x += translateX;\n  this.position.y += translateY;\n};\n\n// -------------------------- events -------------------------- //\n\n// trigger handler methods for events\nDraggabilly.prototype.handleEvent = function( event ) {\n  var method = 'on' + event.type;\n  if ( this[ method ] ) {\n    this[ method ]( event );\n  }\n};\n\n// returns the touch that we're keeping track of\nDraggabilly.prototype.getTouch = function( touches ) {\n  for ( var i=0, len = touches.length; i < len; i++ ) {\n    var touch = touches[i];\n    if ( touch.identifier === this.pointerIdentifier ) {\n      return touch;\n    }\n  }\n};\n\n// ----- start event ----- //\n\nDraggabilly.prototype.onmousedown = function( event ) {\n  // dismiss clicks from right or middle buttons\n  var button = event.button;\n  if ( button && ( button !== 0 && button !== 1 ) ) {\n    return;\n  }\n  this.dragStart( event, event );\n};\n\nDraggabilly.prototype.ontouchstart = function( event ) {\n  // disregard additional touches\n  if ( this.isDragging ) {\n    return;\n  }\n\n  this.dragStart( event, event.changedTouches[0] );\n};\n\nfunction setPointerPoint( point, pointer ) {\n  point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;\n  point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;\n}\n\n/**\n * drag start\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragStart = function( event, pointer ) {\n  if ( !this.isEnabled ) {\n    return;\n  }\n\n  if ( event.preventDefault ) {\n    event.preventDefault();\n  } else {\n    event.returnValue = false;\n  }\n\n  var isTouch = event.type === 'touchstart';\n\n  // save pointer identifier to match up touch events\n  this.pointerIdentifier = pointer.identifier;\n\n  this._getPosition();\n\n  this.measureContainment();\n\n  // point where drag began\n  setPointerPoint( this.startPoint, pointer );\n  // position _when_ drag began\n  this.startPosition.x = this.position.x;\n  this.startPosition.y = this.position.y;\n\n  // reset left/top style\n  this.setLeftTop();\n\n  this.dragPoint.x = 0;\n  this.dragPoint.y = 0;\n\n  // bind move and end events\n  this._bindEvents({\n    events: isTouch ? [ 'touchmove', 'touchend', 'touchcancel' ] :\n      [ 'mousemove', 'mouseup' ],\n    // IE8 needs to be bound to document\n    node: event.preventDefault ? window : document\n  });\n\n  classie.add( this.element, 'is-dragging' );\n\n  // reset isDragging flag\n  this.isDragging = true;\n\n  this.emitEvent( 'dragStart', [ this, event, pointer ] );\n\n  // start animation\n  this.animate();\n};\n\nDraggabilly.prototype._bindEvents = function( args ) {\n  for ( var i=0, len = args.events.length; i < len; i++ ) {\n    var event = args.events[i];\n    eventie.bind( args.node, event, this );\n  }\n  // save these arguments\n  this._boundEvents = args;\n};\n\nDraggabilly.prototype._unbindEvents = function() {\n  var args = this._boundEvents;\n  // IE8 can trigger dragEnd twice, check for _boundEvents\n  if ( !args || !args.events ) {\n    return;\n  }\n\n  for ( var i=0, len = args.events.length; i < len; i++ ) {\n    var event = args.events[i];\n    eventie.unbind( args.node, event, this );\n  }\n  delete this._boundEvents;\n};\n\nDraggabilly.prototype.measureContainment = function() {\n  var containment = this.options.containment;\n  if ( !containment ) {\n    return;\n  }\n\n  this.size = getSize( this.element );\n  var elemRect = this.element.getBoundingClientRect();\n\n  // use element if element\n  var container = isElement( containment ) ? containment :\n    // fallback to querySelector if string\n    typeof containment === 'string' ? document.querySelector( containment ) :\n    // otherwise just `true`, use the parent\n    this.element.parentNode;\n\n  this.containerSize = getSize( container );\n  var containerRect = container.getBoundingClientRect();\n\n  this.relativeStartPosition = {\n    x: elemRect.left - containerRect.left,\n    y: elemRect.top  - containerRect.top\n  };\n};\n\n// ----- move event ----- //\n\nDraggabilly.prototype.onmousemove = function( event ) {\n  this.dragMove( event, event );\n};\n\nDraggabilly.prototype.ontouchmove = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  if ( touch ) {\n    this.dragMove( event, touch );\n  }\n};\n\n/**\n * drag move\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragMove = function( event, pointer ) {\n\n  setPointerPoint( this.dragPoint, pointer );\n  this.dragPoint.x -= this.startPoint.x;\n  this.dragPoint.y -= this.startPoint.y;\n\n  if ( this.options.containment ) {\n    var relX = this.relativeStartPosition.x;\n    var relY = this.relativeStartPosition.y;\n    this.dragPoint.x = Math.max( this.dragPoint.x, -relX );\n    this.dragPoint.y = Math.max( this.dragPoint.y, -relY );\n    this.dragPoint.x = Math.min( this.dragPoint.x, this.containerSize.width - relX - this.size.width );\n    this.dragPoint.y = Math.min( this.dragPoint.y, this.containerSize.height - relY - this.size.height );\n  }\n\n  this.position.x = this.startPosition.x + this.dragPoint.x;\n  this.position.y = this.startPosition.y + this.dragPoint.y;\n\n  this.emitEvent( 'dragMove', [ this, event, pointer ] );\n};\n\n\n// ----- end event ----- //\n\nDraggabilly.prototype.onmouseup = function( event ) {\n  this.dragEnd( event, event );\n};\n\nDraggabilly.prototype.ontouchend = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  if ( touch ) {\n    this.dragEnd( event, touch );\n  }\n};\n\n/**\n * drag end\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragEnd = function( event, pointer ) {\n  this.isDragging = false;\n\n  delete this.pointerIdentifier;\n\n  // use top left position when complete\n  if ( transformProperty ) {\n    this.element.style[ transformProperty ] = '';\n    this.setLeftTop();\n  }\n\n  // remove events\n  this._unbindEvents();\n\n  classie.remove( this.element, 'is-dragging' );\n\n  this.emitEvent( 'dragEnd', [ this, event, pointer ] );\n\n};\n\n// ----- cancel event ----- //\n\n// coerce to end event\nDraggabilly.prototype.ontouchcancel = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  this.dragEnd( event, touch );\n};\n\n// -------------------------- animation -------------------------- //\n\nDraggabilly.prototype.animate = function() {\n  // only render and animate if dragging\n  if ( !this.isDragging ) {\n    return;\n  }\n\n  this.positionDrag();\n\n  var _this = this;\n  requestAnimationFrame( function animateFrame() {\n    _this.animate();\n  });\n\n};\n\n// transform translate function\nvar translate = is3d ?\n  function( x, y ) {\n    return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';\n  } :\n  function( x, y ) {\n    return 'translate( ' + x + 'px, ' + y + 'px)';\n  };\n\n// left/top positioning\nDraggabilly.prototype.setLeftTop = function() {\n  this.element.style.left = this.position.x + 'px';\n  this.element.style.top  = this.position.y + 'px';\n};\n\nDraggabilly.prototype.positionDrag = transformProperty ?\n  function() {\n    // position with transform\n    this.element.style[ transformProperty ] = translate( this.dragPoint.x, this.dragPoint.y );\n  } : Draggabilly.prototype.setLeftTop;\n\nDraggabilly.prototype.enable = function() {\n  this.isEnabled = true;\n};\n\nDraggabilly.prototype.disable = function() {\n  this.isEnabled = false;\n  if ( this.isDragging ) {\n    this.dragEnd();\n  }\n};\n\nreturn Draggabilly;\n\n} // end definition\n\n// -------------------------- transport -------------------------- //\n\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( [\n      'classie/classie',\n      'eventEmitter/EventEmitter',\n      'eventie/eventie',\n      'get-style-property/get-style-property',\n      'get-size/get-size'\n    ],\n    draggabillyDefinition );\n} else {\n  // browser global\n  window.Draggabilly = draggabillyDefinition(\n    window.classie,\n    window.EventEmitter,\n    window.eventie,\n    window.getStyleProperty,\n    window.getSize\n  );\n}\n\n})( window );\n//@ sourceURL=lib/dragabilly.js\n",
      "type": "blob"
    }
  },
  "distribution": {
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.10.1.min.js\",\"https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\",\"https://pixipaint.net/envweb-v0.4.7.js\"],\"dependencies\":{\"appcache\":\"distri/appcache:v0.2.0\",\"hotkeys\":\"distri/hotkeys:v0.2.0\",\"jquery-utils\":\"distri/jquery-utils:v0.2.0\",\"runtime\":\"STRd6/runtime:v0.2.0\",\"touch-canvas\":\"distri/touch-canvas:v0.3.0\",\"undo\":\"distri/undo:v0.2.0\"}};",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var editSprite, send, sprites,\n    __slice = [].slice;\n\n  require(\"./lib/dragabilly\");\n\n  editSprite = function(data) {\n    var eventProcessor, pixelEditorWindow;\n    eventProcessor = function(event) {\n      var _ref, _ref1;\n      if (event.source === pixelEditorWindow) {\n        console.log(event);\n        if (((_ref = event.data) != null ? _ref.status : void 0) === \"unload\") {\n          removeEventListener(eventProcessor);\n        }\n        if (((_ref1 = event.data) != null ? _ref1.status : void 0) === \"ready\") {\n          return send(pixelEditorWindow, \"fromDataURL\", data);\n        }\n      }\n    };\n    addEventListener(\"message\", eventProcessor, false);\n    return pixelEditorWindow = window.open(\"http://strd6.github.io/pixel-editor/\", \"\", \"width=640,height=480\");\n  };\n\n  send = function() {\n    var method, params, target;\n    target = arguments[0], method = arguments[1], params = 3 <= arguments.length ? __slice.call(arguments, 2) : [];\n    return target.postMessage({\n      method: method,\n      params: params\n    }, \"*\");\n  };\n\n  try {\n    sprites = JSON.parse(localStorage.images);\n  } catch (_error) {\n    sprites = {\n      wizard: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2WyxHCMAxEnT6YoQRKoBBqgBNlcIIaKIQSKIEZ+jDeYHmWkGBJAcKBHJjg3z5vJNlNmPhpxuovl9t4Ou3c67gnAhzis8U6HPdz9zruiSIOkMkBrudD8H4GlwO8ezgwOcCYz2B2oLt7ySKvC38AkwNiP+zmB7XAG4xqAIiLaEq53gKaxrTtlpQ0AbBwjDE0zX06vwPiIwB5y8WFIYA0Tr0prGkZHMnip0+Qd25d0w7AAScU0pYLkgnC7EA+/cJqcykupMOo/Me7xVktQGu/7DSLPIj29KvWVg1CoLOAWC0uAOinACyx8DYHICqO5INJFQtagLbe4IdTsRuI0p8Llmpt1SBK+lKIWFz6JTg/kQWFYeg+YPnuXMWsDpSb8FMpTA2eS4kJQE5ErnwM8hUAiEOISzIDWSHUDry6C/YAqFJQPUgqISZ0xbpO8G1Jcy+oOsA3ob7Aq7XVIKoANYGx/ZMD3AAsruMhfeZcmgAAAABJRU5ErkJggg==\"\n    };\n  }\n\n  Object.keys(sprites).forEach(function(name) {\n    var img;\n    img = new Image;\n    img.src = sprites[name];\n    return document.body.appendChild(img);\n  });\n\n  $(\"body\").on(\"dblclick\", \"img\", function() {\n    return editSprite(this.src);\n  });\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"html,\\nbody {\\n  width: 100%;\\n  height: 100%;\\n}\";",
      "type": "blob"
    },
    "lib/dragabilly": {
      "path": "lib/dragabilly",
      "content": "/*!\n * Draggabilly PACKAGED v1.0.7\n * Make that shiz draggable\n * http://draggabilly.desandro.com\n */\n\n\n/*!\n * classie - class helper functions\n * from bonzo https://github.com/ded/bonzo\n * \n * classie.has( elem, 'my-class' ) -> true/false\n * classie.add( elem, 'my-new-class' )\n * classie.remove( elem, 'my-unwanted-class' )\n * classie.toggle( elem, 'my-class' )\n */\n\n/*jshint browser: true, strict: true, undef: true */\n/*global define: false */\n\n( function( window ) {\n\n\n\n// class helper functions from bonzo https://github.com/ded/bonzo\n\nfunction classReg( className ) {\n  return new RegExp(\"(^|\\\\s+)\" + className + \"(\\\\s+|$)\");\n}\n\n// classList support for class management\n// altho to be fair, the api sucks because it won't accept multiple classes at once\nvar hasClass, addClass, removeClass;\n\nif ( 'classList' in document.documentElement ) {\n  hasClass = function( elem, c ) {\n    return elem.classList.contains( c );\n  };\n  addClass = function( elem, c ) {\n    elem.classList.add( c );\n  };\n  removeClass = function( elem, c ) {\n    elem.classList.remove( c );\n  };\n}\nelse {\n  hasClass = function( elem, c ) {\n    return classReg( c ).test( elem.className );\n  };\n  addClass = function( elem, c ) {\n    if ( !hasClass( elem, c ) ) {\n      elem.className = elem.className + ' ' + c;\n    }\n  };\n  removeClass = function( elem, c ) {\n    elem.className = elem.className.replace( classReg( c ), ' ' );\n  };\n}\n\nfunction toggleClass( elem, c ) {\n  var fn = hasClass( elem, c ) ? removeClass : addClass;\n  fn( elem, c );\n}\n\nvar classie = {\n  // full names\n  hasClass: hasClass,\n  addClass: addClass,\n  removeClass: removeClass,\n  toggleClass: toggleClass,\n  // short names\n  has: hasClass,\n  add: addClass,\n  remove: removeClass,\n  toggle: toggleClass\n};\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'classie/classie',classie );\n} else {\n  // browser global\n  window.classie = classie;\n}\n\n})( window );\n\n/*!\n * EventEmitter v4.2.4 - git.io/ee\n * Oliver Caldwell\n * MIT license\n * @preserve\n */\n\n(function () {\n  \n\n\t/**\n\t * Class for managing events.\n\t * Can be extended to provide event functionality in other classes.\n\t *\n\t * @class EventEmitter Manages event registering and emitting.\n\t */\n\tfunction EventEmitter() {}\n\n\t// Shortcuts to improve speed and size\n\n\t// Easy access to the prototype\n\tvar proto = EventEmitter.prototype;\n\n\t/**\n\t * Finds the index of the listener for the event in it's storage array.\n\t *\n\t * @param {Function[]} listeners Array of listeners to search through.\n\t * @param {Function} listener Method to look for.\n\t * @return {Number} Index of the specified listener, -1 if not found\n\t * @api private\n\t */\n\tfunction indexOfListener(listeners, listener) {\n\t\tvar i = listeners.length;\n\t\twhile (i--) {\n\t\t\tif (listeners[i].listener === listener) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\n\t\treturn -1;\n\t}\n\n\t/**\n\t * Alias a method while keeping the context correct, to allow for overwriting of target method.\n\t *\n\t * @param {String} name The name of the target method.\n\t * @return {Function} The aliased method\n\t * @api private\n\t */\n\tfunction alias(name) {\n\t\treturn function aliasClosure() {\n\t\t\treturn this[name].apply(this, arguments);\n\t\t};\n\t}\n\n\t/**\n\t * Returns the listener array for the specified event.\n\t * Will initialise the event object and listener arrays if required.\n\t * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.\n\t * Each property in the object response is an array of listener functions.\n\t *\n\t * @param {String|RegExp} evt Name of the event to return the listeners from.\n\t * @return {Function[]|Object} All listener functions for the event.\n\t */\n\tproto.getListeners = function getListeners(evt) {\n\t\tvar events = this._getEvents();\n\t\tvar response;\n\t\tvar key;\n\n\t\t// Return a concatenated array of all matching events if\n\t\t// the selector is a regular expression.\n\t\tif (typeof evt === 'object') {\n\t\t\tresponse = {};\n\t\t\tfor (key in events) {\n\t\t\t\tif (events.hasOwnProperty(key) && evt.test(key)) {\n\t\t\t\t\tresponse[key] = events[key];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\tresponse = events[evt] || (events[evt] = []);\n\t\t}\n\n\t\treturn response;\n\t};\n\n\t/**\n\t * Takes a list of listener objects and flattens it into a list of listener functions.\n\t *\n\t * @param {Object[]} listeners Raw listener objects.\n\t * @return {Function[]} Just the listener functions.\n\t */\n\tproto.flattenListeners = function flattenListeners(listeners) {\n\t\tvar flatListeners = [];\n\t\tvar i;\n\n\t\tfor (i = 0; i < listeners.length; i += 1) {\n\t\t\tflatListeners.push(listeners[i].listener);\n\t\t}\n\n\t\treturn flatListeners;\n\t};\n\n\t/**\n\t * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.\n\t *\n\t * @param {String|RegExp} evt Name of the event to return the listeners from.\n\t * @return {Object} All listener functions for an event in an object.\n\t */\n\tproto.getListenersAsObject = function getListenersAsObject(evt) {\n\t\tvar listeners = this.getListeners(evt);\n\t\tvar response;\n\n\t\tif (listeners instanceof Array) {\n\t\t\tresponse = {};\n\t\t\tresponse[evt] = listeners;\n\t\t}\n\n\t\treturn response || listeners;\n\t};\n\n\t/**\n\t * Adds a listener function to the specified event.\n\t * The listener will not be added if it is a duplicate.\n\t * If the listener returns true then it will be removed after it is called.\n\t * If you pass a regular expression as the event name then the listener will be added to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to attach the listener to.\n\t * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addListener = function addListener(evt, listener) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar listenerIsWrapped = typeof listener === 'object';\n\t\tvar key;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {\n\t\t\t\tlisteners[key].push(listenerIsWrapped ? listener : {\n\t\t\t\t\tlistener: listener,\n\t\t\t\t\tonce: false\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of addListener\n\t */\n\tproto.on = alias('addListener');\n\n\t/**\n\t * Semi-alias of addListener. It will add a listener that will be\n\t * automatically removed after it's first execution.\n\t *\n\t * @param {String|RegExp} evt Name of the event to attach the listener to.\n\t * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addOnceListener = function addOnceListener(evt, listener) {\n\t\treturn this.addListener(evt, {\n\t\t\tlistener: listener,\n\t\t\tonce: true\n\t\t});\n\t};\n\n\t/**\n\t * Alias of addOnceListener.\n\t */\n\tproto.once = alias('addOnceListener');\n\n\t/**\n\t * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.\n\t * You need to tell it what event names should be matched by a regex.\n\t *\n\t * @param {String} evt Name of the event to create.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.defineEvent = function defineEvent(evt) {\n\t\tthis.getListeners(evt);\n\t\treturn this;\n\t};\n\n\t/**\n\t * Uses defineEvent to define multiple events.\n\t *\n\t * @param {String[]} evts An array of event names to define.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.defineEvents = function defineEvents(evts) {\n\t\tfor (var i = 0; i < evts.length; i += 1) {\n\t\t\tthis.defineEvent(evts[i]);\n\t\t}\n\t\treturn this;\n\t};\n\n\t/**\n\t * Removes a listener function from the specified event.\n\t * When passed a regular expression as the event name, it will remove the listener from all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to remove the listener from.\n\t * @param {Function} listener Method to remove from the event.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeListener = function removeListener(evt, listener) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar index;\n\t\tvar key;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key)) {\n\t\t\t\tindex = indexOfListener(listeners[key], listener);\n\n\t\t\t\tif (index !== -1) {\n\t\t\t\t\tlisteners[key].splice(index, 1);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of removeListener\n\t */\n\tproto.off = alias('removeListener');\n\n\t/**\n\t * Adds listeners in bulk using the manipulateListeners method.\n\t * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.\n\t * You can also pass it a regular expression to add the array of listeners to all events that match it.\n\t * Yeah, this function does quite a bit. That's probably a bad thing.\n\t *\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to add.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.addListeners = function addListeners(evt, listeners) {\n\t\t// Pass through to manipulateListeners\n\t\treturn this.manipulateListeners(false, evt, listeners);\n\t};\n\n\t/**\n\t * Removes listeners in bulk using the manipulateListeners method.\n\t * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n\t * You can also pass it an event name and an array of listeners to be removed.\n\t * You can also pass it a regular expression to remove the listeners from all events that match it.\n\t *\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to remove.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeListeners = function removeListeners(evt, listeners) {\n\t\t// Pass through to manipulateListeners\n\t\treturn this.manipulateListeners(true, evt, listeners);\n\t};\n\n\t/**\n\t * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.\n\t * The first argument will determine if the listeners are removed (true) or added (false).\n\t * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.\n\t * You can also pass it an event name and an array of listeners to be added/removed.\n\t * You can also pass it a regular expression to manipulate the listeners of all events that match it.\n\t *\n\t * @param {Boolean} remove True if you want to remove listeners, false if you want to add.\n\t * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.\n\t * @param {Function[]} [listeners] An optional array of listener functions to add/remove.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {\n\t\tvar i;\n\t\tvar value;\n\t\tvar single = remove ? this.removeListener : this.addListener;\n\t\tvar multiple = remove ? this.removeListeners : this.addListeners;\n\n\t\t// If evt is an object then pass each of it's properties to this method\n\t\tif (typeof evt === 'object' && !(evt instanceof RegExp)) {\n\t\t\tfor (i in evt) {\n\t\t\t\tif (evt.hasOwnProperty(i) && (value = evt[i])) {\n\t\t\t\t\t// Pass the single listener straight through to the singular method\n\t\t\t\t\tif (typeof value === 'function') {\n\t\t\t\t\t\tsingle.call(this, i, value);\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\t// Otherwise pass back to the multiple function\n\t\t\t\t\t\tmultiple.call(this, i, value);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\t// So evt must be a string\n\t\t\t// And listeners must be an array of listeners\n\t\t\t// Loop over it and pass each one to the multiple method\n\t\t\ti = listeners.length;\n\t\t\twhile (i--) {\n\t\t\t\tsingle.call(this, evt, listeners[i]);\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Removes all listeners from a specified event.\n\t * If you do not specify an event then all listeners will be removed.\n\t * That means every event will be emptied.\n\t * You can also pass a regex to remove all events that match it.\n\t *\n\t * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.removeEvent = function removeEvent(evt) {\n\t\tvar type = typeof evt;\n\t\tvar events = this._getEvents();\n\t\tvar key;\n\n\t\t// Remove different things depending on the state of evt\n\t\tif (type === 'string') {\n\t\t\t// Remove all listeners for the specified event\n\t\t\tdelete events[evt];\n\t\t}\n\t\telse if (type === 'object') {\n\t\t\t// Remove all events matching the regex.\n\t\t\tfor (key in events) {\n\t\t\t\tif (events.hasOwnProperty(key) && evt.test(key)) {\n\t\t\t\t\tdelete events[key];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\telse {\n\t\t\t// Remove all listeners in all events\n\t\t\tdelete this._events;\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of removeEvent.\n\t *\n\t * Added to mirror the node API.\n\t */\n\tproto.removeAllListeners = alias('removeEvent');\n\n\t/**\n\t * Emits an event of your choice.\n\t * When emitted, every listener attached to that event will be executed.\n\t * If you pass the optional argument array then those arguments will be passed to every listener upon execution.\n\t * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.\n\t * So they will not arrive within the array on the other side, they will be separate.\n\t * You can also pass a regular expression to emit to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n\t * @param {Array} [args] Optional array of arguments to be passed to each listener.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.emitEvent = function emitEvent(evt, args) {\n\t\tvar listeners = this.getListenersAsObject(evt);\n\t\tvar listener;\n\t\tvar i;\n\t\tvar key;\n\t\tvar response;\n\n\t\tfor (key in listeners) {\n\t\t\tif (listeners.hasOwnProperty(key)) {\n\t\t\t\ti = listeners[key].length;\n\n\t\t\t\twhile (i--) {\n\t\t\t\t\t// If the listener returns true then it shall be removed from the event\n\t\t\t\t\t// The function is executed either with a basic call or an apply if there is an args array\n\t\t\t\t\tlistener = listeners[key][i];\n\n\t\t\t\t\tif (listener.once === true) {\n\t\t\t\t\t\tthis.removeListener(evt, listener.listener);\n\t\t\t\t\t}\n\n\t\t\t\t\tresponse = listener.listener.apply(this, args || []);\n\n\t\t\t\t\tif (response === this._getOnceReturnValue()) {\n\t\t\t\t\t\tthis.removeListener(evt, listener.listener);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t/**\n\t * Alias of emitEvent\n\t */\n\tproto.trigger = alias('emitEvent');\n\n\t/**\n\t * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.\n\t * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.\n\t *\n\t * @param {String|RegExp} evt Name of the event to emit and execute listeners for.\n\t * @param {...*} Optional additional arguments to be passed to each listener.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.emit = function emit(evt) {\n\t\tvar args = Array.prototype.slice.call(arguments, 1);\n\t\treturn this.emitEvent(evt, args);\n\t};\n\n\t/**\n\t * Sets the current value to check against when executing listeners. If a\n\t * listeners return value matches the one set here then it will be removed\n\t * after execution. This value defaults to true.\n\t *\n\t * @param {*} value The new value to check for when executing listeners.\n\t * @return {Object} Current instance of EventEmitter for chaining.\n\t */\n\tproto.setOnceReturnValue = function setOnceReturnValue(value) {\n\t\tthis._onceReturnValue = value;\n\t\treturn this;\n\t};\n\n\t/**\n\t * Fetches the current value to check against when executing listeners. If\n\t * the listeners return value matches this one then it should be removed\n\t * automatically. It will return true by default.\n\t *\n\t * @return {*|Boolean} The current value to check for or the default, true.\n\t * @api private\n\t */\n\tproto._getOnceReturnValue = function _getOnceReturnValue() {\n\t\tif (this.hasOwnProperty('_onceReturnValue')) {\n\t\t\treturn this._onceReturnValue;\n\t\t}\n\t\telse {\n\t\t\treturn true;\n\t\t}\n\t};\n\n\t/**\n\t * Fetches the events object and creates one if required.\n\t *\n\t * @return {Object} The events storage object.\n\t * @api private\n\t */\n\tproto._getEvents = function _getEvents() {\n\t\treturn this._events || (this._events = {});\n\t};\n\n  global.EventEmitter = EventEmitter;\n\n}.call(this));\n\n/*!\n * eventie v1.0.3\n * event binding helper\n *   eventie.bind( elem, 'click', myFn )\n *   eventie.unbind( elem, 'click', myFn )\n */\n\n/*jshint browser: true, undef: true, unused: true */\n/*global define: false */\n\n( function( window ) {\n\n\n\nvar docElem = document.documentElement;\n\nvar bind = function() {};\n\nif ( docElem.addEventListener ) {\n  bind = function( obj, type, fn ) {\n    obj.addEventListener( type, fn, false );\n  };\n} else if ( docElem.attachEvent ) {\n  bind = function( obj, type, fn ) {\n    obj[ type + fn ] = fn.handleEvent ?\n      function() {\n        var event = window.event;\n        // add event.target\n        event.target = event.target || event.srcElement;\n        fn.handleEvent.call( fn, event );\n      } :\n      function() {\n        var event = window.event;\n        // add event.target\n        event.target = event.target || event.srcElement;\n        fn.call( obj, event );\n      };\n    obj.attachEvent( \"on\" + type, obj[ type + fn ] );\n  };\n}\n\nvar unbind = function() {};\n\nif ( docElem.removeEventListener ) {\n  unbind = function( obj, type, fn ) {\n    obj.removeEventListener( type, fn, false );\n  };\n} else if ( docElem.detachEvent ) {\n  unbind = function( obj, type, fn ) {\n    obj.detachEvent( \"on\" + type, obj[ type + fn ] );\n    try {\n      delete obj[ type + fn ];\n    } catch ( err ) {\n      // can't delete window object properties\n      obj[ type + fn ] = undefined;\n    }\n  };\n}\n\nvar eventie = {\n  bind: bind,\n  unbind: unbind\n};\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'eventie/eventie',eventie );\n} else {\n  // browser global\n  window.eventie = eventie;\n}\n\n})( this );\n\n/*!\n * getStyleProperty by kangax\n * http://perfectionkills.com/feature-testing-css-properties/\n */\n\n/*jshint browser: true, strict: true, undef: true */\n/*globals define: false */\n\n( function( window ) {\n\n\n\nvar prefixes = 'Webkit Moz ms Ms O'.split(' ');\nvar docElemStyle = document.documentElement.style;\n\nfunction getStyleProperty( propName ) {\n  if ( !propName ) {\n    return;\n  }\n\n  // test standard property first\n  if ( typeof docElemStyle[ propName ] === 'string' ) {\n    return propName;\n  }\n\n  // capitalize\n  propName = propName.charAt(0).toUpperCase() + propName.slice(1);\n\n  // test vendor specific properties\n  var prefixed;\n  for ( var i=0, len = prefixes.length; i < len; i++ ) {\n    prefixed = prefixes[i] + propName;\n    if ( typeof docElemStyle[ prefixed ] === 'string' ) {\n      return prefixed;\n    }\n  }\n}\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'get-style-property/get-style-property',[],function() {\n    return getStyleProperty;\n  });\n} else {\n  // browser global\n  window.getStyleProperty = getStyleProperty;\n}\n\n})( window );\n\n/**\n * getSize v1.1.5\n * measure size of elements\n */\n\n/*jshint browser: true, strict: true, undef: true, unused: true */\n/*global define: false */\n\n( function( window, undefined ) {\n\n\n\n// -------------------------- helpers -------------------------- //\n\nvar defView = document.defaultView;\nvar isComputedStyle = defView && defView.getComputedStyle;\n\nvar getStyle = isComputedStyle ?\n  function( elem ) {\n    return defView.getComputedStyle( elem, null );\n  } :\n  function( elem ) {\n    return elem.currentStyle;\n  };\n\n// get a number from a string, not a percentage\nfunction getStyleSize( value ) {\n  var num = parseFloat( value );\n  // not a percent like '100%', and a number\n  var isValid = value.indexOf('%') === -1 && !isNaN( num );\n  return isValid && num;\n}\n\n// -------------------------- measurements -------------------------- //\n\nvar measurements = [\n  'paddingLeft',\n  'paddingRight',\n  'paddingTop',\n  'paddingBottom',\n  'marginLeft',\n  'marginRight',\n  'marginTop',\n  'marginBottom',\n  'borderLeftWidth',\n  'borderRightWidth',\n  'borderTopWidth',\n  'borderBottomWidth'\n];\n\nfunction getZeroSize() {\n  var size = {\n    width: 0,\n    height: 0,\n    innerWidth: 0,\n    innerHeight: 0,\n    outerWidth: 0,\n    outerHeight: 0\n  };\n  for ( var i=0, len = measurements.length; i < len; i++ ) {\n    var measurement = measurements[i];\n    size[ measurement ] = 0;\n  }\n  return size;\n}\n\n\n\nfunction defineGetSize( getStyleProperty ) {\n\n// -------------------------- box sizing -------------------------- //\n\nvar boxSizingProp = getStyleProperty('boxSizing');\nvar isBoxSizeOuter;\n\n/**\n * WebKit measures the outer-width on style.width on border-box elems\n * IE & Firefox measures the inner-width\n */\n( function() {\n  if ( !boxSizingProp ) {\n    return;\n  }\n\n  var div = document.createElement('div');\n  div.style.width = '200px';\n  div.style.padding = '1px 2px 3px 4px';\n  div.style.borderStyle = 'solid';\n  div.style.borderWidth = '1px 2px 3px 4px';\n  div.style[ boxSizingProp ] = 'border-box';\n\n  var body = document.body || document.documentElement;\n  body.appendChild( div );\n  var style = getStyle( div );\n\n  isBoxSizeOuter = getStyleSize( style.width ) === 200;\n  body.removeChild( div );\n})();\n\n\n// -------------------------- getSize -------------------------- //\n\nfunction getSize( elem ) {\n  // use querySeletor if elem is string\n  if ( typeof elem === 'string' ) {\n    elem = document.querySelector( elem );\n  }\n\n  // do not proceed on non-objects\n  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {\n    return;\n  }\n\n  var style = getStyle( elem );\n\n  // if hidden, everything is 0\n  if ( style.display === 'none' ) {\n    return getZeroSize();\n  }\n\n  var size = {};\n  size.width = elem.offsetWidth;\n  size.height = elem.offsetHeight;\n\n  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&\n    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );\n\n  // get all measurements\n  for ( var i=0, len = measurements.length; i < len; i++ ) {\n    var measurement = measurements[i];\n    var value = style[ measurement ];\n    value = mungeNonPixel( elem, value );\n    var num = parseFloat( value );\n    // any 'auto', 'medium' value will be 0\n    size[ measurement ] = !isNaN( num ) ? num : 0;\n  }\n\n  var paddingWidth = size.paddingLeft + size.paddingRight;\n  var paddingHeight = size.paddingTop + size.paddingBottom;\n  var marginWidth = size.marginLeft + size.marginRight;\n  var marginHeight = size.marginTop + size.marginBottom;\n  var borderWidth = size.borderLeftWidth + size.borderRightWidth;\n  var borderHeight = size.borderTopWidth + size.borderBottomWidth;\n\n  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;\n\n  // overwrite width and height if we can get it from style\n  var styleWidth = getStyleSize( style.width );\n  if ( styleWidth !== false ) {\n    size.width = styleWidth +\n      // add padding and border unless it's already including it\n      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );\n  }\n\n  var styleHeight = getStyleSize( style.height );\n  if ( styleHeight !== false ) {\n    size.height = styleHeight +\n      // add padding and border unless it's already including it\n      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );\n  }\n\n  size.innerWidth = size.width - ( paddingWidth + borderWidth );\n  size.innerHeight = size.height - ( paddingHeight + borderHeight );\n\n  size.outerWidth = size.width + marginWidth;\n  size.outerHeight = size.height + marginHeight;\n\n  return size;\n}\n\n// IE8 returns percent values, not pixels\n// taken from jQuery's curCSS\nfunction mungeNonPixel( elem, value ) {\n  // IE8 and has percent value\n  if ( isComputedStyle || value.indexOf('%') === -1 ) {\n    return value;\n  }\n  var style = elem.style;\n\t// Remember the original values\n\tvar left = style.left;\n\tvar rs = elem.runtimeStyle;\n\tvar rsLeft = rs && rs.left;\n\n\t// Put in the new values to get a computed value out\n\tif ( rsLeft ) {\n\t\trs.left = elem.currentStyle.left;\n\t}\n\tstyle.left = value;\n\tvalue = style.pixelLeft;\n\n\t// Revert the changed values\n\tstyle.left = left;\n\tif ( rsLeft ) {\n\t\trs.left = rsLeft;\n\t}\n\n  return value;\n}\n\nreturn getSize;\n\n}\n\n// transport\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );\n} else {\n  // browser global\n  window.getSize = defineGetSize( window.getStyleProperty );\n}\n\n})( window );\n\n/*!\n * Draggabilly v1.0.7\n * Make that shiz draggable\n * http://draggabilly.desandro.com\n */\n\n( function( window ) {\n\n\n\n// vars\nvar document = window.document;\n\n// -------------------------- helpers -------------------------- //\n\n// extend objects\nfunction extend( a, b ) {\n  for ( var prop in b ) {\n    a[ prop ] = b[ prop ];\n  }\n  return a;\n}\n\nfunction noop() {}\n\n// ----- get style ----- //\n\nvar defView = document.defaultView;\n\nvar getStyle = defView && defView.getComputedStyle ?\n  function( elem ) {\n    return defView.getComputedStyle( elem, null );\n  } :\n  function( elem ) {\n    return elem.currentStyle;\n  };\n\n\n// http://stackoverflow.com/a/384380/182183\nvar isElement = ( typeof HTMLElement === 'object' ) ?\n  function isElementDOM2( obj ) {\n    return obj instanceof HTMLElement;\n  } :\n  function isElementQuirky( obj ) {\n    return obj && typeof obj === 'object' &&\n      obj.nodeType === 1 && typeof obj.nodeName === 'string';\n  };\n\n// -------------------------- requestAnimationFrame -------------------------- //\n\n// https://gist.github.com/1866474\n\nvar lastTime = 0;\nvar prefixes = 'webkit moz ms o'.split(' ');\n// get unprefixed rAF and cAF, if present\nvar requestAnimationFrame = window.requestAnimationFrame;\nvar cancelAnimationFrame = window.cancelAnimationFrame;\n// loop through vendor prefixes and get prefixed rAF and cAF\nvar prefix;\nfor( var i = 0; i < prefixes.length; i++ ) {\n  if ( requestAnimationFrame && cancelAnimationFrame ) {\n    break;\n  }\n  prefix = prefixes[i];\n  requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];\n  cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||\n                            window[ prefix + 'CancelRequestAnimationFrame' ];\n}\n\n// fallback to setTimeout and clearTimeout if either request/cancel is not supported\nif ( !requestAnimationFrame || !cancelAnimationFrame )  {\n  requestAnimationFrame = function( callback ) {\n    var currTime = new Date().getTime();\n    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );\n    var id = window.setTimeout( function() {\n      callback( currTime + timeToCall );\n    }, timeToCall );\n    lastTime = currTime + timeToCall;\n    return id;\n  };\n\n  cancelAnimationFrame = function( id ) {\n    window.clearTimeout( id );\n  };\n}\n\n// -------------------------- definition -------------------------- //\n\nfunction draggabillyDefinition( classie, EventEmitter, eventie, getStyleProperty, getSize ) {\n\n// -------------------------- support -------------------------- //\n\nvar transformProperty = getStyleProperty('transform');\n// TODO fix quick & dirty check for 3D support\nvar is3d = !!getStyleProperty('perspective');\n\n// --------------------------  -------------------------- //\n\nfunction Draggabilly( element, options ) {\n  this.element = element;\n\n  this.options = extend( {}, this.options );\n  extend( this.options, options );\n\n  this._create();\n\n}\n\n// inherit EventEmitter methods\nextend( Draggabilly.prototype, EventEmitter.prototype );\n\nDraggabilly.prototype.options = {\n};\n\nDraggabilly.prototype._create = function() {\n\n  // properties\n  this.position = {};\n  this._getPosition();\n\n  this.startPoint = { x: 0, y: 0 };\n  this.dragPoint = { x: 0, y: 0 };\n\n  this.startPosition = extend( {}, this.position );\n\n  // set relative positioning\n  var style = getStyle( this.element );\n  if ( style.position !== 'relative' && style.position !== 'absolute' ) {\n    this.element.style.position = 'relative';\n  }\n\n  this.enable();\n  this.setHandles();\n\n};\n\n/**\n * set this.handles and bind start events to 'em\n */\nDraggabilly.prototype.setHandles = function() {\n  this.handles = this.options.handle ?\n    this.element.querySelectorAll( this.options.handle ) : [ this.element ];\n\n  for ( var i=0, len = this.handles.length; i < len; i++ ) {\n    var handle = this.handles[i];\n    // bind pointer start event\n    // listen for both, for devices like Chrome Pixel\n    //   which has touch and mouse events\n    eventie.bind( handle, 'mousedown', this );\n    eventie.bind( handle, 'touchstart', this );\n    disableImgOndragstart( handle );\n  }\n};\n\n// remove default dragging interaction on all images in IE8\n// IE8 does its own drag thing on images, which messes stuff up\n\nfunction noDragStart() {\n  return false;\n}\n\n// TODO replace this with a IE8 test\nvar isIE8 = 'attachEvent' in document.documentElement;\n\n// IE8 only\nvar disableImgOndragstart = !isIE8 ? noop : function( handle ) {\n\n  if ( handle.nodeName === 'IMG' ) {\n    handle.ondragstart = noDragStart;\n  }\n\n  var images = handle.querySelectorAll('img');\n  for ( var i=0, len = images.length; i < len; i++ ) {\n    var img = images[i];\n    img.ondragstart = noDragStart;\n  }\n};\n\n\n// get left/top position from style\nDraggabilly.prototype._getPosition = function() {\n  // properties\n  var style = getStyle( this.element );\n\n  var x = parseInt( style.left, 10 );\n  var y = parseInt( style.top, 10 );\n\n  // clean up 'auto' or other non-integer values\n  this.position.x = isNaN( x ) ? 0 : x;\n  this.position.y = isNaN( y ) ? 0 : y;\n\n  this._addTransformPosition( style );\n};\n\n// add transform: translate( x, y ) to position\nDraggabilly.prototype._addTransformPosition = function( style ) {\n  if ( !transformProperty ) {\n    return;\n  }\n  var transform = style[ transformProperty ];\n  // bail out if value is 'none'\n  if ( transform.indexOf('matrix') !== 0 ) {\n    return;\n  }\n  // split matrix(1, 0, 0, 1, x, y)\n  var matrixValues = transform.split(',');\n  // translate X value is in 12th or 4th position\n  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;\n  var translateX = parseInt( matrixValues[ xIndex ], 10 );\n  // translate Y value is in 13th or 5th position\n  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );\n  this.position.x += translateX;\n  this.position.y += translateY;\n};\n\n// -------------------------- events -------------------------- //\n\n// trigger handler methods for events\nDraggabilly.prototype.handleEvent = function( event ) {\n  var method = 'on' + event.type;\n  if ( this[ method ] ) {\n    this[ method ]( event );\n  }\n};\n\n// returns the touch that we're keeping track of\nDraggabilly.prototype.getTouch = function( touches ) {\n  for ( var i=0, len = touches.length; i < len; i++ ) {\n    var touch = touches[i];\n    if ( touch.identifier === this.pointerIdentifier ) {\n      return touch;\n    }\n  }\n};\n\n// ----- start event ----- //\n\nDraggabilly.prototype.onmousedown = function( event ) {\n  // dismiss clicks from right or middle buttons\n  var button = event.button;\n  if ( button && ( button !== 0 && button !== 1 ) ) {\n    return;\n  }\n  this.dragStart( event, event );\n};\n\nDraggabilly.prototype.ontouchstart = function( event ) {\n  // disregard additional touches\n  if ( this.isDragging ) {\n    return;\n  }\n\n  this.dragStart( event, event.changedTouches[0] );\n};\n\nfunction setPointerPoint( point, pointer ) {\n  point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;\n  point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;\n}\n\n/**\n * drag start\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragStart = function( event, pointer ) {\n  if ( !this.isEnabled ) {\n    return;\n  }\n\n  if ( event.preventDefault ) {\n    event.preventDefault();\n  } else {\n    event.returnValue = false;\n  }\n\n  var isTouch = event.type === 'touchstart';\n\n  // save pointer identifier to match up touch events\n  this.pointerIdentifier = pointer.identifier;\n\n  this._getPosition();\n\n  this.measureContainment();\n\n  // point where drag began\n  setPointerPoint( this.startPoint, pointer );\n  // position _when_ drag began\n  this.startPosition.x = this.position.x;\n  this.startPosition.y = this.position.y;\n\n  // reset left/top style\n  this.setLeftTop();\n\n  this.dragPoint.x = 0;\n  this.dragPoint.y = 0;\n\n  // bind move and end events\n  this._bindEvents({\n    events: isTouch ? [ 'touchmove', 'touchend', 'touchcancel' ] :\n      [ 'mousemove', 'mouseup' ],\n    // IE8 needs to be bound to document\n    node: event.preventDefault ? window : document\n  });\n\n  classie.add( this.element, 'is-dragging' );\n\n  // reset isDragging flag\n  this.isDragging = true;\n\n  this.emitEvent( 'dragStart', [ this, event, pointer ] );\n\n  // start animation\n  this.animate();\n};\n\nDraggabilly.prototype._bindEvents = function( args ) {\n  for ( var i=0, len = args.events.length; i < len; i++ ) {\n    var event = args.events[i];\n    eventie.bind( args.node, event, this );\n  }\n  // save these arguments\n  this._boundEvents = args;\n};\n\nDraggabilly.prototype._unbindEvents = function() {\n  var args = this._boundEvents;\n  // IE8 can trigger dragEnd twice, check for _boundEvents\n  if ( !args || !args.events ) {\n    return;\n  }\n\n  for ( var i=0, len = args.events.length; i < len; i++ ) {\n    var event = args.events[i];\n    eventie.unbind( args.node, event, this );\n  }\n  delete this._boundEvents;\n};\n\nDraggabilly.prototype.measureContainment = function() {\n  var containment = this.options.containment;\n  if ( !containment ) {\n    return;\n  }\n\n  this.size = getSize( this.element );\n  var elemRect = this.element.getBoundingClientRect();\n\n  // use element if element\n  var container = isElement( containment ) ? containment :\n    // fallback to querySelector if string\n    typeof containment === 'string' ? document.querySelector( containment ) :\n    // otherwise just `true`, use the parent\n    this.element.parentNode;\n\n  this.containerSize = getSize( container );\n  var containerRect = container.getBoundingClientRect();\n\n  this.relativeStartPosition = {\n    x: elemRect.left - containerRect.left,\n    y: elemRect.top  - containerRect.top\n  };\n};\n\n// ----- move event ----- //\n\nDraggabilly.prototype.onmousemove = function( event ) {\n  this.dragMove( event, event );\n};\n\nDraggabilly.prototype.ontouchmove = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  if ( touch ) {\n    this.dragMove( event, touch );\n  }\n};\n\n/**\n * drag move\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragMove = function( event, pointer ) {\n\n  setPointerPoint( this.dragPoint, pointer );\n  this.dragPoint.x -= this.startPoint.x;\n  this.dragPoint.y -= this.startPoint.y;\n\n  if ( this.options.containment ) {\n    var relX = this.relativeStartPosition.x;\n    var relY = this.relativeStartPosition.y;\n    this.dragPoint.x = Math.max( this.dragPoint.x, -relX );\n    this.dragPoint.y = Math.max( this.dragPoint.y, -relY );\n    this.dragPoint.x = Math.min( this.dragPoint.x, this.containerSize.width - relX - this.size.width );\n    this.dragPoint.y = Math.min( this.dragPoint.y, this.containerSize.height - relY - this.size.height );\n  }\n\n  this.position.x = this.startPosition.x + this.dragPoint.x;\n  this.position.y = this.startPosition.y + this.dragPoint.y;\n\n  this.emitEvent( 'dragMove', [ this, event, pointer ] );\n};\n\n\n// ----- end event ----- //\n\nDraggabilly.prototype.onmouseup = function( event ) {\n  this.dragEnd( event, event );\n};\n\nDraggabilly.prototype.ontouchend = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  if ( touch ) {\n    this.dragEnd( event, touch );\n  }\n};\n\n/**\n * drag end\n * @param {Event} event\n * @param {Event or Touch} pointer\n */\nDraggabilly.prototype.dragEnd = function( event, pointer ) {\n  this.isDragging = false;\n\n  delete this.pointerIdentifier;\n\n  // use top left position when complete\n  if ( transformProperty ) {\n    this.element.style[ transformProperty ] = '';\n    this.setLeftTop();\n  }\n\n  // remove events\n  this._unbindEvents();\n\n  classie.remove( this.element, 'is-dragging' );\n\n  this.emitEvent( 'dragEnd', [ this, event, pointer ] );\n\n};\n\n// ----- cancel event ----- //\n\n// coerce to end event\nDraggabilly.prototype.ontouchcancel = function( event ) {\n  var touch = this.getTouch( event.changedTouches );\n  this.dragEnd( event, touch );\n};\n\n// -------------------------- animation -------------------------- //\n\nDraggabilly.prototype.animate = function() {\n  // only render and animate if dragging\n  if ( !this.isDragging ) {\n    return;\n  }\n\n  this.positionDrag();\n\n  var _this = this;\n  requestAnimationFrame( function animateFrame() {\n    _this.animate();\n  });\n\n};\n\n// transform translate function\nvar translate = is3d ?\n  function( x, y ) {\n    return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';\n  } :\n  function( x, y ) {\n    return 'translate( ' + x + 'px, ' + y + 'px)';\n  };\n\n// left/top positioning\nDraggabilly.prototype.setLeftTop = function() {\n  this.element.style.left = this.position.x + 'px';\n  this.element.style.top  = this.position.y + 'px';\n};\n\nDraggabilly.prototype.positionDrag = transformProperty ?\n  function() {\n    // position with transform\n    this.element.style[ transformProperty ] = translate( this.dragPoint.x, this.dragPoint.y );\n  } : Draggabilly.prototype.setLeftTop;\n\nDraggabilly.prototype.enable = function() {\n  this.isEnabled = true;\n};\n\nDraggabilly.prototype.disable = function() {\n  this.isEnabled = false;\n  if ( this.isDragging ) {\n    this.dragEnd();\n  }\n};\n\nreturn Draggabilly;\n\n} // end definition\n\n// -------------------------- transport -------------------------- //\n\nif ( typeof define === 'function' && define.amd ) {\n  // AMD\n  define( [\n      'classie/classie',\n      'eventEmitter/EventEmitter',\n      'eventie/eventie',\n      'get-style-property/get-style-property',\n      'get-size/get-size'\n    ],\n    draggabillyDefinition );\n} else {\n  // browser global\n  window.Draggabilly = draggabillyDefinition(\n    window.classie,\n    window.EventEmitter,\n    window.eventie,\n    window.getStyleProperty,\n    window.getSize\n  );\n}\n\n})( window );\n//@ sourceURL=lib/dragabilly.js\n",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.10.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js",
    "https://pixipaint.net/envweb-v0.4.7.js"
  ],
  "repository": {
    "id": 15088379,
    "name": "spritepile",
    "full_name": "STRd6/spritepile",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://0.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/spritepile",
    "description": "Edit a pile of sprites.",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/spritepile",
    "forks_url": "https://api.github.com/repos/STRd6/spritepile/forks",
    "keys_url": "https://api.github.com/repos/STRd6/spritepile/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/spritepile/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/spritepile/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/spritepile/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/spritepile/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/spritepile/events",
    "assignees_url": "https://api.github.com/repos/STRd6/spritepile/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/spritepile/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/spritepile/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/spritepile/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/spritepile/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/spritepile/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/spritepile/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/spritepile/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/spritepile/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/spritepile/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/spritepile/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/spritepile/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/spritepile/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/spritepile/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/spritepile/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/spritepile/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/spritepile/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/spritepile/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/spritepile/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/spritepile/merges",
    "archive_url": "https://api.github.com/repos/STRd6/spritepile/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/spritepile/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/spritepile/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/spritepile/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/spritepile/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/spritepile/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/spritepile/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/spritepile/releases{/id}",
    "created_at": "2013-12-10T20:20:02Z",
    "updated_at": "2013-12-10T20:20:02Z",
    "pushed_at": "2013-12-10T20:20:02Z",
    "git_url": "git://github.com/STRd6/spritepile.git",
    "ssh_url": "git@github.com:STRd6/spritepile.git",
    "clone_url": "https://github.com/STRd6/spritepile.git",
    "svn_url": "https://github.com/STRd6/spritepile",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "master",
    "defaultBranch": "master"
  },
  "dependencies": {
    "appcache": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "appcache\n========\n\nHTML5 AppCache Helpers\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "App Cache\n=========\n\nSome helpers for working with HTML5 application cache.\n\nhttp://www.html5rocks.com/en/tutorials/appcache/beginner/\n\n    applicationCache = window.applicationCache\n\n    applicationCache.addEventListener 'updateready', (e) ->\n      if applicationCache.status is applicationCache.UPDATEREADY\n        # Browser downloaded a new app cache.\n        if confirm('A new version of this site is available. Load it?')\n          window.location.reload()\n    , false\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nentryPoint: \"main\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var applicationCache;\n\n  applicationCache = window.applicationCache;\n\n  applicationCache.addEventListener('updateready', function(e) {\n    if (applicationCache.status === applicationCache.UPDATEREADY) {\n      if (confirm('A new version of this site is available. Load it?')) {\n        return window.location.reload();\n      }\n    }\n  }, false);\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"main\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "repository": {
        "id": 14539483,
        "name": "appcache",
        "full_name": "distri/appcache",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/appcache",
        "description": "HTML5 AppCache Helpers",
        "fork": false,
        "url": "https://api.github.com/repos/distri/appcache",
        "forks_url": "https://api.github.com/repos/distri/appcache/forks",
        "keys_url": "https://api.github.com/repos/distri/appcache/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/appcache/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/appcache/teams",
        "hooks_url": "https://api.github.com/repos/distri/appcache/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/appcache/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/appcache/events",
        "assignees_url": "https://api.github.com/repos/distri/appcache/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/appcache/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/appcache/tags",
        "blobs_url": "https://api.github.com/repos/distri/appcache/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/appcache/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/appcache/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/appcache/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/appcache/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/appcache/languages",
        "stargazers_url": "https://api.github.com/repos/distri/appcache/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/appcache/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/appcache/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/appcache/subscription",
        "commits_url": "https://api.github.com/repos/distri/appcache/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/appcache/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/appcache/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/appcache/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/appcache/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/appcache/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/appcache/merges",
        "archive_url": "https://api.github.com/repos/distri/appcache/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/appcache/downloads",
        "issues_url": "https://api.github.com/repos/distri/appcache/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/appcache/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/appcache/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/appcache/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/appcache/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/appcache/releases{/id}",
        "created_at": "2013-11-19T22:09:16Z",
        "updated_at": "2013-11-29T20:49:51Z",
        "pushed_at": "2013-11-19T22:10:28Z",
        "git_url": "git://github.com/distri/appcache.git",
        "ssh_url": "git@github.com:distri/appcache.git",
        "clone_url": "https://github.com/distri/appcache.git",
        "svn_url": "https://github.com/distri/appcache",
        "homepage": null,
        "size": 240,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "hotkeys": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "hotkeys\n=======\n\nHotkeys module for editors\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Hotkeys\n=======\n\nHotkeys module for the editors.\n\n    module.exports = (I={}, self=Core(I)) ->\n      self.extend\n        addHotkey: (key, method) ->\n          $(document).bind \"keydown\", key, (event) ->\n            if typeof method is \"function\"\n              method\n                editor: self\n            else\n              self[method]()\n\n            event.preventDefault()\n\n      return self\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"\n]\n",
          "type": "blob"
        },
        "test/hotkeys.coffee": {
          "path": "test/hotkeys.coffee",
          "mode": "100644",
          "content": "Hotkeys = require \"../main\"\n\ndescribe \"hotkeys\", ->\n  it \"should be hot\", (done) ->\n    hotkeys = Hotkeys()\n    \n    hotkeys.addHotkey \"a\", ->\n      done()\n\n    $(document).trigger $.Event \"keydown\",\n      which: 65 # a\n      keyCode: 65\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    self.extend({\n      addHotkey: function(key, method) {\n        return $(document).bind(\"keydown\", key, function(event) {\n          if (typeof method === \"function\") {\n            method({\n              editor: self\n            });\n          } else {\n            self[method]();\n          }\n          return event.preventDefault();\n        });\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"]};",
          "type": "blob"
        },
        "test/hotkeys": {
          "path": "test/hotkeys",
          "content": "(function() {\n  var Hotkeys;\n\n  Hotkeys = require(\"../main\");\n\n  describe(\"hotkeys\", function() {\n    return it(\"should be hot\", function(done) {\n      var hotkeys;\n      hotkeys = Hotkeys();\n      hotkeys.addHotkey(\"a\", function() {\n        return done();\n      });\n      return $(document).trigger($.Event(\"keydown\", {\n        which: 65,\n        keyCode: 65\n      }));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/hotkeys.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "remoteDependencies": [
        "//code.jquery.com/jquery-1.10.1.min.js",
        "http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js"
      ],
      "repository": {
        "id": 14673639,
        "name": "hotkeys",
        "full_name": "distri/hotkeys",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/hotkeys",
        "description": "Hotkeys module for editors",
        "fork": false,
        "url": "https://api.github.com/repos/distri/hotkeys",
        "forks_url": "https://api.github.com/repos/distri/hotkeys/forks",
        "keys_url": "https://api.github.com/repos/distri/hotkeys/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/hotkeys/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/hotkeys/teams",
        "hooks_url": "https://api.github.com/repos/distri/hotkeys/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/hotkeys/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/hotkeys/events",
        "assignees_url": "https://api.github.com/repos/distri/hotkeys/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/hotkeys/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/hotkeys/tags",
        "blobs_url": "https://api.github.com/repos/distri/hotkeys/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/hotkeys/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/hotkeys/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/hotkeys/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/hotkeys/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/hotkeys/languages",
        "stargazers_url": "https://api.github.com/repos/distri/hotkeys/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/hotkeys/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/hotkeys/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/hotkeys/subscription",
        "commits_url": "https://api.github.com/repos/distri/hotkeys/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/hotkeys/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/hotkeys/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/hotkeys/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/hotkeys/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/hotkeys/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/hotkeys/merges",
        "archive_url": "https://api.github.com/repos/distri/hotkeys/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/hotkeys/downloads",
        "issues_url": "https://api.github.com/repos/distri/hotkeys/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/hotkeys/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/hotkeys/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/hotkeys/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/hotkeys/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/hotkeys/releases{/id}",
        "created_at": "2013-11-25T01:55:42Z",
        "updated_at": "2013-11-25T02:03:57Z",
        "pushed_at": "2013-11-25T02:03:56Z",
        "git_url": "git://github.com/distri/hotkeys.git",
        "ssh_url": "git@github.com:distri/hotkeys.git",
        "clone_url": "https://github.com/distri/hotkeys.git",
        "svn_url": "https://github.com/distri/hotkeys",
        "homepage": null,
        "size": 264,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "jquery-utils": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "jquery-utils\n============\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "    require \"hotkeys\"\n    require \"image-reader\"\n    require \"./take_class\"\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n]\ndependencies:\n  hotkeys: \"distri/jquery-hotkeys:v0.9.2\"\n  \"image-reader\": \"distri/jquery-image_reader:v0.2.0\"\n",
          "type": "blob"
        },
        "take_class.coffee.md": {
          "path": "take_class.coffee.md",
          "mode": "100644",
          "content": "Take Class\n==========\n\nTake the named class from all the sibling elements. Perfect for something like\nradio buttons.\n\n    (($) ->\n      $.fn.takeClass = (name) ->\n        @addClass(name).siblings().removeClass(name)\n\n        return this\n    )(jQuery)\n",
          "type": "blob"
        },
        "test/image_reader.coffee": {
          "path": "test/image_reader.coffee",
          "mode": "100644",
          "content": "require \"../main\"\n\ndescribe \"jQuery#pasteImageReader\", ->\n  it \"should exist\", ->\n    assert $.fn.pasteImageReader\n\ndescribe \"jQuery#dropImageReader\", ->\n  it \"should exist\", ->\n    assert $.fn.dropImageReader\n",
          "type": "blob"
        },
        "test/take_class.coffee": {
          "path": "test/take_class.coffee",
          "mode": "100644",
          "content": "require \"../main\"\n\ndescribe \"jQuery#takeClass\", ->\n  it \"should exist\", ->\n    assert $.fn.takeClass\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  require(\"hotkeys\");\n\n  require(\"image-reader\");\n\n  require(\"./take_class\");\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\"],\"dependencies\":{\"hotkeys\":\"distri/jquery-hotkeys:v0.9.2\",\"image-reader\":\"distri/jquery-image_reader:v0.2.0\"}};",
          "type": "blob"
        },
        "take_class": {
          "path": "take_class",
          "content": "(function() {\n  (function($) {\n    return $.fn.takeClass = function(name) {\n      this.addClass(name).siblings().removeClass(name);\n      return this;\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=take_class.coffee",
          "type": "blob"
        },
        "test/image_reader": {
          "path": "test/image_reader",
          "content": "(function() {\n  require(\"../main\");\n\n  describe(\"jQuery#pasteImageReader\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.pasteImageReader);\n    });\n  });\n\n  describe(\"jQuery#dropImageReader\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.dropImageReader);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/image_reader.coffee",
          "type": "blob"
        },
        "test/take_class": {
          "path": "test/take_class",
          "content": "(function() {\n  require(\"../main\");\n\n  describe(\"jQuery#takeClass\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.takeClass);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/take_class.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "remoteDependencies": [
        "//code.jquery.com/jquery-1.10.1.min.js"
      ],
      "repository": {
        "id": 13183366,
        "name": "jquery-utils",
        "full_name": "distri/jquery-utils",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/jquery-utils",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/distri/jquery-utils",
        "forks_url": "https://api.github.com/repos/distri/jquery-utils/forks",
        "keys_url": "https://api.github.com/repos/distri/jquery-utils/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/jquery-utils/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/jquery-utils/teams",
        "hooks_url": "https://api.github.com/repos/distri/jquery-utils/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/jquery-utils/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/jquery-utils/events",
        "assignees_url": "https://api.github.com/repos/distri/jquery-utils/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/jquery-utils/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/jquery-utils/tags",
        "blobs_url": "https://api.github.com/repos/distri/jquery-utils/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/jquery-utils/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/jquery-utils/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/jquery-utils/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/jquery-utils/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/jquery-utils/languages",
        "stargazers_url": "https://api.github.com/repos/distri/jquery-utils/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/jquery-utils/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/jquery-utils/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/jquery-utils/subscription",
        "commits_url": "https://api.github.com/repos/distri/jquery-utils/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/jquery-utils/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/jquery-utils/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/jquery-utils/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/jquery-utils/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/jquery-utils/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/jquery-utils/merges",
        "archive_url": "https://api.github.com/repos/distri/jquery-utils/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/jquery-utils/downloads",
        "issues_url": "https://api.github.com/repos/distri/jquery-utils/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/jquery-utils/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/jquery-utils/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/jquery-utils/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/jquery-utils/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/jquery-utils/releases{/id}",
        "created_at": "2013-09-29T00:25:09Z",
        "updated_at": "2013-11-29T20:57:42Z",
        "pushed_at": "2013-10-25T17:28:57Z",
        "git_url": "git://github.com/distri/jquery-utils.git",
        "ssh_url": "git@github.com:distri/jquery-utils.git",
        "clone_url": "https://github.com/distri/jquery-utils.git",
        "svn_url": "https://github.com/distri/jquery-utils",
        "homepage": null,
        "size": 592,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {
        "hotkeys": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "jquery.hotkeys\n==============\n\njQuery hotkeys plugin\n",
              "type": "blob"
            },
            "hotkeys.coffee.md": {
              "path": "hotkeys.coffee.md",
              "mode": "100644",
              "content": "jQuery Hotkeys Plugin\n=====================\n\nCopyright 2010, John Resig\nDual licensed under the MIT or GPL Version 2 licenses.\n\nBased upon the plugin by Tzury Bar Yochay:\nhttp://github.com/tzuryby/hotkeys\n\nOriginal idea by:\nBinny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/\n\n    if jQuery?\n      ((jQuery) ->\n        isTextAcceptingInput = (element) ->\n          /textarea|select/i.test(element.nodeName) or element.type is \"text\" or element.type is \"password\"\n\n        isFunctionKey = (event) ->\n          (event.type != \"keypress\") && (112 <= event.which <= 123)\n\n        jQuery.hotkeys =\n          version: \"0.9.0\"\n\n          specialKeys:\n            8: \"backspace\"\n            9: \"tab\"\n            13: \"return\"\n            16: \"shift\"\n            17: \"ctrl\"\n            18: \"alt\"\n            19: \"pause\"\n            20: \"capslock\"\n            27: \"esc\"\n            32: \"space\"\n            33: \"pageup\"\n            34: \"pagedown\"\n            35: \"end\"\n            36: \"home\"\n            37: \"left\"\n            38: \"up\"\n            39: \"right\"\n            40: \"down\"\n            45: \"insert\"\n            46: \"del\"\n            96: \"0\"\n            97: \"1\"\n            98: \"2\"\n            99: \"3\"\n            100: \"4\"\n            101: \"5\"\n            102: \"6\"\n            103: \"7\"\n            104: \"8\"\n            105: \"9\"\n            106: \"*\"\n            107: \"+\"\n            109: \"-\"\n            110: \".\"\n            111 : \"/\"\n            112: \"f1\"\n            113: \"f2\"\n            114: \"f3\"\n            115: \"f4\"\n            116: \"f5\"\n            117: \"f6\"\n            118: \"f7\"\n            119: \"f8\"\n            120: \"f9\"\n            121: \"f10\"\n            122: \"f11\"\n            123: \"f12\"\n            144: \"numlock\"\n            145: \"scroll\"\n            186: \";\"\n            187: \"=\"\n            188: \",\"\n            189: \"-\"\n            190: \".\"\n            191: \"/\"\n            219: \"[\"\n            220: \"\\\\\"\n            221: \"]\"\n            222: \"'\"\n            224: \"meta\"\n\n          shiftNums:\n            \"`\": \"~\"\n            \"1\": \"!\"\n            \"2\": \"@\"\n            \"3\": \"#\"\n            \"4\": \"$\"\n            \"5\": \"%\"\n            \"6\": \"^\"\n            \"7\": \"&\"\n            \"8\": \"*\"\n            \"9\": \"(\"\n            \"0\": \")\"\n            \"-\": \"_\"\n            \"=\": \"+\"\n            \";\": \":\"\n            \"'\": \"\\\"\"\n            \",\": \"<\"\n            \".\": \">\"\n            \"/\": \"?\"\n            \"\\\\\": \"|\"\n\n        keyHandler = (handleObj) ->\n          # Only care when a possible input has been specified\n          if typeof handleObj.data != \"string\"\n            return\n\n          origHandler = handleObj.handler\n          keys = handleObj.data.toLowerCase().split(\" \")\n\n          handleObj.handler = (event) ->\n            # Keypress represents characters, not special keys\n            special = event.type != \"keypress\" && jQuery.hotkeys.specialKeys[ event.which ]\n            character = String.fromCharCode( event.which ).toLowerCase()\n            modif = \"\"\n            possible = {}\n            target = event.target\n\n            # check combinations (alt|ctrl|shift+anything)\n            if event.altKey && special != \"alt\"\n              modif += \"alt+\"\n\n            if event.ctrlKey && special != \"ctrl\"\n              modif += \"ctrl+\"\n\n            # TODO: Need to make sure this works consistently across platforms\n            if event.metaKey && !event.ctrlKey && special != \"meta\"\n              modif += \"meta+\"\n\n            # Don't fire in text-accepting inputs that we didn't directly bind to\n            # unless a non-shift modifier key or function key is pressed\n            unless this == target\n              if isTextAcceptingInput(target) && !modif && !isFunctionKey(event)\n                return\n\n            if event.shiftKey && special != \"shift\"\n              modif += \"shift+\"\n\n            if special\n              possible[ modif + special ] = true\n            else\n              possible[ modif + character ] = true\n              possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true\n\n              # \"$\" can be triggered as \"Shift+4\" or \"Shift+$\" or just \"$\"\n              if modif == \"shift+\"\n                possible[ jQuery.hotkeys.shiftNums[ character ] ] = true\n\n            for key in keys\n              if possible[key]\n                return origHandler.apply( this, arguments )\n\n        jQuery.each [ \"keydown\", \"keyup\", \"keypress\" ], ->\n          jQuery.event.special[ this ] = { add: keyHandler }\n\n      )(jQuery)\n    else\n      console.warn \"jQuery not found, no hotkeys added :(\"\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.9.2\"\nentryPoint: \"hotkeys\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n]\n",
              "type": "blob"
            },
            "test/hotkeys.coffee": {
              "path": "test/hotkeys.coffee",
              "mode": "100644",
              "content": "require \"../hotkeys\"\n\ndescribe \"hotkeys binding\", ->\n  it \"should bind a hotkey\", (done) ->\n    $(document).bind \"keydown\", \"a\", ->\n      done()\n\n    $(document).trigger $.Event \"keydown\",\n      which: 65 # a\n      keyCode: 65\n",
              "type": "blob"
            }
          },
          "distribution": {
            "hotkeys": {
              "path": "hotkeys",
              "content": "(function() {\n  if (typeof jQuery !== \"undefined\" && jQuery !== null) {\n    (function(jQuery) {\n      var isFunctionKey, isTextAcceptingInput, keyHandler;\n      isTextAcceptingInput = function(element) {\n        return /textarea|select/i.test(element.nodeName) || element.type === \"text\" || element.type === \"password\";\n      };\n      isFunctionKey = function(event) {\n        var _ref;\n        return (event.type !== \"keypress\") && ((112 <= (_ref = event.which) && _ref <= 123));\n      };\n      jQuery.hotkeys = {\n        version: \"0.9.0\",\n        specialKeys: {\n          8: \"backspace\",\n          9: \"tab\",\n          13: \"return\",\n          16: \"shift\",\n          17: \"ctrl\",\n          18: \"alt\",\n          19: \"pause\",\n          20: \"capslock\",\n          27: \"esc\",\n          32: \"space\",\n          33: \"pageup\",\n          34: \"pagedown\",\n          35: \"end\",\n          36: \"home\",\n          37: \"left\",\n          38: \"up\",\n          39: \"right\",\n          40: \"down\",\n          45: \"insert\",\n          46: \"del\",\n          96: \"0\",\n          97: \"1\",\n          98: \"2\",\n          99: \"3\",\n          100: \"4\",\n          101: \"5\",\n          102: \"6\",\n          103: \"7\",\n          104: \"8\",\n          105: \"9\",\n          106: \"*\",\n          107: \"+\",\n          109: \"-\",\n          110: \".\",\n          111: \"/\",\n          112: \"f1\",\n          113: \"f2\",\n          114: \"f3\",\n          115: \"f4\",\n          116: \"f5\",\n          117: \"f6\",\n          118: \"f7\",\n          119: \"f8\",\n          120: \"f9\",\n          121: \"f10\",\n          122: \"f11\",\n          123: \"f12\",\n          144: \"numlock\",\n          145: \"scroll\",\n          186: \";\",\n          187: \"=\",\n          188: \",\",\n          189: \"-\",\n          190: \".\",\n          191: \"/\",\n          219: \"[\",\n          220: \"\\\\\",\n          221: \"]\",\n          222: \"'\",\n          224: \"meta\"\n        },\n        shiftNums: {\n          \"`\": \"~\",\n          \"1\": \"!\",\n          \"2\": \"@\",\n          \"3\": \"#\",\n          \"4\": \"$\",\n          \"5\": \"%\",\n          \"6\": \"^\",\n          \"7\": \"&\",\n          \"8\": \"*\",\n          \"9\": \"(\",\n          \"0\": \")\",\n          \"-\": \"_\",\n          \"=\": \"+\",\n          \";\": \":\",\n          \"'\": \"\\\"\",\n          \",\": \"<\",\n          \".\": \">\",\n          \"/\": \"?\",\n          \"\\\\\": \"|\"\n        }\n      };\n      keyHandler = function(handleObj) {\n        var keys, origHandler;\n        if (typeof handleObj.data !== \"string\") {\n          return;\n        }\n        origHandler = handleObj.handler;\n        keys = handleObj.data.toLowerCase().split(\" \");\n        return handleObj.handler = function(event) {\n          var character, key, modif, possible, special, target, _i, _len;\n          special = event.type !== \"keypress\" && jQuery.hotkeys.specialKeys[event.which];\n          character = String.fromCharCode(event.which).toLowerCase();\n          modif = \"\";\n          possible = {};\n          target = event.target;\n          if (event.altKey && special !== \"alt\") {\n            modif += \"alt+\";\n          }\n          if (event.ctrlKey && special !== \"ctrl\") {\n            modif += \"ctrl+\";\n          }\n          if (event.metaKey && !event.ctrlKey && special !== \"meta\") {\n            modif += \"meta+\";\n          }\n          if (this !== target) {\n            if (isTextAcceptingInput(target) && !modif && !isFunctionKey(event)) {\n              return;\n            }\n          }\n          if (event.shiftKey && special !== \"shift\") {\n            modif += \"shift+\";\n          }\n          if (special) {\n            possible[modif + special] = true;\n          } else {\n            possible[modif + character] = true;\n            possible[modif + jQuery.hotkeys.shiftNums[character]] = true;\n            if (modif === \"shift+\") {\n              possible[jQuery.hotkeys.shiftNums[character]] = true;\n            }\n          }\n          for (_i = 0, _len = keys.length; _i < _len; _i++) {\n            key = keys[_i];\n            if (possible[key]) {\n              return origHandler.apply(this, arguments);\n            }\n          }\n        };\n      };\n      return jQuery.each([\"keydown\", \"keyup\", \"keypress\"], function() {\n        return jQuery.event.special[this] = {\n          add: keyHandler\n        };\n      });\n    })(jQuery);\n  } else {\n    console.warn(\"jQuery not found, no hotkeys added :(\");\n  }\n\n}).call(this);\n\n//# sourceURL=hotkeys.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.9.2\",\"entryPoint\":\"hotkeys\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\"]};",
              "type": "blob"
            },
            "test/hotkeys": {
              "path": "test/hotkeys",
              "content": "(function() {\n  require(\"../hotkeys\");\n\n  describe(\"hotkeys binding\", function() {\n    return it(\"should bind a hotkey\", function(done) {\n      $(document).bind(\"keydown\", \"a\", function() {\n        return done();\n      });\n      return $(document).trigger($.Event(\"keydown\", {\n        which: 65,\n        keyCode: 65\n      }));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/hotkeys.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.9.2",
          "entryPoint": "hotkeys",
          "remoteDependencies": [
            "//code.jquery.com/jquery-1.10.1.min.js"
          ],
          "repository": {
            "id": 13182272,
            "name": "jquery-hotkeys",
            "full_name": "distri/jquery-hotkeys",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/jquery-hotkeys",
            "description": "jQuery hotkeys plugin",
            "fork": false,
            "url": "https://api.github.com/repos/distri/jquery-hotkeys",
            "forks_url": "https://api.github.com/repos/distri/jquery-hotkeys/forks",
            "keys_url": "https://api.github.com/repos/distri/jquery-hotkeys/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/jquery-hotkeys/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/jquery-hotkeys/teams",
            "hooks_url": "https://api.github.com/repos/distri/jquery-hotkeys/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/jquery-hotkeys/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/jquery-hotkeys/events",
            "assignees_url": "https://api.github.com/repos/distri/jquery-hotkeys/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/jquery-hotkeys/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/jquery-hotkeys/tags",
            "blobs_url": "https://api.github.com/repos/distri/jquery-hotkeys/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/jquery-hotkeys/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/jquery-hotkeys/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/jquery-hotkeys/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/jquery-hotkeys/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/jquery-hotkeys/languages",
            "stargazers_url": "https://api.github.com/repos/distri/jquery-hotkeys/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/jquery-hotkeys/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/jquery-hotkeys/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/jquery-hotkeys/subscription",
            "commits_url": "https://api.github.com/repos/distri/jquery-hotkeys/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/jquery-hotkeys/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/jquery-hotkeys/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/jquery-hotkeys/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/jquery-hotkeys/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/jquery-hotkeys/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/jquery-hotkeys/merges",
            "archive_url": "https://api.github.com/repos/distri/jquery-hotkeys/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/jquery-hotkeys/downloads",
            "issues_url": "https://api.github.com/repos/distri/jquery-hotkeys/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/jquery-hotkeys/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/jquery-hotkeys/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/jquery-hotkeys/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/jquery-hotkeys/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/jquery-hotkeys/releases{/id}",
            "created_at": "2013-09-28T22:58:08Z",
            "updated_at": "2013-11-29T20:59:45Z",
            "pushed_at": "2013-09-29T23:55:14Z",
            "git_url": "git://github.com/distri/jquery-hotkeys.git",
            "ssh_url": "git@github.com:distri/jquery-hotkeys.git",
            "clone_url": "https://github.com/distri/jquery-hotkeys.git",
            "svn_url": "https://github.com/distri/jquery-hotkeys",
            "homepage": null,
            "size": 608,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.9.2",
            "defaultBranch": "master"
          },
          "dependencies": {}
        },
        "image-reader": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "Copyright (c) 2012 Daniel X. Moore\n\nMIT License\n\nPermission is hereby granted, free of charge, to any person obtaining\na copy of this software and associated documentation files (the\n\"Software\"), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to\npermit persons to whom the Software is furnished to do so, subject to\nthe following conditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\nLIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\nOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\nWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "# Jquery::ImageReader\n\nHelpful jQuery plugins for dropping and pasting image data.\n\n## Usage\n\n```coffeescript\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n```\n\n## Contributing\n\n1. Fork it\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Added some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create new Pull Request\n",
              "type": "blob"
            },
            "drop.coffee.md": {
              "path": "drop.coffee.md",
              "mode": "100644",
              "content": "Drop\n====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n\n          if event.type.indexOf('drag') == 0 || event.type.indexOf('drop') == 0\n            event.dataTransfer = event.originalEvent.dataTransfer\n\n          event\n\n      )($.event.fix)\n\n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n\n      $.fn.dropImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n\n        options = $.extend({}, defaults, options)\n\n        stopFn = (event) ->\n          event.stopPropagation()\n          event.preventDefault()\n\n        this.each ->\n          element = this\n          $this = $(this)\n\n          $this.bind 'dragenter dragover dragleave', stopFn\n\n          $this.bind 'drop', (event) ->\n            stopFn(event)\n\n            Array::forEach.call event.dataTransfer.files, (file) ->\n              return unless file.type.match(options.matchType)\n\n              reader = new FileReader()\n\n              reader.onload = (evt) ->\n                options.callback.call element,\n                  dataURL: evt.target.result\n                  event: evt\n                  file: file\n                  name: file.name\n\n              reader.readAsDataURL(file)\n\n    )(jQuery)\n",
              "type": "blob"
            },
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "\n    require \"./paste\"\n    require \"./drop\"\n",
              "type": "blob"
            },
            "paste.coffee.md": {
              "path": "paste.coffee.md",
              "mode": "100644",
              "content": "Paste\n=====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n\n          if event.type.indexOf('copy') == 0 || event.type.indexOf('paste') == 0\n            event.clipboardData = event.originalEvent.clipboardData\n\n          return event\n\n      )($.event.fix)\n\n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n\n      $.fn.pasteImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n\n        options = $.extend({}, defaults, options)\n\n        @each ->\n          element = this\n          $this = $(this)\n\n          $this.bind 'paste', (event) ->\n            found = false\n            clipboardData = event.clipboardData\n\n            Array::forEach.call clipboardData.types, (type, i) ->\n              return if found\n\n              if type.match(options.matchType) or (clipboardData.items && clipboardData.items[i].type.match(options.matchType))\n                file = clipboardData.items[i].getAsFile()\n\n                reader = new FileReader()\n\n                reader.onload = (evt) ->\n                  options.callback.call element,\n                    dataURL: evt.target.result\n                    event: evt\n                    file: file\n                    name: file.name\n\n                reader.readAsDataURL(file)\n\n                found = true\n\n    )(jQuery)\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.2.0\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n]\n",
              "type": "blob"
            },
            "test/image_reader.coffee": {
              "path": "test/image_reader.coffee",
              "mode": "100644",
              "content": "require \"../main\"\n\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n",
              "type": "blob"
            }
          },
          "distribution": {
            "drop": {
              "path": "drop",
              "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('drag') === 0 || event.type.indexOf('drop') === 0) {\n          event.dataTransfer = event.originalEvent.dataTransfer;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.dropImageReader = function(options) {\n      var stopFn;\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      stopFn = function(event) {\n        event.stopPropagation();\n        return event.preventDefault();\n      };\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        $this.bind('dragenter dragover dragleave', stopFn);\n        return $this.bind('drop', function(event) {\n          stopFn(event);\n          return Array.prototype.forEach.call(event.dataTransfer.files, function(file) {\n            var reader;\n            if (!file.type.match(options.matchType)) {\n              return;\n            }\n            reader = new FileReader();\n            reader.onload = function(evt) {\n              return options.callback.call(element, {\n                dataURL: evt.target.result,\n                event: evt,\n                file: file,\n                name: file.name\n              });\n            };\n            return reader.readAsDataURL(file);\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=drop.coffee",
              "type": "blob"
            },
            "main": {
              "path": "main",
              "content": "(function() {\n  require(\"./paste\");\n\n  require(\"./drop\");\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "paste": {
              "path": "paste",
              "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {\n          event.clipboardData = event.originalEvent.clipboardData;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.pasteImageReader = function(options) {\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        return $this.bind('paste', function(event) {\n          var clipboardData, found;\n          found = false;\n          clipboardData = event.clipboardData;\n          return Array.prototype.forEach.call(clipboardData.types, function(type, i) {\n            var file, reader;\n            if (found) {\n              return;\n            }\n            if (type.match(options.matchType) || (clipboardData.items && clipboardData.items[i].type.match(options.matchType))) {\n              file = clipboardData.items[i].getAsFile();\n              reader = new FileReader();\n              reader.onload = function(evt) {\n                return options.callback.call(element, {\n                  dataURL: evt.target.result,\n                  event: evt,\n                  file: file,\n                  name: file.name\n                });\n              };\n              reader.readAsDataURL(file);\n              return found = true;\n            }\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=paste.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.2.0\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\"]};",
              "type": "blob"
            },
            "test/image_reader": {
              "path": "test/image_reader",
              "content": "(function() {\n  require(\"../main\");\n\n  $(\"html\").pasteImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n  $(\"html\").dropImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/image_reader.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.2.0",
          "entryPoint": "main",
          "remoteDependencies": [
            "//code.jquery.com/jquery-1.10.1.min.js"
          ],
          "repository": {
            "id": 4527535,
            "name": "jquery-image_reader",
            "full_name": "distri/jquery-image_reader",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/jquery-image_reader",
            "description": "Paste and Drop images into web apps",
            "fork": false,
            "url": "https://api.github.com/repos/distri/jquery-image_reader",
            "forks_url": "https://api.github.com/repos/distri/jquery-image_reader/forks",
            "keys_url": "https://api.github.com/repos/distri/jquery-image_reader/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/jquery-image_reader/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/jquery-image_reader/teams",
            "hooks_url": "https://api.github.com/repos/distri/jquery-image_reader/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/jquery-image_reader/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/jquery-image_reader/events",
            "assignees_url": "https://api.github.com/repos/distri/jquery-image_reader/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/jquery-image_reader/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/jquery-image_reader/tags",
            "blobs_url": "https://api.github.com/repos/distri/jquery-image_reader/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/jquery-image_reader/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/jquery-image_reader/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/jquery-image_reader/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/jquery-image_reader/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/jquery-image_reader/languages",
            "stargazers_url": "https://api.github.com/repos/distri/jquery-image_reader/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/jquery-image_reader/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/jquery-image_reader/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/jquery-image_reader/subscription",
            "commits_url": "https://api.github.com/repos/distri/jquery-image_reader/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/jquery-image_reader/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/jquery-image_reader/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/jquery-image_reader/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/jquery-image_reader/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/jquery-image_reader/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/jquery-image_reader/merges",
            "archive_url": "https://api.github.com/repos/distri/jquery-image_reader/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/jquery-image_reader/downloads",
            "issues_url": "https://api.github.com/repos/distri/jquery-image_reader/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/jquery-image_reader/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/jquery-image_reader/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/jquery-image_reader/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/jquery-image_reader/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/jquery-image_reader/releases{/id}",
            "created_at": "2012-06-02T07:12:27Z",
            "updated_at": "2013-11-29T21:02:52Z",
            "pushed_at": "2013-10-30T15:54:19Z",
            "git_url": "git://github.com/distri/jquery-image_reader.git",
            "ssh_url": "git@github.com:distri/jquery-image_reader.git",
            "clone_url": "https://github.com/distri/jquery-image_reader.git",
            "svn_url": "https://github.com/distri/jquery-image_reader",
            "homepage": null,
            "size": 142,
            "stargazers_count": 5,
            "watchers_count": 5,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 1,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 1,
            "open_issues": 0,
            "watchers": 5,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 1,
            "subscribers_count": 1,
            "branch": "v0.2.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        }
      }
    },
    "runtime": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "runtime\n=======\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nentryPoint: \"runtime\"\n",
          "type": "blob"
        },
        "runtime.coffee.md": {
          "path": "runtime.coffee.md",
          "mode": "100644",
          "content": "The runtime holds utilities to assist with an apps running environment.\n\nIt should me moved into it's own component one day.\n\n    Runtime = (pkg) ->\n\nHold on to a reference to our root node.\n\n      root = null\n\nReturns the node that is the parent of the script element that contains the code\nthat calls this function. If `document.write` has been called before this then the\nresults may not be accurate. Therefore be sure to call currentNode before\nwriting anything to the document.\n\n      currentNode = ->\n        target = document.documentElement\n\n        while (target.childNodes.length and target.lastChild.nodeType == 1)\n          target = target.lastChild\n\n        return target.parentNode\n\nDisplay a promo in the console linking back to the creator of this app.\n\n      promo = ->\n        console.log(\"%c You should meet my creator #{pkg.progenitor.url}\", \"\"\"\n          background: #000;\n          color: white;\n          font-size: 2em;\n          line-height: 2em;\n          padding: 10px 100px;\n          margin-bottom: 1em;\n          text-shadow:\n            0 0 0.05em #fff,\n            0 0 0.1em #fff,\n            0 0 0.15em #fff,\n            0 0 0.2em #ff00de,\n            0 0 0.35em #ff00de,\n            0 0 0.4em #ff00de,\n            0 0 0.5em #ff00de,\n            0 0 0.75em #ff00de;'\n        \"\"\")\n\nCall on start to boot up the runtime, get the root node, add styles, display a\npromo.\n\n      boot: ->\n        root = currentNode()\n\n        promo()\n\n        return root\n\nApply the stylesheet to the root node.\n\n      applyStyleSheet: (style) ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n\n        root.appendChild(styleNode)\n\nExport\n\n    module.exports = Runtime\n",
          "type": "blob"
        },
        "test/runtime.coffee": {
          "path": "test/runtime.coffee",
          "mode": "100644",
          "content": "Runtime = require \"../runtime\"\n\ndescribe \"Runtime\", ->\n  it \"should be created from a package and provide a boot method\", ->\n    assert Runtime(PACKAGE).boot\n",
          "type": "blob"
        }
      },
      "distribution": {
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"runtime\"};",
          "type": "blob"
        },
        "runtime": {
          "path": "runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = function(pkg) {\n    var currentNode, promo, root;\n    root = null;\n    currentNode = function() {\n      var target;\n      target = document.documentElement;\n      while (target.childNodes.length && target.lastChild.nodeType === 1) {\n        target = target.lastChild;\n      }\n      return target.parentNode;\n    };\n    promo = function() {\n      return console.log(\"%c You should meet my creator \" + pkg.progenitor.url, \"background: #000;\\ncolor: white;\\nfont-size: 2em;\\nline-height: 2em;\\npadding: 10px 100px;\\nmargin-bottom: 1em;\\ntext-shadow:\\n  0 0 0.05em #fff,\\n  0 0 0.1em #fff,\\n  0 0 0.15em #fff,\\n  0 0 0.2em #ff00de,\\n  0 0 0.35em #ff00de,\\n  0 0 0.4em #ff00de,\\n  0 0 0.5em #ff00de,\\n  0 0 0.75em #ff00de;'\");\n    };\n    return {\n      boot: function() {\n        root = currentNode();\n        promo();\n        return root;\n      },\n      applyStyleSheet: function(style) {\n        var styleNode;\n        styleNode = document.createElement(\"style\");\n        styleNode.innerHTML = style;\n        return root.appendChild(styleNode);\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
          "type": "blob"
        },
        "test/runtime": {
          "path": "test/runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = require(\"../runtime\");\n\n  describe(\"Runtime\", function() {\n    return it(\"should be created from a package and provide a boot method\", function() {\n      return assert(Runtime(PACKAGE).boot);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/runtime.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "runtime",
      "repository": {
        "id": 13202878,
        "name": "runtime",
        "full_name": "STRd6/runtime",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/runtime",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/runtime",
        "forks_url": "https://api.github.com/repos/STRd6/runtime/forks",
        "keys_url": "https://api.github.com/repos/STRd6/runtime/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/runtime/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/runtime/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/runtime/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/runtime/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/runtime/events",
        "assignees_url": "https://api.github.com/repos/STRd6/runtime/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/runtime/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/runtime/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/runtime/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/runtime/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/runtime/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/runtime/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/runtime/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/runtime/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/runtime/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/runtime/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/runtime/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/runtime/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/runtime/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/runtime/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/runtime/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/runtime/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/runtime/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/runtime/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/runtime/merges",
        "archive_url": "https://api.github.com/repos/STRd6/runtime/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/runtime/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/runtime/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/runtime/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/runtime/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/runtime/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/runtime/labels{/name}",
        "releases_url": "https://api.github.com/repos/STRd6/runtime/releases{/id}",
        "created_at": "2013-09-30T00:44:37Z",
        "updated_at": "2013-09-30T01:02:40Z",
        "pushed_at": "2013-09-30T01:02:39Z",
        "git_url": "git://github.com/STRd6/runtime.git",
        "ssh_url": "git@github.com:STRd6/runtime.git",
        "clone_url": "https://github.com/STRd6/runtime.git",
        "svn_url": "https://github.com/STRd6/runtime",
        "homepage": null,
        "size": 180,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {},
      "name": "runtime"
    },
    "touch-canvas": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "touch-canvas\n============\n\nA canvas you can touch\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "entryPoint: \"touch_canvas\"\nversion: \"0.3.0\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb.js\"\n]\ndependencies:\n  \"pixie-canvas\": \"distri/pixie-canvas:v0.9.1\"\n",
          "type": "blob"
        },
        "touch_canvas.coffee.md": {
          "path": "touch_canvas.coffee.md",
          "mode": "100644",
          "content": "Touch Canvas\n============\n\nA canvas element that reports mouse and touch events in the range [0, 1].\n\n    PixieCanvas = require \"pixie-canvas\"\n\nA number really close to 1. We should never actually return 1, but move events\nmay get a little fast and loose with exiting the canvas, so let's play it safe.\n\n    MAX = 0.999999999999\n\n    TouchCanvas = (I={}) ->\n      self = PixieCanvas I\n\n      Core(I, self)\n\n      self.include Bindable\n\n      element = self.element()\n\n      # Keep track of if the mouse is active in the element\n      active = false\n\nWhen we click within the canvas set the value for the position we clicked at.\n\n      $(element).on \"mousedown\", (e) ->\n        active = true\n\n        self.trigger \"touch\", localPosition(e)\n\nHandle touch starts\n\n      $(element).on \"touchstart\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"touch\", localPosition(touch)\n\nWhen the mouse moves apply a change for each x value in the intervening positions.\n\n      $(element).on \"mousemove\", (e) ->\n        if active\n          self.trigger \"move\", localPosition(e)\n\nHandle moves outside of the element.\n\n      $(document).on \"mousemove\", (e) ->\n        if active\n          self.trigger \"move\", localPosition(e)\n\nHandle touch moves.\n\n      $(element).on \"touchmove\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"move\", localPosition(touch)\n\nHandle releases.\n\n      $(element).on \"mouseup\", (e) ->\n        self.trigger \"release\", localPosition(e)\n        active = false\n\n        return\n\nHandle touch ends.\n\n      $(element).on \"touchend\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"release\", localPosition(touch)\n\nWhenever the mouse button is released from anywhere, deactivate. Be sure to\ntrigger the release event if the mousedown started within the element.\n\n      $(document).on \"mouseup\", (e) ->\n        if active\n          self.trigger \"release\", localPosition(e)\n\n        active = false\n\n        return\n\nHelpers\n-------\n\nProcess touches\n\n      processTouches = (event, fn) ->\n        event.preventDefault()\n\n        if event.type is \"touchend\"\n          # touchend doesn't have any touches, but does have changed touches\n          touches = event.changedTouches\n        else\n          touches = event.touches\n\n        self.debug? Array::map.call touches, ({identifier, pageX, pageY}) ->\n          \"[#{identifier}: #{pageX}, #{pageY} (#{event.type})]\\n\"\n\n        Array::forEach.call touches, fn\n\nLocal event position.\n\n      localPosition = (e) ->\n        $currentTarget = $(element)\n        offset = $currentTarget.offset()\n\n        width = $currentTarget.width()\n        height = $currentTarget.height()\n\n        point = Point(\n          ((e.pageX - offset.left) / width).clamp(0, MAX)\n          ((e.pageY - offset.top) / height).clamp(0, MAX)\n        )\n\n        # Add mouse into touch identifiers as 0\n        point.identifier = (e.identifier + 1) or 0\n\n        return point\n\nReturn self\n\n      return self\n\nExport\n\n    module.exports = TouchCanvas\n",
          "type": "blob"
        }
      },
      "distribution": {
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"entryPoint\":\"touch_canvas\",\"version\":\"0.3.0\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb.js\"],\"dependencies\":{\"pixie-canvas\":\"distri/pixie-canvas:v0.9.1\"}};",
          "type": "blob"
        },
        "touch_canvas": {
          "path": "touch_canvas",
          "content": "(function() {\n  var MAX, PixieCanvas, TouchCanvas;\n\n  PixieCanvas = require(\"pixie-canvas\");\n\n  MAX = 0.999999999999;\n\n  TouchCanvas = function(I) {\n    var active, element, localPosition, processTouches, self;\n    if (I == null) {\n      I = {};\n    }\n    self = PixieCanvas(I);\n    Core(I, self);\n    self.include(Bindable);\n    element = self.element();\n    active = false;\n    $(element).on(\"mousedown\", function(e) {\n      active = true;\n      return self.trigger(\"touch\", localPosition(e));\n    });\n    $(element).on(\"touchstart\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"touch\", localPosition(touch));\n      });\n    });\n    $(element).on(\"mousemove\", function(e) {\n      if (active) {\n        return self.trigger(\"move\", localPosition(e));\n      }\n    });\n    $(document).on(\"mousemove\", function(e) {\n      if (active) {\n        return self.trigger(\"move\", localPosition(e));\n      }\n    });\n    $(element).on(\"touchmove\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"move\", localPosition(touch));\n      });\n    });\n    $(element).on(\"mouseup\", function(e) {\n      self.trigger(\"release\", localPosition(e));\n      active = false;\n    });\n    $(element).on(\"touchend\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"release\", localPosition(touch));\n      });\n    });\n    $(document).on(\"mouseup\", function(e) {\n      if (active) {\n        self.trigger(\"release\", localPosition(e));\n      }\n      active = false;\n    });\n    processTouches = function(event, fn) {\n      var touches;\n      event.preventDefault();\n      if (event.type === \"touchend\") {\n        touches = event.changedTouches;\n      } else {\n        touches = event.touches;\n      }\n      if (typeof self.debug === \"function\") {\n        self.debug(Array.prototype.map.call(touches, function(_arg) {\n          var identifier, pageX, pageY;\n          identifier = _arg.identifier, pageX = _arg.pageX, pageY = _arg.pageY;\n          return \"[\" + identifier + \": \" + pageX + \", \" + pageY + \" (\" + event.type + \")]\\n\";\n        }));\n      }\n      return Array.prototype.forEach.call(touches, fn);\n    };\n    localPosition = function(e) {\n      var $currentTarget, height, offset, point, width;\n      $currentTarget = $(element);\n      offset = $currentTarget.offset();\n      width = $currentTarget.width();\n      height = $currentTarget.height();\n      point = Point(((e.pageX - offset.left) / width).clamp(0, MAX), ((e.pageY - offset.top) / height).clamp(0, MAX));\n      point.identifier = (e.identifier + 1) || 0;\n      return point;\n    };\n    return self;\n  };\n\n  module.exports = TouchCanvas;\n\n}).call(this);\n\n//# sourceURL=touch_canvas.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.3.0",
      "entryPoint": "touch_canvas",
      "remoteDependencies": [
        "//code.jquery.com/jquery-1.10.1.min.js",
        "http://strd6.github.io/tempest/javascripts/envweb.js"
      ],
      "repository": {
        "id": 13783983,
        "name": "touch-canvas",
        "full_name": "distri/touch-canvas",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/touch-canvas",
        "description": "A canvas you can touch",
        "fork": false,
        "url": "https://api.github.com/repos/distri/touch-canvas",
        "forks_url": "https://api.github.com/repos/distri/touch-canvas/forks",
        "keys_url": "https://api.github.com/repos/distri/touch-canvas/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/touch-canvas/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/touch-canvas/teams",
        "hooks_url": "https://api.github.com/repos/distri/touch-canvas/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/touch-canvas/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/touch-canvas/events",
        "assignees_url": "https://api.github.com/repos/distri/touch-canvas/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/touch-canvas/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/touch-canvas/tags",
        "blobs_url": "https://api.github.com/repos/distri/touch-canvas/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/touch-canvas/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/touch-canvas/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/touch-canvas/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/touch-canvas/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/touch-canvas/languages",
        "stargazers_url": "https://api.github.com/repos/distri/touch-canvas/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/touch-canvas/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/touch-canvas/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/touch-canvas/subscription",
        "commits_url": "https://api.github.com/repos/distri/touch-canvas/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/touch-canvas/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/touch-canvas/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/touch-canvas/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/touch-canvas/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/touch-canvas/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/touch-canvas/merges",
        "archive_url": "https://api.github.com/repos/distri/touch-canvas/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/touch-canvas/downloads",
        "issues_url": "https://api.github.com/repos/distri/touch-canvas/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/touch-canvas/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/touch-canvas/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/touch-canvas/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/touch-canvas/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/touch-canvas/releases{/id}",
        "created_at": "2013-10-22T19:46:48Z",
        "updated_at": "2013-11-29T20:39:31Z",
        "pushed_at": "2013-11-29T20:38:52Z",
        "git_url": "git://github.com/distri/touch-canvas.git",
        "ssh_url": "git@github.com:distri/touch-canvas.git",
        "clone_url": "https://github.com/distri/touch-canvas.git",
        "svn_url": "https://github.com/distri/touch-canvas",
        "homepage": null,
        "size": 2900,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.3.0",
        "defaultBranch": "master"
      },
      "dependencies": {
        "pixie-canvas": {
          "source": {
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "entryPoint: \"pixie_canvas\"\nversion: \"0.9.1\"\n",
              "type": "blob"
            },
            "pixie_canvas.coffee.md": {
              "path": "pixie_canvas.coffee.md",
              "mode": "100644",
              "content": "Pixie Canvas\n============\n\nPixieCanvas provides a convenient wrapper for working with Context2d.\n\nMethods try to be as flexible as possible as to what arguments they take.\n\nNon-getter methods return `this` for method chaining.\n\n    TAU = 2 * Math.PI\n\n    module.exports = (options={}) ->\n        defaults options,\n          width: 400\n          height: 400\n          init: ->\n\n        canvas = document.createElement \"canvas\"\n        canvas.width = options.width\n        canvas.height = options.height\n\n        context = undefined\n\n        self =\n\n`clear` clears the entire canvas (or a portion of it).\n\nTo clear the entire canvas use `canvas.clear()`\n\n>     #! paint\n>     # Set up: Fill canvas with blue\n>     canvas.fill(\"blue\")\n>\n>     # Clear a portion of the canvas\n>     canvas.clear\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n\n          clear: ({x, y, width, height}={}) ->\n            x ?= 0\n            y ?= 0\n            width = canvas.width unless width?\n            height = canvas.height unless height?\n\n            context.clearRect(x, y, width, height)\n\n            return this\n\nFills the entire canvas (or a specified section of it) with\nthe given color.\n\n>     #! paint\n>     # Paint the town (entire canvas) red\n>     canvas.fill \"red\"\n>\n>     # Fill a section of the canvas white (#FFF)\n>     canvas.fill\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n>       color: \"#FFF\"\n\n          fill: (color={}) ->\n            unless (typeof color is \"string\") or color.channels\n              {x, y, width, height, bounds, color} = color\n\n            {x, y, width, height} = bounds if bounds\n\n            x ||= 0\n            y ||= 0\n            width = canvas.width unless width?\n            height = canvas.height unless height?\n\n            @fillColor(color)\n            context.fillRect(x, y, width, height)\n\n            return this\n\nA direct map to the Context2d draw image. `GameObject`s\nthat implement drawable will have this wrapped up nicely,\nso there is a good chance that you will not have to deal with\nit directly.\n\n>     #! paint\n>     $ \"<img>\",\n>       src: \"https://secure.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045\"\n>       load: ->\n>         canvas.drawImage(this, 25, 25)\n\n          drawImage: (args...) ->\n            context.drawImage(args...)\n\n            return this\n\nDraws a circle at the specified position with the specified\nradius and color.\n\n>     #! paint\n>     # Draw a large orange circle\n>     canvas.drawCircle\n>       radius: 30\n>       position: Point(100, 75)\n>       color: \"orange\"\n>\n>     # You may also set a stroke\n>     canvas.drawCircle\n>       x: 25\n>       y: 50\n>       radius: 10\n>       color: \"blue\"\n>       stroke:\n>         color: \"red\"\n>         width: 1\n\nYou can pass in circle objects as well.\n\n>     #! paint\n>     # Create a circle object to set up the next examples\n>     circle =\n>       radius: 20\n>       x: 50\n>       y: 50\n>\n>     # Draw a given circle in yellow\n>     canvas.drawCircle\n>       circle: circle\n>       color: \"yellow\"\n>\n>     # Draw the circle in green at a different position\n>     canvas.drawCircle\n>       circle: circle\n>       position: Point(25, 75)\n>       color: \"green\"\n\nYou may set a stroke, or even pass in only a stroke to draw an unfilled circle.\n\n>     #! paint\n>     # Draw an outline circle in purple.\n>     canvas.drawCircle\n>       x: 50\n>       y: 75\n>       radius: 10\n>       stroke:\n>         color: \"purple\"\n>         width: 2\n>\n\n          drawCircle: ({x, y, radius, position, color, stroke, circle}) ->\n            {x, y, radius} = circle if circle\n            {x, y} = position if position\n\n            radius = 0 if radius < 0\n\n            context.beginPath()\n            context.arc(x, y, radius, 0, TAU, true)\n            context.closePath()\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.stroke()\n\n            return this\n\nDraws a rectangle at the specified position with given\nwidth and height. Optionally takes a position, bounds\nand color argument.\n\n\n          drawRect: ({x, y, width, height, position, bounds, color, stroke}) ->\n            {x, y, width, height} = bounds if bounds\n            {x, y} = position if position\n\n            if color\n              @fillColor(color)\n              context.fillRect(x, y, width, height)\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.strokeRect(x, y, width, height)\n\n            return @\n\n>     #! paint\n>     # Draw a red rectangle using x, y, width and height\n>     canvas.drawRect\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n>       color: \"#F00\"\n\n----\n\nYou can mix and match position, witdth and height.\n\n>     #! paint\n>     canvas.drawRect\n>       position: Point(0, 0)\n>       width: 50\n>       height: 50\n>       color: \"blue\"\n>       stroke:\n>         color: \"orange\"\n>         width: 3\n\n----\n\nA bounds can be reused to draw multiple rectangles.\n\n>     #! paint\n>     bounds =\n>       x: 100\n>       y: 0\n>       width: 100\n>       height: 100\n>\n>     # Draw a purple rectangle using bounds\n>     canvas.drawRect\n>       bounds: bounds\n>       color: \"green\"\n>\n>     # Draw the outline of the same bounds, but at a different position\n>     canvas.drawRect\n>       bounds: bounds\n>       position: Point(0, 50)\n>       stroke:\n>         color: \"purple\"\n>         width: 2\n\n----\n\nDraw a line from `start` to `end`.\n\n>     #! paint\n>     # Draw a sweet diagonal\n>     canvas.drawLine\n>       start: Point(0, 0)\n>       end: Point(200, 200)\n>       color: \"purple\"\n>\n>     # Draw another sweet diagonal\n>     canvas.drawLine\n>       start: Point(200, 0)\n>       end: Point(0, 200)\n>       color: \"red\"\n>       width: 6\n>\n>     # Now draw a sweet horizontal with a direction and a length\n>     canvas.drawLine\n>       start: Point(0, 100)\n>       length: 200\n>       direction: Point(1, 0)\n>       color: \"orange\"\n\n          drawLine: ({start, end, width, color, direction, length}) ->\n            width ||= 3\n\n            if direction\n              end = direction.norm(length).add(start)\n\n            @lineWidth(width)\n            @strokeColor(color)\n\n            context.beginPath()\n            context.moveTo(start.x, start.y)\n            context.lineTo(end.x, end.y)\n            context.closePath()\n            context.stroke()\n\n            return this\n\nDraw a polygon.\n\n>     #! paint\n>     # Draw a sweet rhombus\n>     canvas.drawPoly\n>       points: [\n>         Point(50, 25)\n>         Point(75, 50)\n>         Point(50, 75)\n>         Point(25, 50)\n>       ]\n>       color: \"purple\"\n>       stroke:\n>         color: \"red\"\n>         width: 2\n\n          drawPoly: ({points, color, stroke}) ->\n            context.beginPath()\n            points.forEach (point, i) ->\n              if i == 0\n                context.moveTo(point.x, point.y)\n              else\n                context.lineTo(point.x, point.y)\n            context.lineTo points[0].x, points[0].y\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.stroke()\n\n            return @\n\nDraw a rounded rectangle.\n\nAdapted from http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html\n\n>     #! paint\n>     # Draw a purple rounded rectangle with a red outline\n>     canvas.drawRoundRect\n>       position: Point(25, 25)\n>       radius: 10\n>       width: 150\n>       height: 100\n>       color: \"purple\"\n>       stroke:\n>         color: \"red\"\n>         width: 2\n\n          drawRoundRect: ({x, y, width, height, radius, position, bounds, color, stroke}) ->\n            radius = 5 unless radius?\n\n            {x, y, width, height} = bounds if bounds\n            {x, y} = position if position\n\n            context.beginPath()\n            context.moveTo(x + radius, y)\n            context.lineTo(x + width - radius, y)\n            context.quadraticCurveTo(x + width, y, x + width, y + radius)\n            context.lineTo(x + width, y + height - radius)\n            context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)\n            context.lineTo(x + radius, y + height)\n            context.quadraticCurveTo(x, y + height, x, y + height - radius)\n            context.lineTo(x, y + radius)\n            context.quadraticCurveTo(x, y, x + radius, y)\n            context.closePath()\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @lineWidth(stroke.width)\n              @strokeColor(stroke.color)\n              context.stroke()\n\n            return this\n\nDraws text on the canvas at the given position, in the given color.\nIf no color is given then the previous fill color is used.\n\n>     #! paint\n>     # Fill canvas to indicate bounds\n>     canvas.fill\n>       color: '#eee'\n>\n>     # A line to indicate the baseline\n>     canvas.drawLine\n>       start: Point(25, 50)\n>       end: Point(125, 50)\n>       color: \"#333\"\n>       width: 1\n>\n>     # Draw some text, note the position of the baseline\n>     canvas.drawText\n>       position: Point(25, 50)\n>       color: \"red\"\n>       text: \"It's dangerous to go alone\"\n\n\n          drawText: ({x, y, text, position, color, font}) ->\n            {x, y} = position if position\n\n            @fillColor(color)\n            @font(font) if font\n            context.fillText(text, x, y)\n\n            return this\n\nCenters the given text on the canvas at the given y position. An x position\nor point position can also be given in which case the text is centered at the\nx, y or position value specified.\n\n>     #! paint\n>     # Fill canvas to indicate bounds\n>     canvas.fill\n>       color: \"#eee\"\n>\n>     # Center text on the screen at y value 25\n>     canvas.centerText\n>       y: 25\n>       color: \"red\"\n>       text: \"It's dangerous to go alone\"\n>\n>     # Center text at point (75, 75)\n>     canvas.centerText\n>       position: Point(75, 75)\n>       color: \"green\"\n>       text: \"take this\"\n\n          centerText: ({text, x, y, position, color, font}) ->\n            {x, y} = position if position\n\n            x = canvas.width / 2 unless x?\n\n            textWidth = @measureText(text)\n\n            @drawText {\n              text\n              color\n              font\n              x: x - (textWidth) / 2\n              y\n            }\n\nSetting the fill color:\n\n`canvas.fillColor(\"#FF0000\")`\n\nPassing no arguments returns the fillColor:\n\n`canvas.fillColor() # => \"#FF000000\"`\n\nYou can also pass a Color object:\n\n`canvas.fillColor(Color('sky blue'))`\n\n          fillColor: (color) ->\n            if color\n              if color.channels\n                context.fillStyle = color.toString()\n              else\n                context.fillStyle = color\n\n              return @\n            else\n              return context.fillStyle\n\nSetting the stroke color:\n\n`canvas.strokeColor(\"#FF0000\")`\n\nPassing no arguments returns the strokeColor:\n\n`canvas.strokeColor() # => \"#FF0000\"`\n\nYou can also pass a Color object:\n\n`canvas.strokeColor(Color('sky blue'))`\n\n          strokeColor: (color) ->\n            if color\n              if color.channels\n                context.strokeStyle = color.toString()\n              else\n                context.strokeStyle = color\n\n              return this\n            else\n              return context.strokeStyle\n\nDetermine how wide some text is.\n\n`canvas.measureText('Hello World!') # => 55`\n\nIt may have accuracy issues depending on the font used.\n\n          measureText: (text) ->\n            context.measureText(text).width\n\nPasses this canvas to the block with the given matrix transformation\napplied. All drawing methods called within the block will draw\ninto the canvas with the transformation applied. The transformation\nis removed at the end of the block, even if the block throws an error.\n\n          withTransform: (matrix, block) ->\n            context.save()\n\n            context.transform(\n              matrix.a,\n              matrix.b,\n              matrix.c,\n              matrix.d,\n              matrix.tx,\n              matrix.ty\n            )\n\n            try\n              block(this)\n            finally\n              context.restore()\n\n            return this\n\nStraight proxy to context `putImageData` method.\n\n          putImageData: (args...) ->\n            context.putImageData(args...)\n\n            return this\n\nContext getter.\n\n          context: ->\n            context\n\nGetter for the actual html canvas element.\n\n          element: ->\n            canvas\n\nStraight proxy to context pattern creation.\n\n          createPattern: (image, repitition) ->\n            context.createPattern(image, repitition)\n\nSet a clip rectangle.\n\n          clip: (x, y, width, height) ->\n            context.beginPath()\n            context.rect(x, y, width, height)\n            context.clip()\n\n            return this\n\nGenerate accessors that get properties from the context object.\n\n        contextAttrAccessor = (attrs...) ->\n          attrs.forEach (attr) ->\n            self[attr] = (newVal) ->\n              if newVal?\n                context[attr] = newVal\n                return @\n              else\n                context[attr]\n\n        contextAttrAccessor(\n          \"font\",\n          \"globalAlpha\",\n          \"globalCompositeOperation\",\n          \"lineWidth\",\n          \"textAlign\",\n        )\n\nGenerate accessors that get properties from the canvas object.\n\n        canvasAttrAccessor = (attrs...) ->\n          attrs.forEach (attr) ->\n            self[attr] = (newVal) ->\n              if newVal?\n                canvas[attr] = newVal\n                return @\n              else\n                canvas[attr]\n\n        canvasAttrAccessor(\n          \"height\",\n          \"width\",\n        )\n\n        context = canvas.getContext('2d')\n\n        options.init(self)\n\n        return self\n\nDepend on either jQuery or Zepto for now (TODO: Don't depend on either)\n\nHelpers\n-------\n\nFill in default properties for an object, setting them only if they are not\nalready present.\n\n    defaults = (target, objects...) ->\n      for object in objects\n        for name of object\n          unless target.hasOwnProperty(name)\n            target[name] = object[name]\n\n      return target\n\nInteractive Examples\n--------------------\n\n>     #! setup\n>     Canvas = require \"/pixie_canvas\"\n>\n>     window.Point ?= (x, y) ->\n>       x: x\n>       y: y\n>\n>     Interactive.register \"paint\", ({source, runtimeElement}) ->\n>       canvas = Canvas\n>         width: 400\n>         height: 200\n>\n>       code = CoffeeScript.compile(source)\n>\n>       runtimeElement.empty().append canvas.element()\n>       Function(\"canvas\", code)(canvas)\n",
              "type": "blob"
            },
            "test/test.coffee": {
              "path": "test/test.coffee",
              "mode": "100644",
              "content": "Canvas = require \"../pixie_canvas\"\n\ndescribe \"pixie canvas\", ->\n  it \"Should create a canvas\", ->\n    canvas = Canvas\n      width: 400\n      height: 150\n\n    assert canvas\n    \n    assert canvas.width() is 400\n",
              "type": "blob"
            }
          },
          "distribution": {
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"entryPoint\":\"pixie_canvas\",\"version\":\"0.9.1\"};",
              "type": "blob"
            },
            "pixie_canvas": {
              "path": "pixie_canvas",
              "content": "(function() {\n  var TAU, defaults,\n    __slice = [].slice;\n\n  TAU = 2 * Math.PI;\n\n  module.exports = function(options) {\n    var canvas, canvasAttrAccessor, context, contextAttrAccessor, self;\n    if (options == null) {\n      options = {};\n    }\n    defaults(options, {\n      width: 400,\n      height: 400,\n      init: function() {}\n    });\n    canvas = document.createElement(\"canvas\");\n    canvas.width = options.width;\n    canvas.height = options.height;\n    context = void 0;\n    self = {\n      clear: function(_arg) {\n        var height, width, x, y, _ref;\n        _ref = _arg != null ? _arg : {}, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;\n        if (x == null) {\n          x = 0;\n        }\n        if (y == null) {\n          y = 0;\n        }\n        if (width == null) {\n          width = canvas.width;\n        }\n        if (height == null) {\n          height = canvas.height;\n        }\n        context.clearRect(x, y, width, height);\n        return this;\n      },\n      fill: function(color) {\n        var bounds, height, width, x, y, _ref;\n        if (color == null) {\n          color = {};\n        }\n        if (!((typeof color === \"string\") || color.channels)) {\n          _ref = color, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height, bounds = _ref.bounds, color = _ref.color;\n        }\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        x || (x = 0);\n        y || (y = 0);\n        if (width == null) {\n          width = canvas.width;\n        }\n        if (height == null) {\n          height = canvas.height;\n        }\n        this.fillColor(color);\n        context.fillRect(x, y, width, height);\n        return this;\n      },\n      drawImage: function() {\n        var args;\n        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        context.drawImage.apply(context, args);\n        return this;\n      },\n      drawCircle: function(_arg) {\n        var circle, color, position, radius, stroke, x, y;\n        x = _arg.x, y = _arg.y, radius = _arg.radius, position = _arg.position, color = _arg.color, stroke = _arg.stroke, circle = _arg.circle;\n        if (circle) {\n          x = circle.x, y = circle.y, radius = circle.radius;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (radius < 0) {\n          radius = 0;\n        }\n        context.beginPath();\n        context.arc(x, y, radius, 0, TAU, true);\n        context.closePath();\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.stroke();\n        }\n        return this;\n      },\n      drawRect: function(_arg) {\n        var bounds, color, height, position, stroke, width, x, y;\n        x = _arg.x, y = _arg.y, width = _arg.width, height = _arg.height, position = _arg.position, bounds = _arg.bounds, color = _arg.color, stroke = _arg.stroke;\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (color) {\n          this.fillColor(color);\n          context.fillRect(x, y, width, height);\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.strokeRect(x, y, width, height);\n        }\n        return this;\n      },\n      drawLine: function(_arg) {\n        var color, direction, end, length, start, width;\n        start = _arg.start, end = _arg.end, width = _arg.width, color = _arg.color, direction = _arg.direction, length = _arg.length;\n        width || (width = 3);\n        if (direction) {\n          end = direction.norm(length).add(start);\n        }\n        this.lineWidth(width);\n        this.strokeColor(color);\n        context.beginPath();\n        context.moveTo(start.x, start.y);\n        context.lineTo(end.x, end.y);\n        context.closePath();\n        context.stroke();\n        return this;\n      },\n      drawPoly: function(_arg) {\n        var color, points, stroke;\n        points = _arg.points, color = _arg.color, stroke = _arg.stroke;\n        context.beginPath();\n        points.forEach(function(point, i) {\n          if (i === 0) {\n            return context.moveTo(point.x, point.y);\n          } else {\n            return context.lineTo(point.x, point.y);\n          }\n        });\n        context.lineTo(points[0].x, points[0].y);\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.stroke();\n        }\n        return this;\n      },\n      drawRoundRect: function(_arg) {\n        var bounds, color, height, position, radius, stroke, width, x, y;\n        x = _arg.x, y = _arg.y, width = _arg.width, height = _arg.height, radius = _arg.radius, position = _arg.position, bounds = _arg.bounds, color = _arg.color, stroke = _arg.stroke;\n        if (radius == null) {\n          radius = 5;\n        }\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        context.beginPath();\n        context.moveTo(x + radius, y);\n        context.lineTo(x + width - radius, y);\n        context.quadraticCurveTo(x + width, y, x + width, y + radius);\n        context.lineTo(x + width, y + height - radius);\n        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);\n        context.lineTo(x + radius, y + height);\n        context.quadraticCurveTo(x, y + height, x, y + height - radius);\n        context.lineTo(x, y + radius);\n        context.quadraticCurveTo(x, y, x + radius, y);\n        context.closePath();\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.lineWidth(stroke.width);\n          this.strokeColor(stroke.color);\n          context.stroke();\n        }\n        return this;\n      },\n      drawText: function(_arg) {\n        var color, font, position, text, x, y;\n        x = _arg.x, y = _arg.y, text = _arg.text, position = _arg.position, color = _arg.color, font = _arg.font;\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        this.fillColor(color);\n        if (font) {\n          this.font(font);\n        }\n        context.fillText(text, x, y);\n        return this;\n      },\n      centerText: function(_arg) {\n        var color, font, position, text, textWidth, x, y;\n        text = _arg.text, x = _arg.x, y = _arg.y, position = _arg.position, color = _arg.color, font = _arg.font;\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (x == null) {\n          x = canvas.width / 2;\n        }\n        textWidth = this.measureText(text);\n        return this.drawText({\n          text: text,\n          color: color,\n          font: font,\n          x: x - textWidth / 2,\n          y: y\n        });\n      },\n      fillColor: function(color) {\n        if (color) {\n          if (color.channels) {\n            context.fillStyle = color.toString();\n          } else {\n            context.fillStyle = color;\n          }\n          return this;\n        } else {\n          return context.fillStyle;\n        }\n      },\n      strokeColor: function(color) {\n        if (color) {\n          if (color.channels) {\n            context.strokeStyle = color.toString();\n          } else {\n            context.strokeStyle = color;\n          }\n          return this;\n        } else {\n          return context.strokeStyle;\n        }\n      },\n      measureText: function(text) {\n        return context.measureText(text).width;\n      },\n      withTransform: function(matrix, block) {\n        context.save();\n        context.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);\n        try {\n          block(this);\n        } finally {\n          context.restore();\n        }\n        return this;\n      },\n      putImageData: function() {\n        var args;\n        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        context.putImageData.apply(context, args);\n        return this;\n      },\n      context: function() {\n        return context;\n      },\n      element: function() {\n        return canvas;\n      },\n      createPattern: function(image, repitition) {\n        return context.createPattern(image, repitition);\n      },\n      clip: function(x, y, width, height) {\n        context.beginPath();\n        context.rect(x, y, width, height);\n        context.clip();\n        return this;\n      }\n    };\n    contextAttrAccessor = function() {\n      var attrs;\n      attrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return attrs.forEach(function(attr) {\n        return self[attr] = function(newVal) {\n          if (newVal != null) {\n            context[attr] = newVal;\n            return this;\n          } else {\n            return context[attr];\n          }\n        };\n      });\n    };\n    contextAttrAccessor(\"font\", \"globalAlpha\", \"globalCompositeOperation\", \"lineWidth\", \"textAlign\");\n    canvasAttrAccessor = function() {\n      var attrs;\n      attrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return attrs.forEach(function(attr) {\n        return self[attr] = function(newVal) {\n          if (newVal != null) {\n            canvas[attr] = newVal;\n            return this;\n          } else {\n            return canvas[attr];\n          }\n        };\n      });\n    };\n    canvasAttrAccessor(\"height\", \"width\");\n    context = canvas.getContext('2d');\n    options.init(self);\n    return self;\n  };\n\n  defaults = function() {\n    var name, object, objects, target, _i, _len;\n    target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = objects.length; _i < _len; _i++) {\n      object = objects[_i];\n      for (name in object) {\n        if (!target.hasOwnProperty(name)) {\n          target[name] = object[name];\n        }\n      }\n    }\n    return target;\n  };\n\n}).call(this);\n\n//# sourceURL=pixie_canvas.coffee",
              "type": "blob"
            },
            "test/test": {
              "path": "test/test",
              "content": "(function() {\n  var Canvas;\n\n  Canvas = require(\"../pixie_canvas\");\n\n  describe(\"pixie canvas\", function() {\n    return it(\"Should create a canvas\", function() {\n      var canvas;\n      canvas = Canvas({\n        width: 400,\n        height: 150\n      });\n      assert(canvas);\n      return assert(canvas.width() === 400);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/test.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.9.1",
          "entryPoint": "pixie_canvas",
          "repository": {
            "id": 12096899,
            "name": "pixie-canvas",
            "full_name": "distri/pixie-canvas",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/pixie-canvas",
            "description": "A pretty ok HTML5 canvas wrapper",
            "fork": false,
            "url": "https://api.github.com/repos/distri/pixie-canvas",
            "forks_url": "https://api.github.com/repos/distri/pixie-canvas/forks",
            "keys_url": "https://api.github.com/repos/distri/pixie-canvas/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/pixie-canvas/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/pixie-canvas/teams",
            "hooks_url": "https://api.github.com/repos/distri/pixie-canvas/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/pixie-canvas/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/pixie-canvas/events",
            "assignees_url": "https://api.github.com/repos/distri/pixie-canvas/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/pixie-canvas/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/pixie-canvas/tags",
            "blobs_url": "https://api.github.com/repos/distri/pixie-canvas/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/pixie-canvas/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/pixie-canvas/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/pixie-canvas/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/pixie-canvas/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/pixie-canvas/languages",
            "stargazers_url": "https://api.github.com/repos/distri/pixie-canvas/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/pixie-canvas/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/pixie-canvas/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/pixie-canvas/subscription",
            "commits_url": "https://api.github.com/repos/distri/pixie-canvas/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/pixie-canvas/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/pixie-canvas/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/pixie-canvas/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/pixie-canvas/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/pixie-canvas/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/pixie-canvas/merges",
            "archive_url": "https://api.github.com/repos/distri/pixie-canvas/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/pixie-canvas/downloads",
            "issues_url": "https://api.github.com/repos/distri/pixie-canvas/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/pixie-canvas/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/pixie-canvas/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/pixie-canvas/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/pixie-canvas/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/pixie-canvas/releases{/id}",
            "created_at": "2013-08-14T01:15:34Z",
            "updated_at": "2013-11-29T20:35:57Z",
            "pushed_at": "2013-11-29T20:34:09Z",
            "git_url": "git://github.com/distri/pixie-canvas.git",
            "ssh_url": "git@github.com:distri/pixie-canvas.git",
            "clone_url": "https://github.com/distri/pixie-canvas.git",
            "svn_url": "https://github.com/distri/pixie-canvas",
            "homepage": null,
            "size": 2464,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 1,
            "forks": 0,
            "open_issues": 1,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.9.1",
            "defaultBranch": "master"
          },
          "dependencies": {}
        }
      }
    },
    "undo": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "undo\n====\n\nUndo module for editors.\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Undo\n====\n\nAn editor module for editors that support undo/redo\n\n    CommandStack = require \"command-stack\"\n\n    module.exports = (I={}, self=Core(I)) ->\n      commandStack = CommandStack()\n\n      self.extend\n        history: (newHistory=[]) ->\n          if arguments.length > 0\n            commandStack = CommandStack newHistory\n          else\n            commandStack.stack()\n\n        execute: (command) ->\n          commandStack.execute command\n\n          return self\n\n        undo: ->\n          commandStack.undo()\n\n          return self\n\n        redo: ->\n          commandStack.redo()\n\n          return self\n\n      return self\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nremoteDependencies: [\n  \"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"\n]\ndependencies:\n  \"command-stack\": \"distri/command-stack:v0.11.0\"\n",
          "type": "blob"
        },
        "test/undo.coffee": {
          "path": "test/undo.coffee",
          "mode": "100644",
          "content": "Undo = require \"../main\"\n\ndescribe \"undo\", ->\n  it \"should undo\", ->\n    undo = Undo()\n    \n    undo.execute\n      execute: ->\n        console.log \"execute\"\n      undo: ->\n        console.log \"undo\"\n    \n    undo.undo()\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var CommandStack;\n\n  CommandStack = require(\"command-stack\");\n\n  module.exports = function(I, self) {\n    var commandStack;\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    commandStack = CommandStack();\n    self.extend({\n      history: function(newHistory) {\n        if (newHistory == null) {\n          newHistory = [];\n        }\n        if (arguments.length > 0) {\n          return commandStack = CommandStack(newHistory);\n        } else {\n          return commandStack.stack();\n        }\n      },\n      execute: function(command) {\n        commandStack.execute(command);\n        return self;\n      },\n      undo: function() {\n        commandStack.undo();\n        return self;\n      },\n      redo: function() {\n        commandStack.redo();\n        return self;\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"remoteDependencies\":[\"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"],\"dependencies\":{\"command-stack\":\"distri/command-stack:v0.11.0\"}};",
          "type": "blob"
        },
        "test/undo": {
          "path": "test/undo",
          "content": "(function() {\n  var Undo;\n\n  Undo = require(\"../main\");\n\n  describe(\"undo\", function() {\n    return it(\"should undo\", function() {\n      var undo;\n      undo = Undo();\n      undo.execute({\n        execute: function() {\n          return console.log(\"execute\");\n        },\n        undo: function() {\n          return console.log(\"undo\");\n        }\n      });\n      return undo.undo();\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/undo.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "remoteDependencies": [
        "http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js"
      ],
      "repository": {
        "id": 14673255,
        "name": "undo",
        "full_name": "distri/undo",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/undo",
        "description": "Undo module for editors.",
        "fork": false,
        "url": "https://api.github.com/repos/distri/undo",
        "forks_url": "https://api.github.com/repos/distri/undo/forks",
        "keys_url": "https://api.github.com/repos/distri/undo/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/undo/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/undo/teams",
        "hooks_url": "https://api.github.com/repos/distri/undo/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/undo/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/undo/events",
        "assignees_url": "https://api.github.com/repos/distri/undo/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/undo/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/undo/tags",
        "blobs_url": "https://api.github.com/repos/distri/undo/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/undo/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/undo/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/undo/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/undo/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/undo/languages",
        "stargazers_url": "https://api.github.com/repos/distri/undo/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/undo/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/undo/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/undo/subscription",
        "commits_url": "https://api.github.com/repos/distri/undo/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/undo/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/undo/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/undo/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/undo/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/undo/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/undo/merges",
        "archive_url": "https://api.github.com/repos/distri/undo/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/undo/downloads",
        "issues_url": "https://api.github.com/repos/distri/undo/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/undo/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/undo/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/undo/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/undo/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/undo/releases{/id}",
        "created_at": "2013-11-25T01:31:38Z",
        "updated_at": "2013-11-25T01:40:59Z",
        "pushed_at": "2013-11-25T01:40:58Z",
        "git_url": "git://github.com/distri/undo.git",
        "ssh_url": "git@github.com:distri/undo.git",
        "clone_url": "https://github.com/distri/undo.git",
        "svn_url": "https://github.com/distri/undo",
        "homepage": null,
        "size": 336,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {
        "command-stack": {
          "source": {
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "Command Stack\n-------------\n\nA simple stack based implementation of executable and undoable commands.\n\n    CommandStack = (stack=[]) ->\n      index = stack.length\n\n      execute: (command) ->\n        stack[index] = command\n        command.execute()\n\n        index += 1\n\n        # Be sure to blast obsolete redos\n        stack.length = index\n\n        return this\n\n      undo: ->\n        if @canUndo()\n          index -= 1\n\n          command = stack[index]\n          command.undo()\n\n          return command\n\n      redo: ->\n        if @canRedo()\n          command = stack[index]\n          command.execute()\n\n          index += 1\n\n          return command\n\n      current: ->\n        stack[index-1]\n\n      canUndo: ->\n        index > 0\n\n      canRedo: ->\n        stack[index]?\n\n      stack: ->\n        stack.slice(0, index)\n\n    module.exports = CommandStack\n\nTODO\n----\n\nIntegrate Observables\n",
              "type": "blob"
            },
            "package.json": {
              "path": "package.json",
              "mode": "100644",
              "content": "{\n  \"name\": \"commando\",\n  \"version\": \"0.9.0\",\n  \"description\": \"Simple Command Pattern\",\n  \"devDependencies\": {\n    \"coffee-script\": \"~1.6.3\",\n    \"mocha\": \"~1.12.0\",\n    \"uglify-js\": \"~2.3.6\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"https://github.com/STRd6/commando.git\"\n  },\n  \"files\": [\n    \"dist\"\n  ],\n  \"main\": \"dist/commando.js\"\n}\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.11.0\"\n",
              "type": "blob"
            },
            "test/command_stack.coffee": {
              "path": "test/command_stack.coffee",
              "mode": "100644",
              "content": "CommandStack = require \"../main\"\n\nok = assert\nequals = assert.equal\n\ndescribe \"CommandStack\", ->\n  it \"undo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.undo(), undefined\n  \n  it \"redo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.redo(), undefined\n  \n  it \"executes commands\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n  \n    commandStack.execute command\n  \n  it \"can undo\", ->\n    command =\n      execute: ->\n      undo: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n  \n  it \"can redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n  it \"executes redone command once on redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n    equals commandStack.redo(), undefined\n    equals commandStack.redo(), undefined\n  \n  it \"command is returned when undone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    equals commandStack.undo(), command, \"Undone command is returned\"\n  \n  it \"command is returned when redone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n    commandStack.undo()\n  \n    equals commandStack.redo(), command, \"Redone command is returned\"\n  \n  it \"cannot redo an obsolete future\", ->\n    Command = ->\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute Command()\n    commandStack.execute Command()\n  \n    commandStack.undo()\n    commandStack.undo()\n  \n    equals commandStack.canRedo(), true\n  \n    commandStack.execute Command()\n  \n    equals commandStack.canRedo(), false\n",
              "type": "blob"
            }
          },
          "distribution": {
            "main": {
              "path": "main",
              "content": "(function() {\n  var CommandStack;\n\n  CommandStack = function(stack) {\n    var index;\n    if (stack == null) {\n      stack = [];\n    }\n    index = stack.length;\n    return {\n      execute: function(command) {\n        stack[index] = command;\n        command.execute();\n        index += 1;\n        stack.length = index;\n        return this;\n      },\n      undo: function() {\n        var command;\n        if (this.canUndo()) {\n          index -= 1;\n          command = stack[index];\n          command.undo();\n          return command;\n        }\n      },\n      redo: function() {\n        var command;\n        if (this.canRedo()) {\n          command = stack[index];\n          command.execute();\n          index += 1;\n          return command;\n        }\n      },\n      current: function() {\n        return stack[index - 1];\n      },\n      canUndo: function() {\n        return index > 0;\n      },\n      canRedo: function() {\n        return stack[index] != null;\n      },\n      stack: function() {\n        return stack.slice(0, index);\n      }\n    };\n  };\n\n  module.exports = CommandStack;\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "package": {
              "path": "package",
              "content": "module.exports = {\"name\":\"commando\",\"version\":\"0.9.0\",\"description\":\"Simple Command Pattern\",\"devDependencies\":{\"coffee-script\":\"~1.6.3\",\"mocha\":\"~1.12.0\",\"uglify-js\":\"~2.3.6\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/STRd6/commando.git\"},\"files\":[\"dist\"],\"main\":\"dist/commando.js\"};",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.11.0\"};",
              "type": "blob"
            },
            "test/command_stack": {
              "path": "test/command_stack",
              "content": "(function() {\n  var CommandStack, equals, ok;\n\n  CommandStack = require(\"../main\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  describe(\"CommandStack\", function() {\n    it(\"undo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.undo(), void 0);\n    });\n    it(\"redo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"executes commands\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      return commandStack.execute(command);\n    });\n    it(\"can undo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return commandStack.undo();\n    });\n    it(\"can redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return commandStack.redo();\n    });\n    it(\"executes redone command once on redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      commandStack.redo();\n      equals(commandStack.redo(), void 0);\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"command is returned when undone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return equals(commandStack.undo(), command, \"Undone command is returned\");\n    });\n    it(\"command is returned when redone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return equals(commandStack.redo(), command, \"Redone command is returned\");\n    });\n    return it(\"cannot redo an obsolete future\", function() {\n      var Command, commandStack;\n      Command = function() {\n        return {\n          execute: function() {},\n          undo: function() {}\n        };\n      };\n      commandStack = CommandStack();\n      commandStack.execute(Command());\n      commandStack.execute(Command());\n      commandStack.undo();\n      commandStack.undo();\n      equals(commandStack.canRedo(), true);\n      commandStack.execute(Command());\n      return equals(commandStack.canRedo(), false);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/command_stack.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.11.0",
          "entryPoint": "main",
          "repository": {
            "id": 11981428,
            "name": "command-stack",
            "full_name": "distri/command-stack",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/command-stack",
            "description": "A stack for holding command objects.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/command-stack",
            "forks_url": "https://api.github.com/repos/distri/command-stack/forks",
            "keys_url": "https://api.github.com/repos/distri/command-stack/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/command-stack/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/command-stack/teams",
            "hooks_url": "https://api.github.com/repos/distri/command-stack/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/command-stack/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/command-stack/events",
            "assignees_url": "https://api.github.com/repos/distri/command-stack/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/command-stack/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/command-stack/tags",
            "blobs_url": "https://api.github.com/repos/distri/command-stack/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/command-stack/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/command-stack/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/command-stack/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/command-stack/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/command-stack/languages",
            "stargazers_url": "https://api.github.com/repos/distri/command-stack/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/command-stack/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/command-stack/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/command-stack/subscription",
            "commits_url": "https://api.github.com/repos/distri/command-stack/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/command-stack/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/command-stack/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/command-stack/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/command-stack/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/command-stack/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/command-stack/merges",
            "archive_url": "https://api.github.com/repos/distri/command-stack/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/command-stack/downloads",
            "issues_url": "https://api.github.com/repos/distri/command-stack/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/command-stack/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/command-stack/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/command-stack/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/command-stack/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/command-stack/releases{/id}",
            "created_at": "2013-08-08T16:51:40Z",
            "updated_at": "2013-11-25T00:40:55Z",
            "pushed_at": "2013-11-25T00:40:53Z",
            "git_url": "git://github.com/distri/command-stack.git",
            "ssh_url": "git@github.com:distri/command-stack.git",
            "clone_url": "https://github.com/distri/command-stack.git",
            "svn_url": "https://github.com/distri/command-stack",
            "homepage": "",
            "size": 664,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.11.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        }
      }
    }
  }
});