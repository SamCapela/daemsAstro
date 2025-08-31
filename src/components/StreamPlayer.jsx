import React from 'react';

export default function StreamPlayer() {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src="https://player.twitch.tv/?channel=daems_&parent=localhost"
        height="100%"
        width="100%"
        allowFullScreen
      ></iframe>
    </div>
  );
}