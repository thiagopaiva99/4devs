import { RemoteAuthentication } from "@/data/usecases/authentication";
import { Authentication } from "@/domain/usecases";
import { axiosHttpClientFactory } from "@/main/factories/http/axios-http-client.factory";
import { apiUrlFactory } from "../../http/api-url.factory";

export const remoteAuthenticationFactory = (): Authentication => {
    return new RemoteAuthentication(apiUrlFactory('/login'), axiosHttpClientFactory());
} 