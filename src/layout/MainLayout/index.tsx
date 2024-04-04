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
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: any, open: boolean }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 72),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }: { children: any }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useAppSelector((state: any) => state.customizationReducer?.opened);
  // const { drawerType, container, layout } = useConfig();
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
      // sx={{ ml: !drawerOpen && "-188px !important" }}
      >
        {/* breadcrumb */}
        {/* {container && (
          <Container maxWidth="lg">
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            {children}
          </Container>
        )}
        {!container && (
        )} */}
        <>
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          {children}
        </>
      </Main>

      {/* <Customization /> */}
    </Box>
  );
};

export default MainLayout;
