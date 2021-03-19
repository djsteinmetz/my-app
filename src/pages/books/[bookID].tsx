import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IBook, IBooksDetailsPageContext, IBookDetailsProps } from '../../models/books.interface';
import { prodEnv, testEnv } from '../../../environments/environments.config';

export default function AllUsers({ book }: IBookDetailsProps) {
    return (
        <div>
            {JSON.stringify(book, null, 2)}
        </div>
    )
}

AllUsers.getInitialProps = async ({ query, req }: IBooksDetailsPageContext) => {
    if (!req) {
        return { book: {} };
    }

    const response = await fetch(`${process.env.NODE_ENV === 'development' ? testEnv.baseUrl : prodEnv.baseUrl}/api/books/${query.bookID}`);
    const book: IBook = await response.json();
    return { book: book }
}