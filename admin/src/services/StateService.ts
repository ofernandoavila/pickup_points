import { State } from "../models/State";
import { API } from "./API";

export class StateService extends API<State, any> {
    constructor() {
        super('states');
    }
}