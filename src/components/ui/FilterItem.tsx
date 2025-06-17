import {motion} from 'framer-motion'
import type {ReactNode} from 'react'

interface FilterItemProps {
    label: string
    icon?: ReactNode
    checked: boolean
    onClick: () => void
}

const FilterItem = ({label, icon, checked, onClick}: FilterItemProps) => {
    return (
        <motion.div
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-hover-light dark:hover:bg-hover-dark"
            onClick={onClick}
        >
            <div className="flex items-center">
                {icon && <span className="mr-3">{icon}</span>}
                <span className="font-medium">{label}</span>
            </div>
            {checked && (
                <motion.span
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className="text-base sm:text-lg select-none"
                >
                    ✓
                </motion.span>
            )}
        </motion.div>
    )
}

export default FilterItem;