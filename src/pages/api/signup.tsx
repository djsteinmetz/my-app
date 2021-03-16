import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite'
import { hash } from 'bcrypt';

export default async function signup(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'POST') {
        hash(req.body.Password, 12, async function(err: unknown, hash: string) {
            // Store hash in your password DB.
            const statement = await db.prepare('INSERT INTO users(ID, FullName, Email, Password) values (?, ?, ?, ?)');
            const result = await statement.run(req.body.ID, req.body.FullName, req.body.Email, hash);
            result.finalize();
            const user = await db.get(`SELECT * FROM Users WHERE ID = ?`, [req.body.ID])
            res.status(201).json(user);
        });
    } else {
        res.status(405).json({ message: 'Invalid request' })
    }
}