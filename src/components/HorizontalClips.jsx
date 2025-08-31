import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HorizontalClips() {
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);

    // Parent du lecteur Twitch côté client
    const parent = import.meta.env.PUBLIC_TWITCH_PARENT;

    useEffect(() => {
        async function fetchClips() {
            try {
                const res = await axios.get("/api/twitch/clips");
                const sorted = res.data.data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setClips(sorted);
            } catch (err) {
                console.error("Impossible de récupérer les clips :", err);
                setClips([]);
            } finally {
                setLoading(false);
            }
        }

        fetchClips();
    }, []);

    if (loading) return <p>Chargement des clips...</p>;
    if (clips.length === 0) return <p>0 clips disponibles</p>;

    return (
        <div className="flex overflow-x-auto space-x-4 py-4">
            {clips.map((clip) => (
                <div key={clip.id} className="flex-none w-72 rounded shadow">
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clip.slug}&parent=${parent}`}
                        width="288"
                        height="162"
                        allowFullScreen
                        style={{ border: 0 }}
                        title={clip.title}
                    />
                    <div className="p-2">
                        <h3 className="font-semibold truncate">{clip.title}</h3>
                        <p className="text-sm text-gray-600">{clip.view_count} vues</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
