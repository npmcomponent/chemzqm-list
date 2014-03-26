var array = require('array');
var Emitter = require('emitter');
var Reactive = require('reactive');
var domify = require ('domify');
var query = require ('query');
var styles = window.getComputedStyle;

/**
 * 
 * @param {Node} parent
 * @param {String|Node} template
 * @api public
 */
function List(parent, template, view){
  if (! this instanceof List) return new List(parent, template);
  if (typeof template === 'string') template = domify(template);
  this.el = parent;
  this.tmpl = template;
  this.view = view;
  this.arr = array();
}

Emitter(List.prototype);

/**
 * Add obj to list with optional at top
 * @param {Object} obj
 * @param {Boolean} top
 * @api public
 */
List.prototype.add = function(obj, top) {
  var opt;
  var method = top ? 'unshift' : 'push';
  this.arr[method](obj);
  var node = this.tmpl.cloneNode(true);
  if (this.view) opt = { delegate: this.view };
  var react = Reactive(node, obj, opt);
  if (top && this.el.children.length) {
    this.el.insertBefore(node, this.el.firstChild);
  } else {
    this.el.appendChild(node);
  }
  obj._reactive = react;
  this.emit('added', obj);
}

function remove(array, obj) {
  var i = array.indexOf(obj);
  array.splice(i, 1);
  obj._reactive.destroy();
}

/**
 * Remove object by object reference or string or function
 * @param {Object|Number|String|Function} fn
 * @api public
 */
List.prototype.remove = function (fn) {
  var objs = [];
  var arr = this.arr;
  if (arguments.length === 0) {
    this.arr.forEach(function(obj) {
      obj._reactive.destroy();
    }.bind(this));
    this.arr = array();
    return;
  }
  if (typeof fn == 'object') {
    objs.push(fn);
  }
  else if (typeof fn == 'number') {
    var obj = arr[fn];
    if(!obj) throw new Error('can\'t find model at index ' + fn);
    objs.push(arr[fn]);
  } else {
    objs = arr.select(fn);
  }
  objs.forEach(function(obj) {
    remove(arr, obj);
    this.emit('removed', obj);
  }.bind(this))
}

/**
 * Bind a new array to list
 * @param {Array} arr
 * @api public
 */
List.prototype.bind = function (arr) {
  var opt;
  this.remove();
  this.arr = (arr instanceof array) ? arr : array(arr);
  this.arr.forEach(function(obj) {
    var node = this.tmpl.cloneNode(true);
    if (this.view) opt = { delegate: this.view };
    var react = Reactive(node, obj, opt);
    this.el.appendChild(node);
    obj._reactive = react;
  }.bind(this));
}

/**
 * Sort the list with fn and optional desc order
 * @param {Function} fn
 * @param {Boolean} desc [optional]
 * @api public
 */
List.prototype.sort = function (fn, desc) {
  if (desc) {
    var ofn = fn;
    fn = function(a, b) {
      return ~ofn(a, b) + 1;
    }
  }
  this.arr.sort(fn);
  var frag = document.createDocumentFragment();
  this.arr.forEach(function(obj) {
    var el = obj._reactive.el;
    frag.appendChild(el);
  })
  this.el.appendChild(frag);
}

/**
 * Only show the elements with filter function passed true
 * @param {Function} fn
 * @api public
 */
List.prototype.filter = function (fn) {
  this.arr.forEach(function(obj) {
    var el = obj._reactive.el;
    var display = styles(el).display;
    if (display !== 'none' && ! this.display) this.display = display;
  }.bind(this));
  fn = !!fn ? fn : function() {
    return true;
  }
  var arr = this.arr.select(fn);
  this.arr.forEach(function(obj) {
    var el = obj._reactive.el;
    if (~arr.indexOf(obj)) {
      el.style.display = this.display;
    } else {
      el.style.display = 'none';
    }
  }.bind(this));
}
module.exports = List;
