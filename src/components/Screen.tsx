interface IScreenProps {
    isOpen: boolean;
    exitScreen: () => void;
}

export const Screen = ({ isOpen, exitScreen }: IScreenProps) => {

    return (
        <div
            onClick={() => {
                exitScreen()
            }}
            className={`screen ${isOpen ? "screen-active" : ""}`}
        ></div>
    )
}
