import { NextPageContext } from "next";

export interface IUser {
    interopID: string;
    ID: string;
    FullName: string;
    Email: string;
    BookCount: number;
}

export interface IUserListProps {
    usersList: IUser[]
}

export interface IUserDetailsProps {
    userDetails?: IUser
}

export interface IUserDetailsPageContext extends NextPageContext {
    query: {
      userID: string
    }
}