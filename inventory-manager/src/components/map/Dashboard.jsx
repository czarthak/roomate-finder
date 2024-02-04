import React, { useState, useEffect } from 'react';
import Map3 from './Map'; // Import your Map component
import UserInfo from './UserInfo'; // Import your UserInfo component
import axios from 'axios';

const Dashboard2 = ({ userEmail, token }) => {
    const [userApts, setUserApts] = useState([]);

    useEffect(() => {
        // Assuming you have a function to fetch apartments for a specific user
        const fetchUserApts = async () => {
            try {
                const response = await axios.post('http://localhost:8080/apt/user/public', { email: userEmail });
                if (response.data.result === 'success') {
                    // Assuming the response structure matches what the Map component expects
                    setUserApts(response.data.descriptions);
                }
            } catch (error) {
                console.error('Failed to fetch user apartments:', error);
            }
        };

        fetchUserApts();
    }, [userEmail]);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: '70%' }}>
                <Map3 token={token} userApts={userApts} />
            </div>
            <div style={{ flex: '30%' }}>
                <UserInfo email={userEmail} />
            </div>
        </div>
    );
};

export default Dashboard2;
