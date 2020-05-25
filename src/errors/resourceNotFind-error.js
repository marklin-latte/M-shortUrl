
class ResourceNotFindError extends Error {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
        this.httpCode = 404;
    }
}

module.exports = ResourceNotFindError;