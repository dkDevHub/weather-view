import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
    children: ReactNode;
    classname?: string;
}

function AppLayout({ children, classname }: Props) {
    return (
        <>
            <main className={cn("section flex-1 gap-[100px]", classname)}>
                {children}
            </main>
        </>
    );
}

export default AppLayout;
