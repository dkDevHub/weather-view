"use client"
import Image from "next/image";
import cl from "./HeroBg.module.css"
import { useWeatherImg } from "@/hooks/useWeatherImg";
import { cn } from "@/lib/utils";

function HeroBg() {
    const { src, handleError } = useWeatherImg();

    return (
        <div className={cl.background}>
            {/* <Image className={cl.img} width={1600} height={900} src={src} onError={handleError} alt="weather description img" /> */}
            <div className={cn(cl.img, "bg-cover")} style={{ backgroundImage: `url(${src})` }} />
            <div className={cl.fade} />
        </div>
    );
};

export default HeroBg;