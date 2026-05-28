import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

export interface UserProfile {
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(FIREBASE_DB, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profile: UserProfile) => {
  try {
    const userDocRef = doc(FIREBASE_DB, "users", userId);
    await setDoc(userDocRef, profile, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};
