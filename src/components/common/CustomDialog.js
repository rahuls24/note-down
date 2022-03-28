import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
export default function CustomDialog(props) {
	const { open, setOpen, acceptHandler, title, text,acceptBtnText,cancelBtnTex } = props;
	const handleClose = () => {
		setOpen(false);
	};
    const dialogActionHandler = (isAccepted) => {
        acceptHandler(isAccepted);
        setOpen(false)
    }
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={()=>dialogActionHandler(false)}>{cancelBtnTex}</Button>
				<Button onClick={() =>dialogActionHandler(true)} autoFocus>
					{acceptBtnText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
CustomDialog.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	acceptHandler: PropTypes.func,
	title: PropTypes.string,
	text: PropTypes.string,
	acceptBtnText:PropTypes.string.isRequired,
	cancelBtnTex:PropTypes.string.isRequired,
};
