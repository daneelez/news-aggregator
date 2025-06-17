import type {IIcon} from "../../constants/interfaces.ts";

const IconGraph = ({className}: IIcon) => (
    <svg
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
    >
        <path d="M2 2V49.5C2 49.7761 2.22386 50 2.5 50H50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path
            d="M7.64706 38.7059L12.9088 28.1824C13.0805 27.839 13.5591 27.8093 13.772 28.1287L18.4292 35.1144C18.6494 35.4448 19.1484 35.399 19.3048 35.034L27.0482 16.9661C27.2046 16.6011 27.7035 16.5553 27.9238 16.8857L32.5809 23.8714C32.7939 24.1908 33.2724 24.161 33.4441 23.8176L41.1221 8.46177C41.2985 8.10888 41.795 8.08981 41.998 8.42813L50 21.7647"
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export default IconGraph;