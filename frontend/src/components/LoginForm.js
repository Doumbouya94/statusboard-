import React, { useState } from 'react';

function LoginForm({ onJoin }) {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim() === '') return;
        onJoin(name.trim());
    };

    return (
        <div className="login-overlay">
            <div className="login-box">
                <div className="login-logo">S</div>
                <h2>StatusBoard</h2>
                <p>Entrez votre nom pour rejoindre</p>
                <input
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button onClick={handleSubmit}>Rejoindre →</button>
            </div>
        </div>
    );
}

export default LoginForm;