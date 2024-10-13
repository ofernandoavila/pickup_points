import { City, CityDTO, CityFilter } from "../models/City";
import { API } from "./API";

export class CityService extends API<City, CityDTO> {
    constructor() {
        super('cities');
    }

    override __convertFilter(filter: CityFilter): string {
        let filtro = super.__convertFilter(filter);

        if(filter.label) {
            filtro += `&label=${filter.label}`;
        }

        if(filter.state_id) {
            filtro += `&state_id=${filter.state_id}`;
        }

        return filtro;
    }
}