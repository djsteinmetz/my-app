import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { isAuthenticated } from '../../../../helpers/auth.helpers';

export default isAuthenticated(async function getUserByID(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'PUT')  {
        const statement = await db.prepare('UPDATE users SET FullName= ?, Email= ? WHERE ID= ?');
        const result = await statement.run(req.body.FullName, req.body.Email, req.query.userID);
        result.finalize();
    }
    const user = await db.get('select * from users where ID = ?', [req.query.userID]);
    return res.json(user)
});