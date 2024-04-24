import { tokenAdapter } from "../../../src/config/plugins";

describe('token jwt plugin', () => {

    const payload = {
        username: 'admin',
        email   : 'admin@google.com'
    };

    test('tokenAdapter.generate() should return a token', () => {
        const token = tokenAdapter.generate(payload);
        
        expect(typeof token).toBe('string');
    });

    test('tokenAdapter.validate() should return an object of a token valid', () => {
        const token = tokenAdapter.generate(payload);

        const resToken = tokenAdapter.validate(token);

        expect(resToken).toEqual({
            ...payload,
            iat: expect.any(Number),
            exp: expect.any(Number)
        });
    });

    test('tokenAdapter.validate() should return an error if a token is invalid', () => {
        try {
            const token = 'abcdefg';
            tokenAdapter.validate(token);
        } catch (error: any) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe('Invalid token');
        }
    });

});