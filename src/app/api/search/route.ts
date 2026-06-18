/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/utils";
import type { GeocodingLocation } from "@/types/openWeather";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get("query");

    if (!search) {
        return NextResponse.json([]);
    }

    const normalized = search.trim();
    if (normalized.length < 2) return NextResponse.json([]);

    // const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiKey = "2d51ef1269c9bb6095f206d4a0567ac1";

    if (!apiKey) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

    try {
        const encode = encodeURIComponent(normalized);
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encode}&limit=5&appid=${apiKey}`;

        const response = await fetchWithTimeout(url, {
            method: "GET",
            cache: "no-store"
        });

        const data: GeocodingLocation[] = await response.json();

        if (!response.ok) {
            const errorData = data as any;

            return NextResponse.json({ message: `Bad request - ${errorData.message}` }, { status: errorData.cod || 400 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
