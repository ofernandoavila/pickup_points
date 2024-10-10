import { ReactNode } from "react";

interface IFormularioProps {
    titulo?: string;
    className?: string;
    children?: ReactNode;
}

export function Formulario({ children, className, titulo }: IFormularioProps) {
    return (
        <form action="" className={`formulario ${className}`}>
            { titulo ? <div className="titulo"><h3>{ titulo }</h3></div> : '' }
            <div className="conteudo">{ children }</div>
        </form>
    );
}

interface IGrupoCamposProps {
    children: ReactNode;
    className?: string;
    isVertical?: boolean;
}

export function GrupoCampos({ children, className, isVertical }: IGrupoCamposProps) {
    return (
        <div className={`grupo-campos ${ className ?? '' } ${ isVertical ? 'grupo-vertical' : '' }`}>
            { children }
        </div>
    );
}