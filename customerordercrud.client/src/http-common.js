import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:5173/api",
    headers: {
        "Content-type": "application/json"
    }
});
