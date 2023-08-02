import { useState, useEffect } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado, usuarioPerfil, abrirModalPostagem, recarregarFeed, setRecarregarFeed, atualizarModalPostagens }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setListaDePostagens([]);
            const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);
            setListaDePostagens(data);

            const postagensFormatadas = data.map((postagem) => ({
                id: postagem._id,
                usuario: {
                    id: postagem.idUsuario,
                    nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                    avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map((c) => ({
                    nome: c.nome,
                    mensagem: c.comentario
                }))
            }));

            setListaDePostagens(postagensFormatadas);
        };

        fetchData();
    }, [usuarioLogado, usuarioPerfil]);

    useEffect(() => {
        if (recarregarFeed === false){
            return;
        }
        const fetchData = async () => {
            setListaDePostagens([]);
            const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);
            setListaDePostagens(data);

            const postagensFormatadas = data.map((postagem) => ({
                id: postagem._id,
                usuario: {
                    id: postagem.idUsuario,
                    nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                    avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map((c) => ({
                    nome: c.nome,
                    mensagem: c.comentario
                }))
            }));

            setListaDePostagens(postagensFormatadas);
            setRecarregarFeed(false);
            atualizarModalPostagens(postagensFormatadas);
        };

        fetchData();
    }, [usuarioLogado, usuarioPerfil, recarregarFeed]);

    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                <div key={dadosPostagem.id}
                    onDoubleClick={() => abrirModalPostagem && abrirModalPostagem(listaDePostagens, dadosPostagem)}>
                    <Postagem
                        key={dadosPostagem.id}
                        {...dadosPostagem}
                        usuarioLogado={usuarioLogado}
                    />
                </div>
            ))}
        </div>
    );
}