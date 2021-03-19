import Link from 'next/link';
import Button from '@material-ui/core/Button';
import React from 'react';

export default function AuthMenuItems(props: any) {
  const { isLoggedIn, classes, handleLogout } = props;
  
  if (isLoggedIn) {
    return (
      <nav>
        <Link href="/books" as="/books">
          <Button className={classes.link}>Browse Books</Button>
        </Link>
        <Link href="/my-account/books" as="/my-account/books">
          <Button
            className={classes.link}
          >
            My Books
          </Button>
        </Link>
        {/* <Link href="/users" as="/users">
          <Button className={classes.link}>Users</Button>
        </Link> */}
        <Button
          color="primary"
          variant="text"
          className={classes.link}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </nav>
    );
  }
  return (
    <React.Fragment>
      <Link href="/login" as="/login">
          <Button color="primary" variant="contained" className={classes.link}>
            Login
          </Button>
        </Link>
        <Link href="/register" as="/register">
          <Button color="primary" variant="outlined" className={classes.link}>
            Register
          </Button>
        </Link>
    </React.Fragment>
  );
}
