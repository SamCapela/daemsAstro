import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClipsSection() {
    const [clips, setClips] = useState([]);

    useEffect(() => {
        async function fetchClips() {
            try {
                // Obtenir l'ID utilisateur de "daems_"
                const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
                    headers: {
                        'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
                        Authorization: `Bearer ${await getAccessToken()}`,
                    },
                    params: { login: 'daems_' },
                });
                const userId = userResponse.data.data[0].id;

                // Obtenir les clips de la semaine
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                const clipsResponse = await axios.get('https://api.twitch.tv/helix/clips', {
                    headers: {
                        'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
                        Authorization: `Bearer ${await getAccessToken()}`,
                    },
                    params: {
                        broadcaster_id: userId,
                        first: 20,
                        started_at: startDate.toISOString(),
                    },
                });

                // Trier par popularité (view_count)
                const sortedClips = clipsResponse.data.data.sort(
                    (a, b) => b.view_count - a.view_count
                );
                setClips(sortedClips);
            } catch (error) {
                console.error('Erreur lors de la récupération des clips', error);
            }
        }
        fetchClips();
    }, []);

    async function getAccessToken() {
        // Utilisez un token d'application (client credentials flow)
        const response = await axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: import.meta.env.TWITCH_CLIENT_ID,
            client_secret: import.meta.env.TWITCH_CLIENT_SECRET,
            grant_type: 'client_credentials',
        });
        return response.data.access_token;
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Clips de la semaine</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {clips.map((clip) => (
                    <div key={clip.id} className="border rounded overflow-hidden">
                        <iframe
                            src={`https://clips.twitch.tv/embed?clip=${clip.slug}&parent=localhost`}
                            height="200"
                            width="100%"
                            allowFullScreen
                        ></iframe>
                        <div className="p-2">
                            <h3 className="font-semibold">{clip.title}</h3>
                            <p>{clip.view_count} vues</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}