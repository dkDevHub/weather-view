import { ApiError } from "@/lib/apiFetch";
import { OpenWeatherService } from "@/services/openWeather";
import { WeatherResponse } from "@/types/openWeather";
import { CityComboboxItem } from "@/types/types";
import { create } from "zustand";

interface Store {
    weather: WeatherResponse | null;
    setWeather: (weather: WeatherResponse | null) => void;
    error: ApiError | null;
    setError: (error: ApiError | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    selectedItem: CityComboboxItem | null;
    fetchWeatherByCoords: (item: CityComboboxItem) => void;
}

// ssr initial result
const initialItem = {
    label: "🇺🇦  Lutsk, Volyn Oblast",
    value: {
        lat: 50.7450733,
        lon: 25.320078,
    },
};
const { lat, lon } = initialItem.value;
const initialWeather = await OpenWeatherService.getWeather(lat, lon);

export const useWeather = create<Store>((set) => ({
    weather: initialWeather.data || null,
    error: initialWeather.error,
    isLoading: false,
    selectedItem: initialItem,
    setWeather: (weather) => set({ weather }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),

    fetchWeatherByCoords: async (item) => {
        const { lat, lon } = item.value;

        set({ isLoading: true, error: null, selectedItem: item });

        try {
            const weather = await OpenWeatherService.getWeather(lat, lon);
            set({ weather: weather.data, error: weather.error });
        } catch (err) {
            set({ error: { message: "Failed to fetch weather", code: 500 } });
        } finally {
            set({ isLoading: false });
        }
    },
}));
