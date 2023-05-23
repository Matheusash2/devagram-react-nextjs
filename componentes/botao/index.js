export default function({
    tipo= 'button',
    texto,
    cor= 'primaria',
    desabilitado=false,
    manipularClique
}) {
    return (
        <button
            type={tipo}
            className={`btn ${cor}`}
            disabled={desabilitado}
            onClick={manipularClique}
        >
            {texto}
        </button>
    );

}