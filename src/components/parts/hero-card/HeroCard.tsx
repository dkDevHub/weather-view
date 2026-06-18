import Card from "@/components/atomic/card/Card";
import CityInput from "../city-input/CityInput";
import cl from "./HeroCard.module.css"
import HeroError from "../hero-error/HeroError";
import SaveBtn from "../save-btn/SaveBtn";

function HeroCard() {
    return (
        <Card className={cl.info}>
            <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Enter you city</span>
                <SaveBtn/>
            </div>
            <CityInput />
            <HeroError />
        </Card>
    );
};

export default HeroCard;