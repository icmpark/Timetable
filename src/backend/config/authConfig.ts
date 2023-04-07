import { registerAs } from "@nestjs/config";
export const SECRET_KEY = 'SECRETKEY';

export default registerAs('auth', () => ({
    secret_key: SECRET_KEY,
    refresh_expiresIn: '1d',
    expiresIn: '1h',
    audience: 'localhost:3000',
    issuer: 'localhost:3000',
    salt: 'SALT',
    round: 10
}));


