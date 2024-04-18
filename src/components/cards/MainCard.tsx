import { ReactNode, forwardRef, useMemo } from 'react';
// material-ui
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  function MainCard(
    {
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      sx = {},
      title,
      // ref,
      ...others
    }: {
      border?: Boolean,
      boxShadow?: Boolean,
      children?: string | JSX.Element | JSX.Element[],
      content?: Boolean,
      contentClass?: string,
      contentSX?: object,
      darkTitle?: Boolean,
      secondary?: ReactNode | string | object,
      shadow?: string,
      sx?: object,
      title?: ReactNode | string,
    },
  ) {
    const isTitleString = useMemo(() => {
      return typeof title === 'string'
    }, [title])
    return (
      <Card
        {...others}
        sx={{
          // border: border ? '1px solid' : 'none',
          // borderColor: theme.palette.grey[400],
          // bgcolor: theme.palette.grey[500],
          // ':hover': {
          //   boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          // },
          ...sx
        }}
      >
        {title && <CardHeader sx={headerSX} title={isTitleString ? <Typography variant="h3">{title}</Typography> : title} />}
        {title && <Divider />}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
