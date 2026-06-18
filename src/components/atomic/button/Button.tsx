import { cn } from "@/lib/utils";

function Button(props: React.ComponentProps<"button">) {
    return (
        <button
            {...props}
            className={cn(
                "flex items-center gap-1 px-2 py-1.5 bg-transparent hover:bg-background/80 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation",
                props.className,
            )}
        >
            {props.children}
        </button>
    );
};

export default Button;