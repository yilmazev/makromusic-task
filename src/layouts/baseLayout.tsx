"use client"

import Header from "@/components/Header"
import React, { ReactNode } from "react"

interface BaseLayoutProps {
    header: ReactNode
    children: ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ header, children }) => {
    return (
        <div>
            <Header>
                {header}
            </Header>
            <div className="flex items-center justify-center">
                <div className="container flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BaseLayout