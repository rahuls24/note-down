import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const theme = createTheme();
const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(6, 'Password should be of minimum 6 characters length')
		.required('Password is required'),
});
function Signin(props) {
	const {
		signinUser,
		setSigninPageState,
		setAuthErrorMsg,
		authErrorMsg,
		signinUserWithGoogle,
	} = props;
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			signinUser(values);
		},
	});
	const errorMessageCloseHandler = () => {
		setAuthErrorMsg(null);
	};
	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5' color='secondary'>
						Sign in
					</Typography>
					<Button
							onClick={() => signinUserWithGoogle()}
							fullWidth
							variant='outlined'
							sx={{ mt: 3, mb: 2 }}
							color='error'
						>
						Sign In With Google
					</Button>
					<Divider sx={{width:'100%'}}> OR </Divider>
					<Box
						component='form'
						onSubmit={formik.handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							fullWidth
							id='email'
							name='email'
							label='Email'
							value={formik.values.email}
							onChange={formik.handleChange}
							error={
								formik.touched.email &&
								Boolean(formik.errors.email)
							}
							helperText={
								formik.touched.email && formik.errors.email
							}
							color='secondary'
						/>
						<TextField
							margin='normal'
							fullWidth
							id='password'
							name='password'
							label='Password'
							type='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password)
							}
							helperText={
								formik.touched.password &&
								formik.errors.password
							}
							color='secondary'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							color='secondary'
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Button
									variant='text'
									color='secondary'
									component='div'
								>
									Forgot password?
								</Button>
							</Grid>
							<Grid item>
								<Button
									onClick={() => setSigninPageState(false)}
									variant='text'
									color='secondary'
									component='div'
								>
									{"Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Snackbar
					open={authErrorMsg ? true : false}
					autoHideDuration={6000}
					onClose={errorMessageCloseHandler}
				>
					<Alert
						severity='error'
						sx={{ width: '100%' }}
						onClose={errorMessageCloseHandler}
					>
						{authErrorMsg}
					</Alert>
				</Snackbar>
			</Container>
		</ThemeProvider>
	);
}

function mapToState(state) {
	const { userReducer } = state;
	const { authErrorMsg } = userReducer;
	return {
		authErrorMsg,
	};
}
const mapToDispatch = {
	signinUser: userActions.signinUser,
	guestUserLogin: userActions.guestUserLogin,
	setAuthErrorMsg: userActions.setAuthErrorMsg,
	signinUserWithGoogle: userActions.signinUserWithGoogle,
};

export default connect(mapToState, mapToDispatch)(Signin);

Signin.propTypes = {
	setSigninPageState: PropTypes.func.isRequired,
	signinUser: PropTypes.func.isRequired,
	guestUserLogin: PropTypes.func.isRequired,
};
