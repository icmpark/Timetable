export interface IAuthAdapter {
    create: (request) => Promise<boolean>;
    verify: (request) => Promise<boolean>;
}