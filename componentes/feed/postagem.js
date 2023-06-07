import { useState } from "react";
import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/legacy/image";

import imagemCurtir from "../../public/imagens/curtir.svg";
import imagemCurtido from "../../public/imagens/curtido.svg";
import imagemComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imagemComentarioCinza from "../../public/imagens/comentarioCinza.svg";
import FazerComentario from "./fazerComentario";

const tamanhoLimiteDescricao = 90;

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}) {

    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
    }

    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
        tamanhoLimiteDescricao
    );

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao);
        if (descricaoMaiorQueLimite()) {
            mensagem += '...';
        }
        return mensagem;
    };
    
    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.Avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt="Doto da postagem"/>
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={imagemCurtir}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')} 
                    />

                    <Image
                        src={imagemComentarioCinza}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)} 
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong>32</strong>
                    </span>                  
                </div>

                <div className="discricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span 
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
                        )}
                    </p>
                </div>
                
                <div className="comentariosDaPublicacao">
                    {comentarios.map((comentario, i)=> (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar && 
                <FazerComentario usuarioLogado={usuarioLogado} />
            }

        </div>
    )
}