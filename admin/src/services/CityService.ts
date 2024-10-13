import { City, CityDTO } from "../models/City";
import { API } from "./API";

export class CityService extends API<City, CityDTO> {
    constructor() {
        super('cities');
    }
}