import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getAllBooksByUserID(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
    const db = await sqlite.open('./mydb.sqlite');
    const books = await db.all('select * from books where OwnerID = ?', [req.query.userID]);
    return res.json(books)
}