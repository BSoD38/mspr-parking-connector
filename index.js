import GrenobleSmmagConnector from "./grenoble-smmag-connector.js";

GrenobleSmmagConnector.get();
setInterval(() => {
    GrenobleSmmagConnector.get();
}, 10000);
