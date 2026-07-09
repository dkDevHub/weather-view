"use client"
import cl from "./HeroWeather.module.css";
import Image from "next/image";
import { useWeatherImg } from "@/hooks/useWeatherImg";
import HeroInfo from "../hero-info/HeroInfo";
import { cn } from "@/lib/utils";

function HeroWeather() {
    const { src, handleError } = useWeatherImg();

    return (
        <div className={cl.img_block}>
            {/* <Image
                className={cl.img}
                width={320}
                height={180}
                src={src}
                onError={handleError}
                alt="weather description img"
            /> */}
            <div className={cn(cl.img, "bg-cover")} style={{ backgroundImage: `url(${src})` }} />
            <HeroInfo/>
        </div>
    );
};

export default HeroWeather;