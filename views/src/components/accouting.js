import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Accounting = () => {
    const [purchases, setPurchases] = useState([]);
    const [user, setUser] = useState([]);
    const [model, setModel] = useState([]);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        modelName: '',
        userName: '',
    });

    // Effectuer la requête GET pour récupérer les achats depuis l'API
    useEffect(() => {
        const fetchData = async () => {
        try {
            let response = await axios.get('http://localhost:3000/purchase');
            setPurchases(response.data);
            setModel(await axios.get(`http://localhost:3000/model/${response.data.modelId}`));
            setUser(await axios.get(`http://localhost:3000/user/${response.data.userId}`));
        } catch (error) {
            console.error('Erreur lors de la récupération des achats', error);
        }
        };

        fetchData();
    }, []); // Le tableau vide en second argument garantit que l'effet ne se déclenche qu'une fois lors du montage du composant.

    const filteredPurchases = purchases.filter(purchase => {
        const purchaseDate = !filters.startDate || (purchase.date >= filters.startDate && purchase.date <= filters.endDate);
        const purchaseModel = !filters.modelName || purchase.model.toLowerCase().includes(filters.modelName.toLowerCase());
        const purchaseUser = !filters.userName || purchase.user.toLowerCase().includes(filters.userName.toLowerCase());
        return purchaseDate && purchaseModel && purchaseUser;
    });

    const totalPrice = filteredPurchases.reduce((total, purchase) => total + purchase.price, 0);

    
    return (
        <div>
        <h1>Historique des Achats</h1>

        <form>
            <label>Date de début :</label>
            <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} />

            <label>Date de fin :</label>
            <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />

            <label>Modèle :</label>
            <input type="text" value={filters.modelName} onChange={e => setFilters({ ...filters, modelName: e.target.value })} />

            <label>Utilisateur :</label>
            <input type="text" value={filters.userName} onChange={e => setFilters({ ...filters, userName: e.target.value })} />

            <button type="button">Filtrer</button>
        </form>

        <table>
            <thead>
            <tr>
                <th>Date d'Achat</th>
                <th>Prix</th>
                <th>Modèle Acheté</th>
                <th>Utilisateur</th>
            </tr>
            </thead>
            
            <tbody>
            {filteredPurchases.map(purchase => (
                <tr key={purchase.date}>
                <td>{purchase.date}</td>
                <td>{purchase.price}</td>
                <td>{model.name}</td>
                <td>{user.name}</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <th colSpan="3">Total</th>
                <th>{totalPrice}</th>
            </tr>
            </tfoot>
        </table>
        </div>
    );
};

export default Accounting;
