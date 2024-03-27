import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'components/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import { drawerWidth, minDrawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import { useAppSelector } from 'hooks';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: any, open: boolean }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standar
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 75),
    width: `calc(100% - ${open ? drawerWidth : minDrawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${open ? drawerWidth : minDrawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${open ? drawerWidth : minDrawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }: { children: any }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useAppSelector((state: any) => state.customizationReducer?.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: theme.palette.background.default
      }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.primary.dark,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main
        theme={theme}
        open={leftDrawerOpened}
        sx={{ width: "100%", backgroundColor: theme.palette.background.default }}
      >
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        {children}
      </Main>
      {/* <Customization /> */}
    </Box>
  );
};

export default MainLayout;
