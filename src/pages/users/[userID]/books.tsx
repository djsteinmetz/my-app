import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prodEnv, testEnv } from '../../../../environments/environments.config';
import { IUser, IUserDetailsProps, IUserDetailsPageContext } from '../../../models/users.interface';

export default function UserDetails({userDetails}: IUserDetailsProps): JSX.Element {
    const router = useRouter();
    const [user, setUser] = useState(userDetails);
    useEffect(() => {
        async function loadUser() {
            const response = await fetch(`${process.env.NODE_ENV === 'development' ? testEnv.baseUrl : prodEnv.baseUrl}/users?ID=${router?.query?.userID}`);
            const user = await response.json();
            setUser(user[0])
        }
        if (!user?.ID) {
            loadUser();
        }
    }, [])
    return <h2>{user?.ID ? `${user?.FullName} has ${user?.BookCount} books` : `Loading ...`}</h2>
}

UserDetails.getInitialProps = async ({query, req}: IUserDetailsPageContext) => {
    if (!req) {
        return { user: {} };
    }

    const response = await fetch(`${process.env.NODE_ENV === 'development' ? testEnv.baseUrl : prodEnv.baseUrl}/users?ID=${query.userID}`);
    const user: IUser[] = await response.json();
    return {userDetails: user?.[0]}
  }