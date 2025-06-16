import {type ITicker} from '../../constants/interfaces';

interface IProps {
    ticker: ITicker
    onClick: () => void
}

const TickerItem = ({ticker, onClick}: IProps) => {
    return (
        <li
            onClick={onClick}
            className="flex gap-2 px-3 py-2 hover:bg-[#3A3B3E] cursor-pointer"
        >
            {ticker.icon_url && (
                <img
                    src={ticker.icon_url}
                    alt={ticker.name}
                    className="w-5 h-5 rounded-md object-contain"
                />
            )}
            <span className="text-white">{ticker.name}</span>
        </li>
    )
}

export default TickerItem
