import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import ProfilePictureChanger from "../components/ProfilePictureChanger";
import PaletteIcon from '@mui/icons-material/Palette';
import ColorPickerDialog from "../components/ColorPickerDialog";
import MovieCard from "../components/MovieCard";
import "../css/account.css";
import ColorPickerWheel from "react-color-picker-wheel";
import MovieDialog from "../components/MovieDialog";

const Account = () => {
  const [value, setValue] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [bannerColor, setBannerColor] = useState("#6163bf");
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username || "No Username");
            setEmail(userData.email || "No Email");
            setBannerColor(userData.bannerColor || "#00FF00");
            setAvatarUrl(userData.avatarUrl || null);
          }

          const favoritesRef = collection(db, "users", user.uid, "favorites");
          const watchLaterRef = collection(db, "users", user.uid, "watchlater");

          const favDocs = await getDocs(favoritesRef);
          const watchDocs = await getDocs(watchLaterRef);

          setFavorites(favDocs.docs.map((doc) => doc.data()));
          setWatchLater(watchDocs.docs.map((doc) => doc.data()));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleBannerColorChange = (color) => {
    setBannerColor(color.hex);
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, { bannerColor: color.hex }).catch((error) =>
        console.error("Error updating banner color:", error)
      );
    }
  };

  const openMovieDialog = (movie, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDialogPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
    setSelectedMovie(movie);
    setOpenDialog(true);
  };
  

  const closeMovieDialog = () => {
    setSelectedMovie(null);
    setOpenDialog(false);
  };

  const handleUsernameChange = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { username: newUsername });
        setUsername(newUsername);
        setOpenUsernameDialog(false);
      } catch (error) {
        console.error("Error updating username:", error);
      }
    }
  };

  return (
    <Box className="account-container">
      <Box className="account-page">
        {/* Profile Header */}
        <Box
          className="profile-header"
          style={{
            backgroundColor: bannerColor,
            marginTop: '80px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <ProfilePictureChanger
            avatarUrl={avatarUrl}
            onProfilePictureChange={(newAvatar) => setAvatarUrl(newAvatar)}
          />
          <Typography
            variant="h5"
            className="username-text"
            style={{
              marginTop: '20px',
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            {username}
          </Typography>
          <IconButton
            onClick={() => setOpenColorPicker(true)}
            style={{
              justifyContent: 'flex-end',
              color: '#fff',
              marginTop: '8px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Edit
            <PaletteIcon />
          </IconButton>
        </Box>

        {/* Navigation Tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          className="navigation-tabs"
          style={{
            marginTop: '20px',
            backgroundColor: '#424242',
            borderRadius: '8px',
            padding: '10px',
            color: '#fff',
          }}
          indicatorColor="primary"
          textColor="inherit"
          centered
        >
          <Tab label="Overview" />
          <Tab label="Liked" />
          <Tab label="Watch Later" />
        </Tabs>

        {/* Content Section */}
        <Box className="content-section">
          {value === 0 && (
            <Box
              className="overview-section"
              style={{
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#333',
                borderRadius: '8px',
                color: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h4" className="section-header" style={{ marginBottom: '10px' }}>
                Account Details
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography>Username: {username}</Typography>
                <IconButton
                  onClick={() => setOpenUsernameDialog(true)}
                  style={{
                    marginLeft: '0px',
                    color: '#fff',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
               
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography>Email: {email}</Typography>

              <Typography variant="h5" className="section-header" style={{ marginTop: '20px', marginBottom: '10px' }}>
                Activity
              </Typography>
              <Typography>Favorites Added: {favorites.length}</Typography>
              <Typography>Watch Later Added: {watchLater.length}</Typography>
            </Box>
          )}
          {value === 1 && (
            <Box className="favorites-section">
              <Box className="movie-card-grid">
                {favorites.map((movie, index) => (
                  <MovieCard
                    key={index}
                    movie={movie}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    watchlater={watchLater}
                    setWatchlater={setWatchLater}
                    onMouseEnter={(event) => openMovieDialog(movie, event)}
                    videos={{}}
                  />
                ))}
              </Box>
            </Box>
          )}
          {value === 2 && (
            <Box className="watch-later-section">
              <Box className="movie-card-grid">
                {watchLater.map((movie, index) => (
                  <MovieCard
                    key={index}
                    movie={movie}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    watchlater={watchLater}
                    setWatchlater={setWatchLater}
                    onMouseEnter={(event) => openMovieDialog(movie, event)} 
                    videos={{}}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Color Picker Dialog */}
        <Dialog open={openColorPicker} onClose={() => setOpenColorPicker(false)}>
          <DialogTitle>Pick a Color</DialogTitle>
          <DialogContent>
            <ColorPickerWheel
              color={bannerColor}
              onChange={handleBannerColorChange}
              size={300}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenColorPicker(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Username Change Dialog */}
        <Dialog open={openUsernameDialog} onClose={() => setOpenUsernameDialog(false)}>
          <DialogTitle>Change Username</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Username"
              type="text"
              fullWidth
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUsernameDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUsernameChange} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Movie Dialog */}
        {selectedMovie && (
          <MovieDialog
            selectedMovie={selectedMovie}
            openDialog={openDialog}
            handleMouseLeave={closeMovieDialog}
            dialogPosition={dialogPosition}
            scrollPosition={scrollPosition}
            favorites={favorites}
            watchlater={watchLater}
            setFavorites={setFavorites}
            setWatchlater={setWatchLater}
          />
        )}
      </Box>
    </Box>
  );
};

export default Account;