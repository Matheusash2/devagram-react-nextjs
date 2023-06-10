import Image from "next/image";

export default function CabecalhoComAcoes({
    className,
    iconeEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo
}) {
    return (
        <div className={`cabecalhoComAcoes ${className}`}>
            { iconeEsquerda ? (
                <Image
                    src={iconeEsquerda}
                    alt="Icone esquerdo cabecalho com ações"
                    onClick={aoClicarAcaoEsquerda}
                    width={20}
                    height={20} 
                />
            ) : (
                textoEsquerda !== null && (
                    <span className="cabecalhoComAcoesTextoEsquerda" onClick={aoClicarAcaoEsquerda}>
                        {textoEsquerda}
                    </span>
                )
            )}

            <h3>{titulo}</h3>
        </div>
    )
}