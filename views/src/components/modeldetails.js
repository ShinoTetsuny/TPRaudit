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
            setModelData(response.data);

            const engineResponse = await axios.get(`${engineApiUrl}${response.data.model.engineId}`);
            setEngineData(engineResponse.data);

            // console.log(response.data)
            // console.log(engineResponse.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchModelDetails();
    }, [id]);

    // console.log(modelData);

    if (!modelData || !engineData) {
        return <p>Loading...</p>;
    }

    const { model } = modelData;
    // const { engine } = engineData;
    let lesOptions = modelData.options;
    console.log(engineData.name)
    // console.log(modelData.options);
    return (
        <div className="model-details-container">
            <h1 className="model-details-title">Model Details</h1>
            <p className="model-details-item">ID: {model.id}</p>
            <p className="model-details-item">Name: {model.name}</p>
            <p className="model-details-item">Seat: {model.seat}</p>
            <p className="model-details-item">Door: {model.door}</p>
            <p className="model-details-item">Price: {model.price}</p>
            <p className="model-details-item">Engine Name: {engineData.name}</p>

            {lesOptions && lesOptions.length > 0 && (
                <div>
                    <h2 className="model-details-option"> Options </h2>
                    {lesOptions.map((option) => (
                        <div key={option.name} className="model-details-option">
                            <p className="model-details-item">Name: {option.name}</p>
                            <p className="model-details-item">Price: {option.price}</p>
                        </div>
                    ))}
                </div>
            )}

        <Link to="/" className="go-back-link">Go back to homepage</Link>
    </div>
    );
};

export default ModelDetails;
