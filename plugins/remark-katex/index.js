const visit = require('unist-util-visit')
const katex = require('katex')
const remarkMath = require('remark-math')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'inlineMath', node => {
    node.type = 'html'
    try {
      node.value = katex.renderToString(node.value, {
        displayMode: false,
      })
    } catch (e) {}
  })

  visit(markdownAST, 'math', node => {
    node.type = 'html'
    try {
      node.value = katex.renderToString(node.value, {
        displayMode: true,
      })
    } catch (e) {}
  })
}

module.exports.setParserPlugins = () => [remarkMath]
