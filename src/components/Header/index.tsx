import { ReactNode } from "react"

interface HeaderProps {
    children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return <header className="mb-20 flex items-center justify-center border-b border-borderGray py-7">
        <div className="container flex items-center justify-center">
            {children}
        </div>
    </header>
}

export default Header