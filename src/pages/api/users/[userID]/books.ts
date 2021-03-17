import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { isAuthenticated } from '../../../../helpers/auth.helpers';

export default isAuthenticated(async function getAllBooksByUserID(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');
    const books = await db.all('select * from books where OwnerID = ?', [req.query.userID]);
    return res.json(books)
});