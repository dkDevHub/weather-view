import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/utils";
import type { OpenMeteoResponse } from "@/types/openWeather";

export async function GET(req: NextRequest) {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json({ message: "Latitude and longitude are required" }, { status: 400 });
    }

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto`;

        const res = await fetchWithTimeout(url, {
            method: "GET",
        });

        if (!res.ok) {
            console.error(`OpenWeather Weather API error: ${res.status}`);
            return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 502 });
        }

        const dailyData: OpenMeteoResponse = await res.json();

        return NextResponse.json(dailyData);
    } catch (error) {
        console.error("Failed to fetch weather by coordinates:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
