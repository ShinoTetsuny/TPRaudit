import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

/* const jwt = require('jsonwebtoken');
const token = response.data.token; */

// Décodez le token
// const decodedToken = jwt.decode(token);

// Vérifiez si le décodage a réussi et si l'ID de l'utilisateur est présent
/* try {
    // Vérifiez et décodez le token
    const decodedToken = jwt.verify(token, JWT_SECRET); // Remplacez 'votre_cle_secrete' par votre clé secrète réelle
  
    // L'extraction de l'ID de l'utilisateur dépend de la structure du token
    const userId = decodedToken.userId;
    console.log('ID de l\'utilisateur:', userId);
    // Utilisez l'ID de l'utilisateur comme nécessaire
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error.message);
  } */

const PurchasePage = () => {
    const { id } = useParams();
    const [modelData, setModelData] = useState(null);
    // const [optionsList, setOptionsList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const apiUrl = 'http://localhost:3000/model/';
    const optionsApiUrl = 'http://localhost:3000/option/';

    const fetchModelDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/model/${id}`);
            setModelData(response.data);
    
            // setTotalPrice(response.data.model.price);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchModelDetails();
    }, [id]);

    const { model } = modelData || {};

    /* const updateTotalPrice = useCallback(() => {
        const optionsPrice = selectedOptions.reduce((acc, optionId) => {
            const option = optionsList.find(opt => opt.id === optionId);
            return acc + (option ? option.price : 0);
        }, 0);

        setTotalPrice(model?.price + optionsPrice);
    }, [selectedOptions, optionsList, model]);

    useEffect(() => {
        updateTotalPrice();
    }, [updateTotalPrice]); */

/*     const handleAddOption = () => {
        const selectedOptions = Array.from(document.querySelector('select').selectedOptions, ({ value }) => value);
        setSelectedOptions(selectedOptions);
        updateTotalPrice();
    }; */

    const handlePurchase = async () => {
        try {
            const { userId } = model || {};
            const price = totalPrice || 0;
    
            // Envoyez la requête d'achat avec les détails à votre API
            const response = await axios.post('http://localhost:3000/purchase/purchase', {
                modelId: id,
                userId,
                price,
                optionTaken: selectedOptions,
            });
    
            if (response.status === 201) {
                alert('Achat réussi !');
            } else {
                console.error('Erreur', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de l\'achat', error);
        }
    };
    

    return (
        <div className="purchase-page-container">
            <h1>Page d'Achat</h1>
            {modelData && (
                <div>
                    <h2>Details du modèle</h2>
                    <p className="model-details-item">Nom: {model.name}</p>
                    <p className="model-details-item">Places: {model.seat}</p>
                    <p className="model-details-item">Portes: {model.door}</p>
                    <p className="model-details-item">Prix: {model.price}</p>
                </div>
            )}

            <div>
                <h2>Options disponibles</h2>
                <select
                    multiple
                    value={selectedOptions}
                    onChange={(e) => {
                        setSelectedOptions(Array.from(e.target.selectedOptions, (option) => option.value));
                    }}
                >
                    {modelData?.options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className="go-back-link" onClick={handlePurchase}>
                Acheter
            </button>

            <Link to={`/model/${id}`} className="go-back-link">
                Retour aux détails du modèle
            </Link>
        </div>
    );
};

export default PurchasePage;
