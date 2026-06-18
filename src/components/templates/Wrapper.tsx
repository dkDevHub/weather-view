import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

function Wrapper({ children, className = "" }: Props) {
    return (
        <div
            className={cn(
                "wrapper flex flex-col items-center gap-25 w-full max-w-[1536px] px-4 sm:px-12",
                className
            )}
        >
            {children}
        </div>
    );
}

export default Wrapper;
