import { useEffect, useState } from "react";
import Botao, { IBotaoStyleType } from "../formulario/Botao";
import "./_table.scss";
import { DateParaString } from "../../utils/Date";

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
    titulo: string;
    campos: TabelaCamposHeader;
    primeiroCampo?: "numerico" | "guid";
    chaves?: (keyof T)[];
    itens: T[];

    eventos?: IEvento<T>[];
}

export default function Tabela<T>({
    titulo,
    campos,
    itens,
    chaves,
    eventos,
    primeiroCampo,
}: TabelaProps<T>) {
    const [chavesObj, setChavesObj] = useState<(keyof T)[]>([]);

    const renderizarTabela = () => {
        if (itens.length > 0) {
            const keys = Object.keys(itens[0] as object);

            keys.splice(keys.indexOf("id"), 1);

            if (chaves) {
                setChavesObj(chaves);
                return;
            }
            setChavesObj(keys as (keyof T)[]);
        }
    };

    useEffect(() => {
        renderizarTabela();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itens]);

    if (itens === undefined) return <></>;

    if (itens.length === 0) return (
        <div className="tabela">
            <h3 className="titulo">{ titulo }</h3>
            <div className="tabela-wrapper">
                <p className="alerta">Não há dados para exbição.</p>
            </div>
        </div>
    );

    return (
        <div className="tabela">
            <h3 className="titulo">{ titulo }</h3>
            <div className="tabela-wrapper">
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
                            { eventos ? ( <th></th> ) : '' } 
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map((item: T, index) => (
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
            </div>
        </div>
    );
}
