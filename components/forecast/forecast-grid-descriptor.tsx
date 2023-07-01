
interface ForecastGridDescriptorProps {
    top: number;
}

export default function ForecastGridDescriptor({ children, top }: React.PropsWithChildren<ForecastGridDescriptorProps>) {
    return <span className={"absolute left-5 text-xs font-medium bg-white text-zinc-500"} style={{ top }}>{children}</span>;
}