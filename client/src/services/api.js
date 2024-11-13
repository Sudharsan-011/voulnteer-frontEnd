import axios from "axios";

const API_URL = "https://volunteer-connect-2.onrender.com"; // Base URL without trailing slash

// Generic postData function
export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, data); // Concatenate base URL with the passed endpoint
    return response.data;
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // The request was made, and the server responded with a non-2xx status code
      console.error("Error response:", error.response);
      throw new Error(
        `Request failed with status code ${error.response.status}`
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
      throw new Error("Network error: No response received from the server");
    } else {
      // Something went wrong in setting up the request
      console.error("Error message:", error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

// Get Data with token for authentication
export const getData = async (url, token) => {
  if (!token) {
    throw new Error("No authorization token provided");
  }

  try {
    const response = await axios.get(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response);
      throw new Error(`Error fetching data: ${error.response.status}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: Unable to fetch data");
    } else {
      console.error("Error message:", error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

// Signup function (uses postData internally)
export const signupUser = async (userData) => {
  return postData("/api/auth/register", userData); // Endpoint for registration
};

// Fetch organizations (with error handling)
export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(`${API_URL}/organizations`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response);
      throw new Error(`Error fetching organizations: ${error.response.status}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: Unable to fetch organizations");
    } else {
      console.error("Error message:", error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
