import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Wrapper from "./Wrapper";

interface Props {
    children: ReactNode;
    className?: string;
}

function Section({ children, className = "" }: Props) {
    return (
        <section className={cn("section", className)}>
            <Wrapper>
                {children}
            </Wrapper>
        </section>
    );
}

export default Section;
