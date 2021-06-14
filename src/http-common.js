import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2480/api",
  // baseURL: "https://reactnotesbackend-b2tech.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
