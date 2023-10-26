import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

export default instance;
