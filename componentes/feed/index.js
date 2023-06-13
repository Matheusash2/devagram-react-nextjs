import { useEffect, useState } from "react"
import Postagem from "./postagem";
import FeedService from "../../services/FeedService";

const feedService = new FeedService();

export default function Feed({ usuarioLogado }) {
    const[listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(() => {
        const carregarPostagens = async () => {
          try {
            const { data } = await feedService.carregarPostagens();
    
            const postagensFormatadas = data.map((postagem) => ({
              id: postagem._id,
              usuario: {
                id: postagem.userId,
                nome: postagem.usuario.nome,
                avatar: postagem.usuario.avatar,
              },
              fotoDoPost: postagem.foto,
              descricao: postagem.descricao,
              curtidas: postagem.likes,
              comentarios: postagem.comentarios.map((c) => ({
                nome: c.nome,
                mensagem: c.comentario,
              })),
            }));
    
            setListaDePostagens(postagensFormatadas);
          } catch (error) {
            console.error("Erro ao carregar postagens:" + error?.response?.data?.erro);
          }
        };
    
        carregarPostagens();
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