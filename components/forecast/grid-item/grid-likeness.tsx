
interface GridLikenessProps {
    temperature: number;
}

export default function GridLikeness({ temperature }: GridLikenessProps) {
    return <div>{temperature}°</div>;
}