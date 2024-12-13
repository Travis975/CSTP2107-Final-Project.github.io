import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const addMovieToFavorites = async (movie) => {
  console.log("Add to favorites triggered / firebase");
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not authenticated");
      return;
    }

    const favoritesRef = doc(db, "users", user.uid, "favorites", movie.id.toString());

    // Check if the document already exists
    const docSnapshot = await getDoc(favoritesRef);
    if (docSnapshot.exists()) {
      console.log("Movie already exists in Favorites.");
      return;
    }

    // Add the movie to the collection
    await setDoc(favoritesRef, movie);
    console.log("Movie added to Favorites:", movie.title);
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
      const watchlaterRef = doc(db, "users", user.uid, "watchlater", movie.id.toString());
      const docSnapshot = await getDocs(collection(db, "users", user.uid, "watchlater"));

      const alreadyExists = docSnapshot.docs.some((doc) => doc.data().id === movie.id);
      if (!alreadyExists) {
        await setDoc(watchlaterRef, movie); // Add only if it doesn't already exist
      } else {
        console.log("Movie already exists in Watch Later.");
      }
    } else {
      console.log("User not authenticated");
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
