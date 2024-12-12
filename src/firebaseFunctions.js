import { doc, setDoc, deleteDoc, collection, getDocs, addDoc } from "firebase/firestore"; // Added necessary imports
import { auth, db } from "./firebaseConfig"; // Adjust the import path if needed

// Function to add movie to favorites
export const addMovieToFavorites = async (movie) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid, "favorites", movie.id.toString()), movie);
    } else {
      console.log("User not authenticated");
    }
  } catch (error) {
    console.error("Error adding movie to favorites: ", error);
  }
};

// Function to remove movie from favorites
export const removeMovieFromFavorites = async (movie) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "favorites", movie.id.toString()));
    } else {
      console.log("User not authenticated");
    }
  } catch (error) {
    console.error("Error removing movie from favorites: ", error);
  }
};

// Function to add movie to watch later
export const addMovieToWatchlater = async (movie) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const watchlaterRef = collection(db, "users", user.uid, "watchlater");

      // Check if the movie is already in the watchlater list
      const movieExists = await getDocs(watchlaterRef);
      const alreadyAdded = movieExists.docs.some(doc => doc.data().id === movie.id);

      if (!alreadyAdded) {
        await addDoc(watchlaterRef, movie);
      }
    }
  } catch (error) {
    console.error("Error adding movie to watch later: ", error);
  }
};

// Function to remove movie from watch later
export const removeMovieFromWatchlater = async (movie) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "watchlater", movie.id.toString())); 
    } else {
      console.log("User not authenticated");
    }
  } catch (error) {
    console.error("Error removing movie from watch later: ", error);
  }
};
