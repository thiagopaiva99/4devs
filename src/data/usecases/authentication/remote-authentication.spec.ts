import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

describe('Remote Authentication', () => {
    test('should call HttpPostClient with correct url', async () => {
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    })
})