import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe('Remote Authentication', () => {
    test('should call HttpPostClient with correct url', async () => {
        class HttpPostClientSpy implements HttpPostClient {
            url?: string;

            async post(url: string): Promise<void> {
                this.url = url;

                return Promise.resolve();
            }
        }

        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        // SUT = system under test
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    })
})