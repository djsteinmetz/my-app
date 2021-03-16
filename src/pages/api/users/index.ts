import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite';

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
    const db = await sqlite.open('./mydb.sqlite');
    const users = await db.all('select ID, FullName, Email from users');
    return res.json(users);
}