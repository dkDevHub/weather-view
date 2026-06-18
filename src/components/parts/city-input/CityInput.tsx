"use client"
import { Search } from "lucide-react";
import Combobox from "@/components/atomic/combobox/Combobox";
import { useService } from "@/hooks/useService";
import { OpenWeatherService } from "@/services/openWeather";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { isCityComboboxItem } from "@/lib/utils";
import { useWeather } from "@/store/useWeather";
import { useEffect, useState } from "react";
import { useSearchCityError } from "@/store/useSearchCityError";

function CityInput() {
    const {
        data: cities,
        error,
        refetch,
        isPending,
    } = useService((search: string) => OpenWeatherService.searchCity(search), false);

    const debounced = useDebounceCallback((value: string) => refetch(value), 300);
    const fetchWeatherByCoords = useWeather((store) => store.fetchWeatherByCoords);
    const setSearchCityError = useSearchCityError((store) => store.setError);
    const selectedItem = useWeather(store => store.selectedItem)
    const [inputValue, setInputValue] = useState(selectedItem?.label);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (value === undefined || value === null || value.length < 2) return;
        debounced(value);
    };

    const handleValueChange = async (item: unknown) => {
        if (!isCityComboboxItem(item)) return;
        fetchWeatherByCoords(item);
    };

    useEffect(() => setSearchCityError(error), [error, setSearchCityError]);
    useEffect(() => setInputValue(selectedItem?.label), [selectedItem]);

    return (
        <Combobox
            inputValue={inputValue}
            values={cities}
            filteredItems={cities || []}
            onInputValueChange={handleInputChange}
            onValueChange={handleValueChange}
            placeholder="City name"
            icon={Search}
            autoComplete="off"
            isLoading={isPending}
        />
    );
};

export default CityInput;