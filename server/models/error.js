/**
 * Model to encapsulate errors occuring during request processing.
 */
class AppError {
    /**
     * Constructor to instantiate a new error.
     * @param {string} code error code
     * @param {string} message detailed message explaining the error
     */
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Function that returns a custom error message for the SqlError instance.
     * @returns {string} the custom error message.
     */
    ToString() {
        return `Error :: ${this.code} :: ${this.message}`;
    }

    /**
     * Converts the error instance to javascript object notation.
     * @returns {object} object representation of the error instance.
     */
    ToJson() {
        return {
            code: this.code,
            message: this.message
        };
    }
}

export default AppError;