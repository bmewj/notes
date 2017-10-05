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
                titleTemplate="%s | Notes">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css" integrity="sha384-B41nY7vEWuDrE9Mr+J2nBL0Liu+nl/rBXTdpQal730oTHdlrlXHzYMOhDU60cwde" crossorigin="anonymous" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js" integrity="sha384-L9gv4ooDLrYwW0QCM6zY3EKSSPrsuUncpx26+erN0pJX4wv1B1FzVW1SvpcJPx/8" crossorigin="anonymous"></script>
        </Helmet>
        <div id="sticky-header" />
        {this.props.children()}
      </div>
    )
  }
}

export default Wrapper
