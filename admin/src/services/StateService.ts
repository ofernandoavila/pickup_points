import { State } from "../models/State";
import { API } from "./API";

export class StateService extends API {
    public static getAllStates = () => new Promise<State[]>((resolve, reject) => {
        fetch( this.base_url + '/states/getAll', {
            method: 'get'
        } ).then( result => result.json() )
            .then( data => {
                resolve(data as State[]);
            } );
    });
}