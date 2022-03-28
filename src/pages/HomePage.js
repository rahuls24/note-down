import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Auth from '../components/Auth';
import Header from '../components/common/Header';
import NotesView from '../components/NotesView';
import firebaseConfig from '../configs/firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const shouldShowAuthPage = isLoggedIn => {
	if (isLoggedIn) return false;
	return true;
};

function HomePage(props) {
	const { isLoggedIn } = props;
	const [firebaseInitialized, setFirebaseInitialized] = useState(false);
	useEffect(() => {
		firebaseConfig.isInitialized().then(val => {
			setFirebaseInitialized(val);
			setTakingLongTimeToLoadText(',');
		});
	}, []);
	const [takingLongTimeToLoadText, setTakingLongTimeToLoadText] =
		useState(',');
	useEffect(() => {
		let timeout = setTimeout(() => {
			setTakingLongTimeToLoadText(
				'It is taking more time to load, may be your network speed is slow',
			);
		}, 100);
		return () => clearTimeout(timeout);
	});
	return (
		<>
			{shouldShowAuthPage(isLoggedIn) && <Auth />}
			{!shouldShowAuthPage(isLoggedIn) && (
				<>
					{firebaseInitialized && (
						<>
							<Header />
							<NotesView />
						</>
					)}
					{!firebaseInitialized && (
						<Box
							sx={{
								height: '100vh',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								gap: '16px',
							}}
						>
							<CircularProgress color='secondary' size={100} />
							<Box
								component={'div'}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography variant='caption'>
									{takingLongTimeToLoadText.split(',')[0]}{','}
								</Typography>
								<Typography variant='caption'>
								{takingLongTimeToLoadText.split(',')[1]}{'.'}
								</Typography>
							</Box>
							
						</Box>
					)}
				</>
			)}
		</>
	);
}
function mapToState(state) {
	const { userReducer } = state;
	const { isLoggedIn } = userReducer;
	return {
		isLoggedIn,
	};
}
export default connect(mapToState)(HomePage);

HomePage.propTypes = {
	isLoggedIn: PropType.bool,
};
