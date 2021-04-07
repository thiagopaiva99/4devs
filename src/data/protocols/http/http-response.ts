export enum HttpStatusCode {
    UNAUTHORIZED = 401,
    NO_CONTENT = 204
}

export type HttpResponse = {
    statusCode: HttpStatusCode;
    body?: any;
};