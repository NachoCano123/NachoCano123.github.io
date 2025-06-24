import { Signal } from "@preact/signals";
import { FunctionComponent } from "preact";
import { Nota } from "../Types.ts";
import Layout from "./Layout.tsx";

type Props = {
  notes: Signal<Nota[]>;
};

const Notas: FunctionComponent<Props> = ({ notes }) => {
  const BorrarNota = async (id: number) => {
    const found = notes.value.find((item) => item.id === id);
    if (found) {
      notes.value.splice(notes.value.indexOf(found), 1);
    }
    return notes.value;
  };

  return (
    <Layout>
      {!notes || !notes.value || notes.value.length === 0 ? (
        <><h1>No hay notas todavía</h1>
        <img src="images/bloc_triste.jpg" alt="No hay notas" /></>
      ) : (
        <>
        <h1>Notas Creadas</h1>
        <div className="notes-container">
          {notes.value.map((nota) => (
            <div key={nota.id} className="note-card">
              <h2 className="note-title">{nota.title}</h2>
              <p className="note-category">{nota.category}</p>
              <div className="note-content">{nota.content}</div>
              <div className="note-actions">
                <button className="edit-button">Editar</button>
                <button
                  className="delete-button"
                  onClick={async () => {
                    notes.value = await BorrarNota(nota.id);
                    console.log("Borrar nota con ID:", nota.id);
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </Layout>
  );
};

export default Notas;