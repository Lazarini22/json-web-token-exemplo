import '../globals.css'

export const metadata = {
  title: 'IFMS.com',
  description: 'Project for class PTAC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
