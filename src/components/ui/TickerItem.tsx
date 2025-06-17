import {type ITicker} from '../../constants/interfaces';

interface IProps {
    ticker: ITicker
    onClick: () => void
    isFavorite?: boolean
    isSelected?: boolean
}

const TickerItem = ({ticker, onClick, isFavorite = false, isSelected = false}: IProps) => {
    return (
        <li
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer
                border text-text font-semibold
                transition-colors duration-200
                ${isFavorite ? 'border-yellow-400 border-3' : 'border-3 border-bg-alt-light'}
                ${isSelected ? isFavorite ? 'bg-yellow-400 text-black' : 'bg-alt-dark dark:bg-alt-light text-alt-light dark:text-alt-dark' : ''}
                hover:opacity-90
            `}
        >
            {ticker.icon_url && (
                <img
                    src={ticker.icon_url}
                    alt={ticker.name}
                    className="w-5 h-5 rounded-md object-contain border"
                />
            )}
            <span className="text-text">{ticker.name}</span>
        </li>
    )
}

export default TickerItem
