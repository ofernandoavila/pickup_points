import './_carregando-spinner.scss';

export default function CarregandoSpinner({ className }: ICarregandoSpinner) {
    return <span className={`carregando-spinner ${ className ?? '' }`}></span>;
}