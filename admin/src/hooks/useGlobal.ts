import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function useGlobal() {
    const context = useContext(GlobalContext);

    return context;
}