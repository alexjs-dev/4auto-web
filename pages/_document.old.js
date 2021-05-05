import Document, { Html, Head, Main, NextScript } from 'next/document'

const googleApiKey = 'AIzaSyAU_nVRVY5VsT7HZNJYvjVfCJPNZ35jreI'

class PageDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon_16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon_32x32.png" />
          <meta property="og:locale:alternate" content="ru_RU" />
          <meta property="og:locale:alternate" content="ru-RU" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, shrink-to-fit=no" />
          <meta httpEquiv="cache-control" content="no-store" />
          <link rel="apple-touch-icon" sizes="32x32" href="/static/favicon_32x32.png" />
          <script src={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=en&types=(cities)`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default PageDocument
