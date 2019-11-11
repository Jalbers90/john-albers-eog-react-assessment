import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from '@material-ui/core';
import AppProviders from './AppProviders';
import Header from './components/Header';
import { ChartProvider } from './Features/Chart/chart-context';
import Subscriber from './subscription/Subscriber';

import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  container: { margin: '2.5% auto' },
});

const App = () => {
  const classes = styles();

  return (
    <AppProviders>
      <Header />
      <Subscriber />
      <Container className={classes.container}>
        {/* main page content goes in here */}
        <ChartProvider />
      </Container>
      <ToastContainer />
    </AppProviders>
  );
};

export default App;
