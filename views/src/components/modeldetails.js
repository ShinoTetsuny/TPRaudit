import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const apiUrl = 'http://localhost:3000/model/';
const engineApiUrl = 'http://localhost:3000/engine/';

const ModelDetails = () => {
    const { id } = useParams();
    const [modelData, setModelData] = useState(null);
    const [engineData, setEngineData] = useState(null);
  
    const fetchModelDetails = async () => {
        try {
            const response = await axios.get(`${apiUrl}${id}`);
            console.log (response.data)
            setModelData(response.data);

            const engineResponse = await axios.get(`${engineApiUrl}${response.data.model.engineId}`);
            setEngineData(engineResponse.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchModelDetails();
    }, [id]);

    // console.log(modelData);

    if (!modelData || !engineData) {
        return <p>Chargement...</p>;
    }

    const { model } = modelData;
    // const { engine } = engineData;
    let lesOptions = modelData.options;
    console.log(engineData.name)
    // console.log(modelData.options);
    return (
        <div className="model-details-container">
            <h1 className="model-details-title">Model Details</h1>
            {/* <p className="model-details-item">ID: {model.id}</p> */}
            <p className="model-details-item">Nom: {model.name}</p>
            <p className="model-details-item">Places: {model.seat}</p>
            <p className="model-details-item">Portes: {model.door}</p>
            <p className="model-details-item">Prix: {model.price}</p>
            <p className="model-details-item">Moteur: {engineData.name}</p>

            {lesOptions && lesOptions.length > 0 && (
                <div>
                    <h2 className="model-details-option"> Options </h2>
                    {lesOptions.map((option) => (
                        <div key={option.name} className="model-details-option">
                            <p className="model-details-item">Nom: {option.name}</p>
                            <p className="model-details-item">Prix: {option.price}</p>
                        </div>
                    ))}
                </div>
            )}

        <Link to="/" className="go-back-link">Retour à la page d'accueil</Link>
    </div>
    );
};

export default ModelDetails;
