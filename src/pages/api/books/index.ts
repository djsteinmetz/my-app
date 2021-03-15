import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../models/user.interface";
import sqlite from 'sqlite';

export default async function getAllBooks(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
    const db = await sqlite.open('./mydb.sqlite');
    const books = await db.all('select * from books');
    return res.json(books);
}