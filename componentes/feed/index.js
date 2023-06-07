import { useEffect, useState } from "react"
import Postagem from "./postagem";

export default function Feed({ usuarioLogado }) {
    const[listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        console.log('Carregar o feed');
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '2',
                    nome: 'Matheus',
                    avatar: null
                },
                fotoDoPost: 'https://th.bing.com/th/id/OIP.Eifc-HZX6GDPNT5FLC4_BQHaEo?pid=ImgDet&rs=1',
                descricao: 'O que é Lorem Ipsum? Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Santos',
                        mensagem: 'Muito legal'
                    },
                    {
                        nome: 'Soares',
                        mensagem: 'incrivel'
                    },
                    {
                        nome: 'Matheus 2',
                        mensagem: 'Muito bom'
                    }
                ] 
            }
        ])
    }, [usuarioLogado]);

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem} 
                    usuarioLogado={usuarioLogado}/>
            ))}
        </div>
    )
}