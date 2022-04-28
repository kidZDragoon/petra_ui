import React from 'react';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'Metriks',
    path: '/metriks',
    icon: <InsertChartOutlinedOutlinedIcon />,
    children: [
      {
        title: 'Pengunjung',
        path: '/metriks/pengunjung',
        icon: <DirectionsRunOutlinedIcon />
      },
      {
        title: 'Unduhan',
        path: '/metriks/undahan',
        icon: <FileDownloadOutlinedIcon />
      },
      {
        title: 'Unggahan',
        path: '/metriks/unggahan',
        icon: <FileUploadOutlinedIcon />
      }
    ]
  },
  {
    title: 'Kelola Karya Ilmiah',
    path: '/kelola-karil',
    icon: <LibraryBooksIcon />
  },
  {
    title: 'Kelola User',
    path: '/kelola-user',
    icon: <PeopleIcon />
  },
  {
    title: 'Kelola Pengumuman',
    path: '/kelola-pengumuman',
    icon: <ChatIcon />
  }
];

export default sidebarConfig;
