const API_URL = "http://localhost:5000/api";

export const getChatSessions = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/chat/sessions/${userId}`);
    if (!response.ok) return [];
    const data = await response.json();
    const sessions = data.sessions || [];
    return sessions.map((s: any) => ({ ...s, id: s._id }));
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return [];
  }
};

export const createChatSession = async (userId: string, title: string, initialMessages: any[] = []) => {
  try {
    const response = await fetch(`${API_URL}/chat/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, initialMessages })
    });
    if (!response.ok) throw new Error("Failed to create chat session");
    const data = await response.json();
    return data.sessionId;
  } catch (error) {
    console.error("Error creating chat session:", error);
    return null;
  }
};

export const saveMessageToSession = async (userId: string, sessionId: string, messages: any[]) => {
  try {
    const response = await fetch(`${API_URL}/chat/sessions/${userId}/${sessionId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });
    if (!response.ok) throw new Error("Failed to save message");
    return true;
  } catch (error) {
    console.error("Error saving message to session:", error);
    return false;
  }
};
