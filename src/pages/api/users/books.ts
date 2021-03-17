import { NextApiRequest, NextApiResponse } from 'next';
import { isAuthenticated } from '../../../helpers/auth.helpers';

export default isAuthenticated(function getAllBooksByUserID(req: NextApiRequest, res: NextApiResponse) {
    res.json({ byID: req.query.userID, message: 'Successful GET user books' })
});