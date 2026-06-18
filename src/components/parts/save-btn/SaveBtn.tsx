/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Button from "@/components/atomic/button/Button";
import { useSave } from "@/store/useSave";
import { useWeather } from "@/store/useWeather";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

function SaveBtn() {
    const { addSaved, hasItem, removeItem } = useSave();
    const item = useWeather((store) => store.selectedItem);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isSaved = isMounted ? hasItem(item) : false;

    if (isSaved) {
        return (
            <Button className="group" onClick={() => item && removeItem(item)}>
                Unsave
                <Bookmark
                    size={18}
                    strokeWidth={2.5}
                    className="transition-all duration-200 fill-yellow-300 text-yellow-300"
                />
            </Button>
        );
    }

    return (
        <Button className="group" onClick={() => item && addSaved(item)}>
            Save
            <Bookmark
                size={18}
                strokeWidth={2.5}
                className="transition-all duration-200 fill-transparent group-hover:fill-yellow-300 group-hover:text-yellow-300"
            />
        </Button>
    );
};

export default SaveBtn;