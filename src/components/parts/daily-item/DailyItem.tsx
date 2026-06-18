import { Skeleton } from "@/components/atomic/skeleton/Skeleton";
import { cn, formatDateString, getOpenWeatherIconUrl } from "@/lib/utils";
import { OpenMeteoResponse } from "@/types/openWeather";
import Image from "next/image";

interface Props {
    data: OpenMeteoResponse | null;
    isLoading: boolean;
    index: number;
}

function DailyItem({ data, isLoading, index }: Props) {
    const className =
        "bg-background/60 backdrop-blur-sm rounded-xl p-2 flex flex-col items-center border border-foreground/20 shadow-md h-26 first:hidden md:first:flex";

    if (!data || isLoading) {
        return (
            <div className={cn(className, "gap-1")}>
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-full h-4 rounded-xl" />
                <Skeleton className="w-full h-4 rounded-xl" />
            </div>
        );
    }

    return (
        <div className={className}>
            <Image width={50} height={50} src={getOpenWeatherIconUrl(data.daily.weather_code[index])} alt="" />
            <span className="text-sm font-medium">
                {index == 0 ? "Today" : formatDateString(data.daily.time[index])}
            </span>
            <span className="text-xs text-foreground/80 font-medium">
                {Math.round(data.daily.temperature_2m_min[index])}° / {Math.round(data.daily.temperature_2m_max[index])}
                °
            </span>
        </div>
    );
};

export default DailyItem;