import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import "./OrganizationLocation.css"
const OrganizationLocations = ({ token }) => {
    const { orgId } = useParams();
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/location', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setLocations(response.data.data);
                    setUserType(response.data.type);
                } else {
                    console.error('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, [orgId, token]);

    const handleDeleteLocation = async (locationId) => {
        try {
            const response = await Axios.post('http://localhost:8080/item/user/location/delete', {
                orgId: parseInt(orgId),
                jwt: token.jwt,
                locationId: locationId,
            });

            if (response.data.result === 'success') {
                // Update the locations list after deletion
                setLocations(locations.filter(([_, id]) => id !== locationId));
            } else {
                console.error('Error deleting location');
            }
        } catch (error) {
            console.error('Some unexpected error occurred:', error);
        }
    };

    const filteredLocations = locations.filter(([locationName]) =>
        locationName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="organization-locations">
            <h2>Organization Locations</h2>
            <label>
                Search Location:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <ul className="custom-ul">
                {filteredLocations.map(([locationName, locationId]) => (
                    <li key={locationId} className="custom-li">
                        {locationName}
                        {(userType === 'OWNER' || userType === 'MANAGER') && (
                            <button onClick={() => handleDeleteLocation(locationId)} className="delete-button">
                                Delete Location
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrganizationLocations;
