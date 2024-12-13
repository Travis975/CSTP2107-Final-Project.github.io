import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const WatchTrailer = () => {
  const location = useLocation();
  const { videoId, movieTitle } = location.state || {};

  // Handle missing or invalid video ID gracefully
  if (!videoId || typeof videoId !== 'string') {
    return <p>Trailer not available!</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{movieTitle} - Trailer</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* Set YouTube player options */}
        <YouTube
          videoId={videoId}
          opts={{
            height: '390', 
            width: '640',
            playerVars: {
              autoplay: 0,
              controls: 1,
              rel: 0
            },
          }}
        />
      </div>
    </div>
  );
};

export default WatchTrailer;
