import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite';

export default async function getAllBooks(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');
    const books = await db.all('select Users.FullName, Users.Email, Books.ID, Books.Title, Books.Genre, Books.OwnerID from Users INNER JOIN Books ON Users.ID = Books.OwnerID');
    return res.json(books);
}