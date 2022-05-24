import Sidebar from '../sidebar';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import AuthenticationDataService from "../../services/authentication.service";
import MissingPage from '../missing-page';
import BarLoader from "react-spinners/BarLoader";
import classes from'./styles.module.css';

const Dasbor = (props) => {
    const [authorized, setAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

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
        if(response.data.role === 'staf'){
            setAuthorized(true);
        };
        setIsLoading(false);
    }

    return (
        <Box
            sx={{
                height: '80vh',
        }}>
            {isLoading ?
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <BarLoader color="#d26903" loading={isLoading} css="" size={100} />               
                </Box>
                
            :  
                <div>
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
                            <Box className={classes.dasborContent} sx={{ flexGrow: 1 }}>
                                {props.children}
                            </Box>
                        </Box> 
                    :  
                        <MissingPage></MissingPage>}
                </div>}
        </Box>
    );

}

export default Dasbor;
