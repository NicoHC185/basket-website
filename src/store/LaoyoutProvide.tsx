'use client'

import { Provider, useSelector } from 'react-redux';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import NavigationScroll from 'layout/NavigationScroll';
import { useAppSelector } from 'hooks';
import { FC, ReactNode, useEffect } from 'react';
import themes from 'themes';
import store from 'store';
import { IChildrenProps } from 'interfaces';
import MainLayout from 'layout/MainLayout';
import '@public/assets/scss/style.scss';
import { styled } from '@mui/material/styles';

const ProvideWapped: FC<IChildrenProps> = ({ children }) => {
  const custom = useSelector((state: any) => state.customizationReducer)

  return <StyledEngineProvider injectFirst>
    <ThemeProvider theme={themes(custom)}>
      <CssBaseline />
      <NavigationScroll>
        <MainLayout>
          {children}
        </MainLayout>
      </NavigationScroll>
    </ThemeProvider>
  </StyledEngineProvider>
}

export const LayoutProvider: FC<IChildrenProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ProvideWapped>
        {children}
      </ProvideWapped>
    </Provider>
  )
}