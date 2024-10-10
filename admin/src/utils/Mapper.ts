export function Map<TModelo>(entidade: any, mapping?: (obj: any) => TModelo) : TModelo {

    if(mapping) {
        return mapping(entidade);
    }

    return entidade as TModelo;
}