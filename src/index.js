var _ = require('lodash')

function extractPathByExpression(expression) {
  var [, $1] = expression.match(/\{(.{0,})\}/) || []
  return $1
}

function findTargetByPath($, path) {
  return (typeof path === 'string') && path.split('.').reduce((point, key) => {
    if(key === '$')
      return $

    if (_.isArray(point)) {
      return _.map(point, sub => sub[key])
    } else {
      return point[key]
    }
  }, $)
}

function findTargetByExpression($, expression) {
  return findTargetByPath($, extractPathByExpression(expression))
}

function getLinksByObject(obj) {
  return obj._links || (obj._links = {})
}
function bindLinkToObject(obj, name, link) {
  var links = getLinksByObject(obj)
  links[name] = link
}
function convertExpression(expression, value) {
  if(_.isArray(value)) {
    return value.map(sub => convertExpression(expression, sub))
  }
  return expression.replace(/(\{.{0,}\})/, value)
}

function bind($) {
  var { _links } = $

  for(var name in _links) {
    var _link = _links[name]
      , { template, rel, href, method } = _link

    if(template) {
      var targets = findTargetByExpression($, template)
        , rels = findTargetByExpression($, rel)
        , hrefs = findTargetByExpression($, href)

      targets.forEach((target, idx) => {
        bindLinkToObject(target, name, {
          rel: convertExpression(rel, rels[idx]),
          href: convertExpression(href, hrefs[idx]),
          method,
        })
      })
    }
  }
}

module.exports = bind
