import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/componentes/cabecalhoPerfil";
import Feed from "../../../componentes/feed";
import comAutorizacao from "../../../hoc/comAutorizacao";
import UsuarioService from "../../../services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(idUsuario);
            return data;
        } catch (error) {
            alert(`Erro ao obter perfil do usuario!`);
        }
    }

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
            />
            <Feed 
            usuarioLogado={usuarioLogado}
            idUsuario={usuario?._id}
            />
        </div>
    );
}

export default comAutorizacao(Perfil);