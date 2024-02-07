import "@/styles/globals.css"
import type { Metadata } from "next"
import { Alata } from "next/font/google"

const alata = Alata({
    subsets: [ "latin" ],
    weight: "400"
})

export const metadata: Metadata = {
    title: "makromusic Task",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={alata.className}>{children}</body>
        </html>
    )
}
