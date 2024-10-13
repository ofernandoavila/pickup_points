import { APIResponse, Pagination, PaginationFilter } from "../models/API";

export class API<T, TDTO> {
    protected base_url:string = process.env.REACT_APP_BASE_URL!;

    protected __headers = new Headers();

    constructor(
        public url: string
    ) { }

    public getAll = (filter?: PaginationFilter) => new Promise<Pagination<T>>((resolve, reject) => {
        let url = `/${this.url}/getAll`;

        if(filter) {
            url += `?page=${filter.page}&perPage=${filter.perPage}`;
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
}