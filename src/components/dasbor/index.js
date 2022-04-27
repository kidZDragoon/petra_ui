import Sidebar from '../sidebar';
import Box from '@mui/material/Box';

function Dasbor(props) {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                p:0,
                m:0,
                justifyContent: 'flex-start',
            }}
        >
            <Sidebar></Sidebar>
            <Box sx={{ flexGrow: 1 }}>
                {props.children}
            </Box>
      </Box>
        
    );
}

export default Dasbor;