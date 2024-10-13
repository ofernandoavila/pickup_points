import { useEffect, useState } from "react";
import Tabela from "../components/tabela/Tabela";
import VisaoBasica from "../components/visao-basica/VisaoBasica";
import { State } from "../models/State";
import { StateService } from "../services/StateService";
import { City } from "../models/City";
import { CityService } from "../services/CityService";
import useModal from "../components/modal/useModal";
import useGlobal from "../hooks/useGlobal";
import CityModal from "../templates/CityModal";
import ModalConfirmar from "../components/modal/modais/ModalConfirmar";
import { Pagination, PaginationFilter } from "../models/API";

export default function Settings() {
    const [estados, setEstados] = useState<State[]>([]);
    const [paginatedCities, setPaginatedCities] = useState<Pagination<City>>({} as Pagination<City>);
    const [cidades, setCidades] = useState<City[]>([]);

    const { modalOpen } = useModal();
    const { container } = useGlobal();

    const cityService = container.resolve<CityService>('city');

    useEffect(() => {
        fetchStates();
        fetchCities();
    }, []);

    const fetchCities = (filter?: PaginationFilter) => {
        return cityService
                .getAll(filter ?? { page: 1, perPage: 10 })
                .then( result => setPaginatedCities(result) );
    }
    
    const fetchStates = () => {
        container.resolve<StateService>('state')
                .getAll()
                .then( result => setEstados(result.data) );
    }

    return (
        <VisaoBasica>
            <h1 className="py-2">Settings</h1>
            <hr />
            <section>
                {/* <Tabela<State>
                    titulo="Estados"
                    campos={["Nome", "Abreviação"]}
                    chaves={["label", "abbreviation"]}
                    itens={ estados }
                /> */}
            </section>
            <section>
                <Tabela<City>
                    fetch={fetchCities}
                    titulo="Cities"
                    pagination={paginatedCities}
                    campos={[ "Name", "State" ]}
                    chaves={[ "label", "state_name" ]}
                    itens={ paginatedCities.data }
                    newButton={<button onClick={ e => modalOpen(<CityModal fetch={ fetchCities } />, true)} className={'btn btn-primary'}>Adicionar Cidade</button>}
                    eventos={[
                        { label: 'Editar', callback: (cidade) => { modalOpen(<CityModal city={cidade} fetch={ fetchCities } />, true) }, options: { estiloBotao: "primario" } },
                        { label: 'Excluir', callback: (cidade) => { modalOpen(<ModalConfirmar onConfirmarCallback={ () => cityService.delete(cidade).then(() => fetchCities()) } mensagem={`Tem certeza de que deseja remover '${ cidade.label }'?`} />, true) }, options: { estiloBotao: "perigo" } }
                    ]}
                />
            </section>
        </VisaoBasica>
    );
}
