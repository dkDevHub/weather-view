import { useEffect, useState } from "react";
import DefaultImg from "@/assets/default_img.jpg";
import { useWeather } from "@/store/useWeather";
import { WeatherResponse } from "@/types/openWeather";

const defaultSrc = DefaultImg.src;

const getInitImg = (weatherData: WeatherResponse | null) => {
    if (!weatherData || !weatherData.weather?.[0]) return defaultSrc;

    const desc = weatherData.weather[0].description.replaceAll(" ", "_");

    return `https://openweathermap.org/img/widget_images/${desc}.jpg`;
}

export function useWeatherImg() {
    const weatherData = useWeather((store) => store.weather);
    const initialImg = getInitImg(weatherData)
    const [src, setSrc] = useState<string>(initialImg);

    useEffect(() => {
        if (weatherData && weatherData.weather?.[0]) {
            const desc = weatherData.weather[0].description.replaceAll(" ", "_");
            const res = desc.includes("rain") ? "rain" : desc;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSrc(`https://openweathermap.org/img/widget_images/${res}.jpg`);            
        } else {
            setSrc(defaultSrc);
        }
    }, [weatherData]);

    const handleError = () => {
        if (src !== defaultSrc) {
            setSrc(defaultSrc);
        }
    };

    return { src, handleError };
}
