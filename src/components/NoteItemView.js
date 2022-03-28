import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DelateIcon from '@mui/icons-material/Delete';
import AddNotePopup from './AddNotePopup';
import CustomDialog from './common/CustomDialog';
import PropTypes from 'prop-types';
import { notesServices } from '../services/notesServices';
const deletedPopupTitle = 'Delete';
const deletedPopupText = 'Are you sure you want to delete this?';
function NoteItemView(props) {
	const {  labelId, note } = props;
	const [shouldShowAddNotePopup, setAddNotePopupStatus] =
		React.useState(false);
	const [shouldShowDeleteConfirmationPopup, setDeleteConfirmationPopupState] =
		React.useState(false);
	const updateNoteStateHandler = isChecked => {
		if (isChecked) {
			notesServices.updateNote(note, {
				...note,
				state: 'completed',
				updatedOn: new Date(),
			});
		} else {
			notesServices.updateNote(note, {
				...note,
				state: 'active',
				updatedOn: new Date(),
			});
		}
	};
	const listItemStyle = {
		textDecoration: note.state === 'completed' ? 'line-through' : 'none',
	};
	const updateNoteNoteHandler = updatedNoteTitle => {
		notesServices.updateNote(note, {
			...note,
			title: updatedNoteTitle,
			updatedOn: new Date(),
		});
	};
	const deletedNoteDandler = shouldDelate => {
		if (shouldDelate) {
			notesServices.updateNote(note);
		}
	};
	return (
		<>
			<ListItem
				key={note?.id}
				secondaryAction={
					<IconButton
						edge='end'
						aria-label='comments'
						onClick={() => setDeleteConfirmationPopupState(true)}
					>
						<DelateIcon />
					</IconButton>
				}
				disablePadding
				sx={{ marginBottom: 1 }}
			>
				<ListItemButton role={undefined} dense>
					<ListItemIcon>
						<Checkbox
							edge='start'
							checked={note.state === 'active' ? false : true}
							tabIndex={-1}
							disableRipple
							inputProps={{ 'aria-labelledby': labelId }}
							onChange={e =>
								updateNoteStateHandler(e.target.checked)
							}
						/>
					</ListItemIcon>
					<ListItemText
						id={note?.id}
						primary={note.title}
						sx={listItemStyle}
						onClick={() => setAddNotePopupStatus(true)}
					/>
				</ListItemButton>
			</ListItem>
			<AddNotePopup
				open={shouldShowAddNotePopup}
				setOpen={setAddNotePopupStatus}
				saveNoteHandler={updateNoteNoteHandler}
				inputValue={note.title}
			/>
			<CustomDialog
				open={shouldShowDeleteConfirmationPopup}
				setOpen={setDeleteConfirmationPopupState}
				acceptHandler={deletedNoteDandler}
				title={deletedPopupTitle}
				text={deletedPopupText}
				acceptBtnText={'Yes'}
				cancelBtnTex={'No'}
			/>
		</>
	);
}

export default NoteItemView;
NoteItemView.propTypes = {
	labelId: PropTypes.string.isRequired,
	note: PropTypes.object.isRequired,
};
