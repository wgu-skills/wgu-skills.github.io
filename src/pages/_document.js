import Document, { Html, Head, Main, NextScript } from 'next/document';


class document extends Document {
    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body class="bg-gray-100 dark:bg-slate-900">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default document;