import type {INews} from "../../constants/interfaces.ts";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import IconInfo from "../icons/IconInfo.tsx";
import Modal from "../ui/Modal.tsx";
import {useFormatDate} from "../../hooks/formatDate.ts";

const NewsItem = ({
                      ticker,
                      source,
                      summary_text,
                      price_difference,
                      is_green,
                      description,
                      timestamp,
                  }: INews) => {
    const {t} = useTranslation("translations");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const priceClass = price_difference.trim().startsWith("-")
        ? "bg-red-600"
        : "bg-[#06FF5B]";

    const tickerClass = is_green ? "bg-[#06FF5B]" : "bg-red-600";

    const formattedDate = useFormatDate(timestamp);

    return (
        <>
            <div className="relative p-4 rounded-lg bg-bg shadow-lg mb-6">
                <div
                    className={`text-black absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${priceClass}`}
                >
                    {price_difference}
                </div>

                <p className="text-sm mb-10 max-w-[70%] whitespace-pre-line">{summary_text}</p>

                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm hover:text-blue-300 transition block mb-2 max-w-fit"
                >
                    {t('read_full_article')}
                </a>

                <div className="flex items-center justify-between text-xs mt-2 gap-1">
                    <p className="text-xs text-text opacity-50">{formattedDate}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border hover:bg-bg-nd-dark dark:hover:bg-bg-nd-light bg-bg-nd-light dark:bg-bg-nd-dark p-2 rounded-lg flex items-center gap-2 hover:text-alt-text-light dark:hover:text-alt-text-dark"
                    >
                        <IconInfo className='w-4 h-4 text-text'/>
                        <span className='text-xs flex-center'>
                            {t('ai_prediction')}:
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold text-black ${tickerClass}`}
                        >
                            {ticker}
                        </span>
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('ai_prediction')}>
                <p className="text-sm whitespace-pre-line">{description}</p>
            </Modal>
        </>
    );
};

export default NewsItem;