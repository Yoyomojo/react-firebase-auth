import { useContext } from 'react';
import { AuthContext } from '../../firebase/context';

const Landing = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {!!user ?
                <h1>Home Logged In</h1>
            :
                <h1>Home Logged Out</h1>
            }
        </>
    )
}

export default Landing;