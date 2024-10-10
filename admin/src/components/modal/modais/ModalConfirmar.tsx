import Botao from "../../formulario/Botao";
import useModal from "../useModal";

interface IModalConfirmarProps {
    title?: string;
    mensagem: string;
    onConfirmarCallback: (...args:any) => void;
}

export default function ModalConfirmar({ title, mensagem, onConfirmarCallback }: IModalConfirmarProps) {
    const { modalClose } = useModal();

    const HandleOnConfirmar = (e: any) => {
        e.preventDefault();
        onConfirmarCallback();
        modalClose();
    }

    return (
        <>
            <div className="modal-content">
                { title ? (
                    <div className="modal-header">
                        <h4>{ title }</h4>
                    </div>
                ) : '' }
                <div className="modal-body">
                    <p>{ mensagem }</p>
                </div>
                <div className="modal-footer">
                    <Botao estilo="default" onClick={modalClose} label="Cancelar" />
                    <Botao estilo="perigo" onClick={HandleOnConfirmar} label="Confirmar" />
                </div>
            </div>
        </>
    );
}
