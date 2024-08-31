import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <meta name="google" content="notranslate" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <meta name="author" content="cryptonativecoding@gmail.com" />
                <link rel="shortcut icon" href="/favicon-32x32.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="36x36" href="/android-icon-36x36" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400..800&family=Glory:ital,wght@0,100..800;1,100..800&family=Rock+Salt&display=swap" rel="stylesheet"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}