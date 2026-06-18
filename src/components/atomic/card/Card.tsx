import { cn } from "@/lib/utils";
import cl from "./Card.module.css"

type Props = React.HTMLAttributes<HTMLDivElement>

function Card(props: Props) {
    return (
        <div {...props} className={cn(cl.card, props.className)}>
            {props.children}
        </div>
    );
};

export default Card;