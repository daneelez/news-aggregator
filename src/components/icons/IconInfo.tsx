import type {IIcon} from "../../constants/interfaces.ts";

const IconInfo = ({className}: IIcon) => (
    <svg
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
    >
        <g clipPath="url(#clip0_148_1634)">
            <path
                d="M6 11C7.3807 11 8.6307 10.4404 9.53553 9.53553C10.4404 8.6307 11 7.3807 11 6C11 4.6193 10.4404 3.3693 9.53553 2.46446C8.6307 1.55964 7.3807 1 6 1C4.6193 1 3.3693 1.55964 2.46446 2.46446C1.55964 3.3693 1 4.6193 1 6C1 7.3807 1.55964 8.6307 2.46446 9.53553C3.3693 10.4404 4.6193 11 6 11Z"
                stroke="currentColor" strokeOpacity="0.5" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6 2.75C6.34518 2.75 6.625 3.02983 6.625 3.375C6.625 3.72018 6.34518 4 6 4C5.65483 4 5.375 3.72018 5.375 3.375C5.375 3.02983 5.65483 2.75 6 2.75Z"
                  fill="currentColor" fillOpacity="0.5"/>
            <path d="M6.125 8.5V5H5.875H5.625" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M5.25 8.5H7" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </g>
    </svg>
);

export default IconInfo;