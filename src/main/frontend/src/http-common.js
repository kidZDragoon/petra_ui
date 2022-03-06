import axios from "axios";
export default axios.create({
    baseURL: "https://propensi-a03-staging.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});