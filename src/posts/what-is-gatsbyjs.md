---
path: "/posts/what-is-gatsbyjs"
date: "2019-02-02"
title: "Gatsby JS 란 무엇인가"
description: "Gatsby JS 란 무엇인가"
author: "austin/andrew"
---

# Gatsby JS 란 무엇인가

Gatsby JS 는 정적 html 생성기 이다.

Gatsby CLI를 이용해서 Webpack, Reactjs, React-route 등을 간단하게 이용할 수 있게 해준다.

현재 19년 2월을 기준으로 Gatsby 버전은 2.0.107 Gatsby CLI 버전은 2.4.8 이며, 리액트 버전은 16.7.0 이다.

Gatsby 를 사용하면 페이지 전에 게츠비 관련 스크립트를 먼저 다운받고 이후의 페이지의 정보를 다운 받는다.

## 5분만에 설치하고 실행하기

1. npm install --global gatsby-cli
2. gatsby new [프로젝트 폴더명]
3. cd [프로젝트 폴더명]
4. gatsby develop // 개발모드로 시작한다.

## 프로젝트 구조 살펴보기

- /.cache  
  Gatsby의 내부 캐시이다.
- /public  
  gatsby build 의 Output이 들어간다.
- /plugins  
  npm에 들어가지 않은 라이브러리나 플로그인을 넣을 수 있다.
- /src
  - /pages  
    파일 이름과 폴더 이름을 경로로 따르는 페이지
  - /component  
    컴포넌트의 모음 폴더
  - /images  
    이미지 모음 폴더
- /static  
  예제에서는 만들어 지지 않지만 static 폴더에 파일을 저장하면 Webpack 에서 파일을 처리하지 않고 공용 폴더에 복사되는 폴더가 존재한다.

## 설정 파일 살펴보기

- gatsby-config.js  
  Gatsby 사이트의 기본 구성 파일이다.  
  여기서 사이트 제목 및 설명, 포함 할 Gatsby 플러그인 등 사이트 (메타 데이터)에 대한 정보를 지정할 수 있다.
- gatsby-browser.js  
  Gatsby 브라우저 API 의 사용이 있는 경우 사용한다.
- gatsby-node.js  
  Gatsby 노드 API 사용이 있을 경우의 사용법을 정의한다.
- gatsby-ssr.js  
  Gatsby 서버 사이드 렌더링 API 사용이 있을 경우의 사용법 정의한다.

</end>
