import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [mensagens, setMensagens] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    publicada: true,
  });

  const fetchMensagens = async () => {
    const response = await api.get("/mensagens");
    setMensagens(response.data);
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/criar", formData);
    fetchMensagens();
    setFormData({
      titulo: "",
      conteudo: "",
      publicada: true,
    });
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Mensagens APP</span>
        </div>
      </nav>

      <div className="container mt-4">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              onChange={handleInputChange}
              value={formData.titulo}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="conteudo" className="form-label">
              Conteúdo
            </label>
            <input
              type="text"
              className="form-control"
              id="conteudo"
              name="conteudo"
              onChange={handleInputChange}
              value={formData.conteudo}
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="publicada"
              name="publicada"
              checked={formData.publicada}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="publicada">
              Publicada?
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>

        <hr />

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Conteúdo</th>
              <th>Publicada?</th>
            </tr>
          </thead>
          <tbody>
            {mensagens.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.titulo}</td>
                <td>{msg.conteudo}</td>
                <td>{msg.publicada ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
