import { Height, HeightOutlined, WidthFull } from '@mui/icons-material';
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
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}
    >
      <YouTube
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
          },
        }}
        style={{ height: '80%', width: '90%' }}
      />
    </div>
  );
};

export default WatchTrailer;
