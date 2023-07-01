import { WeatherForecastDay } from "@/shared/types";
import { format, isAfter, isSameHour, parseISO } from "date-fns";
import { Fragment, useMemo } from "react";
import GridCondition from "./grid-item/grid-condition";
import GridHumidity from "./grid-item/grid-humidity";
import GridLikeness from "./grid-item/grid-likeness";
import GridPreciptation from "./grid-item/grid-precipitation";
import GridTemperature from "./grid-item/grid-temperature";
import GridUV from "./grid-item/grid-uv";
import GridVisibility from "./grid-item/grid-visibility";
import GridWind from "./grid-item/grid-wind";

interface ForecastGridItemProps {
    forecastDay: WeatherForecastDay;
    currentTime: Date;
    isSimplified?: boolean;
}

export default function ForecastGridItem({
    forecastDay,
    currentTime,
    isSimplified = true
}: ForecastGridItemProps) {
    const hoursToDisplay = useMemo(() => forecastDay.hour.filter((hour) => isSameHour(parseISO(hour.time.toString()), currentTime) || isAfter(parseISO(hour.time.toString()), currentTime)), [forecastDay.hour, currentTime]);

    return (
        <div id={forecastDay.date.toString()} className={"bg-gray-100 border-t border-t-gray-300 border-l border-l-gray-300"}>
            <div className={"py-2 font-medium border-r border-r-gray-300 border-b border-b-gray-200"}>
                <span className={"px-2 text-sm sticky left-0 top-0"}>{format(parseISO(forecastDay.date.toString()), "EEEE")}</span>
            </div>
            <div className={"flex flex-row items-center "}>
                {hoursToDisplay.map((hour) =>
                    <div key={hour.time_epoch} className={"w-20 min-w-0 flex flex-col flex-shrink-0 items-center border-r border-r-gray-300"}>
                        <div className={"w-full h-8 flex-shrink-0 flex items-center justify-center text-sm border-b border-b-gray-400"}>
                            {format(parseISO(hour.time.toString()), "HH:mm")}
                        </div>
                        <div className={"w-full flex flex-col flex-shrink-0 items-center gap-6 bg-white text-sm"}>
                            <GridCondition {...hour.condition} />
                            <GridPreciptation chance={Math.floor(hour.chance_of_rain)} isRaining={hour.will_it_rain === 1} />
                            <GridTemperature temperature={Math.floor(hour.temp_c)} />
                            {isSimplified ? null :
                                <Fragment>
                                    <GridLikeness temperature={Math.floor(hour.feelslike_c)} />
                                    <GridWind degree={hour.wind_degree} dir={hour.wind_dir} speed={hour.wind_mph} />
                                    <GridVisibility visibility={hour.vis_km} />
                                    <GridHumidity humidity={hour.humidity} />
                                    <GridUV uv={hour.uv} />
                                </Fragment>}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}