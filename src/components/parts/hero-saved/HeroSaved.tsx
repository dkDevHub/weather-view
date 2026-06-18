"use client"
import Button from "@/components/atomic/button/Button";
import { cn } from "@/lib/utils";
import { useSave } from "@/store/useSave";
import { useWeather } from "@/store/useWeather";

interface Props {
    className?: string;
}

function HeroSaved({ className }: Props) {
    const saved = useSave((store) => store.saved);
    const fetchWeatherByCoords = useWeather((store) => store.fetchWeatherByCoords);

    if (saved.length == 0) return null

    return (
        <div className={cn("flex flex-col items-center gap-5", className)}>
            <h2 className="h2">Saved cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {saved.map((item) => (
                    <Button
                        className="bg-background/60 py-2 px-3"
                        onClick={() => fetchWeatherByCoords(item)}
                        key={`${item.label} ${JSON.stringify(item.value)}`}
                    >
                        <span className="truncate">{item.label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default HeroSaved;