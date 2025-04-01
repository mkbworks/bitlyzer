/**
 * Model to encapsulate data to be returned by functions in DataAccessLayer.
 */
class Response {
    /**
     * Instantiates a new response object and initializes its attributes.
     * @param {string} status status of the response - "error" or "success".
     * @param {object} data any and all information associated with the response.
     */
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}

export default Response;