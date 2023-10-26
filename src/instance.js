import axios from "axios";

// Add a response interceptor to handle CORS
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Handle CORS issue here, for example, by using a CORS proxy
      const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
      error.config.url = corsProxyUrl + error.config.url;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

const instance = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

export default instance;
