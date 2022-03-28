import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
const validationSchema = yup.object({
	note: yup
		.string('Enter category name')
		.trim('')
		.min(2, 'A note should be of minimum 2 characters length')
		.required('Note name is required')
});
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function AddNotePopup(props) {
	const { open, setOpen, saveNoteHandler, inputValue } = props;
	const handleClose = () => {
		setOpen(false);
	};
	const formik = useFormik({
		initialValues: {
			note: inputValue || '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			saveNoteHandler(values.note);
			formik.resetForm();
			handleClose();
		},
	});
	return (
		<div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				component='form'
				onSubmit={formik.handleSubmit}
			>
				<AppBar sx={{ position: 'relative' }} color='secondary'>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant='h6'
							component='div'
						>
							Add
						</Typography>
						<Button autoFocus color='inherit' type='submit'>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<Container component='main' maxWidth='sm' sx={{ marginTop: 2 }}>
					<CssBaseline />
					<TextField
						autoFocus
						margin='dense'
						id='note'
						label='Note'
						type='text'
						fullWidth
						variant='standard'
						color='secondary'
						value={formik.values.note}
						onChange={formik.handleChange}
						error={
							formik.touched.note && Boolean(formik.errors.note)
						}
						helperText={formik.touched.note && formik.errors.note}
						multiline
						maxRows={8}
					/>
				</Container>
			</Dialog>
		</div>
	);
}

export default AddNotePopup;

AddNotePopup.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	saveNoteHandler: PropTypes.func.isRequired,
	inputValue: PropTypes.string,
};
