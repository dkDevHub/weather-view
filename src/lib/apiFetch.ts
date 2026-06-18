// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// used next js api routes
const apiUrl = "/api";

export type ApiError = {
    name?: string;
    message: string;
    code: number;
};

export type ApiResult<T> =
    | { data: T; error: null }
    | { data: null; error: ApiError };

const fetcher = async <T>(url: string, options?: RequestInit): Promise<ApiResult<T>> => {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            if (res.status === 404) throw new Error("API route not found");

            const errorData: ApiError = await res.json();
            errorData.code = res.status;

            return { data: null, error: errorData };
        }

        const data: T = await res.json();

        return { data, error: null };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";

        const errorData: ApiError = {
            name: "NetworkError",
            message,
            code: 500,
        };

        return { data: null, error: errorData };
    }
};

export function getBaseUrl(): string {
    if (typeof window !== "undefined") return "";

    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    if (process.env.URL) {
        return process.env.URL;
    }

    return "http://localhost:3000";
}

export const apiFetch = async <T>(
    url: string,
    options?: RequestInit
): Promise<ApiResult<T>> => {
    const baseUrl = getBaseUrl();
    return fetcher<T>(`${baseUrl}${apiUrl}${url}`, options);
};

export const externalApiFetch = async <T>(url: string, options?: RequestInit): Promise<ApiResult<T>> => {
    return fetcher<T>(url, options);
};
