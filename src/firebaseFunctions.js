import { doc, setDoc, deleteDoc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
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

export const addMovieToWatchlater = async (movie) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const watchlaterRef = collection(db, "users", user.uid, "watchlater");
      const movieExists = await getDocs(watchlaterRef);
      const alreadyAdded = movieExists.docs.some((doc) => doc.data().id === movie.id);

      if (!alreadyAdded) {
        await addDoc(watchlaterRef, movie);
      }
    }
  } catch (error) {
    console.error("Error adding movie to watch later: ", error);
  }
};
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
