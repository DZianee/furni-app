import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:2371";

export default axios.create();
