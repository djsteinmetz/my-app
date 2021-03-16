import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NextPageContext } from 'next';
import { IBook, IBooksListProps } from '../../models/books.interface';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AllUsers({ booksList }: IBooksListProps) {
    const [books, setBooks] = useState(booksList);
    useEffect(() => {
        async function loadBooks() {
            const response = await fetch(`http://localhost:3000/api/books`);
            const books: IBook[] = await response.json();
            setBooks(books)
        }
        console.log({books})
        if (!books) {
            loadBooks();
        }
    }, [])

    return (
        <div>
            <Link as="/" href="/">
                <a>Home</a>
            </Link>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Genre</TableCell>
                            <TableCell align="left">Owner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books?.map((row: IBook) => (
                            <TableRow key={row.interopID}>
                                <TableCell component="th" scope="row">
                                    {row.Title}
                                </TableCell>
                                <TableCell align="left">{row.Genre}</TableCell>
                                <TableCell align="left"><Link as={`/users/${row.OwnerID}`} href="/users/[userID]"><a>{row.FullName}</a></Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

AllUsers.getInitialProps = async ({ query, req }: NextPageContext) => {
    if (!req) {
        return { booksList: null };
    }

    const response = await fetch(`http://localhost:3000/api/books`);
    const booksList: IBook[] = await response.json();
    return { booksList: booksList }
}