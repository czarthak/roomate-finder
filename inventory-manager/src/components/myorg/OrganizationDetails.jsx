import React, { useState, useEffect } from 'react';
import {useParams, Navigate, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './OrganizationDetails.css'
const OrganizationDetails = ({token}) => {
    const { orgId } = useParams();
    const [organization, setOrganization] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizationDetails = async () => {
            try {
                console.log(token);
                const response = await Axios.post(`http://localhost:8080/myorg/user/org`, {
                    jwt: token.jwt,
                    orgId: orgId
                });

                if (response.data.result === 'success') {
                    setOrganization(response.data.data);
                } else {
                    console.error('Error fetching organization details');
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching organization details:', error);
                navigate('/404');
            }
        };

        fetchOrganizationDetails();
    }, [orgId]);

    const handleRosterButtonClick = () => {
        // Redirect to the OrganizationMembers page
        navigate(`/organizations/${orgId}/members`);
    };
    if (!organization) {
        return <div>Loading...</div>;
    }

    return (
        <div className="organization-details">
            <div className="organization-info">
            <h2>{organization.name}</h2>
            <p>Email: {organization.email}</p>
            <p>Owner Email: {organization.ownerEmail}</p>
            <p>Description: {organization.description}</p>
            <p>Member Count: {organization.memberCount}</p>
            </div>
            {/* Buttons at the bottom */}
            <div className="button-container">
                <button className="blue-button" onClick={handleRosterButtonClick}>Roster</button>
                <button className="blue-button">Requests</button>
                <button className="blue-button">Items</button>
                <button className="blue-button">Listings</button>
            </div>
        </div>
    );
};

export default OrganizationDetails;
