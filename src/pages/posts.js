import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const PostsPage = (props) => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <div className="ui link cards">
      {postList.edges.map(({ node }, i) => {
        const {
          excerpt,
          frontmatter: {title, date, path, keyword},
        } = node;
        return (
          <Link to={path} className="card" key={i} >
            <div className="content">
              <div className="header">{title}</div>
              <div className="meta">{date}</div>
              <div className="description">{excerpt || ''}</div>
            </div>
              <div className="extra content">
                <span className="right floated">{keyword || ''}</span>
            </div>
          </Link>
        )
      })}
      </div>
    </Layout>
  )
}
export default PostsPage;
export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fileAbsolutePath
          excerpt(pruneLength: 80)
          frontmatter {
            date(formatString: "YY/MM/DD")
            path
            title
            description
            keyword
          }
        }
      }
    }
  }
`
