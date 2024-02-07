import Header from "@/components/Header"
import Image from "next/image"
import React, { ReactNode } from "react"

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header>
                <Image src="/assets/images/logo.png" alt="Makromusic Task Logo" width={263} height={50} priority={true} />
            </Header>
            <div className="flex items-center justify-center">
                <div className="container flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
