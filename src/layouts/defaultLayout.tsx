"use client"

import Header from "@/components/Header"
import React, { ReactNode } from "react"

interface DefaultLayoutProps {
  headerContent: ReactNode;
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ headerContent, children }) => {
    return (
        <div>
            <Header>
                {headerContent}
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