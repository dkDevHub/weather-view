import { LucideProps } from "lucide-react";
import cl from "./Input.module.css"
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    type?: "text" | "password" | "email" | "number";
    icon?: React.ComponentType<LucideProps>;
    ignoreFilledStyle?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(({ icon: Icon, type = "text", className, ignoreFilledStyle, ...props }, ref) => {
    const classes = `${cl.input} ${Icon ? cl.input_icon : ""}`;

    return (
        <div className={cn(cl.input_wrapper, className, { [cl.ignore_filled_state]: ignoreFilledStyle })}>
            <div className={cl.icon}>{Icon && <Icon size={16} strokeWidth={2.25} />}</div>
            <input type={type} {...props} className={classes} ref={ref} />
        </div>
    );
});

Input.displayName = "Input";

export default Input;