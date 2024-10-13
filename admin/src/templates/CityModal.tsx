import { useEffect, useState } from "react";
import Botao from "../components/formulario/Botao";
import useModal from "../components/modal/useModal";
import SelectState from "./form/SelectState";
import { City, CityDTO } from "../models/City";
import { CityService } from "../services/CityService";
import useGlobal from "../hooks/useGlobal";

interface CityModalProps {
    fetch: () => void;
    city?: City;
}

export default function CityModal({ fetch, city }: CityModalProps) {
    const [cityDTO, setCityDTO] = useState({ state_id: 1 } as CityDTO);

    const { modalClose } = useModal();
    const { container } = useGlobal();

    
    useEffect(() => {
        if(city) {
            setCityDTO({ id: city.id, label: city.label, state_id: city.state_id });
        }
    }, []);

    const HandleOnConfirmar = (e: any) => {
        e.preventDefault();

        let service = container.resolve<CityService>('city');
                    
        if(city) {
            service.update(cityDTO)
                    .then( mesage => {
                        fetch();
                        modalClose();
                    });
        } else {
            service.save(cityDTO)
                    .then( mesage => {
                        fetch();
                        modalClose();
                    });
        }
    }
    
    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h4>{ city ? 'Edit city' : 'Add new city' }</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="" className="form-label">City name</label>
                        <input type="text" className="form-control" value={ cityDTO.label } onChange={ e => setCityDTO({ ...cityDTO, label: e.target.value })} />
                    </div>
                    <SelectState value={cityDTO.state_id} setValue={ value => setCityDTO({ ...cityDTO, state_id: value.id }) } disabled={ city !== undefined } />
                </div>
                <div className="modal-footer">
                    <Botao estilo="default" onClick={modalClose} label="Cancelar" />
                    <Botao estilo="sucesso" onClick={HandleOnConfirmar} label="Salvar" />
                </div>
            </div>
        </>
    );
}