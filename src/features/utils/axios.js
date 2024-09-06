import axios from "axios";

const customFetch = axios.create({
  baseUrl: "http://127.0.0.1:8000",
});
export default customFetch;
