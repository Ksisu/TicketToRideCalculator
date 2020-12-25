import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PlayerListScreen } from './screens/PlayerListScreen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RoutesCounterScreen } from './screens/RoutesCounterScreen';
import { StationCounterScreen } from './screens/StationCounterScreen';
import Box from '@material-ui/core/Box';
import { AppBottomNavigation } from './AppBottomNavigation';
import { LongestRouteScreen } from './screens/LongestRouteScreen';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <CssBaseline/>
      <Box display="flex" flexDirection="column" alignItems="stretch" style={{height: '100%'}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Ticket to Ride calculator</Typography>
          </Toolbar>
        </AppBar>
        <Box flexGrow={1}>
          <Switch>
            <Route path="/:playerId/routes">
              <RoutesCounterScreen/>
            </Route>
            <Route path="/:playerId/stations">
              <StationCounterScreen/>
            </Route>
            <Route path="/:playerId/longest-route">
              <LongestRouteScreen/>
            </Route>
            <Route path="/">
              <PlayerListScreen/>
            </Route>
          </Switch>
        </Box>
        <AppBottomNavigation/>
      </Box>
    </BrowserRouter>
  );
}

export default App;
