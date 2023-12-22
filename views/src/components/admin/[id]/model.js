import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, Navigate } from 'react-router-dom';

const styles = {
  detailsContainer: {
    padding: '20px',
  },
  button: {
    marginRight: '10px',
  },
};

function ModelDetails() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [engines, setEngines] = useState([]);
  const [options, setOptions] = useState([]);
  const [editedModel, setEditedModel] = useState({ name: '', seat: '', door: '', price: '', engineId: '', options: [] });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchModelDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/model/${id}`);
      setModel(res.data);
      setEditedModel({
        name: res.data.model.name,
        seat: res.data.model.seat,
        door: res.data.model.door,
        price: res.data.model.price,
        engineId: res.data.model.engineId,
        options: res.data.options.map(option => option.id),
      });
    } catch (error) {
      console.error('Error fetching model details:', error);
    }
  };

  const fetchEngines = async () => {
    try {
      const res = await axios.get('http://localhost:3000/engine');
      setEngines(res.data);
    } catch (error) {
      console.error('Error fetching engines:', error);
    }
  };

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/option');
      setOptions(res.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleEditModel = async () => {
    try {
      const updatedModel = {
        name: editedModel.name,
        seat: editedModel.seat,
        door: editedModel.door,
        price: editedModel.price,
        engineId: editedModel.engineId,
        options: selectedOptions.map(optionId => parseInt(optionId, 10)),
      };

      await axios.put(`http://localhost:3000/model/${id}`, updatedModel);
      setIsEditing(false);
      fetchModelDetails();
    } catch (error) {
      console.error('Error editing model:', error);
    }
  };

  const handleDeleteModel = async () => {
    try {
      await axios.delete(`http://localhost:3000/model/${id}`);
      Navigate('/admin');
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchModelDetails(), fetchEngines(), fetchOptions()]);
    };

    fetchData();
  }, [id]);

  const getEngineInfo = (engineId) => {
    const engine = engines.find((engine) => engine.id === engineId);
    return engine ? `${engine.name} - ${engine.type}` : 'N/A';
  };

  return (
    <div style={styles.detailsContainer}>
      {model && engines && options ? (
        <div>
          <h1>Détails du modèle :</h1>
          {isEditing ? (
            <div>
              <label>Nom :</label>
              <input
                type="text"
                value={editedModel.name}
                onChange={(e) => setEditedModel({ ...editedModel, name: e.target.value })}
              />
              <label>Sièges :</label>
              <input
                type="number"
                value={editedModel.seat}
                onChange={(e) => setEditedModel({ ...editedModel, seat: e.target.value })}
              />
              <label>Portes :</label>
              <input
                type="number"
                value={editedModel.door}
                onChange={(e) => setEditedModel({ ...editedModel, door: e.target.value })}
              />
              <label>Prix :</label>
              <input
                type="number"
                value={editedModel.price}
                onChange={(e) => setEditedModel({ ...editedModel, price: e.target.value })}
              />
              <label>Engine :</label>
              <select
                value={editedModel.engineId}
                onChange={(e) => setEditedModel({ ...editedModel, engineId: parseInt(e.target.value, 10) })}
                >
                {engines.map(engine => (
                    <option key={engine.id} value={engine.id}>{engine.name}</option>
                ))}
            </select>
              <label>Options :</label>
              <select
                multiple
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {options.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <button style={styles.button} onClick={handleEditModel}>
                Enregistrer
              </button>
              <button style={styles.button} onClick={handleCancelEdit}>
                Annuler
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Nom :</strong> {model.model.name}</p>
              <p><strong>Sièges :</strong> {model.model.seat}</p>
              <p><strong>Portes :</strong> {model.model.door}</p>
              <p><strong>Prix :</strong> {model.model.price} $</p>
              <p><strong>Engine :</strong> {getEngineInfo(model.model.engineId)}</p>
              <p><strong>Options :</strong> {model.options.map(option => option.name).join(', ')}</p>
              <button style={styles.button} onClick={() => setIsEditing(true)}>
                Modifier le Modèle
              </button>
              <button style={styles.button} onClick={handleDeleteModel}>
                Supprimer le Modèle
              </button>
            </div>
          )}
        </div>
      ) : (
        <h1>Chargement...</h1>
      )}
    </div>
  );
}

export default ModelDetails;
