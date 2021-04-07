import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy;
}

const sutFactory = (url = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('Remote Authentication', () => {
    test('should call HttpPostClient with correct url', async () => {
        const url = 'any_url';
        const { sut, httpPostClientSpy } = sutFactory();
        sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    })
})