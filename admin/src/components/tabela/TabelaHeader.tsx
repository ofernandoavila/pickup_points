import { ITabelaHeaderProps } from "./types";

export default function TabelaHeader({ titulo, newButton }: ITabelaHeaderProps) {
    if(newButton) {
        return (
            <div className="d-flex w-100 justify-content-between align-items-center">
                <h3 className="titulo">{ titulo }</h3>
                { newButton }
            </div>
        );
    }

    return (
        <div className="d-flex w-100 justify-content-start align-items-center">
            <h3 className="titulo">{ titulo }</h3>
        </div>
    );
}