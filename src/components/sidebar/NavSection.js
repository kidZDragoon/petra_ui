import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { HashRouter, matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)({
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: 32,
  paddingRight: 16,
  fontWeight: 500
});

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

function NavItem({ item, active }) {
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: '#D26930',
    fontWeight: 600,
    bgcolor: '#D269301f',
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: '#D26930',
    fontWeight: 600
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box mt={1}>{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Box>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={HashRouter}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle)
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#000000',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: '#D26930'
                        })
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={HashRouter}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();

  console.log('pn: ', pathname)

  const match = (path) => {
    console.log('match: ', path)
    return true
    // if (!path) return false;
    // if (path === '/') return matchPath(pathname, { path, end: false }).isExact;
    // return !!matchPath(pathname, { path, end: false });
  };

  const matchExact = (path) => {
    console.log('match ex: ', path)
    const result = matchPath(pathname, { path, end: false });
    if (!result) return false;
    return result.isExact;
  };

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} activeExact={matchExact} />
        ))}
      </List>
    </Box>
  );
}
