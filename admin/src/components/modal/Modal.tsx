import Botao from "../formulario/Botao";
import useModal from "./useModal";

import './_modal.scss';

export default function Modal() {
    const { isModalOpen, modalClose, modalContent, modalTitle, isModalPersonalizado } = useModal();

    if(!isModalOpen) return (<></>);

    const HandleFecharModal = () => {
        modalClose();
    }

    if(isModalPersonalizado) {
        return (
            <div id="modal">
                <div className="backdrop"></div>
                <div className="modal modal-personalizado">
                { modalContent }
                </div>
            </div>
        );
    }

    return (
        <div id="modal">
            <div className="backdrop"></div>
            <div className="modal">
                <div className="row">
                    <div className="modal-close">
                        <Botao className="float-right" estilo="secundario" onClick={HandleFecharModal} />
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>{ modalTitle }</h1>
                    </div>
                    <div className="modal-body">
                        { modalContent }
                    </div>
                </div>
            </div>
        </div>
    );
}