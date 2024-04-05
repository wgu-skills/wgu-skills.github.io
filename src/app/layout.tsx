import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
     
  )
}
