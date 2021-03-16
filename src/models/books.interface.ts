import { NextPageContext } from "next";

export interface IBook {
    interopID: number;
    ID: string;
    Title: string;
    Genre: string;
    OwnerID: string;
    FullName: string;
    Email: string;
}

export interface IBooksListProps {
    booksList?: IBook[]
}

export interface IBookDetailsProps {
    book?: IBook
}

export interface IBooksDetailsPageContext extends NextPageContext {
    query: {
      bookID: string
    }
}