import { useEffect, useState } from "react";
import Selecao from "../../components/formulario/Selecao";
import { GetStateSelectOptions, State, StateSelectOption } from "../../models/State";
import { StateService } from "../../services/StateService";
import useGlobal from "../../hooks/useGlobal";

interface ISelectStateProps extends ISelectSetValue<State> {
}

interface ISelectSetValue<T> {
    value: number;
    setValue: (value: T) => void;
    disabled?: boolean;
}

export default function SelectState({ value, setValue, disabled }: ISelectStateProps) {
    const [states, setStates] = useState<State[]>([]);

    const { container } = useGlobal();

    useEffect(() => {
        container.resolve<StateService>('state')
                    .getAll()
                    .then( result => setStates(result.data));

    }, []);

    const HandleSelectState = (id: number) => {
        if(id === 0) return;

        let state = states[states.findIndex(m => m.id === id)];
        return setValue(state);
    }
    
    return (
        <Selecao
            label="State"
            itens={ GetStateSelectOptions(states) }
            value={ value }
            onSelect={ HandleSelectState }
            disabled={ disabled }
        />
    );
}