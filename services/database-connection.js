const promise = require('promised-io/promise');
const MongoClient = require('mongodb').MongoClient;

class DatabaseConnection
{
    /**
     * upon object creation an automatic connection to database is established
     * @param config database connection config
     * @param autoConnect whether instantiate database connection upon object initialization or not
     * @returns {Promise} connection establishment promise
     */
    constructor(config, autoConnect = true)
    {
        this.config = config;
        if (autoConnect) return this.connect();
    }

    /**
     * Establishes MongoDB connection
     * @returns {Promise}
     */
    connect()
    {
        let deferred = promise.defer();
        let url = `mongodb://` +
            `${this.config.DB_USERNAME}:${this.config.DB_PASSWORD}@` +
            `${this.config.DB_HOST}:${this.config.DB_PORT}/${this.config.DB_NAME}?authSource=${this.config.DB_AUTH}`;

        console.log("Connecting to database", url);
        try {
            MongoClient.connect(url, function(error, db) {
                if (error) {
                    console.log("Database connection error: " + url, error);
                    deferred.reject(db);
                } else {
                    console.log("Database connection established");
                    deferred.resolve(db);
                }
            });

        } catch (Exception) {
            deferred.reject(Exception);
        }
        return deferred.promise;
    }
}

module.exports = DatabaseConnection;