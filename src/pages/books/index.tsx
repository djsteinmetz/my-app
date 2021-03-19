import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { NextPageContext } from "next";
import { IBook, IBooksListProps } from "../../models/books.interface";
import { useState, useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { getHelper } from "../../helpers/fetch.helpers";

export default function AllUsers({ booksList }: IBooksListProps) {
  const [books, setBooks] = useState(booksList);
  const router = useRouter();

  useEffect(() => {
    async function loadBooks() {
      const response = await fetch(`http://localhost:3000/api/books`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        router.push("/login");
      }
      const books: IBook[] = await response.json();
      setBooks(books);
    }
    if (!books?.length) {
      loadBooks();
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="left">Genre</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((row: IBook) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="left">{row.Author}</TableCell>
              <TableCell align="left">{row.Genre}</TableCell>
              <TableCell align="left">{row.Description}</TableCell>
              <TableCell align="left">
                <Link as={`/users/${row.OwnerID}`} href="/users/[userID]">
                  <a>{row.FullName}</a>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AllUsers.getInitialProps = async (ctx: NextPageContext) => {
  const json: IBook[] = await getHelper(`http://localhost:3000/api/books`, ctx);
  return { booksList: json };
};
