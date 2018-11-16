import { Fragment } from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const GA_CODE = serverRuntimeConfig.ga_id

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="fr">
        <Head>
          {this.props.styleTags}

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
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    )
  }
}
