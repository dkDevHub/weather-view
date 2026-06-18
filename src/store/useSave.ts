import { CityComboboxItem } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
    saved: CityComboboxItem[];
    addSaved: (item: CityComboboxItem) => void;
    removeItem: (item: CityComboboxItem) => void;
    hasItem: (item: CityComboboxItem | null) => boolean;
}

export const useSave = create<Store>()(
    persist(
        (set, get) => ({
            saved: [],
            addSaved: (item) =>
                set((state) => {
                    const isExist = state.saved.some(
                        (savedItem) => savedItem.label === item.label && savedItem.value.lat === item.value.lat,
                    );
                    if (isExist) return state;
                    return { saved: [...state.saved, { ...item }] };
                }),
            removeItem: (item) =>
                set((state) => ({
                    saved: state.saved.filter(
                        (savedItem) => !(savedItem.label === item.label && savedItem.value.lat === item.value.lat),
                    ),
                })),
            hasItem: (item) => {
                if (!item) return false;
                return get().saved.some(
                    (savedItem) => savedItem.label === item.label && savedItem.value.lat === item.value.lat,
                );
            },
        }),
        {
            name: "weather-saved-cities",
        },
    ),
);
