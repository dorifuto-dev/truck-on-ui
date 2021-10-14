import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

const App = () => {
  return (
    <main className="app-main">
      <NavBar />
      <Switch>
        <Route exact path="/"
          render={() =>
            <>
              <h1>Home Test</h1>
            </>
          }
        />
        <Route exact path="/favorites"
          render={() =>
            <>
              <h1>Favorites Test</h1>
            </>
          }
        />
      </Switch>
    </main>
  );
}

export default App;