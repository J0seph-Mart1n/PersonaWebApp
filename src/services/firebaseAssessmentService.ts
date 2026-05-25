import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

export const saveAssessmentScoreToFirebase = async (
  userId: string,
  mbtiVector: string,
  detailedAnswers: any[]
) => {
  try {
    const assessmentsRef = collection(FIREBASE_DB, "users", userId, "assessments");
    
    // Delete any existing assessments for the user
    const querySnapshot = await getDocs(assessmentsRef);
    const deletePromises = querySnapshot.docs.map((docSnapshot) => 
      deleteDoc(docSnapshot.ref)
    );
    await Promise.all(deletePromises);
    
    // Add the new assessment
    await addDoc(assessmentsRef, {
      mbtiVector,
      detailedAnswers,
      createdAt: serverTimestamp(),
    });
    
    console.log("Assessment successfully saved to Firestore.");
  } catch (error) {
    console.error("Error saving assessment to Firebase:", error);
    throw error;
  }
};

export const getLatestAssessmentFromFirebase = async (userId: string) => {
  try {
    const assessmentsRef = collection(FIREBASE_DB, "users", userId, "assessments");
    const q = query(assessmentsRef, orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching latest assessment from Firebase:", error);
    return null;
  }
};
