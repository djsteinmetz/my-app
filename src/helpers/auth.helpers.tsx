import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { IDecodedToken } from "../models/decoded-token.interface";
import { AuthError } from "../models/errors.interface";
const { verify } = require('jsonwebtoken');
require('dotenv').config();
import cookie from 'cookie';

export const isAuthenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    let token = req?.cookies?.['bookster.access_token'];
    if (req?.headers?.authorization) {
        token = req?.headers?.authorization?.split(' ')?.[1];
    }
    try {
        verify(token, process.env.API_SECRET, async function(err: Error, decoded: unknown) {
            if (!err && decoded) {
                return await fn(req, res);
            }
    
            res.writeHead(401, { Location: 'http://localhost:3000/login'});
            res.end();
        });
      } catch(err) {
        res.writeHead(500);
        res.end();
      }
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

export const logout = () => {
}

export const isLoggedIn = (token: string): boolean => {
    let isAuthenticated = false;
    verify(token, process.env.API_SECRET, async function(err: Error, decoded: unknown) {
        if (!err && decoded) {
            isAuthenticated = true;
        }
    });
    return isAuthenticated;
}