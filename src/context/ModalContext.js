import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del provider
  const [idreceta, setIdReceta] = useState(null);
  const [infoReceta, setReceta] = useState({});

  // Una vez que tenemos una receta, llamar la Api
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);
      setReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();

    return () => {
      setReceta({});
    };
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{
        infoReceta,
        setIdReceta,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
