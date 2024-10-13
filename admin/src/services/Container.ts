type Factory<T> = (container: Container) => T;

export class Container {
    private __bindings = new Map<string, any>();
    private __factories = new Map<string, Factory<any>>();
    
    register<T>(key: string, factory: Factory<T>) : void {
        if(this.__factories.has(key)) throw new Error("Já existe um container com este nome")
            
        this.__factories.set(key, factory);
    }

    resolve<T>(key: string) : T {
        if(this.__bindings.has(key)) {
            return this.__bindings.get(key);
        }

        const factory = this.__factories.get(key);

        if(!factory) throw new Error(`Nenhuma fábrica encontada para a chave ${key}`);

        const instance = factory(this);
        this.__bindings.set(key, instance);
        return instance;
    }
}