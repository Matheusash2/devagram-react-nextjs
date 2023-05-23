import Head from 'next/head'
import Image from 'next/image'
import Botao from '@/componentes/botao'
import Avatar from '@/componentes/avatar'
import { UploadImagem } from '@/componentes/uploadImagem'
import { useState, useRef } from 'react'

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <h1>Olá mundo!</h1>
      <button onClick={() => referenciaInput?.current?.click()}>Abrir seletor de arquivos</button>
      <UploadImagem 
        setImagem={setImagem} 
        imagemPreview={imagem?.preview}
        aoSetarReferencia={(ref) => referenciaInput.current = ref}
      />
      <div style={{width: 200}}>
      <Avatar />
      <Botao texto={'Login'} manipularClique={() => console.log('Botao clicado')} />
      </div>
    </>
  )
}
