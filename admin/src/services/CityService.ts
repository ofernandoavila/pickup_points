import { City } from "../models/City";
import { API } from "./API";

export class CityService extends API {
    public static getAllCities = () => new Promise<City[]>((resolve, reject) => {
        fetch( this.base_url + '/cities/getAll', {
            method: 'get'
        } ).then( result => result.json() )
            .then( data => {
                resolve(data as City[]);
            } );
    });
}