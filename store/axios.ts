import axios from "axios";
import { baseURL, apiKey} from "../constants/api"
const instance = axios.create({
  baseURL,
  timeout: 1000,
  params:{
    apiKey,
  }
});

export default instance
