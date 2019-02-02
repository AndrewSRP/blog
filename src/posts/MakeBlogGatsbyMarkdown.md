---
path: "/posts/make-blog-gatsby-markdown"
date: "2019-02-02"
title: "Gatsby 로 Markdown 블로그 만들기"
description: "Gatsby 로 Markdown 블로그 만들기"
author: "austin/andrew"
---

# Gatsby 로 Markdown 블로그 만들기

Gatsby가 Markdown 파일을 읽어서 정적파일로 만드는 방법은 아래 순서대로 이루어진다.

1. `gatsby-source-filesystem` 로 파일을 읽는다.
2. `gatsby-transformer-remark`로 마크다운 파일을 해석한다.
3. template 에서 frontmatter으로 data 를 세팅한다.
4. Gatsby의 nodejs createPageAPI를 사용하여 정적 페이지 만들기

## gatsby-config.js 에 필요한 정보 설정하기

Gatsby 로 마크다운을 읽기 위해서는 `gatsby-source-filesystem` 플로그인과 마크다운을 필요한 정보로 해석하기 위한 `gatsby-transformer-remark` 이 필요하다.  
해당 내용을 `gatsby-config.js` 에 세팅해야 한다.

```javascript
// gatsby-config.js
plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/파일이 위치할 폴더이름`,
      },
    },
    `gatsby-transformer-remark`,
]
```

## 마크다운을 Html로 변경하기 위한 템플릿 만들기

Gatsby는 graphql를 이용해서 Markdown 데이터 정보를 가져온다.
가져온 정보는 Template 에게 주어지며, 정의한 곳에 세팅된다.

```javascript
// markdown-template.js
import React from "react"
import { graphql } from "gatsby"

export default function Template({data}) {
  const { markdownRemark: { frontmatter, html } } = data;
  return (
    <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일 ")
        path
        title
      }
    }
  }
`
```

## 템플릿을 정적 HTML로 만들기

Gatsby는 Node.js API 으로 정적페이지를 만들어 낸다.  
이를 사용하기 위해서는 gatsby-node.js 에 세팅해야 한다.

읽어온 markdown 정보를 createPage 으로 실제 정적 파일로 만들어낸다.

```javascript
// gatsby-node.js
const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`템플릿 파일`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
```

## 첫 포스트 작성해보기

</end>

[Gatsby 공식 마크다운 적용방법](https://www.gatsbyjs.org/docs/adding-markdown-pages/)
