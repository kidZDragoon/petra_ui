import React, {useState} from "react";
import classes from "./styles.module.css";
import {sidebarData} from "./sidebarData.js";
import '../../index.css';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

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
                                    <Link to={val.link} style={{textDecoration:"none", color:"black"}}>
                                        <li 
                                            key={key}
                                            className={classes.row} 
                                            id={window.location.pathname == val.link ? classes["active"] : ""}
                                            
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
                                    </Link>
                                </Box>

                            )
                        })}
                </ul>
            </div>
        </>
    )
}
    

export default Sidebar;