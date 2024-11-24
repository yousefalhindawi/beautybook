import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // Update with your backend URL
});

// Attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // unless it's not /login route and not /register route and status is 401 or 403  then redirect to login  page
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !window.location.href.includes("/login") &&
      !window.location.href.includes("/register")
    ) {
      // redirect to login if token is invalid
      console.log("Token is invalid");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    // but if it's /login route then show error message
    return Promise.reject(error);
  }
);

export default axiosInstance;
