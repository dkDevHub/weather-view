import { apiFetch, ApiResult } from "@/lib/apiFetch";
import { formatCities } from "@/lib/utils";
import { GeocodingLocation, OpenMeteoResponse, WeatherResponse } from "@/types/openWeather";
import { CityComboboxItem } from "@/types/types";

abstract class OpenWeatherService {
    static async searchCity(searchQuery: string): Promise<ApiResult<CityComboboxItem[]>> {
        const res = await apiFetch<GeocodingLocation[]>(`/search?query=${searchQuery}`);

        if (res.data) {
            const formatted = formatCities(res.data);
            return { ...res, data: formatted };
        } else {
            return { ...res, data: null };
        }
    }

    static async getWeather(lat: number, lon: number) {
        return apiFetch<WeatherResponse>(`/weather?lat=${lat}&lon=${lon}`, { cache: "no-store" });
    }

    static async getDaily(lat: number, lon: number) {
        return apiFetch<OpenMeteoResponse>(`/daily?lat=${lat}&lon=${lon}`);
    }
}

export { OpenWeatherService };
