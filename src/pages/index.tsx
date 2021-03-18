import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Person';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { isLoggedIn } from '../helpers/auth.helpers';
import cookie from 'cookie';
import { NextPageContext } from 'next';
import { parseCookies } from '../helpers/cookie.helpers';

export default function homepage({ isLoggedIn }: any) {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  if (loggedIn) {
    return (
      <React.Fragment>
        <h1 style={{textAlign: 'center'}}>Welcome to Bookster</h1>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 1) {
              router.push('/books', '/books');
            }
            if (newValue === 2) {
              router.push('/users', '/users');
            }
          }}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Books" icon={<BookIcon />} />
          <BottomNavigationAction label="Users" icon={<UserIcon />} />
        </BottomNavigation>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>Loading...</React.Fragment>
    )
  }
}

homepage.getInitialProps = (ctx: NextPageContext) => {
    const cookies = parseCookies(ctx)
    // const cookies = cookie.parse(ctx.req?.headers.cookie!);
    const token = cookies['bookster.access_token'];
    const authorized = isLoggedIn(token);
    return { isLoggedIn: authorized };
}