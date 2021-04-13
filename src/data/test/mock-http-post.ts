import { HttpPostParams } from "../protocols/http";
import { internet, random } from 'faker';

export const httpPostMockFactory = (): HttpPostParams<any> => ({
    url: internet.url(),
    body: random.objectElement()
})