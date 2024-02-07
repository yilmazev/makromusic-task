import { ReactNode } from "react"

interface HeaderProps {
    children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return <header className="mb-20 flex items-center justify-center border-b border-gray py-7">
        {children}
    </header>
}

export default Header