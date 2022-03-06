import axios from "axios";
export default axios.create({
    baseURL: "https://propensi-a03.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});