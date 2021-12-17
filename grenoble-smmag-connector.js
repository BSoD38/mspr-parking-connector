import Connector from "./connector.js";
import GenericParkingModel from "./generic-parking-model.js";

export default class GrenobleSmmagConnector extends Connector {
    static endpoint = '/api/dyn/parking/json';
    static hostname = 'data.mobilites-m.fr';

    static convert(data) {
        const nativeObject = JSON.parse(data.toString("utf8"));
        const values = [];
        for (const key in nativeObject) {
            const value = nativeObject[key];
            const model = new GenericParkingModel(key, value.time, value.nb_places_libres, value.nb_parking_libres, value.nb_pr_libres);
            values.push(model);
        }
        return values;
    }
}
