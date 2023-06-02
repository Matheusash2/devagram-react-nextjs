import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import imagemHomeAtivo from "../../public/imagens/homeAtivo.svg";
import imagemHomeCinza from "../../public/imagens/homeCinza.svg";
import imagemPuplicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";
import imagemPuplicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemUsuarioCinza from "../../public/imagens/usuarioCinza.svg";

const mapaDeRotas = {
    home: {
        imagemAtivo: imagemHomeAtivo,
        rotasAtivacao: ['/'],
        imagemPadrao: imagemHomeCinza
    },
    publicacao: {
        imagemAtivo: imagemPuplicacaoAtivo,
        rotasAtivacao: ['/publicacao'],
        imagemPadrao: imagemPuplicacaoCinza
    },
    perfil: {
        imagemAtivo: imagemUsuarioAtivo,
        rotasAtivacao: ['/perfil/eu', '/perfil/eu/editar'],
        imagemPadrao: imagemUsuarioCinza
    }
}

export default function Navegacao({className}) {
    const [rotaAtiva, setRotaAtiva] = useState('home');
    const router = useRouter();

    useEffect(() => {
        definirRotaAtiva();
    }, [router.asPath]);

    const definirRotaAtiva = () => {
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
        const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            );
        });

        if(indiceAtivo === -1) {
            setRotaAtiva('home')
        } else {
            setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
        }
    }

    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaDeRotas[nomeRota];

        if (rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo;
        }
        return rotaAtivada.imagemPadrao;
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
    }

    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarNoIcone('home')}>
                    <Image 
                        src={obterImagem('home')}
                        alt="Icone home"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image 
                        src={obterImagem('publicacao')}
                        alt="Icone publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image 
                        src={obterImagem('perfil')}
                        alt="Icone usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    );
}