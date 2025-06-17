import {motion, AnimatePresence} from 'framer-motion'
import React, {useRef} from 'react'
import {useClickOutside} from '../../hooks/useClickOutside'

interface FilterOptionProps {
    title: string
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

const FilterOption = ({title, isActive, onClick, children}: FilterOptionProps) => {
    const menuRef = useRef<HTMLDivElement>(null)

    useClickOutside(menuRef, () => {
        if (isActive) onClick()
    })

    const menuVariants = {
        hidden: {opacity: 0, y: -10, scale: 0.95},
        visible: {opacity: 1, y: 0, scale: 1},
        exit: {opacity: 0, y: -10, scale: 0.95},
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={onClick}
                className={`px-4 py-2 rounded-xl border-3 font-bold text-base transition-all select-none ${
                    isActive
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'bg-bg text-black dark:text-white border-black dark:border-white'
                }`}
            >
                {title}
            </button>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{duration: 0.15}}
                        className="absolute mt-2 top-full min-w-[200px] rounded-xl bg-bg-nd-light dark:bg-bg-nd-dark shadow-xl overflow-hidden origin-top ring-1 ring-black/20 z-[1000]"
                    >
                        <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 gap-1">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FilterOption
