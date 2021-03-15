import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllBooksByUserID(req: NextApiRequest, res: NextApiResponse) {
    res.json({ byID: req.query.userID, message: 'Successful GET user books' })
}