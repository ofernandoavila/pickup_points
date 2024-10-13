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

export function GetStateSelectOptions(states: State[]) : ISelecaoOpcao[] {
    let result: ISelecaoOpcao[] = [{ id: 0, label: '-- SELECIONE UMA OPÇÃO --' }];
    states.map( state => result.push(StateSelectOption(state)));

    return result;
}