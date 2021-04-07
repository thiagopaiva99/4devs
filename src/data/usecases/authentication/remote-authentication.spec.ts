import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { internet } from 'faker';

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy;
}

const sutFactory = (url = internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut,
        httpPostClientSpy
    }
}

describe('Remote Authentication', () => {
    test('should call HttpPostClient with correct url', async () => {
        const url = internet.url();
        const { sut, httpPostClientSpy } = sutFactory(url);
        sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    })
})