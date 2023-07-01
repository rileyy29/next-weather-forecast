import { Icons } from "../../icons";

interface GridWindProps {
    degree: number;
    dir: string;
    speed: number;
}

export default function GridWind({ degree, dir, speed }: GridWindProps) {
    return (
        <div className={"flex flex-col items-center text-sm"}>
            <div className={"flex flex-row items-center gap-2"}>
                <Icons.pointer className={"w-4 h-4 fill-black"} style={{ transform: `rotate(${degree / 2}deg)` }} />
                {dir}
            </div>
            <div>{Math.floor(speed)}</div>
        </div>
    )
}