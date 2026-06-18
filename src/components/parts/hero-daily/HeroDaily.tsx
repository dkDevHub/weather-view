"use client"
import { useClassNameState } from "@/hooks/useClassNameState";
import { useService } from "@/hooks/useService";
import { OpenWeatherService } from "@/services/openWeather";
import { useWeather } from "@/store/useWeather";
import { OpenMeteoResponse, WeatherResponse } from "@/types/openWeather";
import { useEffect } from "react";
import DailyItem from "../daily-item/DailyItem";
import { ApiResult } from "@/lib/apiFetch";
import { cn } from "@/lib/utils";
import { useDailyError } from "@/store/useDailyError";
import { CityComboboxItem } from "@/types/types";

const callback = async (item: CityComboboxItem | null): Promise<ApiResult<OpenMeteoResponse>> => {
    if (!item) return { data: null, error: { message: "Bad request", code: 400 } };

    const lat = item.value.lat;
    const lon = item.value.lon;

    return OpenWeatherService.getDaily(lat, lon);
};

interface Props {
    className?: string;
}

function HeroDaily({ className }: Props) {
    const item = useWeather((store) => store.selectedItem);
    const { data, isPending, refetch, error } = useService(callback, false);
    const setError = useDailyError(store => store.setError)

    useEffect(() => {
        setError(error);
    }, [error, setError]);

    useEffect(() => {
        if (!item) return;
        refetch(item);
    }, [item, refetch]);

    // minimum loading duration
    const loadingClass = useClassNameState("loading", isPending, 300);

    return (
        <div className={cn("grid grid-cols-3 md:grid-cols-7 w-full gap-2 max-w-85 md:max-w-[unset]", className)}>
            {Array.from({ length: 7 }, (_, i) => (
                <DailyItem
                    data={data}
                    index={i}
                    isLoading={loadingClass === "loading"}
                    key={"" + data?.latitude + data?.longitude + i}
                />
            ))}
        </div>
    );
};

export default HeroDaily;