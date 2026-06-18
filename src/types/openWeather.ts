export interface WeatherResponse {
    coord: Coord;
    weather: WeatherElement[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface GeocodingLocation {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface OpenMeteoDailyUnits {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
}

export interface OpenMeteoDailyData {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

export interface OpenMeteoResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: OpenMeteoDailyUnits;
    daily: OpenMeteoDailyData;
}
