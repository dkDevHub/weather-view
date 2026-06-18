import { CountryPolyfill } from "@/components/atomic/country-polyfill/CountryPolyfill";
import "@/css/app.css";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Weather View",
    description: "Weather API description",
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" className={cn(`h-full antialiased`)} data-theme="dark">
            <head>
                <CountryPolyfill />
            </head>
            <body>{children}</body>
        </html>
    );
}
