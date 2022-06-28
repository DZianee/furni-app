import axios from "axios";

axios.defaults.baseURL = process.env.TMCI_API_URL || "https://localhost:2371/";

export default axios.create();
