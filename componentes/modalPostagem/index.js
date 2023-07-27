import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Postagem from "../feed/Postagem";
import Image from "next/image";
import FeedService from "@/services/FeedService";

import setaDireita from "../../public/imagens/setaDireitaPostagem.svg";
import setaEsquerda from "../../public/imagens/setaEsquerdaPostagem.svg";
import fecharModal from "../../public/imagens/fecharPostagem.svg";

const feedService = new FeedService();

export default function ModalPostagem({
}) {
    const [postagemAtual, setPostagemAtual] = useState([]);
    const [abrirModalPostagem, setAbrirModalPostagem] = useState(false);
    const [indicePostagemSelecionada, setIndicePostagemSelecionada] = useState([]);

    useEffect(() => {
        if (postagensPerfil && indicePostagemSelecionada !== null) {
            setPostagemAtual(postagensPerfil[indicePostagemSelecionada]);
        }
    }, [postagensPerfil, indicePostagemSelecionada]);

    const proximaPostagem = () => {
        if (indicePostagemSelecionada !== null && indicePostagemSelecionada !== postagensPerfil.length - 1) {
            setIndicePostagemSelecionada((prevIndice) => prevIndice + 1);
        }
    };

    const anteriorPostagem = () => {
        if (indicePostagemSelecionada !== null && indicePostagemSelecionada !== 0) {
            setIndicePostagemSelecionada((prevIndice) => prevIndice - 1);
        }
    };

    return (
        <Modal show={abrirModalPostagem} onHide={() => setAbrirModalPostagem(false)} className="containerModal">
            <Modal.Header className="headerModal">
                <Modal.Title className="tituloModal"><strong>Postagem</strong></Modal.Title>
                <div className="btnFecharModal">
                    <Image
                        src={fecharModal}
                        alt="Fechar"
                        onClick={() => setAbrirModalPostagem(false)}
                    />
                </div>
            </Modal.Header>
            <Modal.Body className="bodyModal">
                {postagensPerfil && postagemAtual && (
                    <div className="postagemModal">
                        <Postagem
                            id={Postagem.id}
                            usuario={Postagem.usuario}
                            fotoDoPost={Postagem.fotoDoPost}
                            descricao={Postagem.descricao}
                            comentarios={Postagem.comentarios}
                            curtidas={Postagem.curtidas}
                            usuarioLogado={usuarioLogado}
                        />
                        <div className="navegacaoModal">
                            <Image
                                src={setaEsquerda}
                                alt="Anterior"
                                onClick={anteriorPostagem}
                            />
                            <Image
                                src={setaDireita}
                                alt="Próxima"
                                onClick={proximaPostagem}
                            />
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}