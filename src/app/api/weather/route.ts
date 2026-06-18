import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/utils";
import type { WeatherResponse } from "@/types/openWeather";

export async function GET(req: NextRequest) {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json({ message: "Latitude and longitude are required" }, { status: 400 });
    }

    // const apiKey = process.env.API_KEY;
    const apiKey = "2d51ef1269c9bb6095f206d4a0567ac1";
    if (!apiKey) return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;

        const weatherResponse = await fetchWithTimeout(weatherUrl, {
            method: "GET",
            cache: "no-store"
        });

        if (!weatherResponse.ok) {
            console.error(`OpenWeather Weather API error: ${weatherResponse.status}`);
            return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 502 });
        }

        const weatherData: WeatherResponse = await weatherResponse.json();

        return NextResponse.json(weatherData);
    } catch (error) {
        console.error("Failed to fetch weather by coordinates:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
