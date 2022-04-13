import React, {useState} from "react";
import classes from "./styles.module.css";
import {sidebarData} from "./sidebarData.js";
import '../../index.css';
import Box from '@mui/material/Box';

const Sidebar = () => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);
    console.log(window.location.pathname);

    return (
        <>
            <div className={classes.Sidebar}>
                <ul className={classes.SidebarList}>
                        {sidebarData.map((val, key)=> {
                            return (
                                <Box id={classes["box"]}>
                                    <li 
                                        key={key}
                                        className={classes.row} 
                                        id={window.location.pathname == val.link ? classes["active"] : ""}
                                        onClick={()=> {
                                            window.location.pathname = val.link; 
                                        }}
                                    >                                    
                                        <div id={classes["icon"]}>{val.icon}</div>
                                        <div id={classes["title"]}>{val.title}</div>    
                                        <div onClick={showSubnav}>
                                            {val.subNav && subnav
                                            ? val.iconOpen
                                            : val.subNav
                                            ? val.iconClosed
                                            : null}
                                        </div>
                                    </li>
                                </Box>

                            )
                        })}
                </ul>
            </div>
        </>
    )
}
    

export default Sidebar;