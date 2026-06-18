import { ApiError } from "@/lib/apiFetch";
import { create } from "zustand";

interface Store {
    error: ApiError | null;
    setError: (error: ApiError | null) => void;
}

export const useSearchCityError = create<Store>((set) => ({
    error: null,
    setError: (error) => set({ error }),
}));
