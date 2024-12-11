import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [status, setStatus] = useState('');
    const [services, setServices] = useState([]);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        // Fetch server status
        axios.get('/api/status')
            .then((response) => setStatus(response.data.status))
            .catch((error) => console.error(error));

        // Fetch services
        axios.get('/api/services')
            .then((response) => setServices(response.data))
            .catch((error) => console.error(error));

        // Fetch ads
        axios.get('/api/ads')
            .then((response) => setAds(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <header>
                <h1>CursedBots.xyz</h1>
                <p>{status}</p>
            </header>
            <section>
                <h2>Our Services</h2>
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <p>${service.price}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Sponsored Ads</h2>
                {ads.map((ad) => (
                    <div key={ad.id}>
                        <a href={ad.target_url} target="_blank" rel="noopener noreferrer">
                            <img src={ad.image_url} alt={ad.title} />
                            <p>{ad.title}</p>
                        </a>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default App;