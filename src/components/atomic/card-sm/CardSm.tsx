import React from "react";
import Card from "../card/Card";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"div"> {
    title: string;
}

function CardSm(props: Props) {
    return (
        <Card className={cn("px-3! py-2! rounded-xl! gap-0!", props.className)}>
            <span className="text-xs text-foreground/80">{props.title}</span>
            <span className="text-sm">{props.children}</span>
        </Card>
    );
};

export default CardSm;