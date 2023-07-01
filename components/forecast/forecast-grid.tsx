"use client";

import { setHistoryState } from "@/shared/utils";
import { utcToZonedTime } from "date-fns-tz";
import { Fragment, RefObject, useMemo, useState } from "react";
import { Icons } from "../icons";
import ForecastGridArrow, { ArrowDirection } from "./forecast-grid-arrow";
import ForecastGridButton from "./forecast-grid-button";
import ForecastGridDescriptor from "./forecast-grid-descriptor";
import ForecastGridItem from "./forecast-grid-item";
import { ForecastUIProps } from "./forecast-ui";

interface ForecastGridProps extends ForecastUIProps {
    onFocusDate: (id: string | null) => void;
    scrollableGridRef: RefObject<HTMLDivElement>;
}

export default function ForecastGrid({
    forecast,
    scrollableGridRef,
    onFocusDate
}: ForecastGridProps) {
    const [scrollDirection, setScrollDirection] = useState<"left" | "default" | "right">("left");
    const [isSimplified, setIsSimplified] = useState<boolean>(false);

    const currentTime = useMemo(() => {
        if (!forecast?.location) return new Date();
        return utcToZonedTime(new Date(), forecast.location.tz_id);
    }, [forecast?.location]);

    if (!forecast) {
        return null;
    }

    function onScroll() {
        if (!scrollableGridRef.current) {
            return;
        }

        //! Scroll Buttons
        const scrollLeft = scrollableGridRef.current.scrollLeft, clientWidth = scrollableGridRef.current.clientWidth, scrollWidth = scrollableGridRef.current.scrollWidth;

        setScrollDirection(() => {
            if (scrollLeft <= 1) {
                return "left";
            }

            if (Math.round(scrollLeft + clientWidth) === scrollWidth) {
                return "right";
            }

            return "default";
        });

        //! Focused Date
        const elements = scrollableGridRef.current.children;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            const rect = element.getBoundingClientRect();

            if (!element.parentElement || !rect || !element) {
                break;
            }

            if (rect.right > scrollLeft && rect.left < scrollLeft) {
                setHistoryState(element.id);
                onFocusDate(element.id);
                break;
            }
        }
    }

    function onArrowScroll(dir: ArrowDirection) {
        if (!scrollableGridRef.current) {
            return;
        }

        const velocity = (.4 * scrollableGridRef.current.clientWidth);
        scrollableGridRef.current.scrollBy({
            left: dir === "left" ? -velocity : velocity,
            behavior: "smooth"
        });
    }

    return (
        <Fragment>
            <div className={"relative"}>
                <div ref={scrollableGridRef} className={"flex flex-row gap-[2px] overflow-x-auto whitespace-nowrap"} onScroll={onScroll}>
                    {forecast?.forecast?.forecastday.map((forecastDay) =>
                        <ForecastGridItem
                            key={forecastDay.date_epoch}
                            forecastDay={forecastDay}
                            currentTime={currentTime}
                            isSimplified={isSimplified} />)}
                </div>
                <ForecastGridDescriptor top={125}>Chance of precipitation</ForecastGridDescriptor>
                <ForecastGridDescriptor top={180}>Temperature (°C)</ForecastGridDescriptor>
                {isSimplified ? null :
                    <Fragment>
                        <ForecastGridDescriptor top={245}>Feels like temperature (°C)</ForecastGridDescriptor>
                        <ForecastGridDescriptor top={290}>Wind direction and speed</ForecastGridDescriptor>
                        <ForecastGridDescriptor top={357}>Visibility</ForecastGridDescriptor>
                        <ForecastGridDescriptor top={400}>Humidity</ForecastGridDescriptor>
                        <ForecastGridDescriptor top={440}>UV</ForecastGridDescriptor>
                    </Fragment>}
                {scrollDirection === "left" ? null : <ForecastGridArrow icon={<Icons.chevronLeft />} type={"left"} onClick={onArrowScroll} />}
                {scrollDirection === "right" ? null : <ForecastGridArrow icon={<Icons.chevronRight />} type={"right"} onClick={onArrowScroll} />}
            </div>
            <div className={"flex flex-row items-center justify-center"}>
                <ForecastGridButton
                    isSimplified={isSimplified}
                    onClick={() => setIsSimplified(!isSimplified)} />
            </div>
        </Fragment>
    )
}