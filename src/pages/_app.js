// pages/_app.js
import '@/styles/tailwind.css';
import '@/styles/prism.css';
import RootLayout from '../app/layout';

function MyApp({ Component, pageProps }) {
    return (
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    );
  }
export default MyApp;
