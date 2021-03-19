import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { isAuthenticated } from '../../../helpers/auth.helpers';

export default isAuthenticated(async function getBookByID(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');
    const book = await db.get('select * from books where ID = ?', [req.query.bookID]);
    return res.json(book);
});