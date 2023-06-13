import Image from "next/legacy/image";
import { useState } from "react";
import Navegacao from "./navegacao";
import ResultadoPesquisa from "./resultadoPesquisa";
import UsuarioService from "../../services/UsuarioService";

import imagemLogoHorizontal from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = useRouter();

    let cabecalhoClassName = '';
    if (window && window.location.pathname !== '/') {
        cabecalhoClassName = 'desktop';
    }

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
        
        if (termoPesquisado.length < 3) {
            return;
        }

        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert ('Erro ao pesquisar usuário. ' + error?.response?.data?.erro);   
        }
    }

    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`)
    }

    const redirecionarParaHome = () => {
        router.push('/');
    }

    return (
        <header className= {`cabecalhoPrincipal ${cabecalhoClassName}`}>
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image
                        onClick={redirecionarParaHome} 
                        src={imagemLogoHorizontal}
                        alt="Logo devagram"
                        layout="fill"
                    />
                </div>

                <div className="barraPesquisa">
                    <div className="containerImagemLupa">
                        <Image 
                            src={imagemLupa}
                            alt="Icone lupa"
                            layout="fill"
                        />
                    </div>

                    <input 
                        type="text"
                        placeholder="Pesquisar"
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className="desktop" />

            </div>
            {resultadoPesquisa.length > 0 && (
                <div className="resultadoPesquisaContainer">
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}

        </header>
    );
}