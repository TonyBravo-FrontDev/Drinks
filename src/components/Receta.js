import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import style from "../css/card.module.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 700,
    display: "block",
    borderRadius: "4px",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  },
}));

const Receta = ({ receta }) => {
  // Configuración del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { strDrink, strDrinkThumb, idDrink } = receta;
  const { infoReceta, setIdReceta } = useContext(ModalContext);

  // Mestra y formatea los ingredientes
  const mostrarIngredientes = (infoReceta) => {
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (infoReceta[`strIngredient${i}`]) {
        ingredientes.push(<li>{infoReceta[`strIngredient${i}`] }{infoReceta[`strMeasure${i}`] }</li>);
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className={`${style.cardStyle} card m-2`}>
        <h2 className={`${style.titleCard}`}>{strDrink}</h2>
        <img
          className="card-img-top"
          src={strDrinkThumb}
          alt={`Imagen de ${strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            onClick={() => {
              setIdReceta(idDrink);
              handleOpen();
            }}
            className="btn btn-block btn-primary"
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              handleClose();
            }}
          >
            <div
              style={modalStyle}
              className={`${classes.paper} ${classes.modal} ${classes.content} p-2`}
            >
              <h2>{infoReceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{infoReceta.strInstructions}</p>
              <img className="img-fluid my-4" src={infoReceta.strDrinkThumb} alt=""/>
              <h3>Ingredientes y Cantidades</h3>
              <ul>{mostrarIngredientes(infoReceta)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
