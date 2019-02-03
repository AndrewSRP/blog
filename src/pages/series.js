import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const SeriesPage = (props) => {
  const series = props.data.allMarkdownRemark;
  return (
    <Layout>
      <div className="ui link cards">
        {series.group.map((item , i) => {
          const {fieldValue, totalCount, edges} = item;
          return (
            <div className="card" key={i} >
              <div className="content">
                <div className="header">{fieldValue}</div>
                <div className="description">
                  <ol>
                  {
                    edges.map(({ node }, j) => {
                      const {
                        frontmatter: {title, path},
                      } = node;
                      return (
                        <Link to={path} className="card" key={j} >
                          <li>{title}</li>
                        </Link>
                      )})
                  }
                  </ol>
                </div>
              </div>
              <div className="extra content">
                <span className="right floated">{totalCount || 0}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
export default SeriesPage;
export const seriesQuery = graphql`
  query seriesQuery {
    allMarkdownRemark(
        limit: 2000
      ) {
        group(field: frontmatter___series) {
          fieldValue
          totalCount
          edges {
            node {
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
  }
`
