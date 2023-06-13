import Home from "../componentes/home";
import Login from "../componentes/login";
import UsuarioService from "../services/UsuarioService";
import { useEffect, useState } from "react";

const usuarioService = new UsuarioService();
export default function Index() {
  const [estaAutenticado, setEstaAutenticado] = useState(null);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, []);

  if (estaAutenticado === null) {
    return null;
  }

  if (estaAutenticado) {
    return <Home />;
  }
  
  return (
    <Login aposAutenticacao={() => setEstaAutenticado(true)} />
  )
}
