import React, { useState } from "react";
import { CityFilter as Filter } from "../../models/City";
import SelectState from "./SelectState";

interface CityFilterProps {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
    fetch: ( filter: Filter ) => void;
}

export default function CityFilter({ fetch, filter, setFilter }: CityFilterProps) {

    const [label, setLabel] = useState('');
    const [state_id, setStateId] = useState(0);

    const HandleSearch = () => {
        setFilter({
            ...filter,
            label,
            state_id,
        });

        return fetch(filter);
    }
    
    const HandleCleanFilter = () => {
        setLabel('');
        setStateId(0);
    }

    return (
        <div className="tabela-filter">
            <div className="form-group">
                <label htmlFor="" className="form-label">City name</label>
                <input type="text" className="form-control" onChange={e => setLabel(e.target.value)} value={label} />
            </div>
            <SelectState setValue={(value) => setStateId(value.id)} value={state_id} />
            <div className="form-group">
                <button className="btn btn-secondary" onClick={HandleCleanFilter}>Limpar filtros</button>
                <button className="btn btn-primary" onClick={HandleSearch}>Filtrar</button>
            </div>
        </div>
    );
}