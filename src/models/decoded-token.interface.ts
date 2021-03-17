export interface IDecodedToken {
    usr: string;
    roles: string[];
    iat: number;
    exp: number;
}