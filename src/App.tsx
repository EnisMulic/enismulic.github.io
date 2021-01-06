import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

import styles from './App.module.css';
import Navbar from './components/Navbar';

import Layout from './containers/Layout';

const App = () => {
  return (
    <div className={styles.App}>
      <Navbar />
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
