import { useState } from 'react';
import Signin from './Signin';
import SignUp from './Signup';
function Auth() {
	const [isSigninPage, setSigninPageState] = useState(true);
	return (
		<>
			{isSigninPage ? (
				<Signin setSigninPageState={setSigninPageState} />
			) : (
				<SignUp setSigninPageState={setSigninPageState} />
			)}
		</>
	);
}
export default Auth;
