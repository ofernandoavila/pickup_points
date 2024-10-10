import { useState } from 'react';
import useModal from '../modal/useModal';
import { IEvento } from '../tabela/Tabela';
import Botao from './Botao';
import './scss/_grid-selector.scss';

interface IGridSelectorProps<T> {
    data: T[];
    renderInfo: (item: T) => JSX.Element;
    events?: {
        grid?: IEvento<T[]>[];
        row?: IEvento<T>[];
    }
}

export default function GridSelector<T extends { id: number }>({ data, renderInfo, events }: IGridSelectorProps<T>) {
    const { modalClose } = useModal();

    const [selecao, setSelecao] = useState<T[]>([]);

    const HandleToggleSelection = (item: T, selected: boolean) => {
        let lista = selecao;
               
        if(!selected) {
            lista = lista.filter(x => x.id !== item.id)
        } else {
            lista.push(item);
        }

        setSelecao(lista);
    }
    
    return (
        <div className="grid-selector">
            <div className="grid-filter">
                <div className="form-group">
                    <label htmlFor="" className="form-label">Nome</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Buscar
                    </button>
                </div>
            </div>
            <div className="grid-selector-rows">
                { data.map( item => <GridRow item={item} renderInfo={renderInfo} events={ events?.row } onToggleSelect={ HandleToggleSelection } /> ) }
            </div>
            <div className="grid-row-actions">
                <Botao
                    estilo={ 'default' }
                    label={ 'Cancelar' }
                    onClick={ modalClose }
                />
                { events?.grid ? 
                     events.grid.map( evento => (
                        <Botao
                            estilo={ evento.options?.estiloBotao ?? 'default' }
                            label={ evento.options?.icon ? <><i className={`${evento.options.icon} mx-2`}></i>{ evento.label }</> : evento.label }
                            onClick={ e => evento.callback(selecao) }
                        />
                    ) ) : '' }
            </div>
        </div>
    );
}

interface IGridRowProps<T> {
    item: T;
    renderInfo: (item: T) => JSX.Element;
    onToggleSelect?: (item: T, selected: boolean) => void;
    events?: IEvento<T>[];
}

function GridRow<T>({ item, renderInfo, onToggleSelect, events }: IGridRowProps<T>) {
    const [selected, setSelected] = useState(false);

    const HandleSelect = (state: boolean) => {
        setSelected(state);

        if(onToggleSelect) onToggleSelect(item, state);
    }
    
    return (
        <div className="grid-row">
            <div className="grid-checkbox">
                <input type="checkbox" name="selector" id="selector" onChange={e => HandleSelect(e.currentTarget.checked)} checked={ selected } />
            </div>
            <div className="grid-info" onClick={e => HandleSelect(!selected)}>
                { renderInfo(item) }
            </div>
            { events ? (
                <div className="grid-row-actions">
                    { events.map( evento => (
                        <Botao
                            estilo={ evento.options?.estiloBotao ?? 'default' }
                            label={ evento.options?.icon ? <><i className={`${evento.options.icon} mx-2`}></i>{ evento.label }</> : evento.label }
                            onClick={ e => evento.callback(item) }
                        />
                    ) ) }
                    
                </div>
            ) : '' }
        </div>
    );
}