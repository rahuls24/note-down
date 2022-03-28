import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';
function UserMenu(props) {
	const { anchorElementForUserMenu, setAnchorElementForUserMenu,signOut } = props;
	const open = Boolean(anchorElementForUserMenu);
	const handleClose = () => {
		setAnchorElementForUserMenu(null);
	};

	const handleLogout = () =>{
		setAnchorElementForUserMenu(null);
		signOut()
	}

	return (
		<>
			<Menu
				id='user-menu'
				anchorEl={anchorElementForUserMenu}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
					'cursor': 'pointer',
				}}
			>
				<MenuItem onClick={() => handleClose()}>My account</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	);
}
const mapToDispatch = {
	signOut: userActions.signOut,
};
export default connect(null, mapToDispatch)(UserMenu);
