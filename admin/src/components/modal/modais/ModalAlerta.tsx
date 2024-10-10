import Botao from "../../formulario/Botao";
import useModal from "../useModal";

export default function ModalAlerta() {
    const { modalClose } = useModal();

    return (
        <>
            <div className="row">
                <div className="modal-close">
                    <Botao
                        className="float-right"
                        estilo="secundario"
                        onClick={ modalClose }
                    />
                </div>
            </div>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Atenção</h1>
                </div>
                <div className="modal-body">
                    <p>Uma operação está em andamento. Deseja realmente trocar a franquia selecionada?</p>
                </div>
            </div>
        </>
    );
}
