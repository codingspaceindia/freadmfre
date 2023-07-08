import axios from "axios";

const instance = axios.create({
  // baseURL: "https://us-central1-universal-trade-backend.cloudfunctions.net/app/free-coin",
  baseURL: "https://us-central1-universal-trade-backend.cloudfunctions.net/app/assetfmdc",
  // baseURL : "http://localhost:3000/free-coin"
});

export default instance;
