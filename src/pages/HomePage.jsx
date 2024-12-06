import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Welcome to Our Site!</h2>
            <p>Grab a snack and enjoy!</p>
            
            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
                        Click to go to the Sign In page:
                    </label>
                    <button style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={() => navigate('/Signin')}>
                        Sign In
                    </button>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
                        Click to go to the Sign Up page:
                    </label>
                    <button style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={() => navigate('/Signup')}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
