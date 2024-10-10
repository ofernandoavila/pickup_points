import { InputHTMLAttributes, useEffect, useState } from "react";
import { Validation } from "../../models/Validation";

interface ICampoProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    label?: string;
    placeholder?: string;
    desabilitado?: boolean;
    className?: string;
    validacao?: Validation;
}

export default function Campo({ 
    validacao,
    className,
    id,
    label,
    required,
    disabled,
    onChange,
    placeholder,
    value,
    type
}: ICampoProps) {
    const [classe, setClasse] = useState<string>('');
    const [classeMensagem, setClasseMensagem] = useState<string>('');
    const [mensagem, setMensagem] = useState<string | null>(null);

    useEffect(() => {
        if(validacao) {
            switch(validacao.status) {
                case 'success':
                    setClasseMensagem('valid-feedback');
                    setClasse(`is-valid`);
                    setMensagem(validacao.mensagens.filter( x => x.status === 'success' )![0].mensagem)
                    break;
                    
                case 'error':
                    setClasseMensagem('invalid-feedback');
                    setClasse(`is-invalid`);
                    setMensagem(validacao.mensagens.filter( x => x.status === 'error' )![0].mensagem)
                    break;

                case 'default':
                    setClasseMensagem('');
                    setClasse('');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validacao?.status]);

    return (
        <div className={`form-group ${ className ?? '' }`}>
            { label ? <label className="form-label" htmlFor={ id}>{`${ label} ${  required ? '(Obrigatório)' : '' }`}</label> : '' }
            <input type={ type } placeholder={ placeholder } id={ id } value={ value } onChange={ onChange } disabled={ disabled } className={`form-control ${ classe }`} />
            { validacao?.status !== 'default' ? <div className={`${ classeMensagem }`}>{ mensagem }</div> : '' }
        </div>
    );
}