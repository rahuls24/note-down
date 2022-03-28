import React from 'react'
import Box from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
function NoNotesScreen() {
  return (
    <>
        <Box component={'div'} sx={{height:'70vh', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'14px',wordBreak:'break-all'}}>
            <img src='/logo192.png' alt='No Notes' width="80px" height="80px"  />
            <Typography sx={{marginTop:'10px'}}>
                No Notes yet 
            </Typography>
            <Box component={'div'} sx={{display:'flex' ,flexDirection:'column' ,justifyContent:'center',alignItems:'center'}}>
            <Typography variant="caption">Add your notes and keep track of them from </Typography> 
            <Typography variant="caption">any device by logging into your account. </Typography> 
            {/* <Typography variant="caption">of them from any device by logging into your account </Typography>  */}
            </Box>
        </Box>
    </>
  )
}

export default NoNotesScreen