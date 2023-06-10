import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import Feed from "@/componentes/feed";
import comAutorizacao from "@/hoc/comAutorizacao";

import imagemSetaEsquerda from "../../../public/imagens/setaEsquerda.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    useEffect(async () => {

    }, []);

    return (
        <div className="paginaPerfil">
            <CabecalhoComAcoes 
                iconeEsquerda={imagemSetaEsquerda}
                //titulo={}
            />
            <Feed usuarioLogado={usuarioLogado}/>
        </div>
    );
}

export default comAutorizacao(Perfil);