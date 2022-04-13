import React from 'react'
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export const sidebarData =[
    {
        title: "Metriks",
        icon: <InsertChartOutlinedOutlinedIcon/>,
        link: "/metriks",
        iconClosed: <ArrowDropDownIcon/>,
        iconOpen: <ArrowDropUpIcon/>,
        subNav: [
            {
                title: "Pengunjung", 
                icon: <DirectionsRunOutlinedIcon/>,               
                link: "/metriks/pengunjung",
            },
            {
                title: "Unduhan",
                icon: <FileDownloadOutlinedIcon/>,
                link: "/metriks/undahan",
            },
            {
                title: "Unggahan",
                icon: <FileUploadOutlinedIcon/>,
                link: "/metriks/unggahan",
            },
        ]
    },
    {
        title: "Kelola Karya Ilmiah",
        icon: <LibraryBooksIcon/>,
        link: "/kelola-karil"
    },
    {
        title: "Kelola User",
        icon: <PeopleIcon/>,
        link: "/kelola-user"
    },
    {
        title: "Kelola Pengumuman",
        icon: <ChatIcon/>,
        link: "/kelola-pengumuman"
    }
]