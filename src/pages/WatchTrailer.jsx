import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const WatchTrailer = () => {
  const location = useLocation();
  const { videoId, movieTitle } = location.state || {};

  if (!videoId) {
    return <p>Trailer not available!</p>;
  }

  return (
    <div>
      <h2>{movieTitle} - Trailer</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* edit the opts dimension below to change video player size */}
        <YouTube videoId={videoId} opts={{ height: '390', width: '640' }} />
      </div>
    </div>
  );
};

export default WatchTrailer;
