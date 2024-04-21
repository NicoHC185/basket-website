import { ReactNode, useMemo } from 'react';
// material-ui
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = (
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
) => {
  const isTitleString = useMemo(() => {
    return typeof title === 'string'
  }, [title])
  return (
    <Card
      {...others}
      sx={{
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

export default MainCard;
