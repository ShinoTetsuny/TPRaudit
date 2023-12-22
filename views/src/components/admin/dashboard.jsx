import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const styles = {
  dashboardContainer: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  formContainer: {
    margin: '20px 0',
  },
  formLabel: {
    marginBottom: '8px',
    display: 'block',
  },
  formSelect: {
    marginBottom: '16px',
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  formButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

function DashBoard() {
  const [engines, setEngines] = useState([]);
  const [models, setModels] = useState([]);
  const [options, setOptions] = useState([]);
  const [ready, setReady] = useState(false);

  const [newEngine, setNewEngine] = useState({ name: '', type: '' });
  const [newOption, setNewOption] = useState({ name: '', price: '' });
  const [newModel, setNewModel] = useState({ name: '', seat: '', door: '', price: '', engineId: '' });

  const [engineOptions, setEngineOptions] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [role, setRole] = useState('');

  const cookie = async () => {
    try {
       setRole(await axios.get(`http://localhost:3000/roles/verify${Cookies.get('token')}`));
      } catch (error) {
          console.error(error);
      }
  }

  const fetchEngines = async () => {
    try {
      const res = await axios.get('http://localhost:3000/engine');
      setEngines(res.data);
    } catch (error) {
      console.error('Error fetching engines:', error);
    }
  }

  const fetchModels = async () => {
    try {
      const res = await axios.get('http://localhost:3000/model');
      setModels(res.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  }

  const fetchOptions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/option');
      setOptions(res.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  }

  const createEngine = async () => {
    try {
      await axios.post('http://localhost:3000/engine', newEngine);
      fetchEngines();
      setNewEngine({ name: '', type: '' });
    } catch (error) {
      console.error('Error creating engine:', error);
    }
  };

  const createOption = async () => {
    try {
      await axios.post('http://localhost:3000/option', newOption);
      fetchOptions();
      setNewOption({ name: '', price: '' });
    } catch (error) {
      console.error('Error creating option:', error);
    }
  };

  const createModel = async () => {
    try {
      const modelData = {
        name: newModel.name,
        seat: newModel.seat,
        door: newModel.door,
        price: newModel.price,
        engineId: selectedEngine,
        options: selectedOptions,
      };

      await axios.post('http://localhost:3000/model', modelData);
      fetchModels();
      setNewModel({ name: '', seat: '', door: '', price: '', engineId: '' });
      setSelectedEngine('');
      setSelectedOptions([]);
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchModels(), fetchEngines(), fetchOptions(), cookie()]);
        setReady(true);
        const options = engines.map((engine) => ({
          value: engine.id,
          label: `${engine.name} - ${engine.type}`,
        }));
        setEngineOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    console.log(role)

  }, []);
  

  const getEngineInfo = (engineId) => {
    const engine = engines.find((engine) => engine.id === engineId);
    return engine ? `${engine.name} - ${engine.type}` : 'N/A';
  };

  return (
    <div style={styles.dashboardContainer}>
      {ready ? (
        <div>
          {/* Tableau des engines */}
          <h1>Liste des engines :</h1>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>
            <tbody>
              {engines.map(engine => (
                <tr key={engine.id}>
                  <td style={styles.td}><Link to={`/admin/${engine.id}/engine`}>{engine.name}</Link></td>
                  <td style={styles.td}>{engine.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Formulaire pour ajouter un engine */}
          <div style={styles.formContainer}>
            <h2>Ajouter un Engine</h2>
            <form>
              <label style={styles.formLabel}>Nom :</label>
              <input
                type="text"
                value={newEngine.name}
                onChange={(e) => setNewEngine({ ...newEngine, name: e.target.value })}
              />
              <label style={styles.formLabel}>Type :</label>
              <input
                type="text"
                value={newEngine.type}
                onChange={(e) => setNewEngine({ ...newEngine, type: e.target.value })}
              />
              <button type="button" style={styles.formButton} onClick={createEngine}>
                Ajouter un Engine
              </button>
            </form>
          </div>

          {/* Tableau des options */}
          <h1>Liste des options :</h1>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Prix</th>
              </tr>
            </thead>
            <tbody>
              {options.map(option => (
                <tr key={option.id}>
                  <td style={styles.td}><Link to={`/admin/${option.id}/option`}>{option.name}</Link></td>
                  <td style={styles.td}>{option.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Formulaire pour ajouter une option */}
          <div style={styles.formContainer}>
            <h2>Ajouter une Option</h2>
            <form>
              <label style={styles.formLabel}>Nom :</label>
              <input
                type="text"
                value={newOption.name}
                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
              />
              <label style={styles.formLabel}>Prix :</label>
              <input
                type="number"
                value={newOption.price}
                onChange={(e) => setNewOption({ ...newOption, price: e.target.value })}
              />
              <button type="button" style={styles.formButton} onClick={createOption}>
                Ajouter une Option
              </button>
            </form>
          </div>

          {/* Tableau des modèles */}
          <h1>Liste des modèles :</h1>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Sièges</th>
                <th style={styles.th}>Portes</th>
                <th style={styles.th}>Prix</th>
                <th style={styles.th}>Engine</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model => (
                <tr key={model.id}>
                  <td style={styles.td}><Link to={`/admin/${model.id}/model`}>{model.name}</Link></td>
                  <td style={styles.td}>{model.seat}</td>
                  <td style={styles.td}>{model.door}</td>
                  <td style={styles.td}>{model.price}</td>
                  <td style={styles.td}>{getEngineInfo(model.engineId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Formulaire pour ajouter un modèle */}
          <div style={styles.formContainer}>
            <h2>Ajouter un Modèle</h2>
            <form>
              <label style={styles.formLabel}>Nom :</label>
              <input
                type="text"
                value={newModel.name}
                onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
              />
              <label style={styles.formLabel}>Sièges :</label>
              <input
                type="number"
                value={newModel.seat}
                onChange={(e) => setNewModel({ ...newModel, seat: e.target.value })}
              />
              <label style={styles.formLabel}>Portes :</label>
              <input
                type="number"
                value={newModel.door}
                onChange={(e) => setNewModel({ ...newModel, door: e.target.value })}
              />
              <label style={styles.formLabel}>Prix :</label>
              <input
                type="number"
                value={newModel.price}
                onChange={(e) => setNewModel({ ...newModel, price: e.target.value })}
              />
              <label style={styles.formLabel}>Engine :</label>
              <select
                style={styles.formSelect}
                value={selectedEngine}
                onChange={(e) => setSelectedEngine(e.target.value)}
              >
                <option value="">Sélectionner un Engine</option>
                {engineOptions.map(engine => (
                  <option key={engine.value} value={engine.value}>{engine.label}</option>
                ))}
              </select>
              <label style={styles.formLabel}>Options :</label>
              <select
                style={styles.formSelect}
                multiple
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {options.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <button type="button" style={styles.formButton} onClick={createModel}>
                Ajouter un Modèle
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h1>Chargement...</h1>
      )}
    </div>
  );
}

export default DashBoard;
