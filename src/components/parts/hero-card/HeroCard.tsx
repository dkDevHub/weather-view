import Card from "@/components/atomic/card/Card";
import CityInput from "../city-input/CityInput";
import cl from "./HeroCard.module.css"
import SaveBtn from "../save-btn/SaveBtn";
import HeroErrorLoader from "../hero-error/HeroErrorLoader";

function HeroCard() {
    return (
        <Card className={cl.info}>
            <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Enter your city</span>
                <SaveBtn/>
            </div>
            <CityInput />
            <HeroErrorLoader />
        </Card>
    );
};

export default HeroCard;