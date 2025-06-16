import {Link, useLocation} from "react-router-dom"
import type {ReactNode} from "react"

interface IProps {
    to: string
    onClick?: () => void
    icon: ReactNode
    children: ReactNode
}

const DropDownItem = ({to, onClick, icon, children}: IProps) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                isActive ? 'bg-[#555]' : 'hover:bg-[#444]'
            }`}
        >
            {icon}
            {children}
        </Link>
    )
}

export default DropDownItem
