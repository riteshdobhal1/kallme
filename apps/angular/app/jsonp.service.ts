import {Injectable} from "@angular/core";
import distance from "google-distance-matrix";
// import {Response, Jsonp} from "@angular/http";

@Injectable()

export class JsonpService {
    constructor() {
    }

    getDistance(source: Object, dest: Object) {
        const origin = [{
            lat: source["latitude"],
            lng: source["longitude"]
        }], destination = [{
            lat: dest["latitude"],
            lng: dest["longitude"]
        }];

        let service = new google.maps.DistanceMatrixService;
        return service.getDistanceMatrix({
            origins: origin,
            destinations: destination
        }, (res, status) => {
            if (status !== 'OK') {
                console.error(status);
            } else {
                return res;
            }
        });

        // return distance.matrix(origin, destination, (err, distances) => {
        //     if (!err) {
        //         console.log(distances);
        //         return distances;
        //     }
        // });
        // let service = new google.maps.DistanceMatrixService;
        // return this.jsonp.request(`http://maps.googleapis.com/maps/api/distancematrix/json?callback=JSONP_CALLBACK&origins=${source["latitude"]},${source["longitude"]}&destinations=${dest["latitude"]},${dest["longitude"]}`, {
        //     method: "Get"
        // });
    }
}