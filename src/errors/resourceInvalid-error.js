
class ResourceInvalidError extends Error {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
        this.httpCode = 400;
    }
}

module.exports = ResourceInvalidError;