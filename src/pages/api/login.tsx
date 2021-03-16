import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite'
import { compare } from 'bcrypt';
import { IUser } from "../../models/users.interface";

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');
    if (req.method === 'POST') {
        const user: IUser = await db.get(`SELECT * FROM Users WHERE ID = ?`, [req.body.ID])
        compare(req.body.Password, user?.Password, function(err, result) {
            // result == true
            if (!err && result) {
                res.status(200).json({ 'status': res.status, 'message': 'Authenticated' })
            } else {
                res.status(401).json({ 'status': res.status, 'message': 'Unauthorized' })
            }
        });
    } else {
        res.status(405).json({ message: 'Invalid request' })
    }
}