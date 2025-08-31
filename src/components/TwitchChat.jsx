import React, { useState, useEffect } from 'react';

export default function TwitchChat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('twitch_token');
        if (token) setIsLoggedIn(true);
    }, []);

    return (
        <div className="h-[500px]">
            {isLoggedIn ? (
                <iframe
                    src="https://www.twitch.tv/embed/daems_/chat?parent=localhost"
                    height="100%"
                    width="100%"
                ></iframe>
            ) : (
                <a
                    href="/api/auth"
                    className="bg-purple-600 text-white p-2 rounded"
                >
                    Se connecter avec Twitch
                </a>
            )}
        </div>
    );
}