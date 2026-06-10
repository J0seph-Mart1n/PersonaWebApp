const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const saveAssessmentScoreToBackend = async (
  userId: string, // currently ignored by backend, single-user system
  mbtiVector: string,
  detailedAnswers: any[]
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, mbtiVector, detailedAnswers }),
    });

    if (!response.ok) {
      throw new Error(`Error saving assessment: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Assessment successfully saved to MongoDB:", data);
    return data;
  } catch (error) {
    console.error("Error saving assessment to MongoDB:", error);
    throw error;
  }
};

export const getLatestAssessmentFromBackend = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessment/${userId}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error fetching assessment: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest assessment from MongoDB:", error);
    return null;
  }
};
