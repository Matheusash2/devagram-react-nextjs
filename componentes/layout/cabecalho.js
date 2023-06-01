import Image from "next/legacy/image";

import imagemLogoHorizontal from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import Navegacao from "./navegacao";
import { useState } from "react";
import ResultadoPesquisa from "./resultadoPesquisa";

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
        
        if (termoPesquisado.length < 3) {
            return;
        }

        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'matheus 1',
                email: 'matheus1@teste.com',
                _id: '123456'
            },
            {
                avatar: '',
                nome: 'matheus 2',
                email: 'matheus2@teste.com',
                _id: '456789'
            },
            {
                avatar: '',
                nome: 'matheus 3',
                email: 'matheus3@teste.com',
                _id: '987654'
            }

        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image 
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