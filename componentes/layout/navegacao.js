import Image from "next/image";
import imagemHomeAtivo from "../../public/imagens/homeAtivo.svg";
import imagemHomeCinza from "../../public/imagens/homeCinza.svg";
import imagemPuplicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";
import imagemPuplicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemUsuarioCinza from "../../public/imagens/usuarioCinza.svg";

export default function Navegacao({className}) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image 
                        src={imagemHomeAtivo}
                        alt="Icone home"
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image 
                        src={imagemPuplicacaoCinza}
                        alt="Icone publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image 
                        src={imagemUsuarioCinza}
                        alt="Icone usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}