import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    const bodyFontWeights = [400,700]
    const headerFontWeights = [700, 800, 900]

    return (
        <Html>
            <Head>

                <link rel="shortcut icon" href="/favicon.ico"/>

                {bodyFontWeights.map((element,index) => {
                    return <link
                        key={index}
                        rel="preload"
                        href={`/fonts/montserrat/montserrat-${element}.woff2`}
                        as="font"
                        crossOrigin=""
                    />
                })}

                {headerFontWeights.map((element,index) => {
                    return <link
                        key={index}
                        rel="preload"
                        href={`/fonts/mulish/mulish-${element}.woff2`}
                        as="font"
                        crossOrigin=""
                    />
                })}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}