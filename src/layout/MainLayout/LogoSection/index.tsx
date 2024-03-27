// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'components/Logo';
import { MENU_OPEN } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'hooks';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const { defaultId } = useAppSelector((state) => state.customizationReducer);
  const dispatch = useAppDispatch()
  return (
    <Link href={config.startPage}>
      <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} >
        <Logo />
      </ButtonBase>
    </Link>
  );
};

export default LogoSection;
