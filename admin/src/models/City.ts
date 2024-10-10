import { State } from "./State";

export interface City {
    id: number;
    state_id: number;
    label: string;

    state: State;
    state_name: string;
}