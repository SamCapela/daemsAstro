import React from 'react';

export default function StreamPlayer() {
  return (
    <div className="aspect-w-16 aspect-h-9">
          <iframe
              src="https://player.twitch.tv/?channel=NomDeTaChaine&parent=daems-astro.vercel.app&parent=localhost"
              height="480"
              width="720"
              allowfullscreen
              frameborder="0">
          </iframe>
    </div>
  );
}