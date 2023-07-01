import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple tailwind and optional classnames into one cohesive string.
 * @param classes 
 * @returns 
 */
export function classNames(...classes: ClassValue[]) {
    return twMerge(clsx(classes));
}

/**
 * Retrieve today's date with the appropriate formatting.
 * @returns 
 */
export function getCurrentDate() {
    return format(new Date(), "yyyy-MM-dd");
}

/**
 * Replace the current history state with provided id:
 * Used for "loop-back navigation."
 * @param id 
 */
export function setHistoryState(id: string) {
    history.replaceState(null, "", `#${id}`);
}