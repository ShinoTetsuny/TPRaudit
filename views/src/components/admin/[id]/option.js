import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const styles = {
  detailsContainer: {
    padding: '20px',
  },
  button: {
    marginRight: '10px',
  },
};

function OptionDetails() {
  const { id } = useParams();
  const [option, setOption] = useState(null);
  const [editedOption, setEditedOption] = useState({ name: '', price: '', models: [] });
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchOptionDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/option/${id}`);
      setOption(res.data.option);
      setModels(res.data.models);
      setEditedOption({
        name: res.data.option.name,
        price: res.data.option.price,
        models: res.data.models.map((model) => model.id), 
      });
    } catch (error) {
      console.error('Error fetching option details:', error);
    }
  };

  const handleEditOption = async () => {
    try {
      await axios.put(`http://localhost:3000/option/${id}`, editedOption);
      setIsEditing(false);
      fetchOptionDetails();
    } catch (error) {
      console.error('Error editing option:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteOption = async () => {
    try {
      await axios.delete(`http://localhost:3000/option/${id}`);
      Navigate('/admin')
    } catch (error) {
      console.error('Error deleting option:', error);
    }
  };

  useEffect(() => {
    fetchOptionDetails();
  }, [id]);

  return (
    <div style={styles.detailsContainer}>
      {option ? (
        <div>
          <h1>Détails de l'option :</h1>
          {isEditing ? (
            <div>
              <label>Nom :</label>
              <input
                type="text"
                value={editedOption.name}
                onChange={(e) => setEditedOption({ ...editedOption, name: e.target.value })}
              />
              <label>Prix :</label>
              <input
                type="number"
                value={editedOption.price}
                onChange={(e) => setEditedOption({ ...editedOption, price: e.target.value })}
              />
              <label>Modèles associés :</label>
              <select
                multiple
                value={editedOption.models}
                onChange={(e) => setEditedOption({ ...editedOption, models: Array.from(e.target.selectedOptions, option => option.value) })}
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <button style={styles.button} onClick={handleEditOption}>
                Enregistrer
              </button>
              <button style={styles.button} onClick={handleCancelEdit}>
                Annuler
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Nom :</strong> {option.name}</p>
              <p><strong>Prix :</strong> {option.price} $</p>
              <p><strong>Modèles associés :</strong> {models.map((model) => model.name).join(', ')}</p>
              <button style={styles.button} onClick={() => setIsEditing(true)}>
                Modifier l'Option
              </button>
              <button style={styles.button} onClick={handleDeleteOption}>
                Supprimer l'Option
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

export default OptionDetails;
