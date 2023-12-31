import { basicMetadata } from './backend/seo'
import VerificationBanner from './components/banner/verification';
import Header from './components/header/header';
import { LoadingContextProvider, UserContextProvider } from './context/context';
import './globals.css'

export const metadata = basicMetadata({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoadingContextProvider>
          <UserContextProvider>
            <VerificationBanner />
            <Header />
            {children}
          </UserContextProvider>
        </LoadingContextProvider>
      </body>
    </html>
  )
}
