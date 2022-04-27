import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavSection from './NavSection';
// data
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')({
  flexShrink: 0,
  width: DRAWER_WIDTH
});

// ----------------------------------------------------------------------

export default function DashboardSidebar() {
  return (
    <RootStyle>
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH
          }
        }}
      >
        <NavSection navConfig={sidebarConfig} />
      </Drawer>
    </RootStyle>
  );
}
