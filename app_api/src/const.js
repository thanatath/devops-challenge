const LogLevel = {
    ERROR: 'error',
    INFO: 'info',
    COMBINED: 'combined',
};
  
const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
};

const ApiRoute = {
    USERS: '/api/users',
};

const DEFAULT_PORT = 3064;

module.exports = {
    LogLevel,
    HttpStatus,
    ApiRoute,
    DEFAULT_PORT,
};