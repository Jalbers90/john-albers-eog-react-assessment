import React from 'react'
import PropTypes from 'prop-types'
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Wrapper from './components/Wrapper';

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
      <Provider store={store}>
        <Wrapper>
          {children}
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
  )
}

export default AppProvider
