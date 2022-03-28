import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import UserMenu from '../UserMenu';
import { notesServices } from '../../services/notesServices';

function Header(props) {
	const displayName = props?.userData?.user?.displayName || 'U N';
	const [anchorElementForUserMenu, setAnchorElementForUserMenu] =
		useState(null);
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' color='secondary'>
					<Toolbar variant='dense'>
						<Grid
							container
							justifyContent='center'
							alignItems='center'
						>
							<Grid item xs={6} sm={6} md={6}>
								<Typography
									variant='h6'
									color='inherit'
									component='div'
									align='right'
									onClick={() => notesServices.test()}
								>
									Notes
								</Typography>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								sx={{
									display: 'flex',
									flexDirection: 'row-reverse',
								}}
							>
								<Avatar
									{...stringAvatar(displayName)}
									onClick={(e) => setAnchorElementForUserMenu(e.currentTarget)}
									sx={{cursor:'pointer'}}
								/>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Box>
			<UserMenu
				anchorElementForUserMenu={anchorElementForUserMenu}
				setAnchorElementForUserMenu={setAnchorElementForUserMenu}
			/>
		</>
	);
}
function mapToState(state) {
	const { userReducer } = state;
	const { userData } = userReducer;
	return {
		userData,
	};
}

export default connect(mapToState)(Header);

Header.propsType = {
	userData: PropTypes.object.isRequired,
	signOut: PropTypes.func.isRequired,
};

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	const firstLetterOfFirstName = name.split(' ')[0][0];
	let firstLetterOfLastName = '';
	if (name.split(' ').length > 1) {
		firstLetterOfLastName = name.split(' ')[1][0];
	}
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${firstLetterOfFirstName}${firstLetterOfLastName}`,
	};
}
