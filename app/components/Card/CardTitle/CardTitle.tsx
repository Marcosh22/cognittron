import { ReactNode } from "react";

interface CardTitleProps {
    children?: string | ReactNode;
}

function CardTitle({ children }: CardTitleProps) {
    return (
        <h2 className="text-lg text-secondary-400 font-semibold line-clamp-2 w-full">
            {children}
        </h2>
    )
}

export default CardTitle;