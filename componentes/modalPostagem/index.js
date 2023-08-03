import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Postagem from "../feed/postagem";
import Image from "next/image";

import setaDireita from "../../public/imagens/setaDireitaPostagem.svg";
import setaEsquerda from "../../public/imagens/setaEsquerdaPostagem.svg";
import fecharModal from "../../public/imagens/fecharPostagem.svg";

export default function ModalPostagem({
    fecharModalPostagem,
    usuarioLogado,
    usuarioPerfil,
    postagensPerfil,
    postagemAtualIndex,
    setPostagemAtualIndex,
    aoAtualizarFeed
}) {
    const [postagemAtual, setPostagemAtual] = useState(null);

    const PrimeiraPostagem = postagemAtualIndex === 0;
    const UltimaPostagem = postagemAtualIndex === postagensPerfil.length - 1;

    useEffect(() => {
        if (postagemAtualIndex !== null && postagensPerfil.length > 0) {
            const postagemAtual = postagensPerfil[postagemAtualIndex];
            setPostagemAtual(postagemAtual);
            console.log("Dados da postagem atual:", postagemAtual);
        }
    }, [postagemAtualIndex, postagensPerfil]);

    const proximaPostagem = () => {
        if (postagemAtualIndex !== null && postagemAtualIndex !== postagensPerfil.length - 1) {
            setPostagemAtualIndex((prevIndice) => prevIndice + 1);
        }
    };

    const anteriorPostagem = () => {
        if (postagemAtualIndex !== null && postagemAtualIndex !== 0) {
            setPostagemAtualIndex((prevIndice) => prevIndice - 1);
        }
    };

    return (
        <Modal
            key={postagemAtual?.id}
            show={!!postagensPerfil.length}
            onHide={fecharModalPostagem}
            className="containerModal"
        >
            <Modal.Header className="headerModal">
                <Modal.Title className="tituloModal"><strong>Postagem</strong></Modal.Title>
                <div className="btnFecharModal">
                    <Image
                        src={fecharModal}
                        alt="Fechar"
                        onClick={fecharModalPostagem}
                    />
                </div>
            </Modal.Header>
            <Modal.Body className="bodyModal">
                {postagemAtual && (
                    <div className="postagemModal">
                        <Postagem
                            id={postagemAtual.id}
                            usuario={postagemAtual.usuario}
                            fotoDoPost={postagemAtual.fotoDoPost}
                            descricao={postagemAtual.descricao}
                            comentarios={postagemAtual.comentarios}
                            curtidas={postagemAtual.curtidas}
                            usuarioLogado={usuarioLogado}
                            usuarioPerfil={usuarioPerfil}
                            aoAtualizarFeed={aoAtualizarFeed}
                        />
                        <div className="navegacaoModal">
                            <div className={`setaEsquerda ${PrimeiraPostagem ? 'disabled' : ''}`}>
                                <Image
                                    src={setaEsquerda}
                                    alt="Anterior"
                                    onClick={anteriorPostagem}
                                />
                            </div>
                            <div className={`setaDireita ${UltimaPostagem ? 'disabled' : ''}`}>
                                <Image
                                    src={setaDireita}
                                    alt="Próxima"
                                    onClick={proximaPostagem}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}