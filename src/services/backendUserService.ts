const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface UserProfile {
  githubUrl?: string;
  username?: string;
  bio?: string;
  hasCompletedOnboarding?: boolean;
}

export const getUserProfile = async (userId?: string): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`);
    
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user profile from MongoDB:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profile: UserProfile) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error(`Error updating profile: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating user profile in MongoDB:", error);
    return false;
  }
};
