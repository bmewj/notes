import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../css/prism-coy.css'
import '../css/fonts.css'
import '../css/index.css'

class Wrapper extends React.Component {
  render() {
    return (
      <div className="main">
        <Helmet defaultTitle="Notes"
                titleTemplate="%s | Notes" />
        <div id="sticky-header" />
        {this.props.children()}
      </div>
    )
  }
}

export default Wrapper
