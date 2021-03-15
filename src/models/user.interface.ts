import { NextPageContext } from "next";

export interface IUser {
    ID: string;
    FullName: string;
    BookCount: number;
}

export interface IUserDetailsProps {
    userDetails?: IUser
}

export interface UserDetailsPageContext extends NextPageContext {
    query: {
      userID: string
    }
}