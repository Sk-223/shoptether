import { Navbar } from '@/components/layout/Navbar'
import { Inter, Poppins } from 'next/font/google'
import type { Metadata } from "next"
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700', '900'], // Add weights as needed
})

export const metadata: Metadata = {
  title: 'ShopTether - Open Source Shopify Integration SDK',
  description: 'Connect your Shopify store to popular services like Mailchimp, Salesforce, and QuickBooks with our free, open-source SDK.',
  keywords: ['shopify', 'SDK', 'integration', 'open source', 'mailchimp', 'salesforce', 'quickbooks'],
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
