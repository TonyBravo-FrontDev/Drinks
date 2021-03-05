import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const {nombre, categoria} = busqueda;
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, setConsultar } = useContext(RecetasContext);

  // Función para leer los contenidos
  const handleData = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario haga submit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(nombre.trim() === '' || categoria === ''){
      return e.preventDefault();
    }

    buscarRecetas(busqueda);
    setConsultar(true);
  };

  return (
    <form onSubmit={handleOnSubmit} className="col-md-12">
      <fieldset className="text-center">
        <legend>Busca bebidas por categoría o Ingredientes</legend>
      </fieldset>

      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            onChange={handleData}
            className="form-control"
            placeholder="Buscar por ingrediente"
          />
        </div>
        <div className="col-md-4">
          <select
            name="categoria"
            onChange={handleData}
            className="form-control"
          >
            <option value="">-- Selecciona Categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            value="Buscar Bebidas"
            className="btn btn-block btn-primary"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
