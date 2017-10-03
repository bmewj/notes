function read() {
  const deviceWidth = window.innerWidth || screen.width
  const clientWidth = document.body.clientWidth

  const zoomFactor = Math.round(10 * clientWidth / deviceWidth) / 10

  // Headers
  const { headers } = this.props
  const headerInfo = headers.map(header => {
    return {
      height: header.clientHeight,
      top: header.getBoundingClientRect().top
    }
  })
  const headerLeft = headers[0].getBoundingClientRect().left
  const headerWidth = headers[0].clientWidth

  return {
    zoomFactor,
    headerInfo,
    headerLeft,
    headerWidth
  }
}

function process({ zoomFactor, headerInfo, headerLeft, headerWidth }, prevState) {
  const numberOfHeaders = headerInfo.length

  // Which header will be fixed to the top?
  let index = numberOfHeaders - 1
  for (; index >= 0; index--) {
    if (headerInfo[index].top < 0) { // ...this one
      break
    }
  }
  if (zoomFactor !== 1) {
    index = -1 // avoid buggy headers when zoomed in
  }
  const headerToFix = index

  let stickyHeader
  if (index === -1) {
    // No fixed header
    stickyHeader = { top: 0, height: 0 }

  } else {
    // Fixed header

    const headerHeight = headerInfo[index].height

    let top = 0
    if (index < numberOfHeaders - 1) {
      top = Math.min(0, headerInfo[index + 1].top - headerHeight)
    }

    stickyHeader = {
      top,
      height: headerHeight
    }
}

  return {
    headerToFix,
    stickyHeader,
    marginLeft: headerLeft,
    width: headerWidth
  }
}

function write(prevState, nextState) {
  if (!prevState) {
    prevState = {
      headerToFix: -1,
      stickyHeader: { top: 0, height: 0 },
      marginLeft: 0,
      width: 0
    }
  }

  const { headers, headerHTML, stickyHeader } = this.props

  if (prevState.headerToFix !== nextState.headerToFix) {
    if (prevState.headerToFix !== -1) {
      headers[prevState.headerToFix].style.visibility = 'visible'
    }
    if (nextState.headerToFix !== -1) {
      stickyHeader.innerHTML = headerHTML[nextState.headerToFix]
      headers[nextState.headerToFix].style.visibility = 'hidden'
    }
  }

  if (prevState.stickyHeader.top !== nextState.stickyHeader.top) {
    stickyHeader.style.top = nextState.stickyHeader.top + 'px'
  }

  if (prevState.stickyHeader.height !== nextState.stickyHeader.height) {
    stickyHeader.style.height = nextState.stickyHeader.height + 'px'
  }

  if (nextState.headerToFix !== -1) {
    // if (prevState.marginLeft !== nextState.marginLeft) {
    //   stickyHeader.firstChild.style.marginLeft = nextState.marginLeft + 'px'
    // }
    if (prevState.width !== nextState.width) {
      stickyHeader.firstChild.style.width = nextState.width + 'px'
    }
  }
}

const StickyHeaders = { read, process, write }
export default StickyHeaders
