import { GeocodingLocation } from "@/types/openWeather";
import { CityComboboxItem } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchWithTimeout = async (url: string, config: RequestInit, timeout: number = 10000) => {
    const controller = new AbortController();

    const id = setTimeout(() => {
        controller.abort();
        console.log("Запрос прерван по таймауту");
    }, timeout);

    try {
        const res = await fetch(url, {
            ...config,
            signal: controller.signal,
        });
        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.name === "AbortError") {
            console.error("Fetch error: запрос был отменен");
        }
        throw error;
    } finally {
        clearTimeout(id);
    }
};

export function countryCodeToEmoji(countryCode: string): string {
    return countryCode
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2)
        .split("")
        .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
        .join("");
}

export const formatCities = (cities: GeocodingLocation[]) => {
    return cities.map((c) => ({
        label: `${countryCodeToEmoji(c.country)}  ${c.name}, ${c.state || ""}`,
        value: { lat: c.lat, lon: c.lon },
    }));
};

export function isCityComboboxItem(item: unknown): item is CityComboboxItem {
    if (typeof item !== "object" || item === null) return false;

    if (!("label" in item) || typeof item.label !== "string") return false;

    if (!("value" in item) || typeof item.value !== "object" || item.value === null) return false;

    const value = item.value;

    return "lat" in value && typeof value.lat === "number" && "lon" in value && typeof value.lon === "number";
}

export function toTitleCase(str: string): string {
    if (!str) return "";

    return str
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function getOpenWeatherIconUrl(wmoCode: number): string {
    let iconCode = "03d"; // Дефолтные облака, если код не распознан

    if (wmoCode === 0)
        iconCode = "01d"; // Ясно / Чистое небо
    else if (wmoCode >= 1 && wmoCode <= 3)
        iconCode = "02d"; // Переменная облачность
    else if (wmoCode === 45 || wmoCode === 48)
        iconCode = "50d"; // Туман / Изморозь
    else if (wmoCode >= 51 && wmoCode <= 67)
        iconCode = "09d"; // Морось и дождь
    else if (wmoCode >= 71 && wmoCode <= 77)
        iconCode = "13d"; // Снег / Снегопад
    else if (wmoCode >= 80 && wmoCode <= 82)
        iconCode = "10d"; // Ливневый дождь
    else if (wmoCode >= 85 && wmoCode <= 86)
        iconCode = "13d"; // Ливневый снег
    else if (wmoCode >= 95 && wmoCode <= 99) iconCode = "11d"; // Гроза

    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function formatDateString(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");

    return `${day}.${month}`;
}