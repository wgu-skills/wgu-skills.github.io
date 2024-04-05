import Document, { Html, Head, Main, NextScript } from 'next/document';


class document extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default document;