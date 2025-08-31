import axios from "axios";

export async function get() {
    try {
        const clientId = process.env.TWITCH_CLIENT_ID;
        const clientSecret = process.env.TWITCH_CLIENT_SECRET;

        // Token d'application
        const tokenRes = await axios.post(
            "https://id.twitch.tv/oauth2/token",
            null,
            {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: "client_credentials",
                },
            }
        );
        const accessToken = tokenRes.data.access_token;

        // ID du streamer
        const userRes = await axios.get("https://api.twitch.tv/helix/users", {
            headers: { "Client-ID": clientId, Authorization: `Bearer ${accessToken}` },
            params: { login: "daems_" },
        });
        const broadcasterId = userRes.data.data[0].id;

        // Clips des 7 derniers jours
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const clipsRes = await axios.get("https://api.twitch.tv/helix/clips", {
            headers: { "Client-ID": clientId, Authorization: `Bearer ${accessToken}` },
            params: { broadcaster_id: broadcasterId, started_at: startDate.toISOString(), first: 50 },
        });

        return {
            status: 200,
            body: JSON.stringify(clipsRes.data),
            headers: { "Content-Type": "application/json" },
        };
    } catch (err) {
        console.error(err.response?.data || err.message);
        return { status: 500, body: JSON.stringify({ error: "Impossible de récupérer les clips" }) };
    }
}
