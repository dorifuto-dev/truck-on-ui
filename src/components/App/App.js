import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import TrailIndex from '../TrailIndex/TrailIndex';
import TrailDetails from '../TrailDetails/TrailDetails';
import Filter from '../Filter/Filter';
import FavoriteTrails from '../FavoriteTrails/FavoriteTrails';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Switch } from 'react-router-dom';
import trails from '../../sampleTrailData';
import './App.scss';

const userLoggedIn = {id: 23, name: 'Eric'}

const App = () => {
  const [allTrails, setAllTrails] = useState(null);
  const [filteredTrails, setFilteredTrails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterActive, setFilterActive] = useState(false);


  // On component mount, App should perform a fetch call to pull all trails data and setAllTrails
  // For now, using sampleTrailData file
  useEffect(() => {
    startApp();
  }, [])

  const startApp = () => {
    setAllTrails(trails)
    setFilteredTrails(trails)
  }

  return (
    <main className="app-main">
      <NavBar user={userLoggedIn}/>
      <Switch>
        <Route exact path="/"
          render={() =>
            { !filterActive ? <TrailIndex /> : <Filter /> }
          }
        />
        <Route exact path="/favorites/:userID"
          render={({match}) =>
            <FavoriteTrails userID={match.params.userID}/>
          }
        />
        <Route exact path="/trail/:id"
          render={({match}) => {
              return <TrailDetails trailID={match.params.id}/>
          }}
        />
        <Route path="*"
          render={() =>
            <PageNotFound />
          }
        />
      </Switch>
    </main>
  );
}

export default App;
