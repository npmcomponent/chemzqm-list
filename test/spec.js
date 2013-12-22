/*global it,beforeEach,afterEach,describe*/
var expect = require('chai').expect;
var List = require('list');
var domify = require ('domify');
var dom = require ('dom');
var _ = require ('enumerable');
var Emitter = require ('emitter');


var parentNode;
beforeEach(function() {
  parentNode = document.createElement('div');
  document.body.appendChild(parentNode);
})

afterEach(function() {
  if(parentNode) parentNode.parentNode.removeChild(parentNode);
})

describe('List(parent, template)', function() {
  it('shold init list with template as string', function() {
    var tmpl = '<a href="/download/{id}"></a>';
    var list = new List(parentNode, tmpl);
    var user = { id: 'jack' };
    list.add(user);
    expect(parentNode.children.length).to.equal(1);
    expect(parentNode.firstChild.getAttribute('href')).to.equal('/download/jack');
  })

  it('shold init list with template as dom', function() {
    var tmpl = domify('<a href="/download/{id}"></a>');
    var list = new List(parentNode, tmpl);
    var user = { id: 'jack' };
    list.add(user);
    expect(parentNode.children.length).to.equal(1);
    expect(parentNode.firstChild.getAttribute('href')).to.equal('/download/jack');
  })
})

describe('#add(obj, [top])', function() {
  it('should add one model at bottom', function() {
    var tmpl = domify('<a href="/download/{id}"></a>');
    var list = new List(parentNode, tmpl);
    var user = { id: 'jack' };
    list.add(user);
    list.add({ id: 'jane' });
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(2);
    expect(nodes[0].getAttribute('href')).to.equal('/download/jack');
    expect(nodes[1].getAttribute('href')).to.equal('/download/jane');
  })

  it('should add one model at top', function() {
    var tmpl = domify('<a href="/download/{id}"></a>');
    var list = new List(parentNode, tmpl);
    var user = { id: 'jack' };
    list.add(user);
    list.add({ id: 'jane' }, true);
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(2);
    expect(nodes[0].getAttribute('href')).to.equal('/download/jane');
    expect(nodes[1].getAttribute('href')).to.equal('/download/jack');
  })
})

describe('#remove()', function() {
  it('should remove model by model instance', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'james'});
    var user = {name: 'jessica'};
    list.add(user);
    list.remove(user);
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(1);
    expect(nodes[0].innerHTML).to.equal('james');
  })

  it('should remove model by model index', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'james'});
    list.add({ name: 'jessica' });
    list.remove(1);
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(1);
    expect(nodes[0].innerHTML).to.equal('james');
  })

  it('should remove model by to-function string', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'james'});
    list.add({ name: 'jessica' });
    list.remove('name == "james"');
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(1);
    expect(nodes[0].innerHTML).to.equal('jessica');
  })

  it('should remove model by function', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'james'});
    list.add({ name: 'jessica' });
    list.remove(function(obj) {
      return obj.name == 'james'
    });
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(1);
    expect(nodes[0].innerHTML).to.equal('jessica');
  })

  it('should clear the elements with empty arguments', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'james'});
    list.add({ name: 'jessica' });
    list.remove();
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(0);
  })
})

describe('#bind(array)', function() {
  it('should init with a new array of models', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    var users = [
      {name: 'james'},
      {name: 'jessica'}
    ]
    list.bind(users);
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(2);
  })

  it('should bind a new array of models', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    list.add({name: 'tobi'});
    var users = [
      {name: 'james'},
      {name: 'jessica'}
    ]
    list.bind(users);
    var nodes = parentNode.children;
    expect(nodes.length).to.equal(2);
  })
})

describe('#sort(fn)', function() {
  it('should sort the list with fn', function() {
    var tmpl = '<div>{id}</div>';
    var list = new List(parentNode, tmpl);
    var users = [
      {id: 4},
      {id: 2},
      {id: 1},
      {id: 3}
    ]
    list.bind(users);
    list.sort(function(a, b) {
      return a.id - b.id;
    })
    var ids = _(dom(parentNode).find('div')).map('text()');
    expect(ids.first()).to.equal('1');
    expect(ids.last()).to.equal('4');
  })

  it('should sort the list descend with fn', function() {
    var tmpl = '<div>{id}</div>';
    var list = new List(parentNode, tmpl);
    var users = [
      {id: 4},
      {id: 2},
      {id: 1},
      {id: 3}
    ]
    list.bind(users);
    list.sort(function(a, b) {
      return a.id - b.id;
    }, true)
    var ids = _(dom(parentNode).find('div')).map('text()');
    expect(ids.first()).to.equal('4');
    expect(ids.last()).to.equal('1');
  })
})

describe('#filter([fn])', function() {
  it('should filter the list with fn', function() {
    var tmpl = '<div>{id}</div>';
    var list = new List(parentNode, tmpl);
    var users = [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ]
    list.bind(users);
    list.filter('id > 2');
    var nodes = parentNode.children;
    expect(nodes[0].style.display).to.equal('none');
    expect(nodes[1].style.display).to.equal('none');
    expect(nodes[2].style.display).to.equal('block');
    expect(nodes[3].style.display).to.equal('block');
  })

  it('should should show all the child nodes when filter is empty', function() {
    var tmpl = '<div>{id}</div>';
    var list = new List(parentNode, tmpl);
    var users = [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ]
    list.bind(users);
    list.filter('id > 2');
    list.filter();
    var count = _(dom(parentNode).find('div'))
          .map('css("display")')
          .count(function(display) {
            return display === 'block';
          });
    expect(count).to.equal(4);
  })
})

describe('reactive', function() {
  it('should react the attribute binding', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    var user = { name: 'tobi' };
    Emitter(user);
    list.add(user);
    user.name = 'jack';
    user.emit('change name');
    expect(parentNode.firstChild.innerHTML).to.equal('jack');
  })

  it('should trigger the binding function', function() {
    var tmpl = domify('<button on-click="action"><em>{name}</em></button>');
    var list = new List(parentNode, tmpl);
    var model;
    var node;
    list.action = function(e, el, obj) {
      node = el;
      model = obj;
    }
    var user = {name: 'jonathon'};
    list.add(user);
    list.add({ name: 'jack' });
    parentNode.firstChild.click();
    expect(model).to.equal(user);
    expect(node).to.equal(parentNode.firstChild);
  })
})

describe('events', function() {
  it('should trigger added event', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    var user = { name: 'tobi' };
    var model;
    list.on('added', function(obj) {
      model = obj;
    })
    list.add(user);
    expect(model).to.equal(user);
  })

  it('should trigger removed event', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    var user = { name: 'tobi' };
    var model;
    list.on('removed', function(obj) {
      model = obj;
    })
    list.add(user);
    list.remove(0);
    expect(model).to.equal(user);
  })

  it('should not trigger removed event when use remove without arguments', function() {
    var tmpl = '<div>{name}</div>';
    var list = new List(parentNode, tmpl);
    var user = { name: 'tobi' };
    var model;
    list.on('removed', function(obj) {
      model = obj;
    })
    list.add(user);
    list.remove();
    expect(model).to.be.undefined;
  })
})
