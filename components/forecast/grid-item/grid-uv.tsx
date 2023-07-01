import { classNames } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";

const categoryVariants = cva(
    "w-7 h-7 mb-2 flex items-center justify-center text-center border-black border-[1px]", {
    variants: {
        category: {
            "0": "bg-gray-600",
            "1": "bg-green-500",
            "2": "bg-yellow-300",
            "3": "bg-orange-400",
            "4": "bg-red-500",
            "5": "bg-purple-500"
        }
    }
});

interface GridUVProps {
    uv: number;
    isNumerical?: boolean;
}

export default function GridUV({ uv, isNumerical = true }: GridUVProps) {
    const category = useMemo(() => {
        //! No Risk
        if (!uv || uv < 1) return { num: 0, text: "-" };
        //! Low
        if (uv >= 1 && uv <= 2) return { num: 1, text: "L" };
        //! Medium
        if (uv >= 3 && uv <= 5) return { num: 2, text: "M" };
        //! High
        if (uv >= 6 && uv <= 7) return { num: 3, text: "H" };
        //! Very High
        if (uv >= 8 && uv <= 10) return { num: 4, text: "VH" };
        //! Extreme   
        return { num: 5, text: "E" };
    }, [uv]);

    return <div className={classNames(categoryVariants({ category: String(category.num) as VariantProps<typeof categoryVariants>["category"] }))}>{isNumerical ? uv : category.text}</div>;
}