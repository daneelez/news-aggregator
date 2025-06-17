import {useTranslation} from "react-i18next";

export const useFormatDate = (timestamp: string) => {
    const {i18n} = useTranslation("translations");

    return new Date(timestamp).toLocaleString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}