"use client";

import { WeatherData } from "@/shared/types";
import { getCurrentDate } from "@/shared/utils";
import { Fragment, useRef, useState } from "react";
import WeatherSearch from "../weather-search";
import ForecastGrid from "./forecast-grid";
import ForecastPreviewItem from "./forecast-preview-item";

export interface ForecastUIProps {
    forecast: Partial<WeatherData | null>;
}

export default function ForecastUI({ forecast }: ForecastUIProps) {
    const [focusedDate, setFocusedDate] = useState<string | null>(getCurrentDate());
    const scrollableGridRef = useRef<HTMLDivElement>(null);

    return (
        <Fragment>
            <section className={"w-full bg-clouds bg-bottom bg-cover bg-no-repeat"}>
                <span className={"flex flex-col flex-shrink-0 items-center backdrop-blur-sm backdrop-brightness-95"}>
                    <div className={"w-full max-w-7xl px-5 sm:px-16 pt-12 pb-6"}>
                        <WeatherSearch defaultValue={forecast?.location ? `${forecast?.location?.name} (${forecast?.location?.region})` : ""} />
                    </div>
                    <div className={"w-full max-w-7xl sm:px-16"}>
                        <div className={"flex flex-row items-end h-32 overflow-x-auto overflow-y-hidden"}>
                            {forecast?.forecast?.forecastday.map((forecastDay, i) =>
                                <ForecastPreviewItem
                                    key={forecastDay.date_epoch}
                                    forecastDay={forecastDay}
                                    isFocused={focusedDate === forecastDay.date.toString()}
                                    onFocusDate={setFocusedDate} />)}
                        </div>
                    </div>
                </span>
            </section>
            <section className={"w-full max-w-7xl flex flex-col gap-6 px-2 sm:px-16 py-5"}>
                <ForecastGrid
                    forecast={forecast!}
                    scrollableGridRef={scrollableGridRef}
                    onFocusDate={setFocusedDate} />
            </section>
        </Fragment>
    )
}