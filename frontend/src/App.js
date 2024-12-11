import React, { useState, useEffect } from "react";
import API from "./api";

function App() {
    const [status, setStatus] = useState("");
    const [services, setServices] = useState([]);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        API.get("/status").then((response) => {
            setStatus(response.data.status);
        });

        API.get("/services").then((response) => {
            setServices(response.data);
        });

        API.get("/ads").then((response) => {
            setAds(response.data);
        });
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
