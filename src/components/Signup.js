import React from 'react';
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
	displayName: yup.string('Enter you Name').required('Name is required'),
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(6, 'Password should be of minimum 6 characters length')
		.required('Password is required'),
});

function SignUp(props) {
	const { registerUser, setSigninPageState, authErrorMsg, setAuthErrorMsg,signinUserWithGoogle } =
		props;
	const formik = useFormik({
		initialValues: {
			displayName: '',
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			registerUser(values);
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
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Button
							onClick={() => signinUserWithGoogle()}
							fullWidth
							variant='outlined'
							sx={{ mt: 3, mb: 2 }}
							color='error'
						>
						Sign Up With Google
					</Button>
					<Divider sx={{width:'100%'}}> OR </Divider>
					<Box
						component='form'
						onSubmit={formik.handleSubmit}
						sx={{ mt: 3 }}
					>
					        					
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id='displayName'
										name='displayName'
										label='Full Name'
										value={formik.values.displayName}
										onChange={formik.handleChange}
										error={
											formik.touched.displayName &&
											Boolean(formik.errors.displayName)
										}
										helperText={
											formik.touched.displayName &&
											formik.errors.displayName
										}
										color= "secondary"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
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
											formik.touched.email &&
											formik.errors.email
										}
										color= "secondary"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
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
										color= "secondary"
									/>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Button
									onClick={() => setSigninPageState(true)}
									compo
								>
									Already have an account? Sign in
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Snackbar open={authErrorMsg ? true : false} autoHideDuration={6000} onClose={errorMessageCloseHandler}>
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
	registerUser: userActions.registerUser,
	setAuthErrorMsg: userActions.setAuthErrorMsg,
	signinUserWithGoogle: userActions.signinUserWithGoogle,
};

export default connect(mapToState, mapToDispatch)(SignUp);
SignUp.propTypes = {
	setSigninPageState: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
};
