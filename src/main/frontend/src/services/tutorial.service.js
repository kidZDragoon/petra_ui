import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        // eslint-disable-next-line no-template-curly-in-string
        return http.get("/tutorials/${id}");
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        // eslint-disable-next-line no-template-curly-in-string
        return http.put("/tutorials/${id}", data)
    }

    delete(id) {
        // eslint-disable-next-line no-template-curly-in-string
        return http.delete("/tutorials/${id}");
    }

    deleteAll() {
        return http.delete("/tutorials")
    }

    findByTitle(title) {
        // eslint-disable-next-line no-template-curly-in-string
        return http.get("/tutorials?title=${title}");
    }
}
export default new TutorialDataService();