import React, { useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from 'axios';

import './OrganizationRoster.css'; // Import the CSS file for styling

const OrganizationMembers = ({ token }) => {
    const { orgId } = useParams();
    const [roster, setRoster] = useState([]);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizationMembers = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/myorg/user/roster', {
                    orgId: orgId,
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setRoster(response.data.roster);
                    setType(response.data.type);
                } else {
                    console.error('Error fetching organization members');
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching organization members:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizationMembers();
    }, [orgId, token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="organization-members">
            <h2>Organization Members</h2>
            <div className="members-list">
                {roster.map((member, index) => (
                    <div key={index} className="member-item">
                        <span>{member[1]}, {member[0]}</span>
                        <span>Email: {member[2]}</span>
                        <span className={`member-type ${member[3].toLowerCase()}`}>{member[3]}</span>
                    </div>
                ))}
            </div>
            <p>Your role in the organization: {type}</p>
        </div>
    );
};

export default OrganizationMembers;
