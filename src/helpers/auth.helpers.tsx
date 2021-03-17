import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { IDecodedToken } from "../models/decoded-token.interface";
import { AuthError } from "../models/errors.interface";
const { verify } = require('jsonwebtoken');
require('dotenv').config();

export const isAuthenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.headers.authorization!, process.env.API_SECRET, async function(err: Error, decoded: unknown) {
        if (!err && decoded) {
            console.log(decoded)
            return await fn(req, res);
        }

        res.status(401).json({ 'message': 'Unauthorized' })
      });
}

export const isAdminUser = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.headers.authorization!, process.env.API_SECRET, async function(err: Error, decoded: any) {
        const isAdminUser = decoded?.roles?.includes('Admin');
        if (!err && decoded && isAdminUser) {
            console.log(decoded);
            return await fn(req, res);
        }

        res.status(401).json(generateRolesError(req.headers.authorization));
    });
}

export const isAdmin = (token: any): boolean => {
    const decoded = verify(token, process.env.API_SECRET);
    return decoded?.roles?.includes('Admin');
}

export const generateRolesError = (token?: string): AuthError => {
    const decoded: IDecodedToken = verify(token, process.env.API_SECRET);
    return {
        "error": "invalid_grant",
        "error_description": "User does not have the required roles to perform this action.",
        "Errors": [
            {
                "ErrorCode": "Auth.InsufficientRole",
                "Message": "User is missing the required roles.",
                "Data": {
                    "TokenRoles": decoded?.roles,
                    "RequiredRoles": ['Admin'],
                }
            }
        ]
    }
}