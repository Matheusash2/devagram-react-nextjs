import CabecalhoComAcoes from "@/componentes/cabecalhoComAcoes";
import UploadImagem from "@/componentes/uploadImagem";
import comAutorizacao from "@/hoc/comAutorizacao"
import { useState } from "react";
import Botao from "@/componentes/botao";
import imagemPublicacaoPadrao from "../../public/imagens/imagemPublicacao.svg";
import imagemSetaEsquerda from "../../public/imagens/setaEsquerda.svg";

function Puclicacao() {
    const [imagem, setImagem] = useState();
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return 'Cancelar';
        }
        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estaNaEtapaUm()) {
            return 'Avançar';
        }

        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value=null;
            setImagem(null);
            return;
        }
        setEtapaAtual(1);
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        setEtapaAtual(2);
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                iconeEsquerda={
                    estaNaEtapaUm()
                        ? null 
                        : imagemSetaEsquerda
                }
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo="Nova publicação"
            />

            <hr className="linhaDivisoria" />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (<div className="primeiraEtapa">
                        <UploadImagem
                            setImagem={setImagem}
                            aoSetarReferencia={setInputImagem}
                            imagemPreview={imagem?.preview || imagemPublicacaoPadrao.src}
                            imagemPreviewClassName={
                                !imagem
                                    ? 'previewImagemPublicacao'
                                    : 'previewImagemSelecionada'
                            }
                        />

                        <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                        <Botao
                            texto='Selecionar uma imagem'
                            manipularClique={() => inputImagem?.click()}
                        />
                    </div>
                    )
                    : (
                        <div className="segundaEtapa">
                            
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default comAutorizacao(Puclicacao);