class Response {
    constructor(status, data) {
        this.status = status.trim();
        this.data = data;
    }
}

class SqlError {
    constructor(code, message) {
        this.code = code.trim();
        this.message = message.trim();
    }

    toString() {
        return `Error :: ${this.code} :: ${this.message}`;
    }
}

export { Response, SqlError };