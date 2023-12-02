import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './MyOrganization.css'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const MyOrganizations = ({ token }) => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                console.log(token)
                const response = await Axios.post('http://localhost:8080/myorg/user', {
                    jwt: token.jwt
                });

                if (response.data.result === 'success') {
                    setOrganizations(response.data.data);
                } else {
                    console.error('Error fetching organizations');
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        fetchOrganizations();
    }, [token]);

    return (
        <div className="organization-list">
            <h2>Your Organizations</h2>
            <ul>
                {organizations.map((org) => (
                    <li key={org.orgId} className="organization-item">
                        <Link to={`/organizations/${org.orgId}`}>
                        <h3>{org.name}</h3>
                        </Link>
                        <p>Category: {org.category}</p>
                        <p>Members: {org.memberCount}</p>
                        {/* Add more information as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
MyOrganizations.propTypes = {
    token: PropTypes.shape({
        jwt: PropTypes.string.isRequired,
    }).isRequired,
};
export default MyOrganizations;
