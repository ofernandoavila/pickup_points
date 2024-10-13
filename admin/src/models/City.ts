import { ISelecaoOpcao } from "../components/formulario/types";
import { State } from "./State";

export interface City {
    id: number;
    state_id: number;
    label: string;
    
    state: State;
    state_name: string;
}

export interface CityDTO {
    id?: number;
    label: string;
    state_id: number;
}

export function CitySelectOption(city: City) : ISelecaoOpcao {
    return {
        id: city.id,
        label: `${city.label}`
    }
}