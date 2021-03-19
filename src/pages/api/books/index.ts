import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import { isAuthenticated } from "../../../helpers/auth.helpers";
import { IDecodedToken } from "../../../models/decoded-token.interface";
import { v4 as uuidv4 } from 'uuid';
const { verify } = require("jsonwebtoken");

export default isAuthenticated(async function getAllBooks(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const db = await sqlite.open("./mydb.sqlite");
  if (req.method === "POST") {
    let token = req?.cookies?.["bookster.access_token"];
    if (req?.headers?.authorization) {
      token = req?.headers?.authorization?.split(" ")?.[1];
    }
    try {
      const decodedToken: IDecodedToken = verify(token, process.env.API_SECRET);
      const uniqueID = uuidv4();
      const statement = await db.prepare(
        "INSERT INTO books(ID, Title, Author, Description, Genre, OwnerID) values (?, ?, ?, ?, ?, ?)"
      );
      const result = await statement.run(
        uniqueID,
        req.body.Title,
        req.body.Author,
        req.body.Description,
        req.body.Genre,
        decodedToken.usr
      ).catch(err => res.status(500).json({Message: 'An Error occurred on the server'}));
      const book = await db.get('select Users.ID, Users.FullName, Users.Email, Books.ID, Books.Title, Books.Author, Books.Description, Books.Genre, Books.Author, Books.Description, Books.OwnerID from Users INNER JOIN Books ON Users.ID = Books.OwnerID WHERE Books.ID = ?', [uniqueID]);
      return res.status(201).json(book);
    } catch (err) {
      return res.status(500).json(err)
    }
  }
  const books = await db.all(
    "select Users.FullName, Users.Email, Books.ID, Books.Title, Books.Author, Books.Description, Books.Genre, Books.OwnerID from Users INNER JOIN Books ON Users.ID = Books.OwnerID"
  );
  return res.status(200).json(books);
});
