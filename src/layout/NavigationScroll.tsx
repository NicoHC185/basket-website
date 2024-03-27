'use client'

import PropTypes from 'prop-types';
import { FC, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { IChildrenProps } from 'interfaces';


// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll: FC<IChildrenProps> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return children || null;
};

export default NavigationScroll;
