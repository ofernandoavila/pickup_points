import { ButtonHTMLAttributes, useEffect, useState } from "react";
import CarregandoSpinner from "../carregando-spinner/CarregandoSpinner";

export type IBotaoStyleType = 'primario' | 'secundario' | 'sucesso' | 'default' | 'perigo';

interface IBotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | JSX.Element;
    icone?: string;
    estilo: IBotaoStyleType;
    isCarregando?: boolean;
}


export default function Botao(props: IBotaoProps) {
    const [estilo, setEstilo] = useState('');

    useEffect(() => {
        switch(props.estilo) {
            case 'primario':
                setEstilo('primary');
                break;
    
            case 'default':
                setEstilo('default');
                break;
            
            case 'perigo':
                setEstilo('danger');
                break;
            
            case 'secundario':
                setEstilo('secondary');
                break;
    
            case 'sucesso':
                setEstilo('success');
                break;
        }
    }, [props]);

    return (
        <button
            id={ props.id }
            onClick={ props.onClick }
            className={`btn btn-${estilo} ${ props.className ?? '' }`} 
            disabled={ props.disabled ?? props.isCarregando }
        >
            { props.label }
            { props.isCarregando ? <CarregandoSpinner className="mx-2" /> : '' }
        </button>
    );
}