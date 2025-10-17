import axios from "axios";
const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/ammazon-clone-21523/us-central1/api",
    baseURL: "https://us-central1-ammazon-clone-21523.cloudfunctions.net/api"
    
})
export {axiosInstance};