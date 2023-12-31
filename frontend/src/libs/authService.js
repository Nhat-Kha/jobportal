import axiosInstance from "./axiosInstance";
import apiList from "./apiList";

const handleLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post(apiList.login, credentials);
    const { token } = response.data;

    // Store the token in localStorage or cookies
    localStorage.setItem("token", token);

    // Return the token or user data if needed
    return { token, user: response.data.user }; // Example: you might want to get user data from the response
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Propagate the error to the caller
  }
};

export { handleLogin };
