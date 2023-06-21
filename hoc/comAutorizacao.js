import { useRouter } from "next/router";
import Cabecalho from "../componentes/layout/cabecalho";
import Rodape from "../componentes/layout/rodape";
import UsuarioService from "../services/UsuarioService"
import Loading from "@/componentes/loading";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof window !== 'undefined') {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }
            
            const usuarioLogado = usuarioService.obterInformaçõesDoUsuarioLogado();

            return (
                <>
                    <Cabecalho usuarioLogado={usuarioLogado} />
                    <Loading />
                    <Componente usuarioLogado={usuarioLogado} {...props} />
                    <Rodape usuarioLogado={usuarioLogado} />
                </>
            );
        }

        return null;
    }
}