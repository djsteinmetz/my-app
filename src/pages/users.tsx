import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { IUser } from '../models/user.interface'

export interface IListProps {
  users?: IUser[]
}

export default function UsersList({users}: IListProps): JSX.Element {  
  const totalBookCount = users?.map(user => user.BookCount).reduce((a, b) => a + b, 0);
  return (
    <div style={{maxWidth: '500px', margin: 'auto'}}>
      <h2>Current Inventory: {totalBookCount} Books In-stock</h2>
      {users?.map((e, index) => (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>
            <p>{e?.FullName}</p>
          <Link as={`/users/${e?.ID}/books`} href="users/[userID]/books">
            <a>
              Navigate to {e?.FullName}'s books
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

UsersList.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/users');
  const users: IUser[] | undefined = await response.json();
  return {users: users}
}