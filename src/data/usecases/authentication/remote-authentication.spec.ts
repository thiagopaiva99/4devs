import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { internet } from 'faker';
import { mockAuthentication } from "../../../domain/test/mock-authentication";

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
        sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    })

    test('should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        const authenticationBody = mockAuthentication();
        sut.auth(authenticationBody);
        expect(httpPostClientSpy.body).toEqual(authenticationBody);
    })
})