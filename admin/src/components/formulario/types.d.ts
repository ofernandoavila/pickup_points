import { SelectHTMLAttributes } from "react";

export interface ISelecaoOpcao {
    id: number;
    label: string;
}

export interface ISelecaoOpcao {
    id: number;
    label: string;
}

export interface ISelecaoProps extends SelectHTMLAttributes<HTMLSelectElement> {
    onSelect: (value: any) => void;
    itens: ISelecaoOpcao[];
    label?: string;
    isBuscavel?: boolean;
}