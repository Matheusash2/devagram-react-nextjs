import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/componentes/cabecalhoPerfil";
import Feed from "../../componentes/feed";
import comAutorizacao from "../../hoc/comAutorizacao";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(
                estaNoPerfilPessoal()
                    ? usuarioLogado.id
                    : idUsuario
                );
            return data;
        } catch (error) {
            alert(`Erro ao obter perfil do usuario!`);
        }
    }

    const estaNoPerfilPessoal = () => {
        return router.query.id === 'eu' || router.query.id === usuarioLogado?.id;
    };

    useEffect(() => {
        const fetchData = async () => {
        if (!router.query.id) {
            return;
        }
        const dadosPerfil = await obterPerfil(router.query.id);
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
            />
        </div>
    );
}

export default comAutorizacao(Perfil);