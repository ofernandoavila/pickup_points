export function ObterDataAtualExtenso() {
    const hoje = new Date();

    const dia = hoje.getDate();
    const mes = hoje.toLocaleString("pt-BR", { month: "long" });
    const ano = hoje.getFullYear();
    const hora = hoje.getHours();
    const minuto = hoje.getMinutes();

    return `${dia} de ${mes} de ${ano} | ${hora}h${minuto
        .toString()
        .padStart(2, "0")}`;
}

export function VerificaMaioridade(dataNascimento: Date) {
    const hoje = new Date();

    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const diferencaMes = hoje.getMonth() - dataNascimento.getMonth();
    const diferencaDia = hoje.getDate() - dataNascimento.getDate();

    if (idade > 18) {
        return true;
    }

    if (idade === 18) {
        if (diferencaMes > 0) {
            return true;
        } else if (diferencaMes === 0 && diferencaDia >= 0) {
            return true;
        }
    }

    return false;
}

export function DateParaCampoInput(date?: Date) : string {
    if(!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function DateParaString(date?: Date) : string {
    if(!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
}

export function ObterAnoAtual() : number {
    const year = new Date().getFullYear();

    return year;
}
