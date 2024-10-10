import { useEffect, useState } from "react";
import Tabela from "../components/tabela/Tabela";
import VisaoBasica from "../components/visao-basica/VisaoBasica";
import { State } from "../models/State";
import { StateService } from "../services/StateService";
import { City } from "../models/City";
import { CityService } from "../services/CityService";

export default function Settings() {

    const [estados, setEstados] = useState<State[]>([]);
    const [cidades, setCidades] = useState<City[]>([]);

    useEffect(() => {
        StateService.getAllStates()
                .then( data => setEstados(data) );
        
        CityService.getAllCities()
                .then( data => setCidades(data) );
    }, []);

    return (
        <VisaoBasica>
            <h1 className="py-2">Settings</h1>
            <hr />
            <section>
                <Tabela<State>
                    titulo="Estados"
                    campos={["Nome", "Abreviação"]}
                    chaves={["label", "abbreviation"]}
                    itens={ estados }
                />
            </section>
            <section>
                <Tabela<City>
                    titulo="Cidades"
                    campos={[ "Nome", "Estado" ]}
                    chaves={[ "label", "state_name" ]}
                    itens={ cidades }
                    eventos={[
                        { label: 'Editar', callback: (cidade) => { console.log(cidade) }, options: { estiloBotao: "primario" } },
                        { label: 'Excluir', callback: (cidade) => { console.log(cidade) }, options: { estiloBotao: "perigo" } }
                    ]}
                />
            </section>
        </VisaoBasica>
    );
}
