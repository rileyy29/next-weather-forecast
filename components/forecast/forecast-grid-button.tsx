import { Icons } from "../icons";

interface ForecastGridButtonProps {
    isSimplified: boolean;
    onClick: () => void;
}

export default function ForecastGridButton({ isSimplified, onClick }: ForecastGridButtonProps) {
    return (
        <button className={"flex flex-row items-center justify-between gap-3 w-full sm:w-72 px-3 py-2 shadow-sm rounded-md text-white bg-sky-600 hover:bg-sky-700"} onClick={onClick}>
            <span>Show {isSimplified ? "extended" : "simplified"} forecast</span>
            {isSimplified ? <Icons.chevronDown /> : <Icons.chevronUp />}
        </button>
    )
}