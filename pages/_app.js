import React from 'react'
import { createGlobalStyle } from 'styled-components'
import App, { Container } from 'next/app'
import Head from 'next/head'

import Header from '@components/Header'
import PageTransition from '@components/PageTransition'

const Styles = createGlobalStyle`
  :root {
    --backgroundColor: #f5f5f5;
    --textColor: #000103;
    --primaryColor: #3a8fff;
    --secondaryColor: #504d4d;
    --baseline: .4rem;
  }

  html {
    box-sizing: border-box;
    font-size: 52.5%;
    /*scroll-behavior: smooth;*/

    @media only screen and (min-width: 860px) {
      font-size: 62.5%;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  ::selection {
    background: rgba(58, 143, 251, 1);
    color: #fff;
  }

  body {
    background: var(--backgroundColor);
    color: var(--textColor);
    // font-family: 'PT Sans', sans-serif;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 1.8rem;
    margin: 0;
    min-width: 36rem;
    padding: 0;
  }

  svg {
    fill: currentColor;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 150ms ease-out;

    .no-touch &:hover {
      color: var(--primaryColor);
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a[href^="mailto:"] {
    svg {
      height: auto;
      margin: 0 0 0 .2rem;
      opacity: 0;
      position: relative;
      top: .2rem;
      transition: opacity 150ms ease-out;
      width: 1.6rem;
    }

    .no-touch &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    const isTouch =
      !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0

    if (!isTouch) {
      document.querySelector('body').classList.add('no-touch')
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Styles />
        <Head>
          <title>
            Claire Sosset - Développeur front-end freelance basée à Paris
          </title>
          <meta
            name="description"
            content="Développeur front-end freelance basée à Paris (HTML, CSS, Javascript, React, SPA, Node)"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noimageindex" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#f5f5f5" />

          <link
            href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,700"
            rel="stylesheet"
          />
        </Head>

        <Header />

        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Container>
    )
  }
}
