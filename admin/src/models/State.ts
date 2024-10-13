import { ISelecaoOpcao } from "../components/formulario/types";

export interface State {
    id: number;
    label: string;
    abbreviation: string;
    active: boolean;
}

export function StateSelectOption(state: State) : ISelecaoOpcao {
    return {
        id: state.id,
        label: `${state.label}`
    }
}