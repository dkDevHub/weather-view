"use client"
import CardSm from "@/components/atomic/card-sm/CardSm";
import { Skeleton } from "@/components/atomic/skeleton/Skeleton";
import { useClassNameState } from "@/hooks/useClassNameState";
import { useWeather } from "@/store/useWeather";

function HeroAdditional() {
    const weather = useWeather((store) => store.weather);
    const isLoading = useWeather((store) => store.isLoading);
    
    // minimum loading duration
    const loadingClass = useClassNameState("loading", isLoading, 600);

    if (!weather || loadingClass === "loading") {
        return (
            <div className="grid grid-cols-3 gap-1">
                <CardSm title="Wind">
                    <Skeleton className="w-12 h-4 rounded-full mt-1" />
                </CardSm>
                <CardSm title="Humidity">
                    <Skeleton className="w-12 h-4 rounded-full mt-1" />
                </CardSm>
                <CardSm title="Pressure">
                    <Skeleton className="w-12 h-4 rounded-full mt-1" />
                </CardSm>
            </div>
        );
    }
        
    
    return (
        <div className="grid grid-cols-3 gap-1">
            <CardSm title="Wind">{weather.wind.speed} m/s</CardSm>
            <CardSm title="Humidity">{weather.main.humidity} %</CardSm>
            <CardSm title="Pressure">{weather.main.pressure} hPa</CardSm>
            {/* <CardSm title="Visibility">{Math.round(weather.visibility / 1000)} km</CardSm>
            <CardSm title="UV Index">0 UV</CardSm>
            <CardSm title="Dew Point">{weather.wind.speed} m/s</CardSm> */}
        </div>
    );
};

export default HeroAdditional;