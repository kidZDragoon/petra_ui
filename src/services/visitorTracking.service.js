import axios from "axios";
import http from "../http-common";

class VisitorTrackingService {
    countVisit() {
        console.log("masuk count visit")
        axios.get('https://geolocation-db.com/json/')
            .then(res => {
                console.log(res.data);
                let formData = new FormData();
                formData.append('ip', res.data.IPv4);
                axios.post("/api/metriks/pengunjung/", formData);
            })

        // return await axios.post("/count-visit", res.data.IPv4);
    }

}
export default new VisitorTrackingService();