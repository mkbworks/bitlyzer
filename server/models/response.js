/**
 * Model to encapsulate data to be returned by functions in DataAccessLayer.
 */
class Response {
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}

export default Response;