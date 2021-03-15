import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getBookByID(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
    const db = await sqlite.open('./mydb.sqlite');
    const book = await db.get('select * from books where ID = ?', [req.query.bookID]);
    return res.json(book);
}