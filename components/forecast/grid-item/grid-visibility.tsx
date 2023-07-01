import { useMemo } from "react";

interface GridVisibilityProps {
    visibility: number;
    isNumerical?: boolean;
}

export default function GridVisibility({ visibility, isNumerical }: GridVisibilityProps) {
    const displayText = useMemo(() => {
        if (isNumerical) {
            return visibility;
        }

        //! Very Poor
        if (visibility <= 1) return "VP";
        //! Poor
        if (visibility >= 1.1 && visibility <= 4) return "P";
        //! Medium
        if (visibility >= 4.1 && visibility <= 10) return "M";
        //! Good
        if (visibility >= 10.1 && visibility <= 20) return "G";
        //! Very Good
        if (visibility >= 20.1 && visibility <= 40) return "VG";
        //! Excellent   
        return "E";
    }, [visibility, isNumerical]);

    return <div>{displayText}</div>;
}