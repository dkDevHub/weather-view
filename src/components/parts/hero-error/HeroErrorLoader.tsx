"use client"
import dynamic from "next/dynamic";

const HeroError = dynamic(() => import("./HeroError"), {
    ssr: false,
});

function HeroErrorLoader() {
    return <HeroError/>;
}

export default HeroErrorLoader;
