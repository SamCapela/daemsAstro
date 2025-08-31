import React from 'react';

export default function StreamPlayer() {
  return (
    <div className="aspect-w-16 aspect-h-9">
          <iframe
              src={`https://player.twitch.tv/?channel=daems_&parent=daems-astro.vercel.app&parent=localhost`}
              height="480"
              width="720"
              allowFullScreen
              style={{ border: "0" }}
          />

    </div>
  );
}