// pages/_app.js
import '@/styles/tailwind.css'
import '@/styles/prism.css'
import RootLayout from '../app/layout'
import { StrictMode } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </StrictMode>
  )
}
export default MyApp
