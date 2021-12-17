import https from "https";
import mariadb from "mariadb";

export default class Connector {
    static hostname;
    static endpoint;
    static pool = mariadb.createPool({host: "localhost", user: "root", password: "cul", database: "parkings", connectionLimit: 5});

    static convert(nativeData) {}

    static get() {
        const options = {
            hostname: this.hostname,
            port: 443,
            path: this.endpoint,
            method: 'GET'
        };

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {
                this.onResult(this.convert(d));
            })
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    }

    static async onResult(data) {
        const conn = await this.pool.getConnection();
        for (const value of data) {
            if (value.totalRemainingSpaces === null && value.parkingRemainingSpaces === null) {
                continue;
            }
            try {
                await conn.query(value.prepareQuery());
            } catch (err) {
                throw err;
            }
        }

        if (conn) await conn.release(); //release to pool
    }
}
