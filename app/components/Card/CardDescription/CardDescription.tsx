interface CardDescriptionProps {
    children?: string;
}

function CardDescription({ children }: CardDescriptionProps) {
    return (
        <p className="text-base font-medium text-secondary-350 m-0 w-full">
            {children}
        </p>
    )
}

export default CardDescription;