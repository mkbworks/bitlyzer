/**
 * Model to encapsulate data to be returned by functions in DataAccessLayer.
 */
class Response {
    constructor(status, data) {
        this.status = status.trim();
        this.data = data;
    }
}

/**
 * Model to encapsulate errors occuring while performing SQL tasks.
 */
class SqlError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Function that returns a custom error message for the SqlError instance.
     * @returns {string} - the custom error message received.
     */
    toString() {
        return `Error :: ${this.code} :: ${this.message}`;
    }
}

export { Response, SqlError };