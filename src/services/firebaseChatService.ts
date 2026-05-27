import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

export const createChatSession = async (userId: string, title: string, initialMessages: any[]) => {
  try {
    const sessionsRef = collection(FIREBASE_DB, "users", userId, "chatSessions");
    
    const newSessionRef = await addDoc(sessionsRef, {
      title,
      messages: initialMessages,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return newSessionRef.id;
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

export const getChatSessions = async (userId: string) => {
  try {
    const sessionsRef = collection(FIREBASE_DB, "users", userId, "chatSessions");
    const q = query(sessionsRef, orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return [];
  }
};

export const saveMessageToSession = async (userId: string, sessionId: string, newMessages: any[]) => {
  try {
    const sessionDocRef = doc(FIREBASE_DB, "users", userId, "chatSessions", sessionId);
    
    // Fetch the existing messages
    const sessionSnapshot = await getDoc(sessionDocRef);
    if (!sessionSnapshot.exists()) {
      throw new Error("Chat session not found");
    }

    const sessionData = sessionSnapshot.data();
    const existingMessages = sessionData.messages || [];

    // Assuming newMessages is an array of messages to append
    const updatedMessages = [...existingMessages, ...newMessages];

    // Using updateDoc instead of setDoc to just update the specific fields if we were importing it,
    // but we can just use the spread operator with setDoc or import updateDoc
    const { updateDoc } = await import("firebase/firestore");
    await updateDoc(sessionDocRef, {
      messages: updatedMessages,
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    console.error("Error saving message to session:", error);
    throw error;
  }
};

export const getSessionMessages = async (userId: string, sessionId: string) => {
  try {
    const sessionDocRef = doc(FIREBASE_DB, "users", userId, "chatSessions", sessionId);
    const sessionSnapshot = await getDoc(sessionDocRef);

    if (sessionSnapshot.exists()) {
      return sessionSnapshot.data().messages || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching session messages:", error);
    return [];
  }
};
