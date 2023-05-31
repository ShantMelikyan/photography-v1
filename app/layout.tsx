import './globals.css'
import { Advent_Pro } from 'next/font/google'

const inter = Advent_Pro({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata = {
  title: 'Shant Photography',
  description: 'This is my photography journal. Enjoy!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body >{children}</body>
    </html>
  )
}
