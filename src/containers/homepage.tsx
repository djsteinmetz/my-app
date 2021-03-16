import Link from 'next/link'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Person';
import React from 'react';
import { useRouter } from 'next/router'

export function homepage() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue)
        setValue(newValue);
        if (newValue === 0) {
          router.push('/books', '/books');
        }
        if (newValue === 1) {
          router.push('/users', '/users');
        }
      }}
      showLabels
    >
      <BottomNavigationAction label="Books" icon={<BookIcon />} />
      <BottomNavigationAction label="Users" icon={<UserIcon />} />
    </BottomNavigation>
  )
}