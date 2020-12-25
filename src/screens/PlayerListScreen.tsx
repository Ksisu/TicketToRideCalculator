import List from '@material-ui/core/List';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Player, PLAYERS } from '../model/player';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { RoutesState } from '../store/routesSlice';
import { StationsState } from '../store/stationsSlice';
import { LongestRouteState } from '../store/longestRouteSlice';

const PlayerListItem: React.FunctionComponent<{
  player: Player, point: number
}> = ({player, point}) => {
  return (
    <Link to={`/${player.id}/routes`} style={{textDecoration: 'none', color: player.mainColor}}>
      <ListItem button style={{backgroundColor: player.bgColor}}>
        <ListItemIcon>
          <PersonIcon style={{color: player.mainColor}}/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="h5">{player.name}</Typography>}/>
        <ListItemSecondaryAction>
          <Typography variant="h6">{point}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
}

export const PlayerListScreen: React.FunctionComponent = () => {
  const routes = useSelector<RootState, RoutesState>(s => s.routes);
  const stations = useSelector<RootState, StationsState>(s => s.stations);
  const longestRoute = useSelector<RootState, LongestRouteState>(s => s.longestRoute);
  const data = PLAYERS.map(player => ({
    player,
    score: (routes[player.id]?.score || 0 + stations[player.id]?.score || 0 + longestRoute[player.id]?.score || 0),
  }));

  return (
    <List component="nav" style={{width: '100%'}}>
      {data.map(d => <PlayerListItem key={d.player.id} player={d.player} point={d.score}/>)}
    </List>
  );
}