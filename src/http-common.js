import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:2480/api",
  baseURL: "https://expense-tracker-backend-gana.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
