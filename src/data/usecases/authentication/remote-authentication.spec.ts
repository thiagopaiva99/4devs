import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication, mockAccountModel } from "@/domain/test/mock-account";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/domain/models/account-model";

import { internet } from 'faker';

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
}

const sutFactory = (url = internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    })

    test('should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        const authenticationBody = mockAuthentication();
        await sut.auth(authenticationBody);
        expect(httpPostClientSpy.body).toEqual(authenticationBody);
    })

    test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.UNAUTHORIZED
        }
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.BAD_REQUEST
        }
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
        }
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.NOT_FOUND
        }
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should return an AccountModel if HttpPostClient return 200', async () => {
        const { sut, httpPostClientSpy } = sutFactory();
        const httpResult = mockAccountModel();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.OK,
            body: httpResult
        }
        const account = await sut.auth(mockAuthentication());
        await expect(account).toEqual(httpResult)
    })
})