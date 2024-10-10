export interface Validation {
    regra: RegraValidation[];
    status: StatusValidation;
    mensagens: IMensagemValidation[];
}

type StatusValidation = 'warning' | 'error' | 'success' | 'default';
type RegraValidation = 'not-null' | 'not-zero' | 'not-empty' | 'email-valid';

interface IMensagemValidation {
    status: StatusValidation;
    mensagem: string;
}

export function Validate(value: any, validation: Validation) : Validation {
    let x = validation;

    if(value === undefined) {
        x.status = "error";
        return x;
    }

    validation.regra.map( regra => {
        if(x.status === 'default') {
            switch (regra) {
                case 'not-zero':
                    if(value === 0) return x.status = "error";
                    break;
    
                case 'not-empty':
                    if(value === '') return x.status = "error";
                    break;

                case 'not-null':
                    if(value === null) return x.status = "error";
                    break;
                
                case 'email-valid':
                    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) x.status = 'error';
                    break;
            }
        }

        return true;
    });

    console.log(x);

    return x;
}

export function isEmailValid(value: string) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}