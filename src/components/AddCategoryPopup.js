import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
const validationSchema = yup.object({
	categoryName: yup
		.string('Enter category name')
		.min(2, 'Category name should be of minimum 2 characters length')
		.required('Category name is required'),
});
export default function AddCategoryPopup(props) {
	const { open, addCategoryPopupHandler, initialValues, shouldTakeInitialValue } = props;
	const [update, setUpdate] = React.useState(0);
	const formik = useFormik({
		initialValues: {
			categoryName: initialValues || '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			addCategoryPopupHandler(false, values.categoryName);
			formik.resetForm();
		},
	});
	const onCancelHandler = () => {
		formik.resetForm();
		addCategoryPopupHandler(true);
	};
	React.useEffect(() => {
		if (shouldTakeInitialValue) {
			formik.values.categoryName = initialValues;
		} else {
			formik.values.categoryName = '';
		}
		setUpdate(update + 1);
		
	}, [shouldTakeInitialValue,initialValues]);
	return (
		<div>
			<Dialog
				open={open}
				onClose={() => addCategoryPopupHandler(true)}
				component='form'
				onSubmit={formik.handleSubmit}
			>
				<DialogTitle color='secondary'>Save</DialogTitle>
				<DialogContent>
					<DialogContentText color='secondary'>
						To add a category, please enter category name.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='categoryName'
						label='Category Name'
						type='text'
						fullWidth
						variant='standard'
						color='secondary'
						value={formik.values.categoryName}
						onChange={formik.handleChange}
						error={
							formik.touched.categoryName &&
							Boolean(formik.errors.categoryName)
						}
						helperText={
							formik.touched.categoryName &&
							formik.errors.categoryName
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onCancelHandler()} color='secondary'>
						Cancel
					</Button>
					<Button type='submit' color='secondary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
AddCategoryPopup.propTypes = {
	open: PropTypes.bool.isRequired,
	addCategoryPopupHandler: PropTypes.func.isRequired,
};
