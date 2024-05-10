import { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
}

function Container({ children }: ContainerProps) {
    return (
        <div className="max-w-[832px] h-full px-4 mx-auto">
            {children}
        </div>
    )
}

export default Container;