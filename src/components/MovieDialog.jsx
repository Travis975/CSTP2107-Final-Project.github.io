import React from 'react';
import { Dialog, DialogContent, Card, CardMedia, CardContent, Typography, CardActions, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const MovieDialog = ({ selectedMovie, openDialog, handleMouseLeave, dialogPosition, scrollPosition }) => {
  const navigate = useNavigate();

  const handleCardMediaClick = () => {
    navigate('/watch-trailer', {
      state: {
        videoId: String(selectedMovie.videoId), // Ensure videoId is a string
        movieTitle: selectedMovie.title,
      },
    });
  };

  return (
    selectedMovie && (
      <Dialog
        open={openDialog}
        onClose={handleMouseLeave}
        PaperProps={{
          style: {
            position: 'absolute',
            top: dialogPosition.top - scrollPosition.y - 20,
            left: dialogPosition.left - scrollPosition.x,
            margin: 0,
            cursor: 'pointer',
          },
        }}
      >
        <DialogContent onMouseLeave={() => handleMouseLeave()}>
          <Card sx={{ maxWidth: 250 }}>
            <CardMedia
              sx={{ height: 275 }}
              image={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              title={selectedMovie.title}
              onClick={handleCardMediaClick}
              style={{ cursor: 'pointer' }}
            />
            <CardContent>
              <Typography paddingBottom={2} variant="h5" component="div">
                {selectedMovie.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedMovie.overview.substring(0, 150) + '...'}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Add to favorites">
                <Button size="small">Favorite</Button>
              </Tooltip>
              <Tooltip title="Add to watchlist">
                <Button size="small">
                  <AddIcon />
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    )
  );
};

export default MovieDialog;