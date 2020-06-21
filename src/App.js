import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarApi = async () => {
      const imagenesPorPagina = 30;
      const key = "16430422-505922d6105ab01b5bc5f5ce5";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina))
    }
    consultarApi();
    //LLevar el scroll hacia el inicip de la pagina
    const jumbotron = document.querySelector(".jumbotron");
    jumbotron.scrollIntoView({ behavior: 'smooth' })
  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"><b>Buscador de Imagenes</b></p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
          guardarPaginaActual={guardarPaginaActual}
          guardarTotalPaginas={guardarTotalPaginas}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {paginaactual > 1 ? <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo; Anterior </button>
          : null}

        {paginaactual < totalpaginas ? <button
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        > Siguiente &raquo;</button>
          : null }
      </div>
    </div>
  );
}

export default App;
