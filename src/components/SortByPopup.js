import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function SortByPopup(props) {
	const { open, setOpen, onCloseHandler } = props;
	const [value, setValue] = React.useState('updatedOn');

	const handleChange = event => {
		setValue(event.target.value);
	};
	const handleClose = () => {
		setOpen(false);
		onCloseHandler(value);
	};
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Sort By</DialogTitle>

				<DialogContent>
					{/* <DialogContentText> Choose the Sort By Selector</DialogContentText> */}
					<FormControl>
						<RadioGroup
							aria-labelledby='demo-controlled-radio-buttons-group'
							name='controlled-radio-buttons-group'
							value={value}
							onChange={handleChange}
						>
							<FormControlLabel
								value='updatedOn'
								control={<Radio color='secondary' />}
								label={<SortByDateLabel />}
							/>
							<FormControlLabel
								value='title'
								control={<Radio color='secondary' />}
								label={<SortByTitleLabel />}
							/>
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleClose} color='secondary'>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default SortByPopup;

function SortByTitleLabel() {
	return (
		<Box sx={{ display: 'flex', gap: '8px' }}>
			<Typography variant='button' display='block'>
				Title
			</Typography>
			<KeyboardArrowDownIcon color='secondary'/>
		</Box>
	);
}
function SortByDateLabel() {
	return (
		<Box sx={{ display: 'flex', gap: '10px' }}>
			<Typography variant='button' display='block'>
				Date
			</Typography>
			<KeyboardArrowUpIcon color='secondary' />
		</Box>
	);
}
