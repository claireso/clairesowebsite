import { Fragment } from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const GA_CODE = serverRuntimeConfig.ga_id

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html lang="fr">
        <Head>
          {GA_CODE && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || []
                  function gtag(){dataLayer.push(arguments)}
                  gtag('js', new Date())

                  gtag('config', '${GA_CODE}')
                `
                }}
              />
            </Fragment>
          )}

          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('IntersectionObserver' in window === false) {
                  var scriptElement = document.createElement('script')
                  scriptElement.defer = true
                  scriptElement.src = '/_next/static/runtime/polyfills.js'
                  document.head.appendChild(scriptElement)
                }
              `
            }}
          />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    )
  }
}
