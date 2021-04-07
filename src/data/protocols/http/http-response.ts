export enum HttpStatusCode {
    OK = 200,
    NO_CONTENT = 204,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export type HttpResponse = {
    statusCode: HttpStatusCode;
    body?: any;
};