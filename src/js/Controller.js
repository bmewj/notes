var Controller = function(fns, props) {
  this.read = fns.read || (function(){})
  this.process = fns.process || (function(){})
  this.write = fns.write || (function(){})
  this.state = null
  this.props = props
  this.update = this.update.bind(this)
  this.children = []
  return this
}

Controller.prototype.update = function(event) {
  // Read
  var data = this.read(event),
      childData = this.children.map(function(controller) {
        return controller.read()
      })

  // Process
  var nextState = this.process(data, this.state),
      childNextState = this.children.map(function(controller, i) {
        return controller.process(childData[i], controller.state)
      })

  // Write
  this.write(this.state, nextState)
  this.state = nextState

  this.children.forEach(function(controller, i) {
    controller.write(controller.state, childNextState[i])
    controller.state = childNextState[i]
  })
}

Controller.prototype.addChild = function(controller) {
  this.children.push(controller)
}

export default Controller
