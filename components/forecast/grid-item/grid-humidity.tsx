
interface GridHumidityProps {
    humidity: number;
}

export default function GridHumidity({ humidity }: GridHumidityProps) {
    return <div>{Math.floor(humidity)}%</div>;
}