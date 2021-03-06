import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { NextPageContext } from "next";
import { IUser, IUserListProps } from "../../models/users.interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getHelper } from "../../helpers/fetch.helpers";
import { prodEnv, testEnv } from "../../../environments/environments.config";

export default function AllUsers({ usersList }: IUserListProps) {
  const [users, setUsers] = useState(usersList);
  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(`${process.env.NODE_ENV === 'development' ? testEnv.baseUrl : prodEnv.baseUrl}/api/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        router.push("/login");
      }
      const users: IUser[] = await response.json();
      setUsers(users);
    }
    if (!users?.length) {
      loadUsers();
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row: IUser) => (
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
  );
}

AllUsers.getInitialProps = async (ctx: NextPageContext) => {
  const json: IUser[] = await getHelper(`${process.env.NODE_ENV === 'development' ? testEnv.baseUrl : prodEnv.baseUrl}/api/users`, ctx);
  return { usersList: json };
};
