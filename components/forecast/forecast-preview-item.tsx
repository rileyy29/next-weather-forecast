import { WeatherForecastDay } from "@/shared/types";
import { classNames, setHistoryState } from "@/shared/utils";
import { format, isSameDay, parseISO } from "date-fns";
import Image from "next/image";

interface ForecastPreviewItemProps {
    forecastDay: WeatherForecastDay;
    onFocusDate: (id: string | null) => void;
    isFocused: boolean;
}

export default function ForecastPreviewItem({
    forecastDay,
    onFocusDate,
    isFocused
}: ForecastPreviewItemProps) {
    const isoString = forecastDay.date.toString();

    function onClick() {
        setHistoryState(isoString);
        onFocusDate(isoString);
        document.getElementById(isoString)?.scrollIntoView({ behavior: "instant", inline: "start" });
    }

    return (
        <div className={classNames("w-1/3 min-w-[200px] h-16 px-5 py-2 flex-shrink-0 cursor-pointer transition-all bg-opacity-10 bg-zinc-300 border border-transparent", { ["h-28 bg-zinc-600 border-zinc-400 rounded-t-md"]: isFocused })} onClick={onClick}>
            <div className={"flex flex-row items-center text-sm"}>
                <div className={"flex flex-col flex-1"}>
                    <div className={classNames("text-base", { ["text-lg font-semibold -mb-1"]: isFocused })}>{isSameDay(parseISO(isoString), new Date()) ? "Today" : format(parseISO(isoString), "EEE d MMM")}</div>
                    <div className={"flex flex-row items-center gap-2"}>
                        <div className={"font-medium text-lg"}>{Math.floor(forecastDay.day.maxtemp_c)}°</div>
                        <div className={"text-base text-gray-800 pt-[1px]"}>{Math.floor(forecastDay.day.mintemp_c)}°</div>
                    </div>
                </div>
                <Image src={`https:${forecastDay.day.condition.icon}`} alt={forecastDay.day.condition.text} title={forecastDay.day.condition.text} width={32} height={32} />
            </div>
            {!isFocused ? null :
                <div className={"flex flex-row gap-5 pt-1 text-sm"}>
                    <div className={"flex flex-col"}>
                        <span className={"font-semibold"}>Sunrise:</span>
                        <span>{forecastDay.astro.sunrise}</span>
                    </div>
                    <div className={"flex flex-col"}>
                        <span className={"font-semibold"}>Sunset:</span>
                        <span>{forecastDay.astro.sunset}</span>
                    </div>
                </div>}
        </div>
    )
}