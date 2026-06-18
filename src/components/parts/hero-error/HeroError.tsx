"use client"
import { useDailyError } from "@/store/useDailyError";
import { useSearchCityError } from "@/store/useSearchCityError";
import { useWeather } from "@/store/useWeather";

function HeroError() {
    const weatherError = useWeather((store) => store.error);
    const cityError = useSearchCityError((store) => store.error);
    const dailyError = useDailyError((store) => store.error);

    if (!weatherError && !cityError && !dailyError) return null;

    return (
        <div className="text-destructive text-sm flex flex-col">
            <span>{cityError && `Search error: ${cityError.message}`}</span>
            <span>{weatherError && `Weather error: ${weatherError.message}`}</span>
            <span>{dailyError && `Daily Weather error: ${dailyError.message}`}</span>
        </div>
    );
};

export default HeroError;