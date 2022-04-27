import React from 'react'
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

export const sidebarData =[
    {
        title: "Metriks",
        icon: <InsertChartOutlinedOutlinedIcon/>,
        link: "/metriks/pengunjung",
        iconClosed: <ArrowDropDownIcon/>,
        iconOpen: <ArrowRightIcon/>,
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
        title: "Daftar Verifikasi",
        icon: <DomainVerificationIcon/>,
        link: "/DaftarVerifikasi"
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