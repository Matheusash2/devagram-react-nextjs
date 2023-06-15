import CabecalhoComAcoes from "../cabecalhoComAcoes";
import imagemSetaEsquerda from "../../public/imagens/setaEsquerda.svg";
import Avatar from "../avatar";
import Botao from "../botao";
import { useEffect, useState } from "react";
import UsuarioService from "@/services/UsuarioService";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {
    const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!usuario) {
            return;
        }
        setEstaSeguindoUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar perfil';
        }
        if (estaSeguindoUsuario) {
            return 'Deixar de seguir';
        }
        return 'Seguir';
    };

    const obterCorBotaoSeguir = () => {
        if (estaSeguindoUsuario || estaNoPerfilPessoal) {
            return 'invertido';
        }
        return 'primaria';
    };

    const manipularCliqueBotaoPrincipal = async () => {
        if (estaNoPerfilPessoal) {
            return router.push('/perfil/editar');
        }

        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoUsuario
                ? (quantidadeSeguidores - 1)
                : (quantidadeSeguidores + 1)
            );
            setEstaSeguindoUsuario(!estaSeguindoUsuario);
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir`);
        }
        
    };

    const aoClicarSetaEsquerda = () => {
        router.back();
    };

    return (
        <div className="cabecalhoPerfil largura30pctDesktop">
            <CabecalhoComAcoes 
                iconeEsquerda={ estaNoPerfilPessoal
                    ? null
                    : imagemSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
            />

            <hr className="bordaCabecalhoPerfil"/>

            <div className="statusPerfil">
                <Avatar src={usuario.avatar}/>
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="status">
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="status">
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Botao 
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoPrincipal}
                    />

                </div>
            </div>
        </div>
    );
}