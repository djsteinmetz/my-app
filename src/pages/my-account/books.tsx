import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getHelper } from "../../helpers/fetch.helpers";
import { IBook, IBooksListProps } from "../../models/books.interface";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

export default function MyBooks({ booksList }: IBooksListProps) {
  const [books, setBooks] = useState(booksList);
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [genre, setGenre] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as string);
  };

  useEffect(() => {
    async function loadBooks() {
      const response = await fetch(`http://localhost:3000/api/me/books`, {
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
  }, [booksList]);

  const handleSubmit = async () => {
    const req = await fetch(`http://localhost:3000/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Title: titleRef.current?.value,
        Author: authorRef.current?.value,
        Description: descriptionRef.current?.value,
        Genre: genre,
      }),
    });
    const res: IBook = await req.json();
    if (res && res.ID) {
      const newBooks = books?.concat(res);
      setBooks(newBooks);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
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
      </Grid>
      <Grid item xs={12} sm={4}>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            inputRef={titleRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="author"
            label="Author"
            type="author"
            id="author"
            inputRef={authorRef}
          />
          <TextField
            multiline
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="description"
            id="description"
            inputRef={descriptionRef}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="genre">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={genre}
              onChange={handleChange}
              label="Choose a genre"
            >
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
              <MenuItem value="Classics">Classics</MenuItem>
              <MenuItem value="Action/Adventure">Action/Adventure</MenuItem>
              <MenuItem value="Mystery">Mystery</MenuItem>
              <MenuItem value="Fantasy">Fantasy</MenuItem>
              <MenuItem value="Young Adult">Young Adult</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

MyBooks.getInitialProps = async (ctx: NextPageContext) => {
  const json: IBook[] = await getHelper(
    `http://localhost:3000/api/me/books`,
    ctx
  );
  return { booksList: json };
};
