import type {ReactNode} from 'react'

interface IProps {
    label: string
    value: string
    onChange: (value: string) => void
    children: ReactNode
}

const SettingsSection = ({label, value, onChange, children}: IProps) => {
    return (
        <section className="mb-4">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-[#2C2D30] border border-[#555] rounded-md px-3 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            >
                {children}
            </select>
        </section>
    );
}

export default SettingsSection
