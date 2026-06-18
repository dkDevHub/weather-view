"use client";

import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { useEffect } from "react";

export function CountryPolyfill() {
    useEffect(() => {
        polyfillCountryFlagEmojis();
    }, []);

    return null;
}
