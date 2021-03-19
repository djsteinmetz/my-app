import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import cookie from 'cookie';
import Router from 'next/router';
import { isLoggedIn } from '../../helpers/auth.helpers';
import AuthMenuItems from "./auth-menu-items";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    cursor: "pointer",
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const handleLogout = () => {
  Cookies.remove("bookster.access_token", {
    path: "/",
  });
  Router.push('/login');
};

export default function Header() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['bookster.access_token'];
    const authorized = isLoggedIn(token);
    setLoggedIn(authorized);
  });

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/" as="/">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Bookster
          </Typography>
        </Link>
        <AuthMenuItems isLoggedIn={loggedIn} classes={classes} handleLogout={handleLogout}/>
      </Toolbar>
    </AppBar>
  );
}
