import axios from "axios";

export default axios.create({
     // baseURL: "http://localhost:8000/api",
     baseURL: "https://propensi-a03-staging.herokuapp.com/api",
     // baseURL: "https://propensi-a03.herokuapp.com/api",

    headers: {
        "Content-type": "application/json"
    }
});