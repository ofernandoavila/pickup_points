import React, { useState } from "react";
import { CityFilter as Filter } from "../../models/City";
import SelectState from "./SelectState";
import { Button, Text } from "avilalab-elements/main";

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
            <Text
                label="City name"
                value={ label }
                onChange={ e => setLabel(e.target.value) }
            />
            <SelectState setValue={(value) => setStateId(value.id)} value={state_id} />
            <div className="form-group">
                <Button
                    label="Clean filters"
                    onClick={HandleCleanFilter}
                    color="secondary"
                />
                <Button
                    label="Filter"
                    onClick={HandleSearch}
                    color="primary"
                />
            </div>
        </div>
    );
}