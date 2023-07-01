import { WeatherCondition } from "@/shared/types";
import Image from "next/image";

interface GridConditionProps extends WeatherCondition { }

export default function GridCondition({ icon, text }: GridConditionProps) {
    return (
        <div className={"w-10 h-10 mt-2 flex items-center justify-center"}>
            <Image src={`https:${icon}`} alt={text} title={text} width={28} height={28} />
        </div>
    )
}