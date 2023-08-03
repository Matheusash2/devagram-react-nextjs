import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/componentes/cabecalhoPerfil";
import Feed from "../../componentes/feed";
import comAutorizacao from "../../hoc/comAutorizacao";
import UsuarioService from "../../services/UsuarioService";
import ModalPostagem from "@/componentes/modalPostagem";

const usuarioService = new UsuarioService();

function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});
    const [abrirModal, setAbrirModal] = useState(false);
    const [postagensPerfil, setPostagensPerfil] = useState([]);
    const [postagemAtualIndex, setPostagemAtualIndex] = useState(0);
    const [chaveModalPostagem, setChaveModalPostagem] = useState(0);
    const [recarregarFeed, setRecarregarFeed] = useState(false);
    const router = useRouter();

    const aoAtualizarFeed = () => {
        setRecarregarFeed(true);
    }

    const atualizarModalPostagens = (postagens) => {
        setPostagensPerfil(postagens);
    }

    const abrirModalPostagem = (postagens, postagemSelecionada, event) => {
        const imagemPostagemClicked = event.target.closest('.fotoDaPostagem');
        if (imagemPostagemClicked) {
            setPostagensPerfil(postagens);
            setAbrirModal(true);
            const indicePostagemSelecionada = postagens.findIndex(
                (postagem) => postagem.id === postagemSelecionada.id
            );
            setPostagemAtualIndex(indicePostagemSelecionada);
        }
    };

    const fecharModalPostagem = () => {
        setAbrirModal(false);
    };

    useEffect(() => {
        setChaveModalPostagem((prevChave) => prevChave + 1);
    }, [postagemAtualIndex]);

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(idUsuario);
            return data;
        } catch (error) {
            alert(`Erro ao obter perfil do usuario!`);
        }
    };

    const estaNoPerfilPessoal = () => {
        return router.query.id === 'eu' || router.query.id === usuarioLogado?.id;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!router.query.id) {
                return;
            }
            const perfilId = estaNoPerfilPessoal()
                ? usuarioLogado.id
                : router.query.id;

            const dadosPerfil = await obterPerfil(perfilId);
            setUsuario(dadosPerfil);
        };

        fetchData();
    }, [router.query.id]);

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
                estaNoPerfilPessoal={estaNoPerfilPessoal()}
            />
            <Feed
                usuarioLogado={usuarioLogado}
                usuarioPerfil={usuario}
                abrirModalPostagem={abrirModalPostagem}
                recarregarFeed={recarregarFeed}
                setRecarregarFeed={setRecarregarFeed}
                atualizarModalPostagens={atualizarModalPostagens}
            />
            {abrirModal && postagensPerfil.length > 0 && (
                <ModalPostagem
                    key={chaveModalPostagem}
                    fecharModalPostagem={fecharModalPostagem}
                    postagemAtualIndex={postagemAtualIndex}
                    setPostagemAtualIndex={setPostagemAtualIndex}
                    postagensPerfil={postagensPerfil}
                    usuarioLogado={usuarioLogado}
                    usuarioPerfil={usuario}
                    aoAtualizarFeed={aoAtualizarFeed}
                />
            )}
        </div>
    );
}

export default comAutorizacao(Perfil);