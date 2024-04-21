'use client'

import PropTypes from 'prop-types';
import { forwardRef, useEffect, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Link } from '@mui/material'
import { IMenu } from 'interfaces';
import { RootState } from 'store';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: {
  item: IMenu, level: number
}) => {
  const theme = useTheme();
  const dispatch =
    useAppDispatch()

  const pathname = usePathname();
  const customization = useAppSelector((state: RootState) => state.customizationReducer);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />
  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const newUrl = useMemo(() => {
    return `/${item.url}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let listItemProps: {
    component?: {},
    href?: string,
    target?: string
  } = {
    component: forwardRef<HTMLAnchorElement, Object>(function LinkComponent(props, ref) {
      return <Link ref={ref} {...props} href={newUrl} target={itemTarget} />
    })
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: newUrl, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        color: 'inherit',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: customization.opened ? `${level * 24}px` : 1.5
      }}
      selected={customization.isOpen.findIndex((id: string) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon
      >{itemIcon}</ListItemIcon>
      {
        customization.opened &&
        <ListItemText
          primary={
            <Typography
              color="inherit"
              sx={{ fontSize: '0.9rem' }}>
              {item.title}
            </Typography>
          }
        />
      }
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
