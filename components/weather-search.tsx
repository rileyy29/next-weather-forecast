"use client";

import { classNames } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icons } from "./icons";
import Spinner from "./spinner";

interface WeatherSearchProps {
    defaultValue?: string;
}

export default function WeatherSearch({
    defaultValue = ""
}: WeatherSearchProps) {
    const { push } = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(defaultValue);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isSearchDisabled = useMemo(() => searchTerm.trim() === "" || isLoading, [searchTerm, isLoading]);

    useEffect(() => {
        return () => setIsLoading(false);
    }, []);

    function onSubmit() {
        if (isSearchDisabled) {
            return;
        }

        setIsLoading(true);
        push(`/forecast/${searchTerm}`);
    }

    return (
        <div className={"w-full flex flex-row items-center px-5 py-3 bg-slate-100 rounded-md"}>
            <input
                value={searchTerm}
                disabled={isLoading}
                aria-disabled={isLoading}
                placeholder={"Enter location, zip or post code"}
                className={"flex-1 bg-transparent focus-visible:outline-none"}
                onChange={(val) => setSearchTerm(val.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        onSubmit();
                    }
                }} />
            {isLoading ? <Spinner /> : <Icons.search aria-hidden={true} className={classNames("w-5 h-5 text-slate-500", { "cursor-pointer": !isSearchDisabled })} onClick={onSubmit} />}
        </div>
    )
}