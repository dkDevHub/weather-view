import Section from "@/components/templates/Section";
import cl from "./Hero.module.css"
import HeroBg from "@/components/parts/hero-bg/HeroBg";
import HeroWeather from "@/components/parts/hero-weather/HeroWeather";
import HeroCard from "@/components/parts/hero-card/HeroCard";
import HeroAdditional from "@/components/parts/hero-additional/HeroAdditional";
import HeroDaily from "@/components/parts/hero-daily/HeroDaily";
import { cn } from "@/lib/utils";
import HeroSaved from "@/components/parts/hero-saved/HeroSaved";

function Hero() {
    return (
        <Section>
            <div className={cl.content}>
                <HeroBg />
                <div className={cl.block}>
                    <h1 className={cn("h1", cl.headline)}>Weather View</h1>
                    <HeroDaily className={cl.daily} />
                    <div className={cl.weather}>
                        <HeroWeather />
                        <div className={cl.col}>
                            <HeroCard />
                            <HeroAdditional />
                        </div>
                    </div>
                    <HeroSaved className={cl.saved}/>
                </div>
            </div>
        </Section>
    );
};

export default Hero;