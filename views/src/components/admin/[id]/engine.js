import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams, redirect } from 'react-router-dom';

const styles = {
  detailsContainer: {
    padding: '20px',
  },
  button: {
    marginRight: '10px',
  },
};

function EngineDetails() {
  const { id } = useParams();
  const [engine, setEngine] = useState(null);
  const [editedEngine, setEditedEngine] = useState({ name: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchEngineDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/engine/${id}`);
      setEngine(res.data);
      setEditedEngine({ name: res.data.name, type: res.data.type });
    } catch (error) {
      console.error('Error fetching engine details:', error);
    }
  };

  const handleEditEngine = async () => {
    try {
      await axios.put(`http://localhost:3000/engine/${id}`, editedEngine);
      setIsEditing(false);
      fetchEngineDetails();
    } catch (error) {
      console.error('Error editing engine:', error);
    }
  };

  const handleDeleteEngine = async () => {
    try {
      await axios.delete(`http://localhost:3000/engine/${id}`);
      // Utilisez la méthode `Navigate` ici à l'intérieur du composant
      Navigate('/admin');
    } catch (error) {
      console.error('Error deleting engine:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchEngineDetails();
  }, [id]);

  return (
    <div style={styles.detailsContainer}>
      {engine ? (
        <div>
          <h1>Détails de l'engine :</h1>
          {isEditing ? (
            <div>
              <label>Nom :</label>
              <input
                type="text"
                value={editedEngine.name}
                onChange={(e) => setEditedEngine({ ...editedEngine, name: e.target.value })}
              />
              <label>Type :</label>
              <input
                type="text"
                value={editedEngine.type}
                onChange={(e) => setEditedEngine({ ...editedEngine, type: e.target.value })}
              />
              <button style={styles.button} onClick={handleEditEngine}>
                Enregistrer
              </button>
              <button style={styles.button} onClick={handleCancelEdit}>
                Annuler
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Nom :</strong> {engine.name}</p>
              <p><strong>Type :</strong> {engine.type}</p>
              <button style={styles.button} onClick={() => setIsEditing(true)}>
                Modifier l'Engine
              </button>
              <button style={styles.button} onClick={handleDeleteEngine}>
                Supprimer l'Engine
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

export default EngineDetails;
