import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";

export class RemoteAuthentication {
    constructor(private readonly url: string, private httpPostClient: HttpPostClient) {}

    async auth(params: AuthenticationParams): Promise<void> {
        const httpResponse =  await this.httpPostClient.post({ url: this.url, body: params });

        switch(httpResponse.statusCode) {
            case HttpStatusCode.UNAUTHORIZED:
                throw new InvalidCredentialsError();

            default:
                return Promise.resolve();
        }
    }
}