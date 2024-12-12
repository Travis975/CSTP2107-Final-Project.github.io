import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import ProfilePictureChanger from "../components/ProfilePictureChanger";
import ColorPickerDialog from "../components/ColorPickerDialog";
// import MovieDialog from "../components/MovieDialog";
import MovieCard from "../components/MovieCard"; 
import "../css/account.css";

const Account = () => {
  const [value, setValue] = useState(0); 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]); 
  const [watchLater, setWatchLater] = useState([]); 
  const [bannerColor, setBannerColor] = useState("#00FF00");
  const [openColorPicker, setOpenColorPicker] = useState(false); 
  const [avatarUrl, setAvatarUrl] = useState(null); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false);

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
    setBannerColor(color);
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, { bannerColor: color }).catch((error) =>
        console.error("Error updating banner color:", error)
      );
    }
  };

  const openMovieDialog = (movie) => {
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const closeMovieDialog = () => {
    setSelectedMovie(null);
    setOpenDialog(false);
  };

  return (
    <Box className="account-page">
      {/* Profile Header */}
      <Box
        className="profile-header"
        style={{
          backgroundColor: bannerColor,
          marginTop: '80px', // Pushes the header below the navbar
          padding: '20px', // Adds some spacing inside the header for better visibility
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px', // Rounded corners for a smoother appearance
        }}
      >
        <IconButton
          onClick={() => setOpenColorPicker(true)}
          className="edit-banner-button"
          style={{
            backgroundColor: 'white', // Adds visibility
            color: bannerColor,
            position: 'absolute',
            top: '10px',
            right: '10px',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <EditIcon />
        </IconButton>
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
            <Typography variant="h6" className="section-header" style={{ marginBottom: '10px' }}>
              Account Details
            </Typography>
            <Typography>Username: {username}</Typography>
            <Typography>Email: {email}</Typography>

            <Typography variant="h6" className="section-header" style={{ marginTop: '20px', marginBottom: '10px' }}>
              Activity
            </Typography>
            <Typography>Favorites Added: {favorites.length}</Typography>
          </Box>

        )}
        {value === 1 && (
          <Box className="favorites-section">
            <Typography variant="h6" className="section-header">
              Liked
            </Typography>
            <Box className="movie-card-grid">
              {favorites.map((movie, index) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  watchlater={watchLater}
                  setWatchlater={setWatchLater}
                  onMouseEnter={openMovieDialog}
                  videos={{}}
                />
              ))}
            </Box>
          </Box>
        )}
        {value === 2 && (
          <Box className="watch-later-section">
            <Typography variant="h6" className="section-header">
              Watch Later
            </Typography>
            <Box className="movie-card-grid">
              {watchLater.map((movie, index) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  watchlater={watchLater}
                  setWatchlater={setWatchLater}
                  onMouseEnter={openMovieDialog}
                  videos={{}}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

    {/* Color Picker Dialog */}
    <ColorPickerDialog
      currentColor={bannerColor}
      onColorChange={handleBannerColorChange}
      open={openColorPicker}
      onClose={() => setOpenColorPicker(false)}
    />


      {/* Movie Dialog */}
      {selectedMovie && (
        <MovieDialog
          selectedMovie={selectedMovie}
          openDialog={openDialog}
          handleMouseLeave={closeMovieDialog}
          dialogPosition={{ top: 0, left: 0 }}
          scrollPosition={{ x: 0, y: 0 }}
          favorites={favorites}
          watchlater={watchLater}
          setFavorites={setFavorites}
          setWatchlater={setWatchLater}
        />
      )}
    </Box>
  );
};

export default Account;
