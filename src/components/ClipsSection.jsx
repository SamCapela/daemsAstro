import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClipsSection() {
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);

    const parent =
        typeof window !== "undefined" && window.location.hostname === "localhost"
            ? "localhost:4321"
            : "daems-astro.vercel.app";

    useEffect(() => {
        async function fetchClips() {
            try {
                const res = await axios.get("/api/twitch/clips");
                console.log("Réponse API clips :", res.data);

                if (res.data.data) {
                    const sorted = res.data.data.sort((a, b) => b.view_count - a.view_count);
                    setClips(sorted);
                } else {
                    setClips([]);
                }
            } catch (err) {
                console.error("Impossible de récupérer les clips :", err);
                setClips([]);
            } finally {
                setLoading(false);
            }
        }

        fetchClips();
    }, []);

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Clips populaires</h2>

            {loading ? (
                <p>Chargement des clips...</p>
            ) : clips.length === 0 ? (
                <p>0 clips disponibles</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {clips.map((clip) => (
                        <div key={clip.id} className="rounded shadow overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={`https://clips.twitch.tv/embed?clip=${clip.slug}&parent=${parent}`}
                                    width="100%"
                                    height="100%"
                                    allowFullScreen
                                    style={{ border: 0 }}
                                    title={clip.title}
                                />
                            </div>
                            <div className="p-2">
                                <h3 className="font-semibold truncate">{clip.title}</h3>
                                <p className="text-sm text-gray-600">{clip.view_count} vues</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
