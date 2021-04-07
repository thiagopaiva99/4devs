import { AuthenticationParams } from '@/domain/usecases/authentication';
import { internet } from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
    email: internet.email(),
    password: internet.password()
})