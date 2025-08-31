import axios from 'axios';

export async function get({ request }) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (code) {
        try {
            const response = await axios.post('https://id.twitch.tv/oauth2/token', {
                client_id: import.meta.env.TWITCH_CLIENT_ID,
                client_secret: import.meta.env.TWITCH_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: import.meta.env.TWITCH_REDIRECT_URI,
            });

            return new Response(JSON.stringify({ access_token: response.data.access_token }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Authentication failed' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    // Rediriger vers Twitch pour l'authentification
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${import.meta.env.TWITCH_CLIENT_ID
        }&redirect_uri=${import.meta.env.TWITCH_REDIRECT_URI
        }&response_type=code&scope=chat:read+chat:edit`;

    return new Response(null, {
        status: 302,
        headers: { Location: authUrl },
    });
}