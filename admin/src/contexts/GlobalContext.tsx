import { createContext, ReactNode, useEffect, useState } from "react";
import { Container } from "../services/Container";
import { StateService } from "../services/StateService";
import { CityService } from "../services/CityService";

export interface IGlobalContextData {
    container: Container;
}

export interface IGlobalContextProps {
    children: ReactNode;
}

export const GlobalContext = createContext({} as IGlobalContextData);

export default function GlobalContextProvider({ children }: IGlobalContextProps) {
    const [container] = useState<Container>(new Container());

    useEffect(() => {
        loadContainer();
    }, []);

    function loadContainer() {
        container.register('state', () => new StateService());
        container.register('city', () => new CityService());
    }
    
    return (
        <GlobalContext.Provider value={{ container }}>
            { children }
        </GlobalContext.Provider>
    );
}