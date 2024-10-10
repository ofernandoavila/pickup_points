import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export default function useModal() {
    const context = useContext(ModalContext);

    return context;
}