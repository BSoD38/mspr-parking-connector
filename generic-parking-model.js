export default class GenericParkingModel {
    parkingId;
    lastUpdateTime;
    totalRemainingSpaces;
    parkingRemainingSpaces;
    relayRemainingSpaces;

    constructor(parkingId, lastUpdateTime, totalRemainingSpaces, parkingRemainingSpaces, relayRemainingSpaces) {
        this.parkingId = parkingId;
        this.lastUpdateTime = lastUpdateTime;
        this.totalRemainingSpaces = totalRemainingSpaces;
        this.parkingRemainingSpaces = parkingRemainingSpaces;
        this.relayRemainingSpaces = relayRemainingSpaces;
    }

    prepareQuery() {
         return `REPLACE into parking_realtime (parking_id, places_restantes_total, places_restantes_parking, places_restantes_relais , heure_maj) values("${this.parkingId}", ${this.totalRemainingSpaces}, ${this.parkingRemainingSpaces}, ${this.relayRemainingSpaces}, ${this.lastUpdateTime})`;
    }
}
