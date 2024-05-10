import { ReactNode } from "react";
import CardTitle from "./CardTitle/CardTitle";
import CardDescription from "./CardDescription/CardDescription";

interface CardProps {
    children?: ReactNode;
}

function Card({ children }: CardProps) {
    return (
        <div className="w-full p-6 border border-secondary-250 rounded-lg bg-secondary-100 flex flex-col gap-2">
            {children}
        </div>
    )
}

export  { CardTitle, CardDescription }
export default Card;