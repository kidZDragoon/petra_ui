import Sidebar from '../sidebar';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import AuthenticationDataService from "../../services/authentication.service";
import MissingPage from '../missing-page';

const Dasbor = (props) => {
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        console.log("masuk load user");
        let token = localStorage.getItem("ssoui");
        token = JSON.parse(token);
        console.log(token);
        const response = await AuthenticationDataService.profile(token);
        console.log(response);
        if(response.data.role === 'staff'){
            setAuthorized(true);
        };
    }

    const responseView = () => {
        
    };

    const missingPage = () => {
        <MissingPage></MissingPage>
    }

    return (
        <Box>
             {authorized ? 
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
            :  
                <MissingPage></MissingPage>}
        </Box>
    );

}

export default Dasbor;