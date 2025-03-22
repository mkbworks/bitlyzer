/**
 * Model to encapsulate errors occuring while performing SQL tasks.
 */
class AppError {
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
}

export default AppError;