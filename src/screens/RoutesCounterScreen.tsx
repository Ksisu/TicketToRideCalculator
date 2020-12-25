import List from '@material-ui/core/List';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useSwipeable } from 'react-swipeable';
import { Player, PlayerId, PLAYERS } from '../model/player';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../store/routesSlice';
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import { Property } from 'csstype';

const Train: React.FunctionComponent<{ color: Property.Color }> = ({color}) => {
  return <div style={{
    backgroundColor: color,
    display: 'inline-block',
    width: '11%',
    height: '10px',
    margin: '1px',
    marginBottom: '4px',
    borderRadius: '3px',
  }}/>;
}

const RouteListItem: React.FunctionComponent<{ routeLength: number, playerId: PlayerId }> = ({
                                                                                               routeLength,
                                                                                               playerId
                                                                                             }) => {
  const dispatch = useDispatch()
  const counters: any = useSelector<RootState>(s => s.routes[playerId] || {});
  const counter = counters[routeLength] || 0;

  const handlers = useSwipeable({
    onSwipedRight: () => dispatch(decrement({playerId, routeLength})),
    onTap: () => dispatch(increment({playerId, routeLength})),
  });

  const color: Property.Color = (PLAYERS.find(p => p.id === playerId) as Player).mainColor;

  const label = <Typography variant="h5">
    {[ ...new Array(routeLength) ].map((_, i) => <Train key={i} color={color}/>)}
  </Typography>;

  return (
    <ListItem button {...handlers}>
      <ListItemIcon>
        <Typography variant="h6">{routeLength}</Typography>
      </ListItemIcon>
      <ListItemText primary={label}/>
      <ListItemSecondaryAction>
        <Typography variant="h6">{counter}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export const RoutesCounterScreen: React.FunctionComponent = () => {
  const {playerId} = useParams<{ playerId: PlayerId }>();
  return (
    <React.Fragment>
      <List component="nav" style={{width: '100%'}}>
        <RouteListItem routeLength={1} playerId={playerId}/>
        <RouteListItem routeLength={2} playerId={playerId}/>
        <RouteListItem routeLength={3} playerId={playerId}/>
        <RouteListItem routeLength={4} playerId={playerId}/>
        <RouteListItem routeLength={6} playerId={playerId}/>
        <RouteListItem routeLength={8} playerId={playerId}/>
      </List>
    </React.Fragment>
  )
}