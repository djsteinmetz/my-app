import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite';
import { isAuthenticated } from "../../../helpers/auth.helpers";
import { IDecodedToken } from "../../../models/decoded-token.interface";
const { verify } = require('jsonwebtoken');

export default isAuthenticated(async function getMyBooks(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    let token = req?.cookies?.['bookster.access_token'];
    if (req?.headers?.authorization) {
        token = req?.headers?.authorization?.split(' ')?.[1];
    }
    try {
        const decodedToken: IDecodedToken = await verify(token, process.env.API_SECRET);
        const db = await sqlite.open('./mydb.sqlite');
        const books = await db.all('select Users.ID, Users.FullName, Users.Email, Books.ID, Books.Title, Books.Genre, Books.Author, Books.Description, Books.OwnerID from Users INNER JOIN Books ON Users.ID = Books.OwnerID WHERE Users.ID = ?', [decodedToken?.usr]);
        return res.status(200).json(books);
      } catch(err) {
        // err
        res.status(500).json({
            Error: err
        })
      }
});