import { useEffect, useRef, useState } from "react";
import { ISelecaoProps, ISelecaoOpcao } from "./types";

import './scss/_selecao.scss';

export function SelecaoOpcaoMapper(obj: any) {
    let selecao = obj as ISelecaoOpcao;

    if(obj.Nome) {
        selecao.label = obj.Nome;
    }
    
    return selecao;
}


export default function Selecao(props: ISelecaoProps) {
    const [aberto, setAberto] = useState(false);
    const [listaOriginal, setListaOriginal] = useState<ISelecaoOpcao[]>([]);
    const [lista, setLista] = useState<ISelecaoOpcao[]>([]);
    const [valor, setValor] = useState('');
    const listaRef = useRef(null);

    useEffect(() => {
        if(props.itens.length > 0) {
            if(valor === '') setValor(props.itens[0].label);
            setListaOriginal(props.itens);
            setLista(props.itens);
        }
        // eslint-disable-next-line
    }, [props.itens]);

    function HandleSelecionarItem(item: ISelecaoOpcao) {
        setAberto(false);
        setValor(item.label);
        setLista(listaOriginal);
        return props.onSelect(item.id);
    }

    function FiltroLista(termo: string) {
        if(termo === "") return setLista(listaOriginal);
        else {
            return setLista(listaOriginal.filter( l => l.label.toLowerCase().includes(termo.toLowerCase())));
        }
    }

    if(props.isBuscavel) {
        return (
            <div className="form-group">
                { props.label ? <label htmlFor="" className="form-label">{ `${props.label}${ props.required ? '(Obrigatório)' : '' }` }</label> : '' }
                <div className={`form-select selecao-buscavel`} id={ props.id } onClick={ e => setAberto(!aberto)}>
                    <span>{ valor }</span>
                    { aberto ? (
                        <div className='selecao-buscavel-container'>
                            <input onInput={e => FiltroLista(e.currentTarget.value)} className="form-control" type="text" name="" id="" />
                            <ul ref={listaRef} className='selecao-lista'>
                                { lista.map( item => <div className='lista-item' onClick={ e => HandleSelecionarItem(item) }>{ item.label }</div> ) }
                            </ul>
                        </div>
                    ) : '' }
                </div>
            </div>
        );
    }

    return (
        <div className="form-group">
            { props.label ? <label htmlFor="" className="form-label">{ `${props.label}` }{ props.required ? <small>{'(Obrigatório)'}</small> : '' }</label> : '' }
            <select className="form-select" {...props} onChange={e => props.onSelect(parseInt(e.target.value))}>
                { props.itens.map( item => <option value={item.id}>{ item.label }</option> ) }
            </select>
        </div>
    );
}