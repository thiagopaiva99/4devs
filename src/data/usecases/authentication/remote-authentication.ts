import { HttpPostClient } from "@/data/protocols/http/http-post-client";

export class RemoteAuthentication {
    constructor(private readonly url: string, private httpPostClient: HttpPostClient) {}

    async auth(): Promise<void> {
        return await this.httpPostClient.post({ url: this.url });
    }
}