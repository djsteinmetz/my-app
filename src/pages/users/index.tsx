import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NextPageContext } from 'next';
import { IUser, IUserListProps } from '../../models/users.interface';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Header from '../../components/header';

export default function AllUsers({ usersList }: IUserListProps) {
    const [users, setUsers] = useState(usersList);
    useEffect(() => {
        async function loadUsers() {
            const response = await fetch(`http://localhost:3000/api/users`);
            const users: IUser[] = await response.json();
            setUsers(users)
        }
        if (!users) {
            loadUsers();
        }
    }, [])

    return (
        <div>
            <Header />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { users?.map((row: IUser) => (
                            <TableRow key={row.ID}>
                                <TableCell component="th" scope="row">
                                    {row.FullName}
                                </TableCell>
                                <TableCell align="left">{row.Email}</TableCell>
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
        return { usersList: [] };
    }

    const response = await fetch(`http://localhost:3000/api/users`);
    const users: IUser[] = await response.json();
    return { usersList: users }
}