var preact = require('preact');
var undom = require('undom');

/**
 *	Prototype stateful server renderer.
 */
var doc;
module.exports = function createRenderer() {
  if (!doc) {
    doc = undom();
    Object.assign(global, doc.defaultView);
  }

  var root, parent = doc.createElement('x-root');
  doc.body.appendChild(parent);

  return {
    render: function(jsx) {
      root = preact.render(jsx, parent, root);
      return this;
    },
    html: function() {
      return serializeHtml(root);
    }
  };
}

function serializeHtml(el) {
  if (el.nodeType===3) return esc(el.nodeValue);
  var name = String(el.nodeName).toLowerCase(),
    str = '<'+name,
    hasClass = false,
    c, i;
  for (i=0; i<el.attributes.length; i++) {
    let name = el.attributes[i].name;
    if (name==='class') hasClass = true;
    str += ' '+name+'="'+esc(el.attributes[i].value)+'"';
  }
  if (el.className && !hasClass) str += ' class="'+el.className+'"';
  str += '>';
  for (i=0; i<el.childNodes.length; i++) {
    c = serializeHtml(el.childNodes[i]);
    if (c) str += c;
  }
  return str + '</'+name+'>';
}

function esc(str) { return String(str).replace(/[&<>"']/g, escMap); }
function escMap(s) { return '&'+map[s]+';'; }
var map = {'&':'amp','<':'lt','>':'gt','"':'quot',"'":'apos'};
