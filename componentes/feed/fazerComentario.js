import Avatar from "../avatar";

export default function FazerComentario({usuarioLogado}) {
    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={1}
                placeholder="Adicione um comentário...">
            </textarea>
        </div>
    );
}