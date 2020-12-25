import List from '@material-ui/core/List';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import { Player, PlayerId, PLAYERS } from '../model/player';
import { set, StationsCountType } from '../store/stationsSlice';
import { Property } from 'csstype';

export const NonUsedStation: React.FunctionComponent<{color?: Property.Color}> = ({color}) => <HomeIcon htmlColor={color} fontSize="large"/>;
export const UsedStation: React.FunctionComponent = () => <HomeIcon color="disabled" fontSize="large"/>;

const StationListItem: React.FunctionComponent<{player: Player, nonUsedCount: StationsCountType}> = ({player, nonUsedCount}) => {
  const dispatch = useDispatch()
  const stationsCount = useSelector<RootState, number | undefined>(s => s.stations[player.id]?.count);
  const selected = stationsCount === nonUsedCount;
  const bgColor = selected ? player.bgColor : undefined;
  const nonUsedStations = [...new Array(nonUsedCount)].map((_, i) => <NonUsedStation key={i} color={player.mainColor}/>);
  const usedStations = [...new Array(3 - nonUsedCount)].map((_, i) => <UsedStation key={i}/>);
  const label = (<Typography variant="h5" align="center">
    {[...nonUsedStations, ...usedStations].map((e, i) => <React.Fragment key={i}> {e} </React.Fragment>)}
  </Typography>);
  const handleClick = () => dispatch(set({playerId: player.id, count: nonUsedCount}));
  return (<ListItem button onClick={handleClick} style={{backgroundColor: bgColor}}>
    <ListItemText primary={label}/>
    <ListItemSecondaryAction>
      <Typography variant="h6">{nonUsedCount}</Typography>
    </ListItemSecondaryAction>
  </ListItem>);
}

export const StationCounterScreen: React.FunctionComponent = () => {
  const { playerId } = useParams<{playerId: PlayerId}>();
  const player = PLAYERS.find(p => p.id === playerId) as Player;
  return (
    <List component="nav" style={{width: '100%'}}>
      <StationListItem player={player} nonUsedCount={3}/>
      <StationListItem player={player} nonUsedCount={2}/>
      <StationListItem player={player} nonUsedCount={1}/>
      <StationListItem player={player} nonUsedCount={0}/>
    </List>
  )
}