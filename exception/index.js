class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.status = 404
        this.message = message
    }
}

class AuthenticationException extends Error {
    constructor(message) {
        super(message);
        this.status = 401
        this.message = message
    }
}

class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.status = 400,
        this.message = message
    }
}

class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.status = 401,
        this.message = message
    }
}

class ForbiddenException extends Error {
    constructor(message) {
        super(message);
        this.status = 403,
        this.message = message
    }
}

class UnprocessableEntityException extends Error {
    constructor(message) {
        super(message);
        this.status = 422.
        this.message = message
    }
}

module.exports = {
    NotFoundException,
    AuthenticationException,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    UnprocessableEntityException
}
