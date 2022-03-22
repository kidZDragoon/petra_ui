import http from "../http-common";

class AuthenticationDataService {
    user(token) {
        return http.post("/user", token);
    }

    profile(token) {
        return http.post("/profile", token);
    }
}
export default new AuthenticationDataService();