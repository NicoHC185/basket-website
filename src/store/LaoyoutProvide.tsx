'use client'

import { Provider } from 'react-redux';
import { CssBaseline } from "@mui/material";
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { ThemeProvider } from '@mui/material/styles'
import NavigationScroll from 'layout/NavigationScroll';
import { useAppSelector } from 'hooks';
import themes from 'themes';
import store, { RootState } from 'store';
import MainLayout from 'layout/MainLayout';
import '@public/assets/scss/style.scss';


const ProvideWapped = ({ children }: { children: JSX.Element }): JSX.Element => {
  const custom = useAppSelector((state: RootState) => state.customizationReducer)

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

export const LayoutProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <Provider store={store}>
      <ProvideWapped>
        {children}
      </ProvideWapped>
    </Provider>
  )
}