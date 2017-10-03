import Controller from './src/js/Controller'
import StickyHeaders from './src/js/StickyHeaders'

exports.clientEntry = function () {
  require('es6-object-assign').polyfill()
}

window.addEventListener('load', () => {
  let headers = []

  Array.prototype.forEach.call(document.getElementsByTagName('h1'), header => headers.push(header))
  Array.prototype.forEach.call(document.getElementsByTagName('h2'), header => headers.push(header))
  console.log(headers)
  let headerHTML = headers.map(header => {
    return header.outerHTML
  })

  const stickyHeaders = new Controller(StickyHeaders, {
    headers,
    headerHTML,
    stickyHeader: document.getElementById('sticky-header')
  })

  window.addEventListener('scroll', stickyHeaders.update)
  window.addEventListener('resize', stickyHeaders.update)
  stickyHeaders.update()
})
