import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"

class PostRoute extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <div>
        <Helmet
          title={post.frontmatter.title}
          meta={[{ name: "description", content: post.excerpt }]}
        />
        <h1>
          {post.frontmatter.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default PostRoute

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
