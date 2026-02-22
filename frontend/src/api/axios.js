import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-time-expert-booking.onrender.com",
  withCredentials: false,
});

export default instance;
