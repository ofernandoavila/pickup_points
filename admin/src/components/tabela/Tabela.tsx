import React, { useEffect, useState } from "react";
import Botao, { IBotaoStyleType } from "../formulario/Botao";
import "./_table.scss";
import { DateParaString } from "../../utils/Date";
import TabelaHeader from "./TabelaHeader";
import { Filter, Pagination, PaginationFilter } from "../../models/API";
import SelectState from "../../templates/form/SelectState";

export type TabelaCamposHeader = string[];
type Evento<T> = (item: T) => void;

export interface IEvento<T> {
    label: string;
    callback: Evento<T>;

    options?: {
        icon?: string;
        estiloBotao?: IBotaoStyleType;
    }
}

interface TabelaProps<T> {
    fetch: () => void;
    pagination?: Pagination<T> | null;
    titulo: string;
    campos: TabelaCamposHeader;
    primeiroCampo?: "numerico" | "guid";
    chaves?: (keyof T)[];
    itens: T[];

    newButton?: JSX.Element;
    eventos?: IEvento<T>[];
    isCarregando?: boolean;
    filter?: JSX.Element;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export default function Tabela<T>({
    titulo,
    campos,
    itens,
    chaves,
    eventos,
    primeiroCampo,
    newButton,
    pagination,
    fetch,
    isCarregando,
    filter,
    setFilter
}: TabelaProps<T>) {
    const [chavesObj, setChavesObj] = useState<(keyof T)[]>([]);
    const [pageNumbers, setPageNumbers] = useState<JSX.Element[]>([]);
    const [prevPage, setPrevPage] = useState<number>( 1 );
    const [nextPage, setNextPage] = useState<number>( 1 );

    const renderizarTabela = () => {
        if (itens && itens.length > 0) {
            const keys = Object.keys(itens[0] as object);

            keys.splice(keys.indexOf("id"), 1);

            if (chaves) {
                setChavesObj(chaves);
                return;
            }
            setChavesObj(keys as (keyof T)[]);
        }
    };

    const HandleChagenPage = (pageNumber: number) => {
        setFilter(prev => {
            return {
                ...prev,
                page: pageNumber
            }
        });

        fetch();
    }

    useEffect(() => {
        renderizarTabela();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itens]);

    useEffect(() => {
        if(pagination) {
            let tmp:JSX.Element[] = [];
            setPageNumbers([]);
            for(let i = 1; i <= pagination.totalPages; i++) {
                tmp.push(<li className="page-item"><a className={`page-link ${ i == pagination.page ? 'active' : '' }`} onClick={e => HandleChagenPage(i)}>{ i }</a></li>);
            }

            setPrevPage((pagination.page - 1) > 0 ? (pagination.page - 1) : pagination.page);
            setNextPage((pagination.page + 1) < pagination.totalPages ? (pagination.page + 1) : pagination.totalPages);

            setPageNumbers(tmp);
        }
    }, [pagination]);

    return (
        <div className="tabela">
            <TabelaHeader titulo={ titulo } newButton={newButton} />
            { filter }
            { itens ? (
                <div className="tabela-wrapper">
                    { itens.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    {campos.map((campo, index) => {
                                        if (index === 0 && primeiroCampo) {
                                            return (
                                                <th
                                                    scope="col"
                                                    className="avatar"
                                                    key={index}
                                                >
                                                    {campo}
                                                </th>
                                            );
                                        }

                                        return (
                                            <th scope="col" key={index}>
                                                {campo}
                                            </th>
                                        );
                                    })}
                                    { eventos ? ( <th>Actions</th> ) : '' } 
                                </tr>
                            </thead>
                            <tbody>
                                { itens.map((item: T, index) => (
                                    <tr key={index}>
                                        {chavesObj.map((chave, index) => {
                                            if (index === 0 && primeiroCampo) {
                                                if (primeiroCampo === "guid") {
                                                    return (
                                                        <td key={index}>
                                                            <div className="avatar-placeholder"></div>
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <td key={index}>
                                                        <div className="avatar-placeholder">
                                                            {item[chave] as string}
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (
                                                chave === "data" ||
                                                chave === "created_at" ||
                                                chave === "dataMatricula"
                                            ) {
                                                return (
                                                    <td key={index}>
                                                        { DateParaString(new Date(item[chave] as string)) }
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={index}>
                                                    {item[chave] as string}
                                                </td>
                                            );
                                        })}
                                        {
                                            eventos ? (
                                                <td className="table-actions">
                                                    {
                                                        eventos?.map( evento => (
                                                            <Botao
                                                                estilo={ evento.options?.estiloBotao ?? 'default' }
                                                                label={ evento.options?.icon ? <><i className={`${evento.options.icon} mx-2`}></i>{ evento.label }</> : evento.label }
                                                                onClick={ e => evento.callback(item) }
                                                            />
                                                        ))
                                                    }
                                                </td>
                                            ) : ''
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : isCarregando ? ( <p className="alerta">Carregando...</p> ) : <p className="alerta">Não há dados para exbição.</p> }
                </div>
            ) : isCarregando ? ( <p className="alerta">Carregando...</p> ) : <p className="alerta">Não há dados para exbição.</p> }

            { pagination ? (
                <nav className="tabela-pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={ e => (pagination.page - 1) > 0 ? HandleChagenPage(prevPage) : ''}>Previous</a></li>
                        { pageNumbers.map(item => item) }
                        <li className="page-item"><a className="page-link" onClick={ e => (pagination.page + 1) <= pagination.totalPages ? HandleChagenPage(nextPage) : ''}>Next</a></li>
                    </ul>
                </nav>
            ) : '' }
        </div>
    );
}