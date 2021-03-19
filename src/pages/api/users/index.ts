import { NextApiRequest, NextApiResponse } from "next";
import sqlite from 'sqlite';
import { isAuthenticated } from "../../../helpers/auth.helpers";

export default isAuthenticated(async function getAllUsers(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');
    const users = await db.all('select ID, FullName, Email, Active, Verified from users');
    return res.status(200).json(users);
});