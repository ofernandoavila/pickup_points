import { APIResponse, Filter, Pagination } from "../models/API";

export class API<T, TDTO> {
    protected base_url:string = process.env.REACT_APP_BASE_URL!;

    protected __headers = new Headers();

    constructor(
        public url: string
    ) { }

    public getAll = (filter?: Filter) => new Promise<Pagination<T>>((resolve, reject) => {
        let url = `/${this.url}/getAll`;

        if(filter) {
            url += `?${this.__convertFilter(filter)}`;
        }

        fetch( this.base_url + url, {
            method: 'get'
        } ).then( result => {
            return result.json() as Promise<APIResponse<Pagination<T>>>;
        } )
            .then( data => {
                resolve(data.data);
            } );
    });
    
    public save = (entity: TDTO) => new Promise<string>((resolve, reject) => {
        fetch( this.base_url + `/${this.url}/create`, {
            method: 'post',
            body: JSON.stringify(entity)
        } ).then( result => result.json() )
            .then( data => {
                resolve(data[0] as string);
            } );
    });
    
    public update = (entity: TDTO) => new Promise<string>((resolve, reject) => {
        fetch( this.base_url + `/${this.url}/update`, {
            method: 'post',
            body: JSON.stringify(entity)
        } ).then( result => result.json() )
            .then( data => {
                resolve(data[0] as string);
            } );
    });
    
    public delete = <T extends { id: number; }>(entity: T) => new Promise<string>((resolve, reject) => {
        fetch( this.base_url + `/${this.url}/delete?id=${entity.id}`, {
            method: 'delete'
        } ).then( result => {
            return result.json() as Promise<APIResponse<string>>;
        } )
            .then( data => {
                resolve(data.data[0] as string);
            } );
    });

    public __convertFilter(filter: Filter) {
        let url = '?';
        let filters = [];

        if(filter.page) {
            filters.push(`perPage=${filter.perPage}`);
        }
        
        if(filter.page) {
            filters.push(`page=${filter.page}`);
        }
        
        if(filter.orderBy) {
            filters.push(`orderBy=${filter.orderBy}`);
        }
        
        if(filter.desc) {
            filters.push(`desc=${filter.desc}`);
        }

        return filters.join('&');
    }
}