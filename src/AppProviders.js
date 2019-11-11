import React from 'react'
import PropTypes from 'prop-types'
import createStore from './store';
import { Provider } from 'react-redux';
import { Provider as ClientProvider, createClient, useQuery } from 'urql';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Wrapper from './components/Wrapper';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const store = createStore(); // replace with configure from starter kit...probably
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const AppProvider = ({children}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <ClientProvider value={client}>
          <Provider store={store}>
            <Wrapper>
              {children}
            </Wrapper>
          </Provider>
        </ClientProvider>
    </MuiThemeProvider>
  )
}

export default AppProvider
