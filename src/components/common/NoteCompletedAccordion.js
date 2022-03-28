import {useState,useEffect,Fragment} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import NoteItemView from '../NoteItemView';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
function NoteCompletedAccordion(props) {
	const { completedNotes } = props;
	const [expanded, setExpanded] = useState(false);
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	useEffect(() => {
		return () => setExpanded(false);
	}, []);
	return (
		<div>
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
				>
					<Typography sx={{ width: '70%', flexShrink: 0 }}>
						Completed{' '}
						{completedNotes?.length > 0
							? ` ( ${completedNotes?.length} )`
							: ''}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Divider />
					<List sx={{ width: '100%' }}>
						{completedNotes.map((noteItem, index) => {
							let props = {
								labelId: `checkbox-list-label-${index}`,
								note: noteItem,
							};
							return (
								<Fragment key={noteItem?.id+"completedNoteKey"}>
									<NoteItemView {...props} />
								</Fragment>
							);
						})}
					</List>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default NoteCompletedAccordion;

NoteCompletedAccordion.propTypes = {
	completedNotes: PropTypes.arrayOf(PropTypes.object),
};
