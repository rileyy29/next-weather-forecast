import { classNames } from "@/shared/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

const arrowVariants = cva(
    "absolute top-2/4 p-2 sm:p-3 flex items-center justify-center text-center bg-zinc-900 bg-opacity-10 hover:bg-opacity-80 text-white transition-all z-50 rounded-full", {
    variants: {
        type: {
            "left": "left-0",
            "right": "right-0"
        }
    }
});

export type ArrowDirection = VariantProps<typeof arrowVariants>["type"];

interface ForecastGridArrowProps extends VariantProps<typeof arrowVariants> {
    icon: ReactNode;
    onClick: (type: ArrowDirection) => void;
}

export default function ForecastGridArrow({
    icon,
    type,
    onClick
}: ForecastGridArrowProps) {
    return <button className={classNames(arrowVariants({ type }))} onClick={() => onClick(type)}>{icon}</button>;
}