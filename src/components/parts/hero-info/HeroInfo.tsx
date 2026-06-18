import { cn, toTitleCase } from "@/lib/utils";
import { Thermometer } from "lucide-react";
import { Skeleton } from "@/components/atomic/skeleton/Skeleton";
import { useClassNameState } from "@/hooks/useClassNameState";
import cl from "./HeroInfo.module.css"
import { useWeather } from "@/store/useWeather";

function HeroInfo() {
    const weather = useWeather((store) => store.weather);
    const isLoading = useWeather((store) => store.isLoading);
    const selectedItem = useWeather((store) => store.selectedItem);
    
    // minimum loading duration
    const loadingClass = useClassNameState("loading", isLoading, 600);

    if (!weather || loadingClass === "loading") {
        return (
            <div className={cn(cl.info, "opacity-50")}>
                <Skeleton className="w-32 h-8 rounded-full" />
                <div className="flex flex-col items-end">
                    <Skeleton className="w-18 h-4 rounded-full mb-1" />
                    <Skeleton className="w-12 h-6 rounded-full" />
                </div>
            </div>
        );
    }

    const desc = toTitleCase(weather.weather[0].description);

    return (
        <div className={cl.info}>
            <div className="flex flex-col">
                <strong className="text-xl">{desc}</strong>
                <span className="text-xs text-foreground/70 truncate max-w-40">{selectedItem?.label}</span>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-foreground/80 text-sm">feels like {Math.ceil(weather.main.feels_like)}°</div>
                <div className="flex items-center">
                    <Thermometer width={20} height={20} strokeWidth={2.25} />
                    <span className="font-bold text-xl">{Math.ceil(weather.main.temp)}°C</span>
                </div>
            </div>
        </div>
    );
}

export default HeroInfo;
