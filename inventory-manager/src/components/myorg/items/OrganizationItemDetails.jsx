import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import './OrganizationItemDetails.css'
const OrganizationItemDetails = ({ token }) => {
    const { orgId, itemId } = useParams();
    const [itemInfo, setItemInfo] = useState(null);
    const navigate = useNavigate();

    const handleDeleteItem = async () => {
        // Logic to handle item deletion
        if (window.confirm(`Are you sure you want to permanently delete all quantities of ${itemInfo.data[1]}? This will delete the entire item.`)) {
            console.log('Deleting item...');
            try {
                const response = await Axios.post('http://localhost:8080/item/user/oneitem/delete', {
                    orgId: parseInt(orgId), // Convert orgId to integer
                    jwt: token.jwt,
                    itemId: parseInt(itemId), // Convert itemId to integer
                });
                if (response.data.result === 'success') {
                    navigate(`/organizations/${orgId}/items`);
                } else {
                    console.error('Error deleting item');
                }
            } catch (error) {
                console.error('Some unexpected error occured:', error);
            }
        }
    };
    // Add the necessary Axios request to delete the item
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/oneitem', {
                    orgId: parseInt(orgId), // Convert orgId to integer
                    jwt: token.jwt,
                    itemId: parseInt(itemId), // Convert itemId to integer
                });

                if (response.data.result === 'success') {
                    setItemInfo(response.data);
                } else {
                    console.error('Error fetching item information');
                }
            } catch (error) {
                console.error('Error fetching item information:', error);
            }
        };

        fetchItemDetails();
    }, [orgId, itemId, token]);

    if (!itemInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="organization-item-details">
            <h2>Item Details</h2>
            <div className="item-details">
                <span>Name: {itemInfo.data[1]}</span>
                <span>Description: {itemInfo.data[2]}</span>
                <span>Owner Email: {itemInfo.data[3]}</span>
                <span>Quantity: {itemInfo.data[4]}</span>
                <span>Category: {itemInfo.data[5]}</span>
                <span>Status: {itemInfo.data[6]}</span>
                <span>Location: {itemInfo.data[9]}</span>
            </div>
            {(itemInfo.type === 'OWNER' || itemInfo.type === 'MANAGER') && (
                <button onClick={handleDeleteItem} className="delete-item-button">
                    Delete Item
                </button>
            )}
        </div>
    );
};

export default OrganizationItemDetails;
