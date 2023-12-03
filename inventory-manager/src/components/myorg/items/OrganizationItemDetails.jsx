import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './OrganizationItemDetails.css'
const OrganizationItemDetails = ({ token }) => {
    const { orgId, itemId } = useParams();
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/oneitem', {
                    orgId: parseInt(orgId), // Convert orgId to integer
                    jwt: token.jwt,
                    itemId: parseInt(itemId), // Convert itemId to integer
                });

                if (response.data.result === 'success') {
                    setItemInfo(response.data.data);
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
                <span><strong>Name:</strong> {itemInfo[1]}</span>
                <span><strong>Description:</strong> {itemInfo[2]}</span>
                <span><strong>Owner Email:</strong> {itemInfo[3]}</span>
                <span><strong>Quantity:</strong> {itemInfo[4]}</span>
                <span><strong>Category:</strong> {itemInfo[5]}</span>
                <span><strong>Status:</strong> {itemInfo[6]}</span>
                <span><strong>Location:</strong> {itemInfo[9]}</span>
            </div>
        </div>
    );
};

export default OrganizationItemDetails;
