import { basicMetadata } from './backend/seo'
import { UserContextProvider } from './context/context';
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
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}
