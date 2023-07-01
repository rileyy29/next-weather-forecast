import { classNames } from "@/shared/utils";

interface GridPreciptationProps {
    chance: number;
    isRaining: boolean;
}

export default function GridPreciptation({ chance, isRaining }: GridPreciptationProps) {
    return <div className={classNames({ ["text-cyan-700 font-medium"]: isRaining })}>{chance < 5 ? "<5%" : `${chance}%`}</div>;
}